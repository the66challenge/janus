import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("\n🔐 Your Wallet Address:");
    console.log("========================");
    console.log(deployer.address);
    console.log("\n💡 Import this wallet to MetaMask:");
    console.log("1. Click account icon → Import Account");
    console.log("2. Select 'Private Key'");
    console.log("3. Paste your private key from .env");
    console.log("\n💰 Get test tokens:");
    console.log("https://neonfaucet.org/");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});