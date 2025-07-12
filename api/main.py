from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import sys
from features.coin.coin_router import router as coin_router

load_dotenv()
print('DEBUG: COIN_DATA_PROVIDER =', os.getenv('COIN_DATA_PROVIDER'))

HOST = os.getenv("API_HOST", "0.0.0.0")
PORT = os.getenv("API_PORT", "8000")
if not HOST or not PORT:
    print("Missing required environment variable: API_HOST or API_PORT")
    sys.exit(1)
PORT = int(PORT)
cors_origin = os.getenv("CORS_ORIGIN")
if not cors_origin:
    print("Missing required environment variable: CORS_ORIGIN")
    sys.exit(1)
allow_origins = [cors_origin]

app = FastAPI(
    title="CryptoApi",
    description="A cryptocurrency trading API",
    version="1.0.0"
)

# Configure CORS strictly for HTTPS frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,  # e.g. ["https://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(coin_router)

# Note: Sensitive routes are protected by verify_jwt in coin_router


@app.get("/")
async def root():
    return {"message": "CryptoApi is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
