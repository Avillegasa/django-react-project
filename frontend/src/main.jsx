import axios from "axios"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Configuración global de Axios
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.withCredentials = true; // Habilitar credenciales


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
