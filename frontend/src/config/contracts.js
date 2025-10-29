export const CONTRACTS = {
    JANUS_SWAP: {
        address: import.meta.env.VITE_JANUS_SWAP_ADDRESS || '0x0000000000000000000000000000000000000000',
        abi: [],
    },
    JANUS_POLIS: {
        address: import.meta.env.VITE_JANUS_POLIS_ADDRESS || '0x0000000000000000000000000000000000000000',
        abi: [],
    },
    JANUS_AUGUR: {
        address: import.meta.env.VITE_JANUS_AUGUR_ADDRESS || '0x0000000000000000000000000000000000000000',
        abi: [],
    },
    MCLAREN_TOKEN: {
        address: import.meta.env.VITE_MCLAREN_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000',
        abi: [],
    },
};

export const NEON_DEVNET_CHAIN_ID = 245022926;