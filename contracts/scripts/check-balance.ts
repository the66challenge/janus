import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("\n🔐 Wallet Information");
    console.log("========================");
    console.log("Address:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Balance:", ethers.formatEther(balance), "NEON");

    if (balance === 0n) {
        console.log("\n⚠️  No balance detected!");
        console.log("Get test tokens from: https://neonfaucet.org/");
        console.log("Use address:", deployer.address);
    } else {
        console.log("\n✅ Ready to deploy!");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});