// Página /calculadora: calculadora general de "clientes que se te escapan al mes" para cualquier negocio con agenda.
// No es un sector: no se registra en SECTORS (el pie de las landings enlaza solo a sectores).

const calculadora = {
  slug: 'calculadora',

  // Azul de la web (accent #5B8CFF, solid #2F6BFF), en canales RGB para las variables --sector-*
  colors: {
    accent: '91 140 255',
    solid: '47 107 255',
    on: '255 255 255',
    deep: '10 22 51',
    ink: '30 70 190',
  },

  meta: {
    title: 'Calculadora de clientes perdidos por WhatsApp | MedElite IA',
    description:
      'Calcula cuántos clientes y euros se te escapan al mes por contestar tarde en WhatsApp. Para clínicas, veterinarias, estética, peluquerías y gimnasios. Sin registro.',
    breadcrumb: 'Calculadora de clientes perdidos',
    ogImageAlt: 'Panel de MedElite IA con el asistente de IA en WhatsApp atendiendo y agendando citas',
  },

  // Nodo principal del JSON-LD (sin reseñas ni valoraciones)
  schema: {
    '@type': 'WebApplication',
    name: 'Calculadora de clientes perdidos por WhatsApp',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'es',
    areaServed: 'ES',
  },

  hero: {
    label: 'Calculadora',
    titleLead: '¿Cuántos clientes se te escapan',
    titleAccent: 'al mes',
    titleTail: 'por contestar tarde?',
    subtitle:
      'Para clínicas, veterinarias, centros de estética, peluquerías, gimnasios y cualquier negocio que viva de su agenda. Pon tus números y míralo en 20 segundos.',
    cta: 'Calcular ahora',
  },

  calculator: {
    title: 'Pon tus números',
    fields: [
      { id: 'messages', label: 'Mensajes de WhatsApp al día', unit: 'mensajes', min: 1, max: 100, step: 1, value: 8 },
      { id: 'late', label: 'Los que se contestan tarde', unit: '%', min: 0, max: 100, step: 5, value: 25, hint: 'Fuera de horario, con prisas o al día siguiente' },
      { id: 'value', label: 'Valor medio de una cita', unit: '€', min: 5, max: 500, step: 5, value: 60 },
    ],
    // Hipótesis ajustable: de cada 10 mensajes contestados tarde, cuántos habrían acabado en cita
    assumption: { id: 'booked', label: 'De cada 10 que escriben tarde, cuántos habrían reservado', min: 0, max: 10, step: 1, value: 2 },
    resultTag: 'Estimación',
    resultMoney: 'Euros que se te escapan al mes',
    resultAppointments: 'Clientes al mes',
    note: 'Es una estimación: depende de los datos que has introducido y no es una promesa de resultados.',
    formula: 'Mensajes al día × 7 días × 4,33 semanas × los que se contestan tarde × los que habrían reservado × valor de la cita.',
    privacy: 'El cálculo se hace en tu navegador.',
    cta: 'Quiero que me lo calculen con mi caso',
    instagramPre: 'O escríbeme',
    instagramKeyword: 'PRUEBA',
    instagramPost: 'por Instagram',
    instagramHandle: '@rafajarillo',
    instagramUrl: 'https://www.instagram.com/rafajarillo/',
  },

  form: {
    title: 'Te envío el resultado',
    lead: 'Déjame tu nombre y tu email y te lo mando para que lo tengas.',
    consent: 'Acepto que MedElite IA use mi nombre y email para enviarme este resultado y contactar conmigo sobre ello.',
    privacyLabel: 'Política de privacidad',
    privacyHref: '/politica-privacidad',
    submit: 'Enviar el resultado',
    sending: 'Enviando…',
    ok: 'Enviado. Revisa tu correo en unos minutos.',
    error: 'No hemos podido enviarlo. Inténtalo de nuevo o escríbenos a info@medeliteia.com.',
  },

  why: {
    title: 'Por qué se pierden clientes por responder tarde',
    text: [
      'Quien escribe a un negocio por WhatsApp suele querer reservar en ese momento. Si la respuesta tarda horas, o llega al día siguiente, puede que ya haya preguntado en otro sitio.',
      'Los mensajes que entran fuera de horario, en pleno turno o durante el fin de semana son los que más se quedan esperando.',
      'Esta calculadora no mide tu negocio: pone cifras a tus propios datos para que veas el orden de magnitud. Cada negocio es distinto.',
      'Un asistente de IA puede contestar al momento y proponer hueco en la agenda; en la demo de 30 minutos vemos cómo sería en tu caso.',
    ],
    sectorsLead: 'Mira cómo se ve en tu sector',
  },
};

export default calculadora
