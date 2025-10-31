import { http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';

// Define Local Hardhat chain for development
export const localhost = {
    id: 1337,
    name: 'Localhost',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:8545'],
        },
        public: {
            http: ['http://127.0.0.1:8545'],
        },
    },
    testnet: true,
};

// Define Neon EVM DevNet chain
export const neonDevnet = {
    id: 245022926,
    name: 'Neon EVM DevNet',
    nativeCurrency: {
        name: 'NEON',
        symbol: 'NEON',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://devnet.neonevm.org'],
            webSocket: ['wss://devnet.neonevm.org'],
        },
        public: {
            http: ['https://devnet.neonevm.org'],
            webSocket: ['wss://devnet.neonevm.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Neonscan',
            url: 'https://devnet.neonscan.org',
        },
    },
    testnet: true,
};

// Create Wagmi config - supporting both localhost Hardhat and Neon DevNet
export const config = createConfig({
    chains: [localhost, neonDevnet],
    connectors: [
        injected({ target: 'metaMask' }),
    ],
    transports: {
        [localhost.id]: http('http://127.0.0.1:8545'),
        [neonDevnet.id]: http('https://devnet.neonevm.org'),
    },
});