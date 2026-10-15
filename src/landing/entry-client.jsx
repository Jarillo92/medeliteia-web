import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import LandingPage from './LandingPage'
import { SECTORS } from '../landings/sectors'
import { loadChatWidget } from '../chatWidget'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '../index.css'
import './landing.css'

// Hidrata el HTML prerenderizado de la landing que corresponde a la ruta
const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
const sector = SECTORS[slug];

if (sector) {
  hydrateRoot(
    document.getElementById('root'),
    <StrictMode>
      <LandingPage sector={sector} />
    </StrictMode>
  );
}

loadChatWidget();
