import { expect } from "chai";
import { ethers } from "hardhat";
import { JanuPolis, F1TeamToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("JanuPolis", function () {
    let market: JanuPolis;
    let token: F1TeamToken;
    let owner: SignerWithAddress;
    let oracle: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;

    beforeEach(async function () {
        [owner, oracle, user1, user2] = await ethers.getSigners();

        // Deploy token
        const F1TeamToken = await ethers.getContractFactory("F1TeamToken");
        token = await F1TeamToken.deploy("McLaren Token", "MCLAREN", 1000000);
        await token.waitForDeployment();

        // Deploy market
        const JanuPolis = await ethers.getContractFactory("JanuPolis");
        market = await JanuPolis.deploy(
            await token.getAddress(),
            oracle.address
        );
        await market.waitForDeployment();

        // Give users some tokens
        await token.transfer(user1.address, ethers.parseEther("1000"));
        await token.transfer(user2.address, ethers.parseEther("1000"));
    });

    describe("Deployment", function () {
        it("Should set correct payment token", async function () {
            expect(await market.paymentToken()).to.equal(await token.getAddress());
        });

        it("Should set correct oracle", async function () {
            expect(await market.oracle()).to.equal(oracle.address);
        });

        it("Should set correct owner", async function () {
            expect(await market.owner()).to.equal(owner.address);
        });

        it("Should have correct name and symbol", async function () {
            expect(await market.name()).to.equal("Janus F1 dNFT");
            expect(await market.symbol()).to.equal("JF1");
        });

        it("Should revert with zero token address", async function () {
            const JanuPolis = await ethers.getContractFactory("JanuPolis");
            await expect(
                JanuPolis.deploy(ethers.ZeroAddress, oracle.address)
            ).to.be.revertedWith("Invalid payment token");
        });

        it("Should revert with zero oracle address", async function () {
            const JanuPolis = await ethers.getContractFactory("JanuPolis");
            await expect(
                JanuPolis.deploy(await token.getAddress(), ethers.ZeroAddress)
            ).to.be.revertedWith("Invalid oracle address");
        });
    });

    describe("Minting NFTs", function () {
        it("Should allow owner to mint NFT", async function () {
            const uri = "ipfs://QmTest123";
            await market.mintNFT(user1.address, uri);

            expect(await market.ownerOf(0)).to.equal(user1.address);
            expect(await market.tokenURI(0)).to.equal(uri);
        });

        it("Should emit NFTMinted event", async function () {
            const uri = "ipfs://QmTest123";
            await expect(market.mintNFT(user1.address, uri))
                .to.emit(market, "NFTMinted")
                .withArgs(0, user1.address, uri);
        });

        it("Should not allow non-owner to mint", async function () {
            const uri = "ipfs://QmTest123";
            await expect(
                market.connect(user1).mintNFT(user2.address, uri)
            ).to.be.revertedWithCustomError(market, "OwnableUnauthorizedAccount");
        });

        it("Should increment token ID", async function () {
            await market.mintNFT(user1.address, "ipfs://QmTest1");
            await market.mintNFT(user2.address, "ipfs://QmTest2");

            expect(await market.ownerOf(0)).to.equal(user1.address);
            expect(await market.ownerOf(1)).to.equal(user2.address);
        });

        it("Should mint multiple NFTs to same address", async function () {
            await market.mintNFT(user1.address, "ipfs://QmTest1");
            await market.mintNFT(user1.address, "ipfs://QmTest2");

            expect(await market.ownerOf(0)).to.equal(user1.address);
            expect(await market.ownerOf(1)).to.equal(user1.address);
        });
    });

    describe("Listing NFTs", function () {
        beforeEach(async function () {
            await market.mintNFT(user1.address, "ipfs://QmTest123");
        });

        it("Should allow owner to list NFT", async function () {
            const price = ethers.parseEther("100");
            await market.connect(user1).listNFT(0, price);

            const listing = await market.getListing(0);
            expect(listing.price).to.equal(price);
            expect(listing.seller).to.equal(user1.address);
            expect(listing.isActive).to.be.true;
        });

        it("Should emit NFTListed event", async function () {
            const price = ethers.parseEther("100");
            await expect(market.connect(user1).listNFT(0, price))
                .to.emit(market, "NFTListed")
                .withArgs(0, price, user1.address);
        });

        it("Should not allow non-owner to list NFT", async function () {
            const price = ethers.parseEther("100");
            await expect(
                market.connect(user2).listNFT(0, price)
            ).to.be.revertedWith("Not the owner");
        });

        it("Should not allow zero price", async function () {
            await expect(
                market.connect(user1).listNFT(0, 0)
            ).to.be.revertedWith("Price must be > 0");
        });

        it("Should allow updating listing price", async function () {
            const price1 = ethers.parseEther("100");
            const price2 = ethers.parseEther("200");

            await market.connect(user1).listNFT(0, price1);
            await market.connect(user1).listNFT(0, price2);

            const listing = await market.getListing(0);
            expect(listing.price).to.equal(price2);
        });
    });

    describe("Buying NFTs", function () {
        beforeEach(async function () {
            await market.mintNFT(user1.address, "ipfs://QmTest123");
            const price = ethers.parseEther("100");
            await market.connect(user1).listNFT(0, price);
            await token.connect(user2).approve(await market.getAddress(), price);
        });

        it("Should allow user to buy listed NFT", async function () {
            const price = ethers.parseEther("100");

            await market.connect(user2).buyNFT(0);

            expect(await market.ownerOf(0)).to.equal(user2.address);
            expect(await token.balanceOf(user1.address)).to.equal(
                ethers.parseEther("1000") + price
            );
        });

        it("Should emit NFTSold event", async function () {
            const price = ethers.parseEther("100");
            await expect(market.connect(user2).buyNFT(0))
                .to.emit(market, "NFTSold")
                .withArgs(0, user2.address, price);
        });

        it("Should deactivate listing after purchase", async function () {
            await market.connect(user2).buyNFT(0);

            const listing = await market.getListing(0);
            expect(listing.isActive).to.be.false;
        });

        it("Should revert if NFT not for sale", async function () {
            await expect(market.connect(user2).buyNFT(1)).to.be.revertedWith(
                "NFT not for sale"
            );
        });

        it("Should revert if buyer doesn't approve tokens", async function () {
            // Mint expensive NFT
            await market.mintNFT(user1.address, "ipfs://QmTest456");
            const highPrice = ethers.parseEther("100");
            await market.connect(user1).listNFT(1, highPrice);

            // Reset user2's approval to 0 first
            await token.connect(user2).approve(await market.getAddress(), 0);

            await expect(
                market.connect(user2).buyNFT(1)
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientAllowance");
        });

        it("Should revert if buyer doesn't have enough tokens", async function () {
            // Mint expensive NFT
            await market.mintNFT(user1.address, "ipfs://QmTest456");
            const highPrice = ethers.parseEther("10000");
            await market.connect(user1).listNFT(1, highPrice);
            await token.connect(user2).approve(await market.getAddress(), highPrice);

            await expect(
                market.connect(user2).buyNFT(1)
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
        });
    });

    describe("Oracle Updates", function () {
        beforeEach(async function () {
            await market.mintNFT(user1.address, "ipfs://QmTest123");
        });

        it("Should allow oracle to update metadata", async function () {
            const newUri = "ipfs://QmUpdated456";
            await market.connect(oracle).updateNFTMetadata(0, newUri);

            expect(await market.tokenURI(0)).to.equal(newUri);
        });

        it("Should emit NFTUpdated event", async function () {
            const newUri = "ipfs://QmUpdated456";
            await expect(market.connect(oracle).updateNFTMetadata(0, newUri))
                .to.emit(market, "NFTUpdated")
                .withArgs(0, newUri);
        });

        it("Should not allow non-oracle to update metadata", async function () {
            const newUri = "ipfs://QmUpdated456";
            await expect(
                market.connect(user1).updateNFTMetadata(0, newUri)
            ).to.be.revertedWith("Only oracle can call");
        });

        it("Should revert if token doesn't exist", async function () {
            const newUri = "ipfs://QmUpdated456";
            await expect(
                market.connect(oracle).updateNFTMetadata(999, newUri)
            ).to.be.revertedWith("Token doesn't exist");
        });

        it("Should allow multiple metadata updates", async function () {
            const uri1 = "ipfs://QmUpdate1";
            const uri2 = "ipfs://QmUpdate2";
            const uri3 = "ipfs://QmUpdate3";

            await market.connect(oracle).updateNFTMetadata(0, uri1);
            await market.connect(oracle).updateNFTMetadata(0, uri2);
            await market.connect(oracle).updateNFTMetadata(0, uri3);

            expect(await market.tokenURI(0)).to.equal(uri3);
        });
    });

    describe("Oracle Management", function () {
        it("Should allow owner to change oracle", async function () {
            await market.setOracle(user1.address);
            expect(await market.oracle()).to.equal(user1.address);
        });

        it("Should emit OracleUpdated event", async function () {
            await expect(market.setOracle(user1.address))
                .to.emit(market, "OracleUpdated")
                .withArgs(oracle.address, user1.address);
        });

        it("Should not allow non-owner to change oracle", async function () {
            await expect(
                market.connect(user1).setOracle(user2.address)
            ).to.be.revertedWithCustomError(market, "OwnableUnauthorizedAccount");
        });

        it("Should not allow zero address as oracle", async function () {
            await expect(
                market.setOracle(ethers.ZeroAddress)
            ).to.be.revertedWith("Invalid oracle address");
        });

        it("Should allow new oracle to update metadata", async function () {
            await market.mintNFT(user1.address, "ipfs://QmTest123");
            await market.setOracle(user2.address);

            const newUri = "ipfs://QmUpdated456";
            await market.connect(user2).updateNFTMetadata(0, newUri);

            expect(await market.tokenURI(0)).to.equal(newUri);
        });
    });

    describe("Complex Scenarios", function () {
        it("Should handle full marketplace flow", async function () {
            // Mint NFT
            await market.mintNFT(user1.address, "ipfs://QmOriginal");

            // Oracle updates it based on race result
            await market.connect(oracle).updateNFTMetadata(0, "ipfs://QmAfterRace");

            // User lists it
            const price = ethers.parseEther("150");
            await market.connect(user1).listNFT(0, price);

            // Another user buys it
            await token.connect(user2).approve(await market.getAddress(), price);
            await market.connect(user2).buyNFT(0);

            // New owner can list it again
            await market.connect(user2).listNFT(0, ethers.parseEther("200"));

            expect(await market.ownerOf(0)).to.equal(user2.address);
            expect(await market.tokenURI(0)).to.equal("ipfs://QmAfterRace");
        });
    });
});