# Shared models and utilities will go here
from pydantic import BaseModel
from typing import Optional


class CoinData(BaseModel):
    id: str
    symbol: str
    name: str
    price_usd: Optional[float] = None
    percent_change_24h: Optional[float] = None
    market_cap_usd: Optional[float] = None
    volume_24h_usd: Optional[float] = None
    circulating_supply: Optional[float] = None
    total_supply: Optional[float] = None
    max_supply: Optional[float] = None
    rank: Optional[int] = None
    last_updated: Optional[str] = None
    forecast24h: Optional[float] = None
    forecast7d: Optional[float] = None
    # Add more fields as needed for your use case
