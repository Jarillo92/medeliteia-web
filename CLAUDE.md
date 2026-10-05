# MedElite IA – Web (medeliteia.com)

## Negocio
- Soy Rafa, fundador de MedElite IA, agencia española de automatización con IA.
- Producto principal: agentes de IA en WhatsApp que atienden y agendan citas automáticamente. Secundario: webs a medida.
- Especialidad (lo que se destaca en el hero): clínicas dentales privadas, clínicas veterinarias y centros de estética / salones de belleza.
- También trabajo con gimnasios, centros deportivos y cualquier negocio que viva de su agenda. Primer cliente real: MOOV Huesca, centro de Pilates y entrenamiento de fuerza (caso de éxito; testimonio pendiente de permiso, campos quote/author vacíos en MOOV_CASE y no se muestran). En su caso: sin precios, contratos, bonos, herramientas ni pasarelas de pago.
- Oferta: demo y auditoría gratuita y personalizada de 30 minutos, en la que enseño el agente funcionando para su sector. Después: puesta en marcha + cuota mensual, sin permanencia. Mercado: España.
- Precio: a consultar. Nunca poner cifras en la web; se da en la demo según cada negocio.
- No hay prueba gratuita. No usar "Pago Único de Setup" como gancho.
- Integraciones que se mencionan: GoHighLevel y Make. No mencionar Calendly ni ninguna otra (Gesden, Clinic Cloud, etc.).
- La web es mi principal herramienta de captación: su objetivo es que el visitante reserve la demo gratuita.
- Acción principal de toda la web: "Reservar demo gratuita", que lleva al calendario de GoHighLevel. WhatsApp (+34 694 26 24 25) es la alternativa. Email de contacto: info@medeliteia.com (no usar el antiguo de Gmail). El botón "Pruébalo tú mismo: escríbele a nuestro asistente" está preparado pero oculto hasta que el agente atienda ese número.

## Stack y despliegue
- React 18 + Vite 5 + Tailwind 3 + framer-motion + lucide-react. Landing de una sola página.
- Hero 3D (móvil con el chat como textura y globo tenue detrás) con Three.js + React Three Fiber 8 + drei 9 (compatibles con React 18), cargado de forma diferida: nunca importarlo desde el paquete principal. En móvil, sin WebGL o con prefers-reduced-motion hay versión ligera.
- Textos y enlaces de las llamadas a la acción centralizados en src/config.js (ASSISTANT_LIVE activa el botón "Pruébalo tú mismo").
- Reserva de citas incrustada desde GoHighLevel (LeadConnector) en ContactSection.jsx: no romperla (no tocar el script ni el iframe; solo su contenedor). Debajo: "Al reservar aceptas la política de privacidad".
- Chat de GoHighLevel con asistente de IA en toda la web (src/chatWidget.js, datos en CHAT_WIDGET de config.js): se inyecta tras la carga, cuando el navegador está libre. Es la única burbuja flotante (no añadir botón flotante de WhatsApp); en móvil el botón fijo "Reservar demo gratuita" deja 88 px a la derecha para ella.
- Páginas legales en src/legal/ (Aviso legal, Política de privacidad, Política de cookies), enrutadas en main.jsx por ruta (/aviso-legal, /politica-privacidad, /politica-cookies) y enlazadas en el pie. Datos del titular en OWNER (config.js). Si se añade analítica o publicidad, hay que actualizar la política de cookies y poner banner de consentimiento.
- Enlaces del menú y del pie con "/#seccion" para que funcionen también desde las páginas legales.
- Bloque "Sobre mí" (AboutSection.jsx) antes de Contacto, con la foto public/rafa.jpeg recortada a busto con object-position.
- Desplegada en Vercel, conectada a GitHub (Jarillo92/medeliteia-web). Un push a main publica en producción; cualquier otra rama genera una URL de preview.
- Repo local: C:\Github\medeliteia-web. Uso GitHub Desktop.

## SEO
- Dominio canónico: https://www.medeliteia.com (https y con www). Cualquier URL absoluta (canonical, Open Graph, sitemap, JSON-LD) usa ese dominio.
- Cualquier página nueva que deba indexarse hay que añadirla a public/sitemap.xml. Si es una ruta nueva, añadir también su rewrite en vercel.json.
- public/robots.txt y public/sitemap.xml: el sitemap contiene solo la home. Las legales no van en el sitemap.
- Páginas legales con noindex, follow mediante cabecera X-Robots-Tag en vercel.json (rutas con y sin barra final). Cada página tiene su canonical propio.
- vercel.json: rewrites solo para / y las tres legales (con y sin barra final). El resto de rutas desconocidas devuelven la 404 real (public/404.html, estática, con noindex y logo-dark.webp).
- Open Graph y Twitter Card completos en index.html (imagen dashboard-mockup.png en URL absoluta con www).
- Textos SEO (PR 2): meta description de la home con "clínicas dentales, veterinarias y de estética"; subtítulo del hero con los tres sectores (el H1 y el <title> no se tocan); H2 de Sectores y títulos de tarjetas con "IA para ..." (el caso MOOV Huesca no se toca).
- JSON-LD de empresa (ProfessionalService) en index.html: nombre, url, logo, email, teléfono, descripción y sameAs (LinkedIn e Instagram). Sin dirección postal, NIF, precios ni ratings. Si cambian el teléfono, el email o las redes, actualizarlo también ahí.

## Reglas de trabajo
- Nunca trabajes ni hagas push directamente en main. El rediseño va en la rama "rediseño".
- Commits pequeños y descriptivos, uno por cambio lógico (ej. uno por sección).
- Antes de dar algo por terminado, comprueba que funciona en localhost y en vista móvil.
- Versionado con tags anotados en main, solo en lo que se publica: v1.0 = web original; v2.0 = rediseño; v2.x = cambios pequeños. Recuérdame crear el tag cada vez que algo llegue a main.
- Todo el contenido y la comunicación conmigo, en español. Copy directo, orientado a resultados, sin tecnicismos.
- Si un cambio es grande o irreversible, pregúntame antes.
