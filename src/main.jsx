import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { loadChatWidget } from './chatWidget'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import './index.css'

// Páginas legales: rutas propias (Vercel sirve index.html para cualquier ruta)
const LEGAL_PAGES = {
  '/aviso-legal': lazy(() => import('./legal/AvisoLegal')),
  '/politica-privacidad': lazy(() => import('./legal/PoliticaPrivacidad')),
  '/politica-cookies': lazy(() => import('./legal/PoliticaCookies')),
};

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const LegalPage = LEGAL_PAGES[path];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {LegalPage ? (
      <Suspense fallback={<div className="min-h-screen bg-ground" />}>
        <LegalPage />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>,
)

loadChatWidget();
