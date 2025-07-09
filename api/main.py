from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import sys
from features.coin.coin_router import router as coin_router

load_dotenv()
print('DEBUG: COIN_DATA_PROVIDER =', os.getenv('COIN_DATA_PROVIDER'))

HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
if not HOST or not PORT:
    print("Missing required environment variable: HOST or PORT")
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
