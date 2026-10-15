// Prerender de las landings por sector. Se ejecuta al final de "npm run build":
// 1) vite build (home)  2) vite build -c vite.landing.config.js (cliente)  3) build --ssr (servidor)  4) este script.
// Lee dist/landing.html, pinta cada landing con renderToString y escribe solo dist/<ruta>/index.html.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Rutas que se prerenderizan (lista fija). Cada una necesita su archivo en src/landings/sectors/.
const ROUTES = ['clinicas-dentales'];

const SITE = 'https://www.medeliteia.com';
const OG_IMAGE = `${SITE}/dashboard-mockup.png`;

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, '.ssr-landing');

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// JSON dentro de <script>: sin "<" literal para que nada pueda cerrar la etiqueta
const jsonLd = (data) => JSON.stringify(data, null, 2).replace(/</g, '\\u003c');

function head(sector) {
  const url = `${SITE}/${sector.slug}`;
  const { title, description, breadcrumb, ogImageAlt } = sector.meta;
  const t = escapeHtml(title);
  const d = escapeHtml(description);

  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: sector.service.name,
        serviceType: sector.service.serviceType,
        description,
        url,
        areaServed: 'ES',
        audience: { '@type': 'BusinessAudience', name: sector.service.audience },
        provider: {
          '@type': 'ProfessionalService',
          name: 'MedElite IA',
          url: `${SITE}/`,
          logo: `${SITE}/logo.webp`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'MedElite IA', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumb, item: url },
        ],
      },
    ],
  };

  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="author" content="MedElite IA" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="MedElite IA" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">\n${jsonLd(structured)}\n    </script>`,
  ].join('\n    ');
}

const template = await readFile(resolve(dist, 'landing.html'), 'utf8');
if (!template.includes('<!--landing-head-->') || !template.includes('<!--landing-html-->')) {
  throw new Error('dist/landing.html no tiene los marcadores <!--landing-head--> y <!--landing-html-->');
}

const { render, SECTORS } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

for (const route of ROUTES) {
  const sector = SECTORS[route];
  if (!sector) throw new Error(`Falta src/landings/sectors para /${route}`);
  const html = template.replace('<!--landing-head-->', () => head(sector)).replace('<!--landing-html-->', () => render(route));
  const out = resolve(dist, route, 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`prerender: /${route} -> dist/${route}/index.html`);
}

// La plantilla y el build de servidor son intermedios: no se publican
await rm(resolve(dist, 'landing.html'));
await rm(ssrDir, { recursive: true, force: true });
