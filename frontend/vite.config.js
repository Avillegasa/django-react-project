import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/' , //Configura la ruta base
  build: {
    outDir: '../django_dash_react/static', //Cambia la direccion de salida
    emptyOutDir: true,
  },
});
