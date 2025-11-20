# 🦦 Tusk

> **"The sharpest data validation layer for Walrus."**

Built by **OtterLabs** - A premier Web3 studio building infrastructure for the Walrus Protocol.

## Overview

Just as a tusk pierces through shells, our SDK pierces through opaque Walrus Blobs to verify their data structure. Tusk provides a robust system for registering data schemas on-chain and validating Walrus blob content against them.

## Architecture

This is a monorepo containing:
- **`/contracts`**: Sui Move smart contracts for the schema registry (`tusk_protocol`)
- **`/sdk`**: TypeScript SDK for developers (`@otterlabs/tusk`)

## Quick Start

```bash
# Install dependencies
pnpm install

# Build SDK
cd sdk
pnpm build

# Run demo
pnpm demo
```

## How It Works

1. **Sui Contract** acts as a registry for Data Schemas and Attestations
2. **Tusk SDK** allows developers to:
   - Register schemas on-chain
   - Validate Walrus blobs against schemas
   - Mint on-chain "Quality Certificates"

---

Built with ❤️ by the OtterLabs team for the Walrus Hackathon.
