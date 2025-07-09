from fastapi import HTTPException, Request
from jose import jwt
import httpx
import os


AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_AUDIENCE = os.getenv("AUTH0_AUDIENCE")
ALGORITHMS = ["RS256"]


async def get_jwk():
    url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        resp.raise_for_status()
        return resp.json()["keys"]


async def verify_jwt(request: Request):
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = auth.split(" ", 1)[1]
    jwks = await get_jwk()
    try:
        payload = jwt.decode(
            token,
            jwks,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=(
                f"https://{AUTH0_DOMAIN}/"
            ),
        )
        return payload
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
