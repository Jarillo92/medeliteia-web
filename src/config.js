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
      state: 'done', // done | current | soon
      title: 'Web y reservas automáticas',
      text: 'Web nueva con reserva online de clase de prueba, control de plazas por clase, recordatorios automáticos y contacto directo por WhatsApp.',
    },
    {
      label: 'Fase 2',
      state: 'done',
      title: 'Alta de socios automatizada',
      text: 'Alta de socios 100% automatizada: el nuevo socio rellena un formulario a medida, enlazado desde la web, completa el pago y ya puede reservar sus clases, sin que el centro tenga que intervenir.',
    },
    {
      label: 'Fase 3',
      state: 'soon',
      title: 'Asistentes de IA',
      text: 'Asistentes de IA por WhatsApp y voz para resolver las dudas frecuentes.',
    },
  ],
  // Testimonio real (reseña de Google), literal: no corregir ni recortar.
  quote: 'Somos una nueva empresa y estamos súper agradecidos, tanto del trato, el compromiso, lo profesionales y resolutivos que han sido con nosotros, la automatización de las cosas y la inmensa carga de trabajo que nos ha quitado, siempre encima sin necesidad de que les llames, antes de que le comentes un problema que te surja ya te han ofrecido una solución, personalmente creemos que hace falta más profesionales como estos, 100% recomendable, ya seas nuevo o lleves muchos años lo recomendamos, la mejor decisión que pudimos tomar fue contactar con ellos!!!!',
  author: 'Lucas y Álvaro · MOOV Huesca',
  source: 'Reseña en Google · 5 estrellas', // sin enlace: no hay URL pública de la reseña
};

// Hueco de prueba social para la landing de clínicas dentales (/clinicas-dentales).
// Se muestra solo cuando haya permiso de una clínica real y name y quote tengan texto. Nunca inventar testimonios ni cifras.
export const DENTAL_PROOF = {
  name: '', // p. ej. 'Clínica Dental Sol'
  quote: '',
  author: '', // p. ej. 'Dra. Ana Pérez, directora'
  url: '', // opcional
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
