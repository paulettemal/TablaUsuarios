import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Ruta from './route/Ruta.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <BrowserRouter>
    <Ruta />
    </BrowserRouter>
  </StrictMode>,
)
