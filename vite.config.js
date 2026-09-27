import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Three.js (~820 kB) va en un archivo aparte que solo se descarga al cargar las escenas 3D del hero
    chunkSizeWarningLimit: 900,
  },
})
