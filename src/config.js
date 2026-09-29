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
  name: 'MOOV Huesca',
  place: 'Gimnasio de Pilates y entrenamiento de fuerza en Huesca',
  status: 'Cliente activo',
  phases: [
    {
      label: 'Fase 1',
      state: 'done', // done | current | next
      title: 'Web y reservas automáticas',
      text: 'Web completa con reserva automatizada de clases de prueba gratis desde el calendario, control de plazas por clase, recordatorios automáticos y botón de WhatsApp.',
    },
    {
      label: 'Fase 2',
      state: 'current',
      title: 'Alta de socios y pagos',
      text: 'Alta de socios con formulario automatizado (aceptación de contrato y políticas), pago online y activación automática del bono comprado para que puedan reservar sus clases.',
    },
    {
      label: 'Fase 3',
      state: 'next',
      title: 'Asistentes de IA',
      text: 'Asistentes de IA para atender y gestionar reservas.',
    },
  ],
  quote: null, // Frase de Álvaro, pendiente
  author: null, // p. ej. 'Álvaro, MOOV Huesca'
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
