import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "exhaust-considers-sport-sight.trycloudflare.com"
    ]
  },
  define:{
    "process.env.URL":JSON.stringify(process.env.URL)
  }
})
