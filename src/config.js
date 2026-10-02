// Datos de contacto y llamadas a la acción compartidos por toda la web
// Con barra delante para que funcione también desde las páginas legales
export const DEMO_HREF = '/#contacto';
export const DEMO_LABEL = 'Reservar demo gratuita';

export const WHATSAPP_NUMBER_LABEL = '+34 694 26 24 25';
export const CONTACT_EMAIL = 'info@medeliteia.com';
export const WHATSAPP_URL = 'https://wa.me/34694262425';

// Cambiar a true cuando el agente de IA atienda el número de WhatsApp de la web.
// Muestra el botón "Pruébalo tú mismo: escríbele a nuestro asistente".
export const ASSISTANT_LIVE = false;
export const ASSISTANT_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('Hola, quiero probar el asistente')}`;

// Caso real: MOOV Huesca (tenemos permiso para usar su nombre). Proyecto en curso por fases.
// Sin cifras de resultados todavía. El testimonio solo se muestra cuando se rellenen quote y author.
export const MOOV_CASE = {
  name: 'MOOV Huesca · Pilates y entrenamiento de fuerza',
  intro: 'Centro de Pilates y entrenamiento de fuerza en Huesca. Les acompañamos por fases para que captar y dar de alta a nuevos socios sea automático.',
  url: 'https://moovhuesca.es',
  linkLabel: 'Ver la web de MOOV Huesca',
  status: 'Cliente activo',
  phases: [
    {
      label: 'Fase 1',
      state: 'done', // done | current | next
      title: 'Web y reservas automáticas',
      text: 'Web nueva con reserva online de clase de prueba, control de plazas por clase, recordatorios automáticos y contacto directo por WhatsApp.',
    },
    {
      label: 'Fase 2',
      state: 'current',
      title: 'Alta de socios automatizada',
      text: 'Alta de socios 100% automatizada: el nuevo socio rellena un formulario a medida, enlazado desde la web, completa el pago y ya puede reservar sus clases, sin que el centro tenga que intervenir.',
    },
    {
      label: 'Fase 3',
      state: 'next',
      title: 'Asistentes de IA',
      text: 'Asistentes de IA por WhatsApp y voz para resolver las dudas frecuentes.',
    },
  ],
  quote: '', // Testimonio pendiente de permiso: no se muestra nada mientras esté vacío
  author: '', // p. ej. 'Álvaro, MOOV Huesca'
};

// Titular de la web (aviso legal y política de privacidad)
export const OWNER = {
  name: 'Rafael José Jarillo Espejo',
  brand: 'MedElite IA',
  nif: '03474697H',
  address: 'Calle Angola 39, 45210 Yuncos (Toledo)',
  email: 'info@medeliteia.com',
  phone: '694 26 24 25',
  website: 'medeliteia.com',
};

// Páginas legales
export const LEGAL_LINKS = [
  { name: 'Aviso legal', href: '/aviso-legal' },
  { name: 'Política de privacidad', href: '/politica-privacidad' },
  { name: 'Política de cookies', href: '/politica-cookies' },
];

// Chat de GoHighLevel (LeadConnector), atendido por un asistente de IA. Se carga cuando la página ya está lista.
export const CHAT_WIDGET = {
  src: 'https://widgets.leadconnectorhq.com/loader.js',
  resourcesUrl: 'https://widgets.leadconnectorhq.com/chat-widget/loader.js',
  widgetId: '6abb92c703da7099e05de395',
};
