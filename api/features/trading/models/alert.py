

from pydantic import BaseModel
from typing import Optional


class Alert(BaseModel):
    id: str
    user_id: str
    asset: str
    target_price: float
    direction: str  # 'above' or 'below'
    created_at: str
    triggered_at: Optional[str] = None
    status: Optional[str] = None
