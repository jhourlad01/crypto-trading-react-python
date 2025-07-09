

from pydantic import BaseModel
from typing import Optional


class ProviderConfig(BaseModel):
    name: str
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    extra: Optional[dict] = None
