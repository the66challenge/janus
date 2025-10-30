import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class BlockchainService {
    constructor(rpcUrl, privateKey, deploymentPath) {
        this.originalRpcUrl = rpcUrl;
        this.originalPrivateKey = privateKey;
        this.deploymentPath = deploymentPath;
        this.isLocalFallback = false;
    }

    async updateNFTMetadata(tokenId, newMetadataUri) {
        console.log(`📝 Updating NFT #${tokenId} with URI: ${newMetadataUri}`);
        
        const tx = await this.januPolis.updateNFTMetadata(tokenId, newMetadataUri);
        await tx.wait();
        
        console.log(`✅ NFT #${tokenId} updated. Tx: ${tx.hash}`);
        return tx;
    }

    async initialize() {
        console.log('🔍 Initializing Blockchain Service...');
        console.log('   RPC URL:', this.originalRpcUrl);
        
        // Auto-add 0x prefix if missing
        let privateKey = this.originalPrivateKey;
        if (privateKey && !privateKey.startsWith('0x')) {
            privateKey = '0x' + privateKey;
        }

        if (!privateKey || privateKey.length !== 66) {
            throw new Error(`Invalid private key format. Expected 66 chars (0x + 64 hex), got ${privateKey?.length}`);
        }

        // Try to connect with provided RPC
        try {
            this.provider = new ethers.JsonRpcProvider(this.originalRpcUrl);
            this.wallet = new ethers.Wallet(privateKey, this.provider);
            
            // Check balance
            const balance = await this.provider.getBalance(this.wallet.address);
            console.log('   Wallet:', this.wallet.address);
            console.log('   Balance:', ethers.formatEther(balance), 'ETH');
            
            if (balance === 0n) {
                console.log('\n⚠️  Insufficient funds detected!');
                console.log('   Switching to localhost fallback...\n');
                await this.switchToLocalhost();
            } else {
                console.log('✅ Sufficient funds, using provided network\n');
                await this.loadContracts();
            }
            
        } catch (error) {
            console.log('❌ Failed to connect to network:', error.message);
            console.log('   Switching to localhost fallback...\n');
            await this.switchToLocalhost();
        }
    }

    async switchToLocalhost() {
        this.isLocalFallback = true;
        
        // Use Hardhat's first test account (has 10,000 ETH)
        const localhostPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
        
        console.log('🏠 Localhost Fallback Mode');
        console.log('========================');
        console.log('   RPC: http://127.0.0.1:8545');
        console.log('   Using Hardhat test account');
        
        this.provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
        this.wallet = new ethers.Wallet(localhostPrivateKey, this.provider);
        
        const balance = await this.provider.getBalance(this.wallet.address);
        console.log('   Wallet:', this.wallet.address);
        console.log('   Balance:', ethers.formatEther(balance), 'ETH');
        
        // FIX: Path from oracle/src/services/ to contracts/deployments/localhost.json
        // Go up 3 levels: services -> src -> oracle -> contracts
        const localhostDeploymentPath = join(__dirname, '..', '..', '..', 'deployments', 'localhost.json');
        
        try {
            await this.loadContracts(localhostDeploymentPath);
            console.log('✅ Successfully switched to localhost\n');
        } catch (error) {
            console.error('\n❌ Failed to load localhost contracts!');
            console.error('   Error:', error.message);
            console.error('   Deployment path:', localhostDeploymentPath);
            console.error('\n   Make sure you have deployed to localhost:');
            console.error('   1. Terminal 1: cd contracts && npx hardhat node');
            console.error('   2. Terminal 2: cd contracts && npx hardhat run scripts/deploy-single.ts --network localhost\n');
            throw error;
        }
    }

    async loadContracts(customPath = null) {
        // FIX: Default path from oracle/src/services/ to contracts/deployments/
        const deploymentFilePath = customPath || join(__dirname, '..', '..', '..', this.deploymentPath);
        
        console.log('📦 Loading contracts from:', deploymentFilePath);
        
        // Load deployed contract addresses
        const deployment = JSON.parse(readFileSync(deploymentFilePath, 'utf8'));
        this.contracts = deployment.contracts;
        
        console.log('   Network:', deployment.network);
        console.log('   Chain ID:', deployment.chainId);
        
        // Initialize contract instances
        this.januPolis = new ethers.Contract(
            this.contracts.januPolis.address,
            this.getJanuPolisABI(),
            this.wallet
        );
        
        this.janusAugur = new ethers.Contract(
            this.contracts.janusAugur.address,
            this.getJanusAugurABI(),
            this.wallet
        );
        
        console.log('   JanuPolis:', this.contracts.januPolis.address);
        console.log('   JanusAugur:', this.contracts.janusAugur.address);
    }

    /**
     * Mint new NFT for a racer
     */
    async mintNFT(toAddress, metadataUri) {
        console.log(`🎨 Minting NFT for ${toAddress} with URI: ${metadataUri}`);
        
        try {
            // Send transaction and wait for it to be mined
            const tx = await this.januPolis.mintNFT(toAddress, metadataUri);
            console.log(`   ⏳ Waiting for transaction to be mined...`);
            const receipt = await tx.wait();
            
            // Extract tokenId from the NFTMinted event
            const mintEvent = receipt.logs.find(log => {
                try {
                    const parsed = this.januPolis.interface.parseLog(log);
                    return parsed.name === 'NFTMinted';
                } catch {
                    return false;
                }
            });
            
            const tokenId = mintEvent ? this.januPolis.interface.parseLog(mintEvent).args.tokenId : null;
            
            console.log(`✅ NFT minted! Token ID: ${tokenId}, Tx: ${tx.hash}`);
            return { tokenId, tx };
        } catch (error) {
            // If nonce error, wait a bit and retry once
            if (error.code === 'NONCE_EXPIRED' || error.message.includes('nonce')) {
                console.log(`   ⚠️  Nonce collision detected, retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const tx = await this.januPolis.mintNFT(toAddress, metadataUri);
                const receipt = await tx.wait();
                
                const mintEvent = receipt.logs.find(log => {
                    try {
                        const parsed = this.januPolis.interface.parseLog(log);
                        return parsed.name === 'NFTMinted';
                    } catch {
                        return false;
                    }
                });
                
                const tokenId = mintEvent ? this.januPolis.interface.parseLog(mintEvent).args.tokenId : null;
                console.log(`✅ NFT minted! Token ID: ${tokenId}, Tx: ${tx.hash}`);
                return { tokenId, tx };
            }
            throw error;
        }
    }

    /**
     * Update NFT metadata after race event
     */
    async updateNFTMetadata(tokenId, newMetadataUri) {
        console.log(`📝 Updating NFT #${tokenId} with URI: ${newMetadataUri}`);
        
        try {
            const tx = await this.januPolis.updateNFTMetadata(tokenId, newMetadataUri);
            console.log(`   ⏳ Waiting for transaction to be mined...`);
            await tx.wait();
            
            console.log(`✅ NFT #${tokenId} updated. Tx: ${tx.hash}`);
            return tx;
        } catch (error) {
            // If nonce error, wait a bit and retry once
            if (error.code === 'NONCE_EXPIRED' || error.message.includes('nonce')) {
                console.log(`   ⚠️  Nonce collision detected, retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const tx = await this.januPolis.updateNFTMetadata(tokenId, newMetadataUri);
                await tx.wait();
                console.log(`✅ NFT #${tokenId} updated. Tx: ${tx.hash}`);
                return tx;
            }
            throw error;
        }
    }

    /**
     * Check if NFT exists
     */
    async nftExists(tokenId) {
        try {
            await this.januPolis.ownerOf(tokenId);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get NFT owner
     */
    async getNFTOwner(tokenId) {
        try {
            return await this.januPolis.ownerOf(tokenId);
        } catch {
            return null;
        }
    }

    /**
     * Resolve prediction market
     */
    async resolveMarket(marketId, outcome) {
        console.log(`🎲 Resolving market #${marketId} with outcome: ${outcome}`);
        
        const tx = await this.janusAugur.resolveMarket(marketId, outcome);
        await tx.wait();
        
        console.log(`✅ Market #${marketId} resolved. Tx: ${tx.hash}`);
        return tx;
    }

    /**
     * Get all unresolved markets
     */
    async getUnresolvedMarkets() {
        const nextMarketId = await this.janusAugur.nextMarketId();
        const unresolvedMarkets = [];
        
        for (let i = 0; i < nextMarketId; i++) {
            const market = await this.janusAugur.markets(i);
            if (!market.resolved) {
                unresolvedMarkets.push({ id: i, ...market });
            }
        }
        
        return unresolvedMarkets;
    }

    /**
     * Resolve multiple markets in batch
     */
    async resolveMarkets(resolutions) {
        const results = [];
        for (const { marketId, outcome } of resolutions) {
            try {
                const tx = await this.resolveMarket(marketId, outcome);
                results.push({ marketId, success: true, tx: tx.hash });
            } catch (error) {
                console.error(`❌ Failed to resolve market ${marketId}:`, error.message);
                results.push({ marketId, success: false, error: error.message });
            }
        }
        return results;
    }

    getJanuPolisABI() {
        return [
            "function mintNFT(address to, string memory uri) external returns (uint256)",
            "function updateNFTMetadata(uint256 tokenId, string memory newUri) external",
            "function ownerOf(uint256 tokenId) view returns (address)",
            "event NFTMinted(uint256 indexed tokenId, address indexed owner, string uri)"
        ];
    }

    getJanusAugurABI() {
        return [
            "function resolveMarket(uint256 marketId, bool outcome) external",
            "function markets(uint256) view returns (string description, uint256 yesPool, uint256 noPool, bool resolved, bool outcome, uint256 createdAt)",
            "function nextMarketId() view returns (uint256)",  // View function, not just a field
            "function createMarket(string calldata description) external returns (uint256)",
            "function placePrediction(uint256 marketId, bool prediction) external"
        ];
    }
}