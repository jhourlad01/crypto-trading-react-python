import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Start the FastAPI server
os.system("uvicorn main:app --reload")
