#!/bin/bash

# Script to setup the project for first time use
# Run with: ./scripts/setup.sh

set -e

echo "🚀 Setting up Bun Backend Boilerplate..."

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install it first:"
    echo "curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun is installed"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You can install it later if needed."
else
    echo "✅ Docker is installed"
fi

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Copy .env.example to .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration, especially BETTER_AUTH_SECRET"
    echo "   Generate a secure secret with: openssl rand -base64 32"
fi

# Start PostgreSQL with Docker if available
if command -v docker &> /dev/null; then
    echo "🐳 Starting PostgreSQL with Docker..."
    docker-compose up -d postgres
    
    # Wait for PostgreSQL to be ready
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 5
    
    # Generate and run migrations
    echo "🗄️  Generating and applying migrations..."
    bun run migrate:generate || true
    bun run migrate:apply || true
    
    echo "🔐 Generating Better Auth migrations..."
    bun run auth:generate || true
    bun run auth:migrate || true
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🎉 You can now start the development server with:"
    echo "   bun run dev"
    echo ""
    echo "📚 Or check the README.md for more information"
else
    echo ""
    echo "⚠️  Docker not found. Please install and configure PostgreSQL manually."
    echo "   Then run migrations with:"
    echo "   bun run migrate:generate"
    echo "   bun run migrate:apply"
    echo "   bun run auth:generate"
    echo "   bun run auth:migrate"
fi
