#!/bin/bash

# Navigate to the project folder
cd "$(dirname "$0")"

# Install dependencies (ignores dev dependencies)
echo "Installing dependencies..."
npm install --production

# Build the project
echo "Building the project..."
npm run build

# Start the project in production mode
echo "Starting the Next.js app..."
npm run start

echo "Next.js app started successfully."