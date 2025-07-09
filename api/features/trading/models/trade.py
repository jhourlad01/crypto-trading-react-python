

from pydantic import BaseModel
from typing import Optional


class Trade(BaseModel):
    id: str
    user_id: str
    asset: str
    side: str  # 'buy' or 'sell'
    amount: float
    price: float
    timestamp: str
    status: Optional[str] = None
