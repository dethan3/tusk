#!/bin/bash

# Tusk Installation Script
# OtterLabs - Setting up the development environment

set -e

echo "🦦 ========================================"
echo "   Tusk Installation Script"
echo "   Built by OtterLabs"
echo "========================================"
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi
echo "✅ pnpm $(pnpm -v)"

# Check Sui CLI
if ! command -v sui &> /dev/null; then
    echo "⚠️  Sui CLI is not installed."
    echo "   To deploy contracts, install Sui CLI:"
    echo "   cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui"
else
    echo "✅ Sui CLI $(sui --version)"
fi

echo ""
echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "🔨 Building SDK..."
cd sdk
pnpm build
cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Deploy the contract:"
echo "      cd contracts && sui move build && sui client publish --gas-budget 100000000"
echo ""
echo "   2. Configure the SDK:"
echo "      cd sdk && cp .env.example .env"
echo "      # Edit .env with your TUSK_PACKAGE_ID and SUI_PRIVATE_KEY"
echo ""
echo "   3. Run the demo:"
echo "      cd sdk && pnpm demo"
echo ""
echo "🔗 See QUICKSTART.md for detailed instructions"
echo ""
