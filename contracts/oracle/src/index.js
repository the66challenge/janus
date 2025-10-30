import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { F1DataService } from './services/f1DataService.js';
import { BlockchainService } from './services/blockchainService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '..', '.env') });

const POLL_INTERVAL = 30000; // 30 seconds

// Track minted NFTs per racer (driver number -> token ID)
const MINTED_NFTS = new Map();

class JanusEyeOracle {
    constructor() {
        this.f1Data = new F1DataService();
        this.blockchain = null; // Will be initialized async
        this.lastProcessedSession = null;
    }

    async initialize() {
        console.log('👁️  Janus Eye Oracle Starting...\n');
        
        // Initialize blockchain service with auto-fallback
        this.blockchain = new BlockchainService(
            process.env.NEON_RPC_URL || 'https://devnet.neonevm.org',
            process.env.ORACLE_PRIVATE_KEY,
            'deployments/latest.json'
        );
        
        await this.blockchain.initialize();
    }

    async start() {
        await this.initialize();
        
        console.log('🔄 Starting oracle polling...\n');
        
        // Initial check
        await this.checkRaceResults();
        
        // Poll every 30 seconds
        setInterval(() => this.checkRaceResults(), POLL_INTERVAL);
    }

    async checkRaceResults() {
        try {
            console.log('🔍 Checking race results...');
            const session = await this.f1Data.getLatestSession();
            
            if (!session) {
                console.log('⚠️  No active session found');
                return;
            }
            
            console.log(`📊 Session: ${session.session_name} (Key: ${session.session_key})`);
            
            // Only process completed sessions once
            if (session.session_key === this.lastProcessedSession) {
                console.log('✓ Session already processed\n');
                return;
            }

            const positions = await this.f1Data.getDriverPositions(session.session_key);
            
            if (!positions || positions.length === 0) {
                console.log('⚠️  No position data available yet\n');
                return;
            }
            
            // Get final positions (last lap)
            const finalPositions = this.getFinalPositions(positions);
            console.log('🏁 Final positions:', finalPositions);
            
            // Mint NFTs for all racers who finished
            console.log('\n🎨 Minting NFTs for racers...');
            for (const [driverNumber, position] of Object.entries(finalPositions)) {
                await this.mintNFTForRacer(parseInt(driverNumber), position, session.session_name);
                // Small delay to prevent nonce collision
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            // Update NFTs for podium finishers
            console.log('\n🏆 Checking for podium finishers...');
            for (const [driverNumber, position] of Object.entries(finalPositions)) {
                if (this.f1Data.isPodiumFinish(position)) {
                    console.log(`🏆 Podium finish detected: Driver #${driverNumber} in P${position}`);
                    await this.handlePodiumFinish(parseInt(driverNumber), position);
                    // Small delay to prevent nonce collision
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }

            // Resolve prediction markets
            await this.resolvePredictionMarkets(finalPositions);

            this.lastProcessedSession = session.session_key;
            console.log('✅ Session processing complete\n');
            
        } catch (error) {
            console.error('❌ Oracle error:', error.message);
            if (error.code === 'INSUFFICIENT_FUNDS') {
                console.log('💡 Tip: Get test tokens from https://neonfaucet.org/\n');
            }
        }
    }

    getFinalPositions(positions) {
        // Group by driver and get their final position
        const driverPositions = {};
        positions.forEach(pos => {
            driverPositions[pos.driver_number] = pos.position;
        });
        return driverPositions;
    }

    async mintNFTForRacer(driverNumber, position, sessionName) {
        // Check if already minted
        if (MINTED_NFTS.has(driverNumber)) {
            console.log(`   ℹ️  NFT already minted for driver #${driverNumber} (Token ID: ${MINTED_NFTS.get(driverNumber)})`);
            return MINTED_NFTS.get(driverNumber);
        }

        const driverInfo = this.f1Data.getDriverInfo(driverNumber);
        const metadataUri = `ipfs://Qm${driverNumber}_${driverInfo.name.replace(/\s+/g, '_')}_P${position}_${sessionName.replace(/\s+/g, '_')}`;
        
        console.log(`\n🎨 Minting NFT for ${driverInfo.name} (P${position})`);
        
        try {
            // Mint to oracle wallet (in production, mint to specific address)
            const { tokenId, tx } = await this.blockchain.mintNFT(
                this.blockchain.wallet.address,
                metadataUri
            );
            
            MINTED_NFTS.set(driverNumber, tokenId);
            console.log(`✅ Driver #${driverNumber} → NFT #${tokenId}`);
            
            return tokenId;
        } catch (error) {
            console.error(`❌ Failed to mint NFT for driver #${driverNumber}:`, error.message);
            
            // If it's a nonce error, it might have actually succeeded
            if (error.code === 'NONCE_EXPIRED' || error.message.includes('nonce')) {
                console.log(`   ℹ️  Transaction may have succeeded despite error, continuing...`);
            }
            
            return null;
        }
    }

    async handlePodiumFinish(driverNumber, position) {
        const nftId = MINTED_NFTS.get(driverNumber);
        if (!nftId) {
            console.log(`   ⚠️  No NFT found for driver #${driverNumber}, skipping update`);
            return;
        }

        const driverInfo = this.f1Data.getDriverInfo(driverNumber);
        const positionText = position === 1 ? 'Winner' : `P${position}`;
        const newUri = `ipfs://QmUpdated_${driverNumber}_${driverInfo.name.replace(/\s+/g, '_')}_${positionText}_${Date.now()}`;
        
        try {
            await this.blockchain.updateNFTMetadata(nftId, newUri);
        } catch (error) {
            console.error(`   ❌ Failed to update NFT #${nftId}:`, error.message);
        }
    }

    async resolvePredictionMarkets(finalPositions) {
        try {
            console.log('\n🎲 Checking prediction markets...');
            const markets = await this.blockchain.getUnresolvedMarkets();
            
            if (markets.length === 0) {
                console.log('✓ No markets to resolve');
                return;
            }
            
            const resolutions = [];
            
            // Example: "Will Lando Norris finish in top 3?"
            for (const market of markets) {
                const description = market.description.toLowerCase();
                
                // Parse driver number from description
                if (description.includes('lando') || description.includes('norris')) {
                    const driverNumber = 4;
                    const position = finalPositions[driverNumber];
                    const outcome = position >= 1 && position <= 3;
                    
                    resolutions.push({ marketId: market.id, outcome });
                    console.log(`📝 Market ${market.id}: "${market.description}" → ${outcome ? 'YES' : 'NO'}`);
                }
                
                // Add more parsing logic for other drivers/conditions
            }
            
            if (resolutions.length > 0) {
                const results = await this.blockchain.resolveMarkets(resolutions);
                console.log('✅ Markets resolved:', results);
            }
            
        } catch (error) {
            console.error('❌ Market resolution error:', error.message);
        }
    }
}

// Start oracle
const oracle = new JanusEyeOracle();
oracle.start().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});