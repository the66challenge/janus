import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("\n🚀 Starting Janus Deployment");
    console.log("========================");
    console.log("Deploying with account:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "NEON");

    if (balance === 0n) {
        console.error("\n❌ Insufficient balance! Get tokens from https://neonfaucet.org/");
        process.exit(1);
    }

    // 1. Deploy McLaren F1 Team Token
    console.log("\n📦 1/4 Deploying McLaren Token...");
    const F1TeamToken = await ethers.getContractFactory("F1TeamToken");
    const mclarenToken = await F1TeamToken.deploy(
        "McLaren Racing Token",
        "MCLAREN",
        1000000
    );
    await mclarenToken.waitForDeployment();
    const mclarenAddress = await mclarenToken.getAddress();
    console.log("✅ McLaren Token deployed to:", mclarenAddress);

    // 2. Deploy JanusSwap (AMM)
    console.log("\n📦 2/4 Deploying JanusSwap...");
    const JanusSwap = await ethers.getContractFactory("JanusSwap");
    const janusSwap = await JanusSwap.deploy(mclarenAddress);
    await janusSwap.waitForDeployment();
    const swapAddress = await janusSwap.getAddress();
    console.log("✅ JanusSwap deployed to:", swapAddress);

    // 3. Deploy JanuPolis (NFT Marketplace)
    console.log("\n📦 3/4 Deploying JanuPolis...");
    const JanuPolis = await ethers.getContractFactory("JanuPolis");
    const januPolis = await JanuPolis.deploy(mclarenAddress, deployer.address);
    await januPolis.waitForDeployment();
    const polisAddress = await januPolis.getAddress();
    console.log("✅ JanuPolis deployed to:", polisAddress);

    // 4. Deploy JanusAugur (Prediction Market)
    console.log("\n📦 4/4 Deploying JanusAugur...");
    const JanusAugur = await ethers.getContractFactory("JanusAugur");
    const janusAugur = await JanusAugur.deploy(mclarenAddress, deployer.address);
    await janusAugur.waitForDeployment();
    const augurAddress = await janusAugur.getAddress();
    console.log("✅ JanusAugur deployed to:", augurAddress);

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📋 DEPLOYMENT SUMMARY");
    console.log("=".repeat(60));
    console.log("Network:          Neon DevNet");
    console.log("Chain ID:         245022926");
    console.log("Deployer:        ", deployer.address);
    console.log("Oracle:          ", deployer.address);
    console.log("-".repeat(60));
    console.log("McLaren Token:   ", mclarenAddress);
    console.log("JanusSwap:       ", swapAddress);
    console.log("JanuPolis:       ", polisAddress);
    console.log("JanusAugur:      ", augurAddress);
    console.log("=".repeat(60));

    // Save deployment info to JSON file
    const deploymentInfo = {
        network: "neondevnet",
        chainId: 245022926,
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
        },
        blockExplorers: {
            neonscan: "https://devnet.neonscan.org"
        }
    };

    // Save to deployments directory
    const deploymentsDir = path.join(__dirname, "..", "deployments");
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const filename = `neondevnet-${Date.now()}.json`;
    const filepath = path.join(deploymentsDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));

    console.log("\n✅ Deployment info saved to:", filepath);

    // Also save as latest.json for easy access
    const latestPath = path.join(deploymentsDir, "latest.json");
    fs.writeFileSync(latestPath, JSON.stringify(deploymentInfo, null, 2));
    console.log("✅ Latest deployment info saved to:", latestPath);

    // Verification commands
    console.log("\n📝 Verify contracts with these commands:");
    console.log("-".repeat(60));
    console.log(`npx hardhat verify --network neondevnet ${mclarenAddress} "McLaren Racing Token" "MCLAREN" 1000000`);
    console.log(`npx hardhat verify --network neondevnet ${swapAddress} ${mclarenAddress}`);
    console.log(`npx hardhat verify --network neondevnet ${polisAddress} ${mclarenAddress} ${deployer.address}`);
    console.log(`npx hardhat verify --network neondevnet ${augurAddress} ${mclarenAddress} ${deployer.address}`);
    console.log("=".repeat(60));

    console.log("\n🎉 Deployment complete!");
    console.log("View on NeonScan: https://devnet.neonscan.org/address/" + mclarenAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });