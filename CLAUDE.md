# MedElite IA – Web (medeliteia.com)

## Negocio
- Soy Rafa, fundador de MedElite IA, agencia española de automatización con IA.
- Producto principal: agentes de IA en WhatsApp que atienden y agendan citas automáticamente. Secundario: webs a medida.
- Sectores objetivo: clínicas dentales privadas, clínicas veterinarias, centros de estética y salones de belleza.
- Modelo: prueba gratuita + cuota mensual de mantenimiento. Mercado: España.
- La web es mi principal herramienta de captación: su objetivo es que el visitante reserve un análisis inicial.

## Stack y despliegue
- React 18 + Vite 5 + Tailwind 3 + framer-motion + lucide-react. Landing de una sola página.
- Reserva de citas incrustada desde GoHighLevel (LeadConnector) en ContactSection.jsx: no romperla.
- Desplegada en Vercel, conectada a GitHub (Jarillo92/medeliteia-web). Un push a main publica en producción; cualquier otra rama genera una URL de preview.
- Repo local: C:\Github\medeliteia-web. Uso GitHub Desktop.

## Reglas de trabajo
- Nunca trabajes ni hagas push directamente en main. El rediseño va en la rama "rediseño".
- Commits pequeños y descriptivos, uno por cambio lógico (ej. uno por sección).
- Antes de dar algo por terminado, comprueba que funciona en localhost y en vista móvil.
- Versionado con tags anotados en main, solo en lo que se publica: v1.0 = web original; v2.0 = rediseño; v2.x = cambios pequeños. Recuérdame crear el tag cada vez que algo llegue a main.
- Todo el contenido y la comunicación conmigo, en español. Copy directo, orientado a resultados, sin tecnicismos.
- Si un cambio es grande o irreversible, pregúntame antes.
