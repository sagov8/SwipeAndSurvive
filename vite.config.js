import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Permite rutas relativas para itch.io (ZIP HTML5), GitHub Pages, Vercel y Netlify sin errores 404 de assets
})
