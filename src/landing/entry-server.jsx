import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import LandingPage from './LandingPage'
import CalculatorPage from './calculator/CalculatorPage'
import { SECTORS } from '../landings/sectors'
import calculadora from '../landings/pages/calculadora'

// Páginas generales (no son sector): por ruta
export const PAGES = { [calculadora.slug]: calculadora };
export { SECTORS };

// HTML de la landing para el prerender (scripts/prerender.mjs)
export function render(slug) {
  if (PAGES[slug]) {
    return renderToString(
      <StrictMode>
        <CalculatorPage page={PAGES[slug]} />
      </StrictMode>
    );
  }
  const sector = SECTORS[slug];
  if (!sector) throw new Error(`No hay datos de sector para /${slug}`);
  return renderToString(
    <StrictMode>
      <LandingPage sector={sector} />
    </StrictMode>
  );
}
