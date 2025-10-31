import { ethers } from "hardhat";

async function main() {
    console.log("🔍 Testing Contract Deployments");
    console.log("================================");

    const [deployer] = await ethers.getSigners();
    console.log("Using account:", deployer.address);
    
    // Contract addresses from localhost deployment
    const mclarenTokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
    const janusSwapAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

    console.log("McLaren Token Address:", mclarenTokenAddress);
    console.log("JanusSwap Address:", janusSwapAddress);

    try {
        // Test if contracts exist by checking code at address
        const tokenCode = await ethers.provider.getCode(mclarenTokenAddress);
        const swapCode = await ethers.provider.getCode(janusSwapAddress);
        
        console.log("Token contract code length:", tokenCode.length);
        console.log("Swap contract code length:", swapCode.length);
        
        if (tokenCode === "0x" || tokenCode.length <= 2) {
            console.log("❌ McLaren Token contract not found!");
            console.log("📝 Need to deploy contracts first");
            return;
        }
        
        if (swapCode === "0x" || swapCode.length <= 2) {
            console.log("❌ JanusSwap contract not found!");
            console.log("📝 Need to deploy contracts first");
            return;
        }
        
        console.log("✅ Both contracts found!");
        
        // Try to get contract instances
        const McLarenToken = await ethers.getContractAt("F1TeamToken", mclarenTokenAddress);
        const JanusSwap = await ethers.getContractAt("JanusSwap", janusSwapAddress);
        
        // Test simple calls
        const tokenName = await McLarenToken.name();
        const tokenSymbol = await McLarenToken.symbol();
        const deployerBalance = await McLarenToken.balanceOf(deployer.address);
        
        console.log("Token Name:", tokenName);
        console.log("Token Symbol:", tokenSymbol);
        console.log("Deployer Token Balance:", ethers.formatEther(deployerBalance), "MCLAREN");
        
        // Test swap contract
        const ethReserve = await JanusSwap.reserveETH();
        const tokenReserve = await JanusSwap.reserveToken();
        
        console.log("ETH Reserve:", ethers.formatEther(ethReserve), "ETH");
        console.log("Token Reserve:", ethers.formatEther(tokenReserve), "MCLAREN");
        
        if (ethReserve === 0n || tokenReserve === 0n) {
            console.log("⚠️ Pool has no liquidity - need to add liquidity!");
        } else {
            console.log("✅ Pool has liquidity!");
        }
        
    } catch (error) {
        console.error("❌ Error testing contracts:", error.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});