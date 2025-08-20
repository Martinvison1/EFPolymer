#!/bin/bash

set -e

echo "🚀 EF Polymer CRM - Installation Script"
echo "======================================="

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ LTS from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

cd ..

# Setup environment
echo "⚙️ Setting up environment..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file (please review and customize)"
else
    echo "⚠️ .env file already exists, keeping existing configuration"
fi

# Create data directory
mkdir -p data

# Setup database
echo "🗄️ Setting up database..."
npx prisma generate
npx prisma migrate deploy

# Seed database
echo "🌱 Seeding database with sample data..."
npm run seed

echo ""
echo "✅ Installation completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "  1. Review backend/.env for configuration"
echo "  2. Run 'npm run dev' to start development server"
echo "  3. Open https://localhost:8443"
echo "  4. Login with: admin@local / ChangeMe!123"
echo ""
echo "📖 Documentation: README.md"
echo "🔧 Production build: npm run build"
echo "📦 Package as app: npm run app:pack"