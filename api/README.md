# CryptoApi

## Feature-based Structure

- `features/` — Feature modules (e.g. dashboard, home, auth, trading)
- `shared/`   — Shared utilities, dependencies, or models
- `core/`     — Core API setup, config, and app instance

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