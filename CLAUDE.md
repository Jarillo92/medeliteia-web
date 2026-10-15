# MedElite IA – Web (medeliteia.com)

## Negocio
- Soy Rafa, fundador de MedElite IA, agencia española de automatización con IA.
- Producto principal: agentes de IA en WhatsApp que atienden y agendan citas automáticamente. Secundario: webs a medida.
- Especialidad (lo que se destaca en el hero): clínicas dentales privadas, clínicas veterinarias y centros de estética / salones de belleza.
- También trabajo con gimnasios, centros deportivos y cualquier negocio que viva de su agenda. Primer cliente real: MOOV Huesca, centro de Pilates y entrenamiento de fuerza (caso de éxito; testimonio pendiente de permiso, campos quote/author vacíos en MOOV_CASE y no se muestran). En su caso: sin precios, contratos, bonos, herramientas ni pasarelas de pago.
- Oferta: demo y auditoría gratuita y personalizada de 30 minutos, en la que enseño el agente funcionando para su sector. Después: puesta en marcha + cuota mensual, sin permanencia. Mercado: España.
- Precio: a consultar. Nunca poner cifras en la web; se da en la demo según cada negocio.
- No hay prueba gratuita. No usar "Pago Único de Setup" como gancho.
- Integraciones que se mencionan: GoHighLevel, Make y n8n. No mencionar Calendly ni ninguna otra (Gesden, Clinic Cloud, etc.).
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
- Página de recurso /prompt-clientes (src/PromptClientes.jsx): es lo que se envía por Instagram a quien comenta CLIENTES en un reel. Prompt para pegar en Claude o ChatGPT con botón "Copiar prompt" (clipboard con alternativa) y botón secundario a DEMO_HREF. Es noindex (meta robots en la página y X-Robots-Tag en vercel.json), no va en el sitemap ni en el menú y su canonical es propio. El texto del prompt no se cambia sin consultar a Rafa. En vercel.json, los patrones de `source` de cabeceras no admiten `/?`: usar una entrada con barra final y otra sin ella.
- Bloque "Sobre mí" (AboutSection.jsx) antes de Contacto, con la foto public/rafa.jpeg recortada a busto con object-position.
- Certificado en "Sobre mí" (CertificateCard.jsx, bajo "Quién está detrás"): tarjeta "Experto/a en creación e implementación de agentes de IA · MKT Hackers", formación "Crea tu propia Agencia de IA". Miniatura public/certificado-mkthackers-thumb.webp (320 px) que abre public/certificado-mkthackers.webp (máx. 1600 px) en un modal accesible (Esc, foco atrapado, el foco vuelve al botón). Nunca decir "título oficial" ni "máster". No se toca el cartel de subvención del pie.
- Fondo de partículas (ParticlesLoader.jsx + ParticlesBackground.jsx, montado en App.jsx): un solo <canvas> fijo, sin librerías, detrás del contenido (z-index -1, pointer-events none), 70 partículas en accent (#5B8CFF) y accent.bright (#9CBBFF; la config no tiene cian), DPR máx. 2. Opacidad por sección con IntersectionObserver: 0 en #hero, #contacto y footer; 0.35 en #como-funciona, #sectores y #proceso; 0.6 en el resto. Se pausa con la pestaña oculta; no se carga por debajo de 768 px ni con prefers-reduced-motion; carga diferida cuando el navegador está libre (chunk aparte, no afecta al LCP). Si se añade o renombra una sección con id, revisar SECTION_ALPHA. El Hero tiene ahora id="hero".
- Desplegada en Vercel, conectada a GitHub (Jarillo92/medeliteia-web). Un push a main publica en producción; cualquier otra rama genera una URL de preview.
- Repo local: C:\Github\medeliteia-web. Uso GitHub Desktop.

## SEO
- Dominio canónico: https://www.medeliteia.com (https y con www). medeliteia.com (sin www) redirige con 308 desde Vercel. Todas las URL de canonical, Open Graph, sitemap y JSON-LD usan ese dominio.
- **SEO técnico (PR #8, v2.4):** public/robots.txt; public/sitemap.xml con solo la home; 404 real (public/404.html, estática, noindex, logo-dark.webp); rewrites de vercel.json solo para /, /aviso-legal, /politica-privacidad y /politica-cookies (con y sin barra final); cabecera X-Robots-Tag "noindex, follow" en las tres legales (vercel.json); canonical de la home en index.html y canonical propio de cada legal en LegalLayout.jsx; Open Graph y Twitter Card completos (imagen dashboard-mockup.png en URL absoluta con www); sin meta keywords.
- **SEO textos (v2.5):** meta description nueva de la home, subtítulo del hero con los tres sectores, H2 de Sectores y títulos de las tres tarjetas con "IA para ...", y JSON-LD de empresa (ProfessionalService) en index.html con nombre, url, logo, email, teléfono, descripción y sameAs (LinkedIn e Instagram @rafajarillo, https://www.instagram.com/rafajarillo/; el mismo enlace está en el pie). El JSON-LD no incluye dirección postal, NIF, precios ni valoraciones. Si cambian teléfono, email o redes, actualizarlo también ahí.
- Reglas: el H1 y el <title> de la home no se cambian sin consultar a Rafa.
- **Otros negocios con agenda (v2.6):** la entradilla de la sección de sectores añade "Y también gimnasios, centros deportivos y cualquier negocio que viva de su agenda" como mención secundaria. El hero, el title y la meta description se mantienen centrados en clínicas dentales, veterinarias y de estética (la especialidad), sin diluirlos con otros sectores.
- **Herramientas y voz (rama anadir-n8n):** en los textos públicos (FAQ, Cómo funciona, Inversión, Aviso legal) "GoHighLevel o Make" pasa a "GoHighLevel, Make y n8n". El JSON-LD no menciona herramientas y no existe llms.txt. La web no mencionaba el asistente de voz (solo el caso MOOV, que no se toca): se añade una frase breve en la respuesta de la FAQ "¿Qué responde el asistente?": "También puede atender por teléfono: asistente de voz con IA, a medida." Sin precios, plazos ni demo de voz activa.
- **Páginas nuevas indexables:** añadirlas a public/sitemap.xml y a los rewrites de vercel.json (con y sin barra final), y que lleven su title, meta description, H1 y canonical propios. Las páginas con noindex no van en el sitemap.
- No tocar el registro TXT de verificación de Search Console: está en Cloudflare, no en el repo.
- Las previews de Vercel añaden por sí solas X-Robots-Tag: noindex a todas las páginas. Ese noindex en una preview es normal y no es un fallo del repo.
- Pendiente: landings por sector con prerenderizado; landing para gimnasios con MOOV como caso; caso MOOV como página propia; testimonio de Álvaro.

## Versiones (tags en main)
- v1.0: web original.
- v2.0: rediseño.
- v2.1: páginas legales y mejoras.
- v2.2: arreglo de la franja del calendario.
- v2.3: caso MOOV Huesca actualizado.
- v2.4: SEO técnico (robots, sitemap, 404, noindex en legales, Open Graph, canonical).
- v2.5: SEO textos y JSON-LD.
- v2.6: frase de otros negocios con agenda en sectores.
- v2.7: n8n junto a GoHighLevel y Make en los textos, y frase del asistente de voz en la FAQ.
- v2.8: página /prompt-clientes (recurso de Instagram, noindex).
- v2.9: CLAUDE.md al día con /prompt-clientes y las versiones (sin cambios en la web).
- v2.10: certificado MKT Hackers en Sobre mí (tarjeta con modal) y fondo de partículas interactivo.
- v2.11: Instagram enlazado a @rafajarillo y CLAUDE.md al día.

## Reglas de trabajo
- Nunca trabajes ni hagas push directamente en main. El rediseño va en la rama "rediseño".
- Commits pequeños y descriptivos, uno por cambio lógico (ej. uno por sección).
- Antes de dar algo por terminado, comprueba que funciona en localhost y en vista móvil.
- Versionado con tags anotados en main, solo en lo que se publica: v1.0 = web original; v2.0 = rediseño; v2.x = cambios pequeños. Recuérdame crear el tag cada vez que algo llegue a main.
- Todo el contenido y la comunicación conmigo, en español. Copy directo, orientado a resultados, sin tecnicismos.
- Si un cambio es grande o irreversible, pregúntame antes.
