# 🦦 Tusk - Quick Start Guide

Welcome to **Tusk** by OtterLabs! This guide will help you get started with the sharpest data validation layer for Walrus.

## Prerequisites

- Node.js 18+ and pnpm
- Sui CLI (for contract deployment)
- A Sui Testnet wallet with gas tokens

## Installation

```bash
# Clone the repository
git clone https://github.com/otterlabs/tusk.git
cd tusk

# Install dependencies
pnpm install
```

## Step 1: Deploy the Smart Contract

```bash
# Navigate to contracts directory
cd contracts

# Build the Move contract
sui move build

# Deploy to Sui Testnet
sui client publish --gas-budget 100000000

# Copy the Package ID from the output
```

## Step 2: Configure the SDK

```bash
cd ../sdk

# Copy the environment template
cp .env.example .env

# Edit .env and add:
# - TUSK_PACKAGE_ID (from deployment)
# - SUI_PRIVATE_KEY (your wallet private key)
```

## Step 3: Build the SDK

```bash
# Build TypeScript code
pnpm build
```

## Step 4: Run the Demo

```bash
# Execute the demo
pnpm demo
```

You should see output demonstrating:
- ✅ SDK initialization
- ✅ Schema registration
- ✅ Blob validation
- ✅ Attestation creation

## Usage in Your Project

```bash
pnpm add @otterlabs/tusk
```

```typescript
import { Tusk } from '@otterlabs/tusk';

const tusk = new Tusk('testnet', PACKAGE_ID, PRIVATE_KEY);

// Register a schema
await tusk.registerSchema({
  name: 'My Schema',
  version: '1.0',
  schema: { /* JSON Schema */ }
});

// Validate data
const isValid = await tusk.pierceAndValidate(blobId, schemaId, data);

// Create attestation
await tusk.attest(blobId, schemaId, isValid);
```

## Project Structure

```
tusk/
├── contracts/          # Sui Move smart contracts
│   ├── sources/
│   │   └── schema_registry.move
│   └── Move.toml
├── sdk/               # TypeScript SDK
│   ├── src/
│   │   └── index.ts
│   ├── demo.ts
│   └── package.json
└── README.md
```

## Commands Reference

```bash
# Root level
pnpm install          # Install all dependencies
pnpm build           # Build all packages

# Contracts
sui move build       # Build Move contracts
sui move test        # Run Move tests
sui client publish   # Deploy to network

# SDK
pnpm build           # Compile TypeScript
pnpm demo            # Run demo script
```

## Troubleshooting

### "Package ID not set"
- Make sure you've deployed the contract and updated `TUSK_PACKAGE_ID` in `.env`

### "Private key required"
- Add your Sui private key to `.env` as `SUI_PRIVATE_KEY`
- Get testnet tokens from the [Sui faucet](https://discord.com/invite/sui)

### Build errors
- Ensure you're using Node.js 18+
- Run `pnpm install` from the root directory

## Resources

- [Tusk Documentation](./README.md)
- [Sui Documentation](https://docs.sui.io)
- [Walrus Protocol](https://walrus.xyz)
- [OtterLabs](https://otterlabs.xyz)

---

Built with ❤️ by **OtterLabs** for the Walrus Hackathon
