# janus
A Secure F1 Fan Engagement Hub &amp; DEX
# janus

A Secure F1 Fan Engagement Hub &amp; DEX

## Inslallaion

Backend (Smart Contracts)

```sh
cd contracts
npm install
```

Environment Setup
Create a `.env` file in the contracts directory:

```sh
cp .env.example .env
```

## Development Workflow

1. Compile Contracts

```sh
cd contracts # if not already present in janus/contracts
npx hardhat compile
```

This generates:

Contract artifacts in artifacts/
TypeScript types in typechain-types/

2. Run Tests

```sh
# Run all tests
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Run specific test file
npx hardhat test test/JanusSwap.test.ts
```

3. Local Development Network
Start a local Hardhat network for development:

```sh
# Terminal 1 - Start local node
npx hardhat node

# Terminal 2 - Deploy contracts to local network
npx hardhat run scripts/deploy-single.ts --network localhost
```
The local network provides:

10 test accounts with 10,000 ETH each
Instant transaction confirmation
No gas costs
Ability to reset state

4. Check Deployment Status

```sh
# View your wallet address
npx hardhat run scripts/show-address.ts --network localhost

# Check account balance
npx hardhat run scripts/check-balance.ts --network localhost

# View latest deployment info
cat deployments/latest.json
```

5. Interact with Deployed Contracts

```sh
# Run interaction script
npx hardhat run scripts/interact.ts --network localhost
```

## Deployment

Deploy to Localhost (Development)

```sh
# Start local node
npx hardhat node

# Deploy in another terminal
npx hardhat run scripts/deploy-single.ts --network localhost
```

Deploy to Neon DevNet (Testnet)

```sh
# Get test NEON tokens from https://neonfaucet.org/

# Check balance
npx hardhat run scripts/check-balance.ts --network neondevnet

# Deploy with minimal gas
npx hardhat run scripts/deploy-minimal.ts --network neondevnet
```

Deploy to Neon DevNet (TestNet)

```sh
# Get test NEON tokens from https://neonfaucet.org/

# Check balance
npx hardhat run scripts/check-balance.ts --network neondevnet

# Deploy with minimal gas
npx hardhat run scripts/deploy-minimal.ts --network neondevnet
```

Deploy to Neon MainNet (Production)

```sh
npx hardhat run scripts/deploy-single.ts --network neonmainnet
```

## Avaiable Scripts

Contract Management

```sh
# Clean build artifacts
npx hardhat clean

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Get contract size report
npx hardhat size-contracts
```

Deployment Scripts

```sh
# Show wallet address
npx hardhat run scripts/show-address.ts --network <network>

# Check balance
npx hardhat run scripts/check-balance.ts --network <network>

# Deploy all contracts
npx hardhat run scripts/deploy-single.ts --network <network>

# Deploy with explicit gas settings
npx hardhat run scripts/deploy-minimal.ts --network <network>

# Interact with deployed contracts
npx hardhat run scripts/interact.ts --network <network>
```

## Network Configuration

Localhost (Development)

- Chain ID: 31337
- RPC: [http://127.0.0.1:8545](http://127.0.0.1:8545)
- Free, instant transactions

Neon DevNet (Public Testnet)

- Chain ID: 245022926
- RPC: [https://devnet.neonevm.org](https://devnet.neonevm.org)
- Explorer: [https://devnet.neonscan.org](https://devnet.neonscan.org)
- Faucet: [https://neonfaucet.org/](https://neonfaucet.org/)

Neon MainNet (Production)

- Chain ID: 245022934
- RPC: [https://neon-proxy-mainnet.solana.p2p.org](https://neon-proxy-mainnet.solana.p2p.org)
- Explorer: [https://neonscan.org](https://neonscan.org)

## Contract Verification

After deploying to a public network, verify contracts on NeoScan:

```sh
# Verify McLaren Token
npx hardhat verify --network neondevnet <TOKEN_ADDRESS> "McLaren Racing Token" "MCLAREN" 1000000

# Verify JanusSwap
npx hardhat verify --network neondevnet <SWAP_ADDRESS> <TOKEN_ADDRESS>

# Verify JanuPolis
npx hardhat verify --network neondevnet <POLIS_ADDRESS> <TOKEN_ADDRESS> <ORACLE_ADDRESS>

# Verify JanusAugur
npx hardhat verify --network neondevnet <AUGUR_ADDRESS> <TOKEN_ADDRESS> <ORACLE_ADDRESS>
```

## Testing

```sh
# Test all contracts in one go
npx hardhat test

# Test individual contracts
npx hardhat test test/JanusSwap.test.ts
...
```
