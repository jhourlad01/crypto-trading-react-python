from fastapi import APIRouter, HTTPException, Depends
from .coin_service import CoinService
from .coin_provider import CoinDataProvider
from .coin_provider_registry import PROVIDER_REGISTRY
from features.coin.models.coin_data import CoinData
import os
from features.auth.auth_jwt import verify_jwt

router = APIRouter(prefix="/coins", tags=["coins"])

PROVIDER_NAME = os.getenv("COIN_DATA_PROVIDER")
COINS_COUNT = int(os.getenv("COINS_COUNT", "10"))


def get_coin_data_provider() -> CoinDataProvider:
    if not PROVIDER_NAME:
        raise HTTPException(
            status_code=500,
            detail="COIN_DATA_PROVIDER environment variable is not set."
        )
    provider_cls = PROVIDER_REGISTRY.get(PROVIDER_NAME.lower())
    if not provider_cls:
        raise HTTPException(
            status_code=500,
            detail=f"Unknown provider: {PROVIDER_NAME}"
        )
    return provider_cls()


@router.get("", response_model=list[CoinData])
async def get_top_coins(
    provider: CoinDataProvider = Depends(get_coin_data_provider),
    # user=Depends(verify_jwt),  # JWT auth removed for public access
):
    service = CoinService(provider)
    try:
        return await service.get_top_coins(COINS_COUNT)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{coin_id}", response_model=CoinData)
async def get_coin(
    coin_id: str,
    provider: CoinDataProvider = Depends(get_coin_data_provider),
    user=Depends(verify_jwt)
):
    service = CoinService(provider)
    try:
        return await service.get_coin_data(coin_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
