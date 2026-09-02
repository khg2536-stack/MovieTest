import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //서버 DB연결 관련주석
  server:{
    proxy:{
      '/api' : {
        target: 'http://localhost:8080',
        rewrite : (path) => path.replace(/^\/api/, ''),
        changeOrigin : true,
        secure : false
      }
    }
  }
})
