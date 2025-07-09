import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/coins': API_URL
    }
  }
})
