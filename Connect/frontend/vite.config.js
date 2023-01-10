import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/posts/timeline/": "http://localhost:8800/api"
    }
  },
  plugins: [react()],
})
