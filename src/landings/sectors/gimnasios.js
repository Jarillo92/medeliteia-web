// Landing de gimnasios y centros deportivos: /gimnasios-y-centros-deportivos
// {clinica} se sustituye por "tu centro" en el HTML prerenderizado, o por el nombre de ?c= en el navegador.
// Caso MOOV Huesca: solo "alta de socios automatizada". Sin precios, contratos, bonos, herramientas ni pagos.
import { BOOKING_BASE, CALCULATOR_BASE, CHAT_BASE, EXAMPLE_LINK, FAQ_LABEL, FAQ_PRICE, PRODUCT_BASE, STEPS_BASE } from './shared'

const gimnasios = {
  slug: 'gimnasios-y-centros-deportivos',
  // Lima. Todos con contraste AA (ver CLAUDE.md).
  colors: { accent: '163 230 53', solid: '163 230 53', on: '5 7 12', deep: '22 30 6', ink: '63 98 18' },

  meta: {
    title: 'IA para gimnasios y centros deportivos | MedElite IA',
    description:
      'Asistente de IA para gimnasios y centros deportivos: contesta por WhatsApp, reserva clases de prueba y automatiza el alta de socios. Pide tu demo gratuita.',
    breadcrumb: 'IA para gimnasios y centros deportivos',
    ogImageAlt: 'Panel de MedElite IA con el asistente de IA en WhatsApp atendiendo y agendando reservas',
  },

  service: {
    name: 'Asistente de IA en WhatsApp para gimnasios y centros deportivos',
    serviceType: 'Asistente de IA para atención, reservas y altas por WhatsApp',
    audience: 'Gimnasios y centros deportivos',
  },

  clinicFallback: 'tu centro',
  chatTitleFallback: 'Tu centro deportivo',

  hero: {
    label: 'IA para gimnasios y centros deportivos',
    titleLead: 'Tu gimnasio',
    titleAccent: 'atendido por WhatsApp',
    titleTail: 'también fuera de horario',
    subtitle:
      'Un asistente de IA resuelve dudas, reserva clases de prueba y da el alta a nuevos socios. Tu equipo se queda con la sala.',
    secondaryCta: 'Pruébalo tú mismo',
    floating: [
      { kind: 'message', title: 'Nuevo mensaje', text: '¿Hay plaza a las 19:00?', meta: '21:32' },
      { kind: 'booking', title: 'Clase reservada', text: 'Martes, 19:00' },
      { kind: 'reminder', title: 'Recordatorio enviado', text: 'Clase de mañana a las 19:00' },
    ],
  },

  leaks: {
    label: 'Dónde se escapan socios',
    title: 'Cuatro momentos en los que un centro pierde socios sin darse cuenta',
    items: [
      { icon: 'night', tag: '21:30', text: 'La persona que pregunta por clases y horarios cuando ya has cerrado.' },
      { icon: 'cancel', tag: 'Clase de prueba', text: 'La clase de prueba que no llega a reservarse porque nadie contesta a tiempo.' },
      { icon: 'quote', tag: 'El alta', text: 'El alta que se queda a medias entre papeles, formularios y mensajes.' },
      { icon: 'lapsed', tag: 'Dejó de venir', text: 'El socio que deja de reservar y al que nadie pregunta qué ha pasado.' },
    ],
  },

  chat: {
    ...CHAT_BASE,
    title: 'Escríbele como lo haría un socio',
    chipsTitle: 'Mensajes de socios',
    userInitial: 'S',
    userLabel: 'Socio',
    emptyHint: { before: 'Elige un mensaje de socio', after: 'para empezar la conversación.' },
    scenarios: [
      {
        id: 'prueba',
        question: 'Quiero hacer una clase de prueba',
        answer: 'Genial. Tengo plaza el martes a las 19:00 o el jueves a las 10:00. ¿Cuál prefieres?',
        followUp: {
          option: 'Martes a las 19:00',
          answer: 'Hecho: martes a las 19:00. Te escribiré el día antes para confirmar. ¿A qué nombre pongo la reserva?',
          booking: { treatment: 'Clase de prueba', when: 'Martes, 19:00' },
        },
      },
      {
        id: 'info',
        question: '¿Qué clases tenéis y a qué horas?',
        answer: 'Hay clases de mañana y de tarde, de lunes a viernes, y alguna el sábado. Dime qué te interesa y te paso los horarios y las plazas libres.',
      },
      {
        id: 'alta',
        question: '¿Cómo me doy de alta?',
        answer: 'Te mando un enlace al formulario de alta. Lo rellenas desde el móvil y, al terminar, ya puedes reservar tus clases. ¿Te lo envío?',
      },
      {
        id: 'cambio',
        question: 'Necesito cambiar mi clase de mañana',
        answer: 'Claro. Hay plaza en la de las 18:00 y en la de las 19:30. ¿Cuál prefieres?',
      },
    ],
  },

  // Parrilla de clases con plazas libres: cada reserva ocupa una plaza de su clase.
  product: {
    ...PRODUCT_BASE,
    kind: 'classes',
    title: 'Tus clases se llenan mientras entrenas',
    lead: 'Cada conversación que termina en reserva ocupa una plaza. Baja despacio y mira cómo se llenan las clases.',
    agendaTitlePrefix: 'Clases',
    agendaTitleFallback: 'Clases de tu centro',
    day: 'Lunes',
    counterLabel: 'plazas ocupadas',
    liveLabel: 'según la parrilla',
    classLabels: { freeOne: 'plaza libre', freeMany: 'plazas libres', full: 'Completa' },
    classes: [
      { time: '9:00', name: 'Pilates', capacity: 8, base: 3 },
      { time: '10:00', name: 'Fuerza', capacity: 10, base: 5 },
      { time: '12:00', name: 'Movilidad', capacity: 8, base: 2 },
      { time: '17:30', name: 'Funcional', capacity: 12, base: 6 },
      { time: '19:00', name: 'Pilates', capacity: 8, base: 5 },
      { time: '20:00', name: 'Fuerza', capacity: 10, base: 4 },
    ],
    // Clase (índice en `classes`) que ocupa cada reserva, en orden de llenado
    bookings: [3, 0, 4, 1, 3, 5, 0, 2, 4, 3, 5],
    metrics: [
      { id: 'conversations', label: 'Consultas atendidas', value: 29 },
      { id: 'bookings', label: 'Reservas de clase', value: 11 },
      { id: 'followups', label: 'Clases de prueba reservadas', value: 6 },
    ],
  },

  calculator: {
    ...CALCULATOR_BASE,
    title: '¿Cuántos socios se te escapan?',
    lead: 'Pon los números de tu centro. El cálculo se hace en tu navegador y no se guarda en ningún sitio.',
    fields: [
      { id: 'messages', label: 'Consultas por semana', min: 0, max: 400, step: 5, value: 40 },
      { id: 'late', label: 'De cada 100, cuántas se responden tarde o nunca', min: 0, max: 100, step: 1, value: 25 },
      { id: 'booked', label: 'De cada 10 sin respuesta, cuántas habrían acabado en alta', hint: 'tu estimación', min: 0, max: 10, step: 1, value: 2 },
      { id: 'value', label: 'Valor medio de un socio nuevo', hint: 'ajusta con tus datos', unit: '€', min: 0, max: 5000, step: 10, value: 250 },
    ],
    resultAppointments: 'Socios que se te escapan al mes',
    resultMoney: 'Lo que suponen al mes',
  },

  day: {
    label: 'Un día en tu centro',
    title: 'Lo que hace el asistente mientras tu equipo está en la sala',
    items: [
      { icon: 'message', time: '21:30', text: 'Alguien pregunta por clases y horarios con el centro cerrado. El asistente responde y le ofrece una clase de prueba.' },
      { icon: 'calendar', time: '21:40', text: 'La clase de prueba queda reservada, con su plaza, sin que nadie del equipo toque el móvil.' },
      { icon: 'bell', time: 'El día anterior', text: 'Recibe un recordatorio con la hora de la clase.' },
      { icon: 'userPlus', time: 'Si le ha gustado', text: 'Se da de alta con un formulario desde el móvil, sin pasar por recepción.' },
      { icon: 'dumbbell', time: 'Si deja de venir', text: 'Un mensaje cercano a quien lleva un tiempo sin reservar, para saber si necesita algo.' },
    ],
    note: 'La integración con tu sistema de reservas depende del software de tu centro.',
  },

  // Caso real. Los datos de MOOV salen de MOOV_CASE (src/config.js); aquí solo el texto propio.
  case: {
    label: 'Caso real',
    title: 'Ya funciona en un centro de verdad',
    point: {
      title: 'Alta de socios automatizada',
      text: 'El nuevo socio se da de alta desde la web del centro y ya puede reservar sus clases, sin que el equipo tenga que intervenir.',
    },
  },

  steps: {
    label: STEPS_BASE.label,
    title: STEPS_BASE.title,
    items: [
      {
        title: 'Demo gratuita de 30 minutos',
        text: 'Te enseñamos el asistente funcionando con casos de gimnasio y centro deportivo y vemos cómo trabajáis hoy.',
      },
      {
        title: 'Puesta en marcha',
        text: 'Conectamos WhatsApp, tus clases y el alta de socios, y configuramos tu tono. Trabajamos con GoHighLevel, Make y n8n.',
      },
      { title: STEPS_BASE.thirdTitle, text: STEPS_BASE.thirdText },
    ],
  },

  faq: {
    label: FAQ_LABEL,
    title: 'Lo que suelen preguntar los centros',
    items: [
      {
        q: '¿Puede dar de alta a un socio sin que intervenga nadie?',
        a: 'Sí, es lo que hemos montado en MOOV Huesca: el nuevo socio se da de alta desde la web y ya puede reservar sus clases. Cómo encaja en tu centro lo vemos en la demo.',
      },
      {
        q: '¿Reserva clases y controla las plazas?',
        a: 'Puede reservar, cambiar y cancelar clases por WhatsApp según las plazas libres. Depende del sistema de reservas que uses y lo vemos en la demo.',
      },
      {
        q: '¿Qué hace con los socios que dejan de venir?',
        a: 'Les escribe un mensaje cercano para saber si necesitan algo y les propone una clase. No podemos prometer que vuelvan, pero nadie se queda sin que le pregunten.',
      },
      {
        q: '¿El socio sabe que habla con una IA?',
        a: 'Sí. El asistente siempre se presenta como asistente de IA de tu centro y, antes de pedir ningún dato, enlaza la política de privacidad.',
      },
      FAQ_PRICE,
    ],
  },

  example: {
    title: 'Esta página también es un ejemplo.',
    text: 'El asistente, la calculadora y la parrilla de clases que acabas de ver son el tipo de web interactiva que montamos para cada centro, con sus clases y su forma de hablar.',
    link: EXAMPLE_LINK,
    agendaLabel: 'Clases',
  },

  booking: {
    ...BOOKING_BASE,
    lead: 'Elige día y hora. Te enseñamos el asistente atendiendo a socios de un gimnasio o centro deportivo.',
    points: ['30 minutos, sin compromiso', 'Casos de gimnasio y centro deportivo, no genéricos', 'El precio para tu centro, sin rodeos'],
  },
};

export default gimnasios;
