#!/bin/bash

# Exit on any error
set -e

echo "Setting up development environment..."

# Create venv if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
echo "Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "Installing requirements..."
pip install --break-system-packages -r requirements.txt

# Run the API server
echo "Starting API server..."
python run.py
