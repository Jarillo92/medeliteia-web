import dental from './dental'

// Sectores con landing propia, por ruta (sin barra). Para añadir uno: crear su archivo de datos,
// registrarlo aquí y añadir la ruta en scripts/prerender.mjs, vercel.json y public/sitemap.xml.
export const SECTORS = {
  [dental.slug]: dental,
};
