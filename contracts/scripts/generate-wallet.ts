import { ethers } from "hardhat";

async function main() {
    // Generate a new random wallet
    const wallet = ethers.Wallet.createRandom();

    console.log("\n🔐 New Wallet Generated");
    console.log("========================");
    console.log("Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey.slice(2)); // Remove 0x prefix
    console.log("\n⚠️  KEEP THIS PRIVATE KEY SECRET!");
    console.log("Add it to your .env file:");
    console.log(`PRIVATE_KEY=${wallet.privateKey.slice(2)}`);
    console.log(`ORACLE_PRIVATE_KEY=${wallet.privateKey.slice(2)}`);
    console.log("\n💰 Get test NEON tokens from: https://neonfaucet.org/");
    console.log("Use this address:", wallet.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});