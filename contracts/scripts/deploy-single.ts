import { ethers, network } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("\n🚀 Starting Single Contract Deployment");
    console.log("========================");
    console.log("Network:", network.name);
    console.log("Chain ID:", network.config.chainId);
    console.log("Deploying with account:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

    // Check which contracts are already deployed
    const deploymentsDir = path.join(__dirname, "..", "deployments");
    const networkFile = `${network.name}.json`;
    const networkPath = path.join(deploymentsDir, networkFile);
    const latestPath = path.join(deploymentsDir, "latest.json");

    let existingDeployment: any = {};
    if (fs.existsSync(networkPath)) {
        existingDeployment = JSON.parse(fs.readFileSync(networkPath, "utf8"));
        console.log("\n📋 Found existing deployments for", network.name);
    }

    let mclarenAddress = existingDeployment?.contracts?.mclarenToken?.address;
    let swapAddress = existingDeployment?.contracts?.janusSwap?.address;
    let polisAddress = existingDeployment?.contracts?.januPolis?.address;
    let augurAddress = existingDeployment?.contracts?.janusAugur?.address;

    // Deploy McLaren Token if not exists
    if (!mclarenAddress) {
        console.log("\n📦 Deploying McLaren Token...");
        const F1TeamToken = await ethers.getContractFactory("F1TeamToken");
        const mclarenToken = await F1TeamToken.deploy(
            "McLaren Racing Token",
            "MCLAREN",
            1000000
        );
        await mclarenToken.waitForDeployment();
        mclarenAddress = await mclarenToken.getAddress();
        console.log("✅ McLaren Token deployed to:", mclarenAddress);
    } else {
        console.log("\n✓ McLaren Token already deployed:", mclarenAddress);
    }

    // Deploy JanusSwap if not exists
    if (!swapAddress) {
        console.log("\n📦 Deploying JanusSwap...");
        const JanusSwap = await ethers.getContractFactory("JanusSwap");
        const janusSwap = await JanusSwap.deploy(mclarenAddress);
        await janusSwap.waitForDeployment();
        swapAddress = await janusSwap.getAddress();
        console.log("✅ JanusSwap deployed to:", swapAddress);
    } else {
        console.log("\n✓ JanusSwap already deployed:", swapAddress);
    }

    // Deploy JanuPolis if not exists
    if (!polisAddress) {
        console.log("\n📦 Deploying JanuPolis...");
        const JanuPolis = await ethers.getContractFactory("JanuPolis");
        const januPolis = await JanuPolis.deploy(mclarenAddress, deployer.address);
        await januPolis.waitForDeployment();
        polisAddress = await januPolis.getAddress();
        console.log("✅ JanuPolis deployed to:", polisAddress);
    } else {
        console.log("\n✓ JanuPolis already deployed:", polisAddress);
    }

    // Deploy JanusAugur if not exists
    if (!augurAddress) {
        console.log("\n📦 Deploying JanusAugur...");
        const JanusAugur = await ethers.getContractFactory("JanusAugur");
        const janusAugur = await JanusAugur.deploy(mclarenAddress, deployer.address);
        await janusAugur.waitForDeployment();
        augurAddress = await janusAugur.getAddress();
        console.log("✅ JanusAugur deployed to:", augurAddress);
    } else {
        console.log("\n✓ JanusAugur already deployed:", augurAddress);
    }

    // Get network info
    const chainId = network.config.chainId || 31337;
    const networkName = network.name;

    // Save deployment info
    const deploymentInfo = {
        network: networkName,
        chainId: chainId,
        deployer: deployer.address,
        oracle: deployer.address,
        timestamp: new Date().toISOString(),
        contracts: {
            mclarenToken: {
                address: mclarenAddress,
                name: "McLaren Racing Token",
                symbol: "MCLAREN",
                initialSupply: "1000000"
            },
            janusSwap: {
                address: swapAddress,
                paymentToken: mclarenAddress
            },
            januPolis: {
                address: polisAddress,
                paymentToken: mclarenAddress,
                oracle: deployer.address
            },
            janusAugur: {
                address: augurAddress,
                token: mclarenAddress,
                oracle: deployer.address
            }
        }
    };

    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    // Save as network-specific file
    fs.writeFileSync(networkPath, JSON.stringify(deploymentInfo, null, 2));
    console.log("\n✅ Deployment info saved to:", networkPath);

    // Also save as latest.json
    fs.writeFileSync(latestPath, JSON.stringify(deploymentInfo, null, 2));
    console.log("✅ Latest deployment info saved to:", latestPath);

    console.log("\n🎉 All contracts deployed!");
    console.log("\n📋 Deployment Summary:");
    console.log("========================");
    console.log("Network:", networkName);
    console.log("Chain ID:", chainId);
    console.log("McLaren Token:", mclarenAddress);
    console.log("JanusSwap:", swapAddress);
    console.log("JanuPolis:", polisAddress);
    console.log("JanusAugur:", augurAddress);
    console.log("========================");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });