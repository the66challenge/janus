import { ethers } from "hardhat";

async function main() {
    console.log("🏊 Adding Initial Liquidity to JanusSwap");
    console.log("=====================================");

    const [deployer] = await ethers.getSigners();
    console.log("Using account:", deployer.address);
    console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");

    // Get contract addresses from deployment file
    const fs = require('fs');
    const path = require('path');
    const deploymentsPath = path.join(__dirname, '../deployments/latest.json');
    
    if (!fs.existsSync(deploymentsPath)) {
        console.log("❌ No deployment file found. Run deployment first!");
        return;
    }

    const deploymentData = JSON.parse(fs.readFileSync(deploymentsPath, 'utf8'));
    
    const mclarenTokenAddress = deploymentData.contracts.mclarenToken.address;
    const janusSwapAddress = deploymentData.contracts.janusSwap.address;

    console.log("McLaren Token:", mclarenTokenAddress);
    console.log("JanusSwap:", janusSwapAddress);

    // Get contract instances
    const McLarenToken = await ethers.getContractAt("F1TeamToken", mclarenTokenAddress);
    const JanusSwap = await ethers.getContractAt("JanusSwap", janusSwapAddress);

    // Check initial balances
    const mclarenBalance = await McLarenToken.balanceOf(deployer.address);
    console.log("McLaren Token balance:", ethers.formatEther(mclarenBalance), "MCLAREN");

    // Add liquidity: 10 ETH + 10,000 MCLAREN tokens
    const ethAmount = ethers.parseEther("10"); // 10 ETH
    const tokenAmount = ethers.parseEther("10000"); // 10,000 MCLAREN

    console.log("\n📝 Adding Liquidity:");
    console.log("ETH Amount:", ethers.formatEther(ethAmount), "ETH");
    console.log("Token Amount:", ethers.formatEther(tokenAmount), "MCLAREN");

    // First, approve the swap contract to spend tokens
    console.log("\n1️⃣ Approving token spending...");
    const approveTx = await McLarenToken.approve(janusSwapAddress, tokenAmount);
    await approveTx.wait();
    console.log("✅ Token approval confirmed");

    // Then add liquidity
    console.log("\n2️⃣ Adding liquidity...");
    const liquidityTx = await JanusSwap.addLiquidity(tokenAmount, { value: ethAmount });
    await liquidityTx.wait();
    console.log("✅ Liquidity added successfully!");

    // Check final state
    console.log("\n📊 Final Pool State:");
    const ethReserve = await JanusSwap.reserveETH();
    const tokenReserve = await JanusSwap.reserveToken();
    const price = await JanusSwap.getPrice();

    console.log("ETH Reserve:", ethers.formatEther(ethReserve), "ETH");
    console.log("Token Reserve:", ethers.formatEther(tokenReserve), "MCLAREN");
    console.log("Current Price:", ethers.formatEther(price), "MCLAREN per ETH");
    
    console.log("\n🎉 Liquidity setup complete! You can now test swapping in the frontend.");
    console.log("💡 Try swapping small amounts like 0.1 ETH first.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});