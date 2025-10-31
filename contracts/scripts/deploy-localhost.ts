import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("\n🚀 Starting Janus Localhost Deployment");
    console.log("=====================================");
    console.log("Deploying with account:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

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

    // 2. Deploy JanusSwap
    console.log("\n📦 2/4 Deploying JanusSwap...");
    const JanusSwap = await ethers.getContractFactory("JanusSwap");
    const janusSwap = await JanusSwap.deploy(mclarenAddress);
    await janusSwap.waitForDeployment();
    const swapAddress = await janusSwap.getAddress();
    console.log("✅ JanusSwap deployed to:", swapAddress);

    // 3. Deploy JanuPolis
    console.log("\n📦 3/4 Deploying JanuPolis...");
    const JanuPolis = await ethers.getContractFactory("JanuPolis");
    const januPolis = await JanuPolis.deploy(mclarenAddress, deployer.address);
    await januPolis.waitForDeployment();
    const polisAddress = await januPolis.getAddress();
    console.log("✅ JanuPolis deployed to:", polisAddress);

    // 4. Deploy JanusAugur
    console.log("\n📦 4/4 Deploying JanusAugur...");
    const JanusAugur = await ethers.getContractFactory("JanusAugur");
    const janusAugur = await JanusAugur.deploy(mclarenAddress, deployer.address);
    await janusAugur.waitForDeployment();
    const augurAddress = await janusAugur.getAddress();
    console.log("✅ JanusAugur deployed to:", augurAddress);

    console.log("\n============================================================");
    console.log("📋 LOCALHOST DEPLOYMENT SUMMARY");
    console.log("============================================================");
    console.log("Network:          Localhost Hardhat");
    console.log("Chain ID:         1337");
    console.log("Deployer:         " + deployer.address);
    console.log("Oracle:           " + deployer.address);
    console.log("------------------------------------------------------------");
    console.log("McLaren Token:    " + mclarenAddress);
    console.log("JanusSwap:        " + swapAddress);
    console.log("JanuPolis:        " + polisAddress);
    console.log("JanusAugur:       " + augurAddress);
    console.log("============================================================");

    // Save deployment info
    const deploymentInfo = {
        network: "localhost",
        chainId: 1337,
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
                paymentToken: mclarenAddress,
                oracle: deployer.address
            }
        },
        frontend: {
            env: {
                VITE_JANUS_SWAP_ADDRESS: swapAddress,
                VITE_JANUS_POLIS_ADDRESS: polisAddress,
                VITE_JANUS_AUGUR_ADDRESS: augurAddress,
                VITE_MCLAREN_TOKEN_ADDRESS: mclarenAddress
            }
        }
    };

    // Ensure deployments directory exists
    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    // Save timestamped deployment
    const filename = `localhost-${Date.now()}.json`;
    const deploymentPath = path.join(deploymentsDir, filename);
    fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
    console.log(`✅ Deployment info saved to: ${deploymentPath}`);

    // Update latest deployment
    const latestPath = path.join(deploymentsDir, "latest.json");
    fs.writeFileSync(latestPath, JSON.stringify(deploymentInfo, null, 2));
    console.log("✅ Latest deployment info saved to:", latestPath);

    console.log("\n🎉 Localhost Deployment complete!");
    console.log("Ready to add liquidity and test swaps! 🏎️");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });