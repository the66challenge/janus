import { ethers } from 'ethers';
import 'dotenv/config';

console.log('Testing private key...');
console.log('Raw value:', process.env.ORACLE_PRIVATE_KEY);
console.log('Length:', process.env.ORACLE_PRIVATE_KEY?.length);
console.log('Starts with 0x:', process.env.ORACLE_PRIVATE_KEY?.startsWith('0x'));

try {
    const wallet = new ethers.Wallet(process.env.ORACLE_PRIVATE_KEY);
    console.log('✅ Valid! Address:', wallet.address);
} catch (error) {
    console.error('❌ Invalid key:', error.message);
}