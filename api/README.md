# CryptoApi

## Running the API

```bash
uvicorn main:app --reload
```

## Testing (Python)

```bash
pip install -r requirements.txt
pytest
```

## Linting (Python)

```bash
pip install -r requirements.txt
flake8 .
```

## Security Audit (Client)

```bash
cd ../client
npm audit
```

## Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `