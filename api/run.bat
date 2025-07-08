@echo off
REM Load environment variables from .env if it exists
IF EXIST .env (
  for /f "usebackq tokens=* delims=" %%A in (".env") do (
    set "line=%%A"
    echo !line! | findstr /b /r /c:"[A-Za-z_][A-Za-z0-9_]*=" >nul && (
      for /f "tokens=1,2 delims==" %%B in ("!line!") do set "%%B=%%C"
    )
  )
)

REM Run the FastAPI server
uvicorn main:app --reload
