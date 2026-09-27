// Datos de contacto y llamadas a la acción compartidos por toda la web
export const DEMO_HREF = '#contacto';
export const DEMO_LABEL = 'Reservar demo gratuita';

export const WHATSAPP_NUMBER_LABEL = '+34 694 26 24 25';
export const WHATSAPP_URL = 'https://wa.me/34694262425';

// Cambiar a true cuando el agente de IA atienda el número de WhatsApp de la web.
// Muestra el botón "Pruébalo tú mismo: escríbele a nuestro asistente".
export const ASSISTANT_LIVE = false;
export const ASSISTANT_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('Hola, quiero probar el asistente')}`;
