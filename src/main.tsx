import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App class="bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
  </StrictMode>,
)
