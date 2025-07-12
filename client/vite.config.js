/* eslint-env node */
import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* global process */
console.log('CLIENT_HOST:', process.env.CLIENT_HOST)
console.log('CLIENT_PORT:', process.env.CLIENT_PORT)
console.log('VITE_API_URL:', process.env.VITE_API_URL)

if (!process.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined in .env');
}
const API_URL = process.env.VITE_API_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.CLIENT_HOST || 'localhost',
    port: parseInt(process.env.CLIENT_PORT) || 3000,
    proxy: {
      '/coins': API_URL
    }
  }
})
