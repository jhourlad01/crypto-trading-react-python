#!/bin/bash

# Load environment variables from .env if it exists
if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

# Run the FastAPI server
uvicorn main:app --reload
