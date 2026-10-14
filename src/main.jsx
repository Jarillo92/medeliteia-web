import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { loadChatWidget } from './chatWidget'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import './index.css'

// Páginas con ruta propia: legales y recursos (Vercel sirve index.html para cualquier ruta)
const PAGES = {
  '/aviso-legal': lazy(() => import('./legal/AvisoLegal')),
  '/politica-privacidad': lazy(() => import('./legal/PoliticaPrivacidad')),
  '/politica-cookies': lazy(() => import('./legal/PoliticaCookies')),
  '/prompt-clientes': lazy(() => import('./PromptClientes')),
};

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const Page = PAGES[path];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {Page ? (
      <Suspense fallback={<div className="min-h-screen bg-ground" />}>
        <Page />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>,
)

loadChatWidget();
