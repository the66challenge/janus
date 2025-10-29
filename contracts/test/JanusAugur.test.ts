import { expect } from "chai";
import { ethers } from "hardhat";
import { JanusAugur, F1TeamToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("JanusAugur", function () {
    let predictor: JanusAugur;
    let token: F1TeamToken;
    let owner: SignerWithAddress;
    let oracle: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;

    const STAKE_AMOUNT = ethers.parseEther("10");

    beforeEach(async function () {
        [owner, oracle, user1, user2] = await ethers.getSigners();

        const F1TeamToken = await ethers.getContractFactory("F1TeamToken");
        token = await F1TeamToken.deploy("McLaren Token", "MCLAREN", 1000000);
        await token.waitForDeployment();

        const JanusAugur = await ethers.getContractFactory("JanusAugur");
        predictor = await JanusAugur.deploy(
            await token.getAddress(),
            oracle.address
        );
        await predictor.waitForDeployment();

        await token.transfer(user1.address, ethers.parseEther("1000"));
        await token.transfer(user2.address, ethers.parseEther("1000"));
    });

    describe("Deployment", function () {
        it("Should set correct token and oracle", async function () {
            expect(await predictor.token()).to.equal(await token.getAddress());
            expect(await predictor.oracle()).to.equal(oracle.address);
        });
    });

    describe("Create Market", function () {
        it("Should allow owner to create market", async function () {
            await predictor.createMarket("Will Lando win?");
            const market = await predictor.markets(0);
            expect(market.description).to.equal("Will Lando win?");
            expect(market.resolved).to.be.false;
        });

        it("Should not allow non-owner to create market", async function () {
            await expect(
                predictor.connect(user1).createMarket("Test market")
            ).to.be.revertedWithCustomError(predictor, "OwnableUnauthorizedAccount");
        });
    });

    describe("Place Prediction", function () {
        beforeEach(async function () {
            await predictor.createMarket("Will Lando podium?");
            await token.connect(user1).approve(await predictor.getAddress(), STAKE_AMOUNT);
            await token.connect(user2).approve(await predictor.getAddress(), STAKE_AMOUNT);
        });

        it("Should allow user to place prediction", async function () {
            await predictor.connect(user1).placePrediction(0, true);
            const market = await predictor.markets(0);
            expect(market.yesPool).to.equal(STAKE_AMOUNT);
        });

        it("Should add to correct pool", async function () {
            await predictor.connect(user1).placePrediction(0, true);
            await predictor.connect(user2).placePrediction(0, false);

            const market = await predictor.markets(0);
            expect(market.yesPool).to.equal(STAKE_AMOUNT);
            expect(market.noPool).to.equal(STAKE_AMOUNT);
        });
    });

    describe("Resolve Market", function () {
        beforeEach(async function () {
            await predictor.createMarket("Will Lando win?");
        });

        it("Should allow oracle to resolve market", async function () {
            await predictor.connect(oracle).resolveMarket(0, true);
            const market = await predictor.markets(0);
            expect(market.resolved).to.be.true;
            expect(market.outcome).to.be.true;
        });

        it("Should not allow non-oracle to resolve", async function () {
            await expect(
                predictor.connect(user1).resolveMarket(0, true)
            ).to.be.revertedWith("Only oracle");
        });
    });

    describe("Claim Winnings", function () {
        beforeEach(async function () {
            await predictor.createMarket("Will Lando podium?");
            await token.connect(user1).approve(await predictor.getAddress(), STAKE_AMOUNT);
            await token.connect(user2).approve(await predictor.getAddress(), STAKE_AMOUNT);
            await predictor.connect(user1).placePrediction(0, true);
            await predictor.connect(user2).placePrediction(0, false);
            await predictor.connect(oracle).resolveMarket(0, true);
        });

        it("Should allow winner to claim winnings", async function () {
            const initialBalance = await token.balanceOf(user1.address);
            await predictor.connect(user1).claimWinnings(0);
            const finalBalance = await token.balanceOf(user1.address);
            expect(finalBalance).to.be.greaterThan(initialBalance);
        });

        it("Should not allow loser to claim", async function () {
            await expect(
                predictor.connect(user2).claimWinnings(0)
            ).to.be.revertedWith("Wrong prediction");
        });

        it("Should not allow double claim", async function () {
            await predictor.connect(user1).claimWinnings(0);
            await expect(
                predictor.connect(user1).claimWinnings(0)
            ).to.be.revertedWith("Already claimed");
        });
    });
});