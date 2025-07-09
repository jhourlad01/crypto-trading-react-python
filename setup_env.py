#!/usr/bin/env python3
"""
Environment setup script for Auth0 configuration
"""

import os


def create_env_file(directory, filename, content):
    """Create a .env file with the given content"""
    filepath = os.path.join(directory, filename)

    if os.path.exists(filepath):
        print(f"⚠️  {filepath} already exists. Skipping...")
        return

    try:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✅ Created {filepath}")
    except Exception as e:
        print(f"❌ Error creating {filepath}: {e}")


def main():
    print("🔧 Auth0 Environment Setup")
    print("=" * 40)

    # Get current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    api_dir = os.path.join(current_dir, 'api')
    client_dir = os.path.join(current_dir, 'client')

    # Backend .env content
    backend_env = """# Auth0 Configuration
AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
AUTH0_CLIENT_ID=YOUR_CLIENT_ID
AUTH0_CLIENT_SECRET=YOUR_CLIENT_SECRET
AUTH0_AUDIENCE=YOUR_AUTH0_AUDIENCE
AUTH0_CALLBACK_URL=YOUR_AUTH0_CALLBACK_URL

# Server Configuration
HOST=YOUR_HOST
PORT=YOUR_PORT
CORS_ORIGIN=YOUR_CORS_ORIGIN

# Frontend URL
FRONTEND_URL=YOUR_FRONTEND_URL

# Coin Data Provider
COIN_DATA_PROVIDER=YOUR_COIN_DATA_PROVIDER
"""

    # Frontend .env content
    frontend_env = """# API Configuration
VITE_API_URL=YOUR_API_URL
"""

    # Create backend .env
    create_env_file(api_dir, '.env', backend_env)

    # Create frontend .env
    create_env_file(client_dir, '.env', frontend_env)

    print("\n📋 Next Steps:")
    print("1. Edit the .env files with your Auth0 credentials")
    print("2. Follow the AUTH0_SETUP.md guide for Auth0 configuration")
    print("3. Start the backend: cd api && python run.py")
    print("4. Start the frontend: cd client && npm run dev")
    print("\n🔗 Auth0 Setup Guide: AUTH0_SETUP.md")


if __name__ == "__main__":
    main()
