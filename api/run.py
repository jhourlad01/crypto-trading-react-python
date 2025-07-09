import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Start the FastAPI server with HTTPS using certs in cert/
os.system("uvicorn main:app --reload --host 0.0.0.0 --port 8000 "
          "--ssl-keyfile ../cert/dev.key --ssl-certfile ../cert/dev.crt")
