# MedElite IA – Web (medeliteia.com)

## Negocio
- Soy Rafa, fundador de MedElite IA, agencia española de automatización con IA.
- Producto principal: agentes de IA en WhatsApp que atienden y agendan citas automáticamente. Secundario: webs a medida.
- Especialidad (lo que se destaca en el hero): clínicas dentales privadas, clínicas veterinarias y centros de estética / salones de belleza.
- También trabajo con gimnasios, centros deportivos y cualquier negocio que viva de su agenda. Primer cliente real: el gimnasio MOOV Huesca (caso de éxito; testimonio pendiente de permiso).
- Oferta: demo y auditoría gratuita y personalizada de 30 minutos, en la que enseño el agente funcionando para su sector. Después: puesta en marcha + cuota mensual, sin permanencia. Mercado: España.
- Precio: a consultar. Nunca poner cifras en la web; se da en la demo según cada negocio.
- No hay prueba gratuita. No usar "Pago Único de Setup" como gancho.
- Integraciones reales: GoHighLevel, Calendly y Make. No mencionar ninguna otra (Gesden, Clinic Cloud, etc.).
- La web es mi principal herramienta de captación: su objetivo es que el visitante reserve la demo gratuita.
- Acción principal de toda la web: "Reservar demo gratuita", que lleva al calendario de GoHighLevel. WhatsApp (+34 694 26 24 25) es la alternativa. El botón "Pruébalo tú mismo: escríbele a nuestro asistente" está preparado pero oculto hasta que el agente atienda ese número.

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
