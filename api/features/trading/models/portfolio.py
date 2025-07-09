

from pydantic import BaseModel
from typing import List


class PortfolioAsset(BaseModel):
    asset: str
    amount: float
    avg_buy_price: float


class Portfolio(BaseModel):
    user_id: str
    assets: List[PortfolioAsset]
