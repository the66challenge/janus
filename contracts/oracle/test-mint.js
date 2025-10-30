import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { BlockchainService } from './src/services/blockchainService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

async function testMinting() {
    console.log('🧪 Testing NFT Minting...\n');
    
    const blockchain = new BlockchainService(
        process.env.NEON_RPC_URL || 'https://devnet.neonevm.org',
        process.env.ORACLE_PRIVATE_KEY,
        'deployments/latest.json'
    );
    
    await blockchain.initialize();
    
    // Test minting a few NFTs for different drivers
    const testDrivers = [
        { number: 4, name: 'Lando Norris', position: 1 },
        { number: 1, name: 'Max Verstappen', position: 2 },
        { number: 44, name: 'Lewis Hamilton', position: 3 },
    ];
    
    console.log('\n🎨 Minting test NFTs...\n');
    
    for (const driver of testDrivers) {
        const metadataUri = `ipfs://Qm${driver.number}_${driver.name.replace(/\s+/g, '_')}_P${driver.position}_TestRace`;
        
        console.log(`Minting for ${driver.name} (P${driver.position})...`);
        
        try {
            const { tokenId, tx } = await blockchain.mintNFT(
                blockchain.wallet.address,
                metadataUri
            );
            
            console.log(`✅ Success! NFT #${tokenId} minted for driver #${driver.number}`);
            console.log(`   Metadata: ${metadataUri}`);
            console.log(`   Tx: ${tx.hash}\n`);
            
            // Wait a bit between mints
            await new Promise(resolve => setTimeout(resolve, 2000));
            
        } catch (error) {
            console.error(`❌ Failed to mint for driver #${driver.number}:`, error.message);
        }
    }
    
    console.log('\n✅ Test complete!');
}

testMinting().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});
