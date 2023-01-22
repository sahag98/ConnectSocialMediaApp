import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/posts/timeline/": "http://localhost:8800/api",
      "/posts/profile/": "http://localhost:8800/api",
      "/users": "http://localhost:8800/api",
      "/users/all/users": "http://localhost:8800/api",
      "/auth/register": "http://localhost:8800/api",
      "/auth/login": "http://localhost:8800/api"
    }
  },
  plugins: [react()],
})
