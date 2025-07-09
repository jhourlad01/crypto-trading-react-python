

from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    created_at: Optional[str] = None
