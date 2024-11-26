import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../django_dash_react/static',  // Carpeta de salida para Django
  },
  // Configuración de base para despliegue
  // base: '/', //Aca va el dominio en despliegue 
  server: {
      open: true, // Abre automaticamente el navegador en la ruta principal 
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
});
