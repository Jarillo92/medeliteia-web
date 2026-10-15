import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// Build de las landings por sector, aparte del de la home (vite.config.js).
// - Cliente: landing.html -> dist/landing.html + dist/assets (sin borrar lo que dejó la home).
// - Servidor (--ssr): src/landing/entry-server.jsx -> .ssr-landing, que usa scripts/prerender.mjs.
// Tailwind con su propia config para que el CSS de la home no cambie.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  publicDir: false,
  css: {
    postcss: {
      plugins: [tailwindcss({ config: './tailwind.landing.config.js' }), autoprefixer()],
    },
  },
  build: isSsrBuild
    ? { outDir: '.ssr-landing', emptyOutDir: true }
    : {
        outDir: 'dist',
        emptyOutDir: false,
        rollupOptions: { input: 'landing.html' },
      },
}))
