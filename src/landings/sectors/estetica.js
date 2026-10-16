// Landing de centros de estética: /centros-de-estetica
// {clinica} se sustituye por "tu centro" en el HTML prerenderizado, o por el nombre de ?c= en el navegador.
// El asistente informa y agenda: no recomienda tratamientos ni promete resultados.
import { BOOKING_BASE, CALCULATOR_BASE, CHAT_BASE, EXAMPLE_LINK, FAQ_LABEL, FAQ_PRICE, PRODUCT_BASE, STEPS_BASE } from './shared'

const estetica = {
  slug: 'centros-de-estetica',
  // Rosa / magenta. Todos con contraste AA (ver CLAUDE.md).
  colors: { accent: '244 114 182', solid: '244 114 182', on: '5 7 12', deep: '38 10 26', ink: '157 23 77' },

  meta: {
    title: 'IA para centros de estética: citas por WhatsApp | MedElite IA',
    description:
      'Asistente de IA para centros de estética: responde dudas y precios por WhatsApp, agenda valoraciones y recuerda citas. Pide tu demo gratuita de 30 minutos.',
    breadcrumb: 'IA para centros de estética',
    ogImageAlt: 'Panel de MedElite IA con el asistente de IA en WhatsApp atendiendo y agendando citas',
  },

  service: {
    name: 'Asistente de IA en WhatsApp para centros de estética',
    serviceType: 'Asistente de IA para atención y citas por WhatsApp',
    audience: 'Centros de estética',
  },

  clinicFallback: 'tu centro',
  chatTitleFallback: 'Tu centro de estética',

  hero: {
    label: 'IA para centros de estética',
    titleLead: 'Tu centro de estética',
    titleAccent: 'atendido por WhatsApp',
    titleTail: 'mientras estás en cabina',
    subtitle:
      'Un asistente de IA responde dudas y precios, agenda valoraciones y recuerda las citas. Tu equipo se queda con la cabina.',
    secondaryCta: 'Pruébalo tú mismo',
    floating: [
      { kind: 'message', title: 'Nuevo mensaje', text: '¿Cuánto cuesta el facial?', meta: '21:50' },
      { kind: 'booking', title: 'Valoración confirmada', text: 'Martes, 17:00' },
      { kind: 'reminder', title: 'Recordatorio enviado', text: 'Cita de mañana a las 17:00' },
    ],
  },

  leaks: {
    label: 'Dónde se escapan clientas',
    title: 'Cuatro momentos en los que un centro de estética pierde clientas sin darse cuenta',
    items: [
      { icon: 'night', tag: '21:50', text: 'La clienta que pregunta por un tratamiento fuera de horario y acaba reservando en otro centro.' },
      { icon: 'cancel', tag: 'Ausencias', text: 'La cita a la que nadie viene y que deja la cabina vacía.' },
      { icon: 'quote', tag: 'Seguimiento', text: 'La clienta a la que nadie vuelve a escribir después del tratamiento para saber cómo ha ido.' },
      { icon: 'lapsed', tag: 'Dejó de venir', text: 'La clienta de siempre que se fue apartando y nunca recibió un mensaje.' },
    ],
  },

  chat: {
    ...CHAT_BASE,
    title: 'Escríbele como lo haría una clienta',
    chipsTitle: 'Mensajes de clientas',
    userInitial: 'C',
    userLabel: 'Clienta',
    emptyHint: { before: 'Elige un mensaje de clienta', after: 'para empezar la conversación.' },
    scenarios: [
      {
        id: 'precio',
        question: '¿Cuánto cuesta un tratamiento facial?',
        answer:
          'El precio depende del tratamiento y de lo que necesite tu piel, y eso se concreta en una valoración. ¿Te viene mejor el martes a las 17:00 o el miércoles a las 11:00?',
        followUp: {
          option: 'Martes a las 17:00',
          answer: 'Hecho: martes a las 17:00. Te escribiré el día antes para confirmar. ¿A qué nombre pongo la cita?',
          booking: { treatment: 'Valoración facial', when: 'Martes, 17:00' },
        },
      },
      {
        id: 'valoracion',
        question: 'Quiero pedir una valoración',
        answer:
          'Perfecto. La valoración la hace el equipo en el centro y no te compromete a nada. Tengo hueco el jueves a las 12:00 o el viernes a las 16:30. ¿Cuál prefieres?',
      },
      {
        id: 'cambio',
        question: 'Necesito cambiar mi cita de mañana',
        answer: 'Claro. Veo huecos el miércoles a las 16:00 o el jueves a las 11:30. ¿Cuál prefieres?',
      },
      {
        id: 'revision',
        question: '¿Cada cuánto me toca la revisión?',
        answer:
          'Eso lo decide el equipo según tu tratamiento, así que prefiero no adelantarte nada. Puedo reservarte una revisión para que te lo expliquen en persona. ¿Te va bien la semana que viene?',
      },
    ],
  },

  product: {
    ...PRODUCT_BASE,
    title: 'Tu agenda se llena mientras atiendes',
    lead: 'Cada conversación que termina en cita aparece en la agenda, con su tratamiento y su duración. Baja despacio y mira cómo se ocupan los huecos.',
    agendaTitleFallback: 'Agenda de tu centro',
    day: 'Martes',
    columns: ['Cabina 1', 'Cabina 2'],
    counterLabel: 'huecos ocupados',
    times: ['9:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00'],
    // [fila, columna, tratamiento, duración]: en orden de llenado
    bookings: [
      [0, 0, 'Valoración facial', '30 min'],
      [2, 1, 'Limpieza facial', '60 min'],
      [1, 0, 'Manicura', '45 min'],
      [6, 1, 'Valoración corporal', '30 min'],
      [3, 0, 'Masaje relajante', '60 min'],
      [5, 1, 'Depilación, piernas', '45 min'],
      [7, 0, 'Revisión de tratamiento', '20 min'],
      [4, 1, 'Tratamiento corporal', '60 min'],
      [6, 0, 'Pedicura', '60 min'],
      [0, 1, 'Valoración facial', '30 min'],
      [5, 0, 'Limpieza facial', '60 min'],
    ],
    metrics: [
      { id: 'conversations', label: 'Consultas atendidas', value: 34 },
      { id: 'bookings', label: 'Citas agendadas', value: 11 },
      { id: 'followups', label: 'Recordatorios enviados', value: 17 },
    ],
  },

  calculator: {
    ...CALCULATOR_BASE,
    title: '¿Cuántas clientas se te escapan?',
    lead: 'Pon los números de tu centro. El cálculo se hace en tu navegador y no se guarda en ningún sitio.',
    fields: [
      { id: 'messages', label: 'Mensajes de clientas por semana', min: 0, max: 400, step: 5, value: 40 },
      { id: 'late', label: 'De cada 100, cuántos se responden tarde o nunca', min: 0, max: 100, step: 1, value: 25 },
      { id: 'booked', label: 'De cada 10 sin respuesta, cuántos habrían reservado', hint: 'tu estimación', min: 0, max: 10, step: 1, value: 2 },
      { id: 'value', label: 'Valor medio de una clienta nueva', hint: 'ajusta con tus datos', unit: '€', min: 0, max: 5000, step: 10, value: 80 },
    ],
    resultAppointments: 'Citas que se te escapan al mes',
    resultMoney: 'Lo que suponen al mes',
  },

  day: {
    label: 'Un día en tu centro',
    title: 'Lo que hace el asistente mientras tu equipo está en cabina',
    items: [
      { icon: 'message', time: '21:50', text: 'Una clienta pregunta por un tratamiento. El asistente le explica cómo funciona la valoración y le propone un hueco.' },
      { icon: 'calendar', time: '22:05', text: 'La valoración queda en la agenda sin que nadie del centro toque el móvil.' },
      { icon: 'bell', time: 'El día anterior', text: 'La clienta recibe un recordatorio para confirmar la cita o moverla si no puede venir.' },
      { icon: 'sparkles', time: 'Tras el tratamiento', text: 'Un mensaje amable para preguntar cómo ha ido y ofrecerle una revisión con el equipo.' },
      { icon: 'repeat', time: 'Si hace meses que no viene', text: 'Un mensaje cercano para retomar su cuidado, sin presionar.' },
    ],
    note: 'La integración con tu agenda depende del software de tu centro.',
  },

  steps: {
    label: STEPS_BASE.label,
    title: STEPS_BASE.title,
    items: [
      {
        title: 'Demo gratuita de 30 minutos',
        text: 'Te enseñamos el asistente funcionando con casos de centro de estética y vemos cómo trabajáis hoy.',
      },
      {
        title: 'Puesta en marcha',
        text: 'Conectamos WhatsApp y tu agenda, y configuramos tus tratamientos y tu tono. Trabajamos con GoHighLevel, Make y n8n.',
      },
      { title: STEPS_BASE.thirdTitle, text: STEPS_BASE.thirdText },
    ],
  },

  faq: {
    label: FAQ_LABEL,
    title: 'Lo que suelen preguntar los centros',
    items: [
      {
        q: '¿Da precios y recomienda tratamientos?',
        a: 'Da la información que tú decidas compartir. No recomienda tratamientos ni promete resultados: para eso está la valoración con tu equipo. Si un precio no está cerrado, lo deja a consultar.',
      },
      {
        q: '¿Ayuda con las ausencias?',
        a: 'Envía un recordatorio antes de cada cita y permite confirmarla o moverla con un mensaje. No podemos prometer una cifra concreta, pero sí que nadie se entere tarde de que tenía cita.',
      },
      {
        q: '¿Y si la clienta prefiere hablar con una persona?',
        a: 'El asistente avisa al equipo y le dice a la clienta que alguien le escribirá. Tú decides en qué casos se pasa a una persona.',
      },
      {
        q: '¿La clienta sabe que habla con una IA?',
        a: 'Sí. El asistente siempre se presenta como asistente de IA de tu centro y, antes de pedir ningún dato, enlaza la política de privacidad.',
      },
      FAQ_PRICE,
    ],
  },

  example: {
    title: 'Esta página también es un ejemplo.',
    text: 'El asistente, la calculadora y la agenda que acabas de ver son el tipo de web interactiva que montamos para cada centro, con sus tratamientos y su forma de hablar.',
    link: EXAMPLE_LINK,
  },

  booking: {
    ...BOOKING_BASE,
    lead: 'Elige día y hora. Te enseñamos el asistente atendiendo a clientas de un centro de estética.',
    points: ['30 minutos, sin compromiso', 'Casos de centro de estética, no genéricos', 'El precio para tu centro, sin rodeos'],
  },
};

export default estetica;
