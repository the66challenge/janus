import { http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';

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

// Create Wagmi config
export const config = createConfig({
    chains: [neonDevnet],
    connectors: [
        injected({ target: 'metaMask' }),
    ],
    transports: {
        [neonDevnet.id]: http('https://devnet.neonevm.org'),
    },
});