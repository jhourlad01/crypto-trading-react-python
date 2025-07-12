import os
import sys
import subprocess
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

print(f"sys.real_prefix: {getattr(sys, 'real_prefix', 'Not set')}")
print(f"sys.base_prefix: {sys.base_prefix}")
print(f"sys.prefix: {sys.prefix}")
print(f"VIRTUAL_ENV: {os.getenv('VIRTUAL_ENV', 'Not set')}")
print(f"Current Python executable: {sys.executable}")

# Check if we're already in a virtual environment
in_venv = hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix) or os.getenv('VIRTUAL_ENV')

print(f"In venv: {in_venv}")

if in_venv:
    # Already in a venv, use current Python
    python_executable = sys.executable
    print(f"Using current venv Python: {python_executable}")
else:
    # Not in venv, use local venv
    venv_path = os.path.join(os.path.dirname(__file__), 'venv')
    venv_python_win = os.path.join(venv_path, 'Scripts', 'python.exe')
    venv_python_unix = os.path.join(venv_path, 'bin', 'python3')

    print(f"Local venv path: {venv_path}")
    print(f"Windows venv python: {venv_python_win}")
    print(f"Unix venv python: {venv_python_unix}")
    print(f"Windows venv exists: {os.path.exists(venv_python_win)}")
    print(f"Unix venv exists: {os.path.exists(venv_python_unix)}")

    # Pick the venv python that exists
    if os.path.exists(venv_python_unix):
        python_executable = venv_python_unix
    elif os.path.exists(venv_python_win):
        python_executable = venv_python_win
    else:
        # Create venv using the current Python
        subprocess.check_call([sys.executable, '-m', 'venv', venv_path])
        # Try again
        if os.path.exists(venv_python_unix):
            python_executable = venv_python_unix
        elif os.path.exists(venv_python_win):
            python_executable = venv_python_win
        else:
            raise RuntimeError('Could not find or create a valid venv Python interpreter.')

print(f"Final python_executable: {python_executable}")

# Get host and port from environment variables, fallback to defaults
host = os.getenv('API_HOST', '0.0.0.0')
port = os.getenv('API_PORT', '8000')

# Install requirements
subprocess.check_call([python_executable, '-m', 'pip', 'install', '-r', os.path.join(os.path.dirname(__file__), 'requirements.txt')])

# Run server using the selected python
subprocess.call([
    python_executable,
    '-m', 'uvicorn', 'main:app', '--reload', '--host', host, '--port', port,
    '--ssl-keyfile', '../cert/dev.key', '--ssl-certfile', '../cert/dev.crt'
])
