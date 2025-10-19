import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Ye neeche wala section add kar dein
  optimizeDeps: {
    include: ['socket.io-client'],
  },
})