# CryptoApi

A FastAPI-based cryptocurrency trading API.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn main:app --reload
```

## Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /docs` - API documentation (Swagger UI)

## Development

The server runs on `http://localhost:8000` by default. 