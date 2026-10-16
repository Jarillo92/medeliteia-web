// Textos comunes a las landings de sector. Cada sector escribe lo suyo; aquí solo va lo que no cambia
// (sin precios, sin cifras inventadas y solo GoHighLevel, Make y n8n como herramientas).

export const CHAT_BASE = {
  label: 'Pruébalo tú mismo',
  lead: 'Elige un mensaje y mira cómo contesta el asistente. Siempre se presenta como una IA.',
  note: 'Conversación de ejemplo con respuestas preparadas. El asistente real se adapta a tu negocio.',
  // Primera frase del asistente en cualquier conversación: siempre se presenta como IA
  intro: 'Hola, soy el asistente de {clinica} (una IA).',
};

export const PRODUCT_BASE = {
  label: 'El asistente, por dentro',
  free: 'Libre',
  via: 'por WhatsApp',
  metricsTitle: 'Esta semana',
  exampleTag: 'Ejemplo',
  note: 'Datos de ejemplo para enseñar cómo se ve. No son resultados de ningún negocio.',
};

export const CALCULATOR_BASE = {
  label: 'Calculadora',
  lead: 'Pon tus números. El cálculo se hace en tu navegador y no se guarda en ningún sitio.',
  formula: 'Mensajes por semana × 4,33 semanas × los que se responden tarde × los que habrían reservado.',
  disclaimer: 'Estimación con tus propios números, no una promesa de resultados.',
};

export const EXAMPLE_LINK = 'Te la enseñamos en la demo';

export const STEPS_BASE = {
  label: 'Cómo funciona',
  title: 'Tres pasos, sin permanencia',
  thirdTitle: 'Cuota mensual, sin permanencia',
  thirdText: 'Revisamos las conversaciones y ajustamos las respuestas. El precio es a consultar y te lo damos en la demo.',
};

export const FAQ_LABEL = 'Preguntas frecuentes';

export const BOOKING_BASE = {
  label: 'Demo gratuita',
  title: 'Reserva tu demo de 30 minutos',
};

// Pregunta común: precio a consultar
export const FAQ_PRICE = {
  q: '¿Cuánto cuesta y cuánto tarda?',
  a: 'El precio es a consultar: depende de tu agenda y de los canales que quieras conectar. En la demo te lo concretamos, junto con los plazos.',
};
