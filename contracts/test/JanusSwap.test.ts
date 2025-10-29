import { expect } from "chai";
import { ethers } from "hardhat";
import { JanusSwap, F1TeamToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("JanusSwap", function () {
    let swap: JanusSwap;
    let token: F1TeamToken;
    let owner: SignerWithAddress;
    let user: SignerWithAddress;
    let user2: SignerWithAddress;

    beforeEach(async function () {
        [owner, user, user2] = await ethers.getSigners();

        // Deploy token
        const F1TeamToken = await ethers.getContractFactory("F1TeamToken");
        token = await F1TeamToken.deploy("McLaren Token", "MCLAREN", 1000000);
        await token.waitForDeployment();

        // Deploy swap
        const JanusSwap = await ethers.getContractFactory("JanusSwap");
        swap = await JanusSwap.deploy(await token.getAddress());
        await swap.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the correct token address", async function () {
            expect(await swap.token()).to.equal(await token.getAddress());
        });

        it("Should start with zero reserves", async function () {
            expect(await swap.reserveETH()).to.equal(0);
            expect(await swap.reserveToken()).to.equal(0);
        });

        it("Should revert deployment with zero address", async function () {
            const JanusSwap = await ethers.getContractFactory("JanusSwap");
            await expect(
                JanusSwap.deploy(ethers.ZeroAddress)
            ).to.be.revertedWith("Invalid token address");
        });
    });

    describe("Add Liquidity", function () {
        it("Should add liquidity correctly", async function () {
            const ethAmount = ethers.parseEther("10");
            const tokenAmount = ethers.parseEther("1000");

            await token.approve(await swap.getAddress(), tokenAmount);
            await swap.addLiquidity(tokenAmount, { value: ethAmount });

            expect(await swap.reserveETH()).to.equal(ethAmount);
            expect(await swap.reserveToken()).to.equal(tokenAmount);
        });

        it("Should emit LiquidityAdded event", async function () {
            const ethAmount = ethers.parseEther("10");
            const tokenAmount = ethers.parseEther("1000");

            await token.approve(await swap.getAddress(), tokenAmount);

            await expect(swap.addLiquidity(tokenAmount, { value: ethAmount }))
                .to.emit(swap, "LiquidityAdded")
                .withArgs(owner.address, ethAmount, tokenAmount);
        });

        it("Should transfer tokens from user to contract", async function () {
            const ethAmount = ethers.parseEther("10");
            const tokenAmount = ethers.parseEther("1000");
            const initialBalance = await token.balanceOf(owner.address);

            await token.approve(await swap.getAddress(), tokenAmount);
            await swap.addLiquidity(tokenAmount, { value: ethAmount });

            expect(await token.balanceOf(owner.address)).to.equal(
                initialBalance - tokenAmount
            );
            expect(await token.balanceOf(await swap.getAddress())).to.equal(tokenAmount);
        });

        it("Should revert if no ETH sent", async function () {
            const tokenAmount = ethers.parseEther("1000");
            await token.approve(await swap.getAddress(), tokenAmount);

            await expect(
                swap.addLiquidity(tokenAmount, { value: 0 })
            ).to.be.revertedWith("Must send ETH");
        });

        it("Should revert if no tokens sent", async function () {
            const ethAmount = ethers.parseEther("10");

            await expect(
                swap.addLiquidity(0, { value: ethAmount })
            ).to.be.revertedWith("Must send tokens");
        });

        it("Should allow multiple liquidity additions", async function () {
            const ethAmount1 = ethers.parseEther("10");
            const tokenAmount1 = ethers.parseEther("1000");
            const ethAmount2 = ethers.parseEther("5");
            const tokenAmount2 = ethers.parseEther("500");

            await token.approve(await swap.getAddress(), tokenAmount1 + tokenAmount2);

            await swap.addLiquidity(tokenAmount1, { value: ethAmount1 });
            await swap.addLiquidity(tokenAmount2, { value: ethAmount2 });

            expect(await swap.reserveETH()).to.equal(ethAmount1 + ethAmount2);
            expect(await swap.reserveToken()).to.equal(tokenAmount1 + tokenAmount2);
        });
    });

    describe("Swap ETH for Tokens", function () {
        beforeEach(async function () {
            // Add initial liquidity
            const ethAmount = ethers.parseEther("10");
            const tokenAmount = ethers.parseEther("10000");

            await token.approve(await swap.getAddress(), tokenAmount);
            await swap.addLiquidity(tokenAmount, { value: ethAmount });
        });

        it("Should swap ETH for tokens correctly", async function () {
            const swapAmount = ethers.parseEther("1");
            const expectedTokens = await swap.getAmountOut(
                swapAmount,
                await swap.reserveETH(),
                await swap.reserveToken()
            );

            const initialBalance = await token.balanceOf(user.address);

            await swap.connect(user).swapExactETHForTokens(0, { value: swapAmount });

            const finalBalance = await token.balanceOf(user.address);
            expect(finalBalance - initialBalance).to.equal(expectedTokens);
        });

        it("Should emit Swap event", async function () {
            const swapAmount = ethers.parseEther("1");
            const expectedTokens = await swap.getAmountOut(
                swapAmount,
                await swap.reserveETH(),
                await swap.reserveToken()
            );

            await expect(
                swap.connect(user).swapExactETHForTokens(0, { value: swapAmount })
            ).to.emit(swap, "Swap")
                .withArgs(user.address, swapAmount, expectedTokens);
        });

        it("Should revert if slippage is too high", async function () {
            const swapAmount = ethers.parseEther("1");
            const expectedTokens = await swap.getAmountOut(
                swapAmount,
                await swap.reserveETH(),
                await swap.reserveToken()
            );

            await expect(
                swap.connect(user).swapExactETHForTokens(expectedTokens + BigInt(1), {
                    value: swapAmount,
                })
            ).to.be.revertedWith("Slippage too high");
        });

        it("Should update reserves after swap", async function () {
            const swapAmount = ethers.parseEther("1");
            const initialETHReserve = await swap.reserveETH();
            const initialTokenReserve = await swap.reserveToken();

            const expectedTokens = await swap.getAmountOut(
                swapAmount,
                initialETHReserve,
                initialTokenReserve
            );

            await swap.connect(user).swapExactETHForTokens(0, { value: swapAmount });

            expect(await swap.reserveETH()).to.equal(initialETHReserve + swapAmount);
            expect(await swap.reserveToken()).to.equal(initialTokenReserve - expectedTokens);
        });

        it("Should revert if no ETH sent", async function () {
            await expect(
                swap.connect(user).swapExactETHForTokens(0, { value: 0 })
            ).to.be.revertedWith("Must send ETH");
        });

        it("Should handle multiple swaps", async function () {
            const swapAmount1 = ethers.parseEther("0.5");
            const swapAmount2 = ethers.parseEther("0.3");

            await swap.connect(user).swapExactETHForTokens(0, { value: swapAmount1 });
            await swap.connect(user2).swapExactETHForTokens(0, { value: swapAmount2 });

            expect(await swap.reserveETH()).to.be.greaterThan(ethers.parseEther("10"));
        });

        it("Should revert if insufficient liquidity", async function () {
            // The contract starts with 10 ETH and 10,000 tokens
            // Try to get more tokens than available in the pool
            const swapAmount = ethers.parseEther("1");

            // Calculate how much tokens we'd get
            const tokensOut = await swap.getAmountOut(
                swapAmount,
                await swap.reserveETH(),
                await swap.reserveToken()
            );

            // Now try to set minAmountOut higher than what's available in the pool
            const totalTokensInPool = await swap.reserveToken();

            await expect(
                swap.connect(user).swapExactETHForTokens(totalTokensInPool + BigInt(1), {
                    value: swapAmount
                })
            ).to.be.revertedWith("Slippage too high");
        });
    });

    describe("Price Calculation", function () {
        it("Should return 0 price when no liquidity", async function () {
            expect(await swap.getPrice()).to.equal(0);
        });

        it("Should calculate correct price", async function () {
            const ethAmount = ethers.parseEther("10");
            const tokenAmount = ethers.parseEther("10000");

            await token.approve(await swap.getAddress(), tokenAmount);
            await swap.addLiquidity(tokenAmount, { value: ethAmount });

            const price = await swap.getPrice();
            // Price should be 1000 tokens per ETH
            expect(price).to.equal(ethers.parseEther("1000"));
        });

        it("Should update price after swaps", async function () {
            const ethAmount = ethers.parseEther("10");
            const tokenAmount = ethers.parseEther("10000");

            await token.approve(await swap.getAddress(), tokenAmount);
            await swap.addLiquidity(tokenAmount, { value: ethAmount });

            const initialPrice = await swap.getPrice();

            // Perform swap
            const swapAmount = ethers.parseEther("1");
            await swap.connect(user).swapExactETHForTokens(0, { value: swapAmount });

            const newPrice = await swap.getPrice();

            // Price should change after swap (less tokens per ETH)
            expect(newPrice).to.be.lessThan(initialPrice);
        });
    });

    describe("getAmountOut", function () {
        it("Should calculate output amount correctly", async function () {
            const amountIn = ethers.parseEther("1");
            const reserveIn = ethers.parseEther("10");
            const reserveOut = ethers.parseEther("10000");

            const amountOut = await swap.getAmountOut(amountIn, reserveIn, reserveOut);

            // With 0.3% fee: (1 * 0.997 * 10000) / (10 + 1 * 0.997) ≈ 906.61
            expect(amountOut).to.be.closeTo(
                ethers.parseEther("906.61"),
                ethers.parseEther("1")
            );
        });

        it("Should revert with zero input amount", async function () {
            await expect(
                swap.getAmountOut(0, ethers.parseEther("10"), ethers.parseEther("10000"))
            ).to.be.revertedWith("Invalid input amount");
        });

        it("Should revert with zero reserves", async function () {
            await expect(
                swap.getAmountOut(ethers.parseEther("1"), 0, ethers.parseEther("10000"))
            ).to.be.revertedWith("Invalid reserves");

            await expect(
                swap.getAmountOut(ethers.parseEther("1"), ethers.parseEther("10"), 0)
            ).to.be.revertedWith("Invalid reserves");
        });
    });
});