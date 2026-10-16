import dental from './dental'
import veterinarias from './veterinarias'
import estetica from './estetica'
import salones from './salones'
import gimnasios from './gimnasios'

// Sectores con landing propia, por ruta (sin barra). El orden es el de los enlaces cruzados del pie.
// Para añadir uno: crear su archivo de datos, registrarlo aquí y añadir la ruta en scripts/prerender.mjs,
// vercel.json (con y sin barra) y public/sitemap.xml.
export const SECTORS = {
  [dental.slug]: dental,
  [veterinarias.slug]: veterinarias,
  [estetica.slug]: estetica,
  [salones.slug]: salones,
  [gimnasios.slug]: gimnasios,
};
