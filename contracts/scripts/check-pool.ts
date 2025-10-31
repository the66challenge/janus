import { ethers } from "hardhat";

async function main() {
    console.log("🔍 Checking JanusSwap Pool Status");
    console.log("=================================");

    // Get contract addresses from latest deployment
    const fs = require('fs');
    const path = require('path');
    const deploymentsPath = path.join(__dirname, '../deployments/latest.json');
    
    if (!fs.existsSync(deploymentsPath)) {
        console.error("❌ Deployment file not found! Please deploy contracts first.");
        return;
    }
    
    const deployments = JSON.parse(fs.readFileSync(deploymentsPath, 'utf8'));
    
    const janusSwapAddress = deployments.contracts.janusSwap.address;
    const mclarenTokenAddress = deployments.contracts.mclarenToken.address;
    
    console.log("JanusSwap Address:", janusSwapAddress);
    console.log("McLaren Token Address:", mclarenTokenAddress);
    
    // Get contracts
    const JanusSwap = await ethers.getContractAt("JanusSwap", janusSwapAddress);
    const McLarenToken = await ethers.getContractAt("F1TeamToken", mclarenTokenAddress);
    
    try {
        // Check pool reserves
        const ethReserve = await JanusSwap.reserveETH();
        const tokenReserve = await JanusSwap.reserveToken();
        
        console.log("\n📊 Pool Reserves:");
        console.log("ETH Reserve:", ethers.formatEther(ethReserve), "ETH");
        console.log("McLaren Token Reserve:", ethers.formatUnits(tokenReserve, 18), "MCLAREN");
        
        if (ethReserve > 0 && tokenReserve > 0) {
            console.log("✅ Pool has liquidity!");
            const rate = Number(ethers.formatUnits(tokenReserve, 18)) / Number(ethers.formatEther(ethReserve));
            console.log("💱 Current Rate:", rate.toFixed(2), "MCLAREN per ETH");
        } else {
            console.log("❌ Pool is empty!");
        }
        
    } catch (error) {
        console.error("❌ Error checking reserves:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });