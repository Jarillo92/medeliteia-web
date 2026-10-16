// Landing de salones de belleza: /salones-de-belleza
// {clinica} se sustituye por "tu salón" en el HTML prerenderizado, o por el nombre de ?c= en el navegador.
import { BOOKING_BASE, CALCULATOR_BASE, CHAT_BASE, EXAMPLE_LINK, FAQ_LABEL, FAQ_PRICE, PRODUCT_BASE, STEPS_BASE } from './shared'

const salones = {
  slug: 'salones-de-belleza',
  // Ámbar. Todos con contraste AA (ver CLAUDE.md).
  colors: { accent: '251 191 36', solid: '251 191 36', on: '5 7 12', deep: '38 25 6', ink: '146 64 14' },

  meta: {
    title: 'IA para salones de belleza: reservas por WhatsApp | MedElite IA',
    description:
      'Asistente de IA para salones de belleza y peluquerías: reservas por WhatsApp sin descolgar, huecos libres y recordatorios. Pide tu demo gratuita.',
    breadcrumb: 'IA para salones de belleza',
    ogImageAlt: 'Panel de MedElite IA con el asistente de IA en WhatsApp atendiendo y agendando citas',
  },

  service: {
    name: 'Asistente de IA en WhatsApp para salones de belleza',
    serviceType: 'Asistente de IA para atención y citas por WhatsApp',
    audience: 'Salones de belleza y peluquerías',
  },

  clinicFallback: 'tu salón',
  chatTitleFallback: 'Tu salón de belleza',

  hero: {
    label: 'IA para salones de belleza',
    titleLead: 'Tu salón',
    titleAccent: 'atendido por WhatsApp',
    titleTail: 'mientras tienes las manos ocupadas',
    subtitle:
      'Un asistente de IA contesta, da cita y recuerda a tus clientes. Tú sigues con el color, el corte y la persona que tienes delante.',
    secondaryCta: 'Pruébalo tú mismo',
    floating: [
      { kind: 'message', title: 'Nuevo mensaje', text: '¿Tenéis hueco el sábado?', meta: '14:20' },
      { kind: 'booking', title: 'Cita confirmada', text: 'Sábado, 10:00' },
      { kind: 'reminder', title: 'Recordatorio enviado', text: 'Cita de mañana a las 10:00' },
    ],
  },

  leaks: {
    label: 'Dónde se escapan clientes',
    title: 'Cuatro momentos en los que un salón pierde citas sin darse cuenta',
    items: [
      { icon: 'night', tag: 'Manos ocupadas', text: 'El WhatsApp que llega mientras tienes las manos en un color y no puedes contestar.' },
      { icon: 'cancel', tag: 'Huecos', text: 'El hueco que se queda libre a última hora y del que nadie se entera.' },
      { icon: 'lapsed', tag: 'Ausencias', text: 'La clienta que no se presenta y deja el sillón vacío.' },
      { icon: 'revisit', tag: 'Te toca volver', text: 'La persona que ya debería volver para el retoque y no se acuerda.' },
    ],
  },

  chat: {
    ...CHAT_BASE,
    title: 'Escríbele como lo haría un cliente',
    chipsTitle: 'Mensajes de clientes',
    userInitial: 'C',
    userLabel: 'Cliente',
    emptyHint: { before: 'Elige un mensaje de cliente', after: 'para empezar la conversación.' },
    scenarios: [
      {
        id: 'corte-color',
        question: 'Quiero pedir cita para corte y color',
        answer: 'Genial. Para corte y color hace falta un buen rato, así que te busco hueco con tiempo. ¿Te va mejor el jueves a las 16:00 o el sábado a las 10:00?',
        followUp: {
          option: 'Sábado a las 10:00',
          answer: 'Hecho: sábado a las 10:00. Te escribiré el día antes para confirmar. ¿A qué nombre pongo la cita?',
          booking: { treatment: 'Corte y color', when: 'Sábado, 10:00' },
        },
      },
      {
        id: 'cambio',
        question: 'Necesito cambiar mi cita',
        answer: 'Claro. Veo huecos el miércoles a las 16:00 o el jueves a las 11:30. ¿Cuál prefieres?',
      },
      {
        id: 'mechas',
        question: '¿Cuánto cuestan unas mechas?',
        answer:
          'Depende del largo, de la cantidad de pelo y del trabajo que lleve, y lo concreta tu estilista. Puedo reservarte una consulta rápida para que te dé el precio exacto. ¿Te viene bien esta semana?',
      },
      {
        id: 'huecos',
        question: '¿Tenéis huecos esta semana?',
        answer: 'Sí. Ahora mismo veo el miércoles a las 12:00, el jueves a las 17:30 y el viernes a las 10:30. ¿Alguno te encaja?',
      },
    ],
  },

  product: {
    ...PRODUCT_BASE,
    title: 'Tu agenda se llena mientras trabajas',
    lead: 'Cada conversación que termina en cita ocupa un hueco del profesional que corresponde. Baja despacio y mira cómo se llena el día.',
    agendaTitleFallback: 'Agenda de tu salón',
    day: 'Viernes',
    // Un profesional por columna
    columns: ['Marta', 'Irene', 'Dani'],
    counterLabel: 'huecos ocupados',
    times: ['9:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00'],
    // [fila, columna, servicio]: en orden de llenado
    bookings: [
      [0, 0, 'Corte y color'],
      [1, 2, 'Corte'],
      [2, 1, 'Mechas'],
      [3, 0, 'Tinte de raíz'],
      [5, 1, 'Peinado'],
      [0, 2, 'Barba'],
      [4, 2, 'Corte'],
      [6, 0, 'Tratamiento'],
      [2, 0, 'Corte'],
      [5, 2, 'Corte y color'],
      [7, 1, 'Mechas'],
      [1, 1, 'Peinado'],
      [3, 2, 'Corte'],
      [6, 1, 'Corte y color'],
    ],
    metrics: [
      { id: 'conversations', label: 'Conversaciones atendidas', value: 42 },
      { id: 'bookings', label: 'Citas agendadas', value: 14 },
      { id: 'followups', label: 'Avisos de vuelta enviados', value: 12 },
    ],
  },

  calculator: {
    ...CALCULATOR_BASE,
    title: '¿Cuántas citas se te escapan?',
    lead: 'Pon los números de tu salón. El cálculo se hace en tu navegador y no se guarda en ningún sitio.',
    fields: [
      { id: 'messages', label: 'Mensajes de clientes por semana', min: 0, max: 400, step: 5, value: 80 },
      { id: 'late', label: 'De cada 100, cuántos se responden tarde o nunca', min: 0, max: 100, step: 1, value: 20 },
      { id: 'booked', label: 'De cada 10 sin respuesta, cuántos habrían reservado', hint: 'tu estimación', min: 0, max: 10, step: 1, value: 3 },
      { id: 'value', label: 'Valor medio de un cliente nuevo', hint: 'ajusta con tus datos', unit: '€', min: 0, max: 5000, step: 5, value: 35 },
    ],
    resultAppointments: 'Citas que se te escapan al mes',
    resultMoney: 'Lo que suponen al mes',
  },

  day: {
    label: 'Un día en tu salón',
    title: 'Lo que hace el asistente mientras tu equipo trabaja',
    items: [
      { icon: 'message', time: '14:20', text: 'Te escriben mientras tienes las manos en un color. El asistente contesta y propone un hueco.' },
      { icon: 'calendar', time: '14:25', text: 'La cita queda en la agenda de la estilista que corresponde, sin que nadie suelte el secador.' },
      { icon: 'scissors', time: 'Si se libera un hueco', text: 'El asistente puede ofrecérselo a quien lo había pedido.' },
      { icon: 'bell', time: 'El día anterior', text: 'El cliente recibe un recordatorio para confirmar o mover la cita.' },
      { icon: 'repeat', time: 'Cuando toca volver', text: 'Pasadas unas semanas, un aviso a quien suele repetir color o corte.' },
    ],
    note: 'La integración con tu agenda depende del software de tu salón.',
  },

  steps: {
    label: STEPS_BASE.label,
    title: STEPS_BASE.title,
    items: [
      {
        title: 'Demo gratuita de 30 minutos',
        text: 'Te enseñamos el asistente funcionando con casos de salón de belleza y vemos cómo trabajáis hoy.',
      },
      {
        title: 'Puesta en marcha',
        text: 'Conectamos WhatsApp y tu agenda, y configuramos tus servicios, tus profesionales y tu tono. Trabajamos con GoHighLevel, Make y n8n.',
      },
      { title: STEPS_BASE.thirdTitle, text: STEPS_BASE.thirdText },
    ],
  },

  faq: {
    label: FAQ_LABEL,
    title: 'Lo que suelen preguntar los salones',
    items: [
      {
        q: '¿Funciona si tengo varias estilistas?',
        a: 'Sí. El asistente conoce los servicios y la agenda de cada profesional y propone hueco con la persona adecuada. Cómo se reparte lo acordamos en la demo.',
      },
      {
        q: '¿Ayuda con las ausencias?',
        a: 'Envía un recordatorio antes de cada cita y permite confirmarla o moverla con un mensaje. Así es más fácil que avisen si no pueden venir. No prometemos una cifra concreta.',
      },
      {
        q: '¿Qué pasa si preguntan algo que no sabe?',
        a: 'Avisa al equipo y le dice al cliente que le escribirán. No se inventa precios ni servicios.',
      },
      {
        q: '¿El cliente sabe que habla con una IA?',
        a: 'Sí. El asistente siempre se presenta como asistente de IA de tu salón y, antes de pedir ningún dato, enlaza la política de privacidad.',
      },
      FAQ_PRICE,
    ],
  },

  example: {
    title: 'Esta página también es un ejemplo.',
    text: 'El asistente, la calculadora y la agenda que acabas de ver son el tipo de web interactiva que montamos para cada salón, con sus servicios y su forma de hablar.',
    link: EXAMPLE_LINK,
  },

  booking: {
    ...BOOKING_BASE,
    lead: 'Elige día y hora. Te enseñamos el asistente atendiendo a clientes de un salón de belleza.',
    points: ['30 minutos, sin compromiso', 'Casos de salón de belleza, no genéricos', 'El precio para tu salón, sin rodeos'],
  },
};

export default salones;
