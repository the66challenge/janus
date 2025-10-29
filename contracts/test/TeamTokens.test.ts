import { expect } from "chai";
import { ethers } from "hardhat";
import { F1TeamToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("F1TeamToken", function () {
    let token: F1TeamToken;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const F1TeamToken = await ethers.getContractFactory("F1TeamToken");
        token = await F1TeamToken.deploy("McLaren Token", "MCLAREN", 1000000);
        await token.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await token.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply to the owner", async function () {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });

        it("Should have correct name and symbol", async function () {
            expect(await token.name()).to.equal("McLaren Token");
            expect(await token.symbol()).to.equal("MCLAREN");
        });

        it("Should have 18 decimals", async function () {
            expect(await token.decimals()).to.equal(18);
        });

        it("Should mint correct initial supply", async function () {
            const expectedSupply = ethers.parseEther("1000000");
            expect(await token.totalSupply()).to.equal(expectedSupply);
        });
    });

    describe("Minting", function () {
        it("Should allow owner to mint tokens", async function () {
            const mintAmount = ethers.parseEther("1000");
            await token.mint(addr1.address, mintAmount);
            expect(await token.balanceOf(addr1.address)).to.equal(mintAmount);
        });

        it("Should increase total supply when minting", async function () {
            const initialSupply = await token.totalSupply();
            const mintAmount = ethers.parseEther("1000");

            await token.mint(addr1.address, mintAmount);

            expect(await token.totalSupply()).to.equal(initialSupply + mintAmount);
        });

        it("Should not allow non-owner to mint", async function () {
            const mintAmount = ethers.parseEther("1000");
            await expect(
                token.connect(addr1).mint(addr2.address, mintAmount)
            ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });

        it("Should emit Transfer event when minting", async function () {
            const mintAmount = ethers.parseEther("1000");
            await expect(token.mint(addr1.address, mintAmount))
                .to.emit(token, "Transfer")
                .withArgs(ethers.ZeroAddress, addr1.address, mintAmount);
        });
    });

    describe("Burning", function () {
        it("Should allow users to burn their tokens", async function () {
            const burnAmount = ethers.parseEther("100");
            const initialBalance = await token.balanceOf(owner.address);

            await token.burn(burnAmount);

            expect(await token.balanceOf(owner.address)).to.equal(
                initialBalance - burnAmount
            );
        });

        it("Should decrease total supply when burning", async function () {
            const initialSupply = await token.totalSupply();
            const burnAmount = ethers.parseEther("100");

            await token.burn(burnAmount);

            expect(await token.totalSupply()).to.equal(initialSupply - burnAmount);
        });

        it("Should not allow burning more than balance", async function () {
            const balance = await token.balanceOf(addr1.address);
            await expect(
                token.connect(addr1).burn(balance + ethers.parseEther("1"))
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
        });

        it("Should emit Transfer event when burning", async function () {
            const burnAmount = ethers.parseEther("100");
            await expect(token.burn(burnAmount))
                .to.emit(token, "Transfer")
                .withArgs(owner.address, ethers.ZeroAddress, burnAmount);
        });
    });

    describe("Transfers", function () {
        it("Should transfer tokens between accounts", async function () {
            const transferAmount = ethers.parseEther("50");

            await token.transfer(addr1.address, transferAmount);
            expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);

            await token.connect(addr1).transfer(addr2.address, transferAmount);
            expect(await token.balanceOf(addr2.address)).to.equal(transferAmount);
        });

        it("Should fail if sender doesn't have enough tokens", async function () {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            await expect(
                token.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");

            expect(await token.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });

        it("Should update balances after transfers", async function () {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            const amount1 = ethers.parseEther("100");
            const amount2 = ethers.parseEther("50");

            await token.transfer(addr1.address, amount1);
            await token.transfer(addr2.address, amount2);

            const finalOwnerBalance = await token.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - amount1 - amount2);

            expect(await token.balanceOf(addr1.address)).to.equal(amount1);
            expect(await token.balanceOf(addr2.address)).to.equal(amount2);
        });

        it("Should emit Transfer event", async function () {
            const amount = ethers.parseEther("50");
            await expect(token.transfer(addr1.address, amount))
                .to.emit(token, "Transfer")
                .withArgs(owner.address, addr1.address, amount);
        });
    });

    describe("Allowances", function () {
        it("Should approve tokens for delegated transfer", async function () {
            const amount = ethers.parseEther("100");
            await token.approve(addr1.address, amount);
            expect(await token.allowance(owner.address, addr1.address)).to.equal(amount);
        });

        it("Should allow transferFrom with proper allowance", async function () {
            const amount = ethers.parseEther("100");

            await token.approve(addr1.address, amount);
            await token.connect(addr1).transferFrom(owner.address, addr2.address, amount);

            expect(await token.balanceOf(addr2.address)).to.equal(amount);
        });

        it("Should fail transferFrom without allowance", async function () {
            const amount = ethers.parseEther("100");

            await expect(
                token.connect(addr1).transferFrom(owner.address, addr2.address, amount)
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientAllowance");
        });

        it("Should decrease allowance after transferFrom", async function () {
            const amount = ethers.parseEther("100");
            const transferAmount = ethers.parseEther("40");

            await token.approve(addr1.address, amount);
            await token.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);

            expect(await token.allowance(owner.address, addr1.address)).to.equal(
                amount - transferAmount
            );
        });
    });

    describe("Ownership", function () {
        it("Should allow owner to transfer ownership", async function () {
            await token.transferOwnership(addr1.address);
            expect(await token.owner()).to.equal(addr1.address);
        });

        it("Should not allow non-owner to transfer ownership", async function () {
            await expect(
                token.connect(addr1).transferOwnership(addr2.address)
            ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });

        it("Should allow new owner to mint after ownership transfer", async function () {
            await token.transferOwnership(addr1.address);

            const mintAmount = ethers.parseEther("1000");
            await token.connect(addr1).mint(addr2.address, mintAmount);

            expect(await token.balanceOf(addr2.address)).to.equal(mintAmount);
        });
    });
});