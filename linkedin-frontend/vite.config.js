import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' 

export default defineConfig({
  plugins: [react(), tailwindcss()],

  optimizeDeps: {
    include: ['socket.io-client'], 
  },

  resolve: {
    alias: {
      'socket.io-client': path.resolve(
        __dirname,
        'node_modules/socket.io-client/dist/socket.io.js'
      ),
    },
  },
})