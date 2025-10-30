export const CONTRACTS = {
    JANUS_SWAP: {
        address: import.meta.env.VITE_JANUS_SWAP_ADDRESS || '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        abi: [
            // Core swap functions
            {
                "inputs": [{"type": "uint256", "name": "minAmountOut"}],
                "name": "swapExactETHForTokens",
                "outputs": [{"type": "uint256", "name": "amountOut"}],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [{"type": "uint256", "name": "tokenAmount"}],
                "name": "addLiquidity",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [{"type": "uint256", "name": "amountIn"}, {"type": "uint256", "name": "reserveIn"}, {"type": "uint256", "name": "reserveOut"}],
                "name": "getAmountOut",
                "outputs": [{"type": "uint256"}],
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getPrice",
                "outputs": [{"type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "reserveETH",
                "outputs": [{"type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "reserveToken",
                "outputs": [{"type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            }
        ],
    },
    JANUS_POLIS: {
        address: import.meta.env.VITE_JANUS_POLIS_ADDRESS || '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
        abi: [
            // NFT marketplace functions
            {
                "inputs": [{"type": "uint256", "name": "tokenId"}],
                "name": "buyNFT",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"type": "uint256", "name": "tokenId"}, {"type": "uint256", "name": "price"}],
                "name": "listNFT",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"type": "uint256", "name": "tokenId"}],
                "name": "getListing",
                "outputs": [{"type": "tuple", "components": [{"type": "uint256", "name": "price"}, {"type": "address", "name": "seller"}, {"type": "bool", "name": "isActive"}]}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"type": "uint256", "name": "tokenId"}],
                "name": "ownerOf",
                "outputs": [{"type": "address"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"type": "uint256", "name": "tokenId"}],
                "name": "tokenURI",
                "outputs": [{"type": "string"}],
                "stateMutability": "view",
                "type": "function"
            }
        ],
    },
    JANUS_AUGUR: {
        address: import.meta.env.VITE_JANUS_AUGUR_ADDRESS || '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
        abi: [
            // Prediction market functions - basic interface
            {
                "inputs": [{"type": "string", "name": "question"}, {"type": "uint256", "name": "endTime"}],
                "name": "createMarket",
                "outputs": [{"type": "uint256"}],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
    },
    MCLAREN_TOKEN: {
        address: import.meta.env.VITE_MCLAREN_TOKEN_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        abi: [
            // Standard ERC20 functions
            {
                "inputs": [{"type": "address", "name": "account"}],
                "name": "balanceOf",
                "outputs": [{"type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"type": "address", "name": "spender"}, {"type": "uint256", "name": "amount"}],
                "name": "approve",
                "outputs": [{"type": "bool"}],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"type": "address", "name": "owner"}, {"type": "address", "name": "spender"}],
                "name": "allowance",
                "outputs": [{"type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [{"type": "uint8"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [{"type": "string"}],
                "stateMutability": "view",
                "type": "function"
            }
        ],
    },
};

export const NEON_DEVNET_CHAIN_ID = 245022926;