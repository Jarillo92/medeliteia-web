import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import LandingPage from './LandingPage'
import { SECTORS } from '../landings/sectors'

export { SECTORS };

// HTML de la landing para el prerender (scripts/prerender.mjs)
export function render(slug) {
  const sector = SECTORS[slug];
  if (!sector) throw new Error(`No hay datos de sector para /${slug}`);
  return renderToString(
    <StrictMode>
      <LandingPage sector={sector} />
    </StrictMode>
  );
}
