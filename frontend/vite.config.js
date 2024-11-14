import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/', //Aca va el dominio en despliegue 
  server: {
      open: true, // Abre automaticamente el navegador en la ruta principal 
  },
});
