"""
.env should include:
COIN_DATA_PROVIDER=coingecko
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from features.coin.coin_router import router as coin_router

load_dotenv()
print('DEBUG: COIN_DATA_PROVIDER =', os.getenv('COIN_DATA_PROVIDER'))

HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", 8000))
cors_origin = os.getenv("CORS_ORIGIN", "http://localhost:5173")
allow_origins = ["*"] if cors_origin == "*" else [cors_origin]

app = FastAPI(
    title="CryptoApi",
    description="A cryptocurrency trading API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,  # Set from .env, supports '*'
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(coin_router)


@app.get("/")
async def root():
    return {"message": "CryptoApi is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
