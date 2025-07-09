

from pydantic import BaseModel
from typing import Optional


class UserSession(BaseModel):
    user_id: str
    session_token: str
    expires_at: Optional[str] = None
