#!/bin/bash

# Exit on any error
set -e

# Load .env variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

echo "Setting up development environment..."

if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Please run: python3 -m venv venv"
    exit 1
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing requirements..."
pip install --break-system-packages -r requirements.txt

echo "Starting API server..."
uvicorn main:app --reload \
  --host "${API_HOST:-0.0.0.0}" \
  --port "${API_PORT:-8000}" \
  ${SSL_KEYFILE:+--ssl-keyfile "$SSL_KEYFILE"} \
  ${SSL_CERTFILE:+--ssl-certfile "$SSL_CERTFILE"}
