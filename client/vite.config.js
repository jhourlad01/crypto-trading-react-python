/* eslint-env node */
import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* global process */
if (!process.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined in .env');
}
const API_URL = process.env.VITE_API_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/coins': API_URL
    }
  }
})
