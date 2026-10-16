// Landing de clínicas veterinarias: /clinicas-veterinarias
// {clinica} se sustituye por "tu clínica" en el HTML prerenderizado, o por el nombre de ?c= en el navegador.
// El asistente informa, agenda y avisa al equipo: nunca diagnostica ni da consejo clínico.
import { BOOKING_BASE, CALCULATOR_BASE, CHAT_BASE, EXAMPLE_LINK, FAQ_LABEL, FAQ_PRICE, PRODUCT_BASE, STEPS_BASE } from './shared'

const veterinarias = {
  slug: 'clinicas-veterinarias',
  // Verde. Todos con contraste AA (ver CLAUDE.md).
  colors: { accent: '74 222 128', solid: '74 222 128', on: '5 7 12', deep: '8 30 19', ink: '22 101 52' },

  meta: {
    title: 'IA para clínicas veterinarias: citas por WhatsApp | MedElite IA',
    description:
      'Asistente de IA para clínicas veterinarias: contesta por WhatsApp, agenda citas, avisa al equipo en urgencias y recuerda vacunas. Pide tu demo gratuita.',
    breadcrumb: 'IA para clínicas veterinarias',
    ogImageAlt: 'Panel de MedElite IA con el asistente de IA en WhatsApp atendiendo y agendando citas',
  },

  service: {
    name: 'Asistente de IA en WhatsApp para clínicas veterinarias',
    serviceType: 'Asistente de IA para atención y citas por WhatsApp',
    audience: 'Clínicas veterinarias',
  },

  clinicFallback: 'tu clínica',
  chatTitleFallback: 'Tu clínica veterinaria',

  hero: {
    label: 'IA para clínicas veterinarias',
    titleLead: 'Tu clínica veterinaria',
    titleAccent: 'atendida por WhatsApp',
    titleTail: 'también de madrugada',
    subtitle:
      'Un asistente de IA contesta a los dueños, da cita y avisa a tu equipo cuando una mascota lo necesita. Tú te quedas con la consulta.',
    secondaryCta: 'Pruébalo tú mismo',
    floating: [
      { kind: 'message', title: 'Nuevo mensaje', text: '¿Mi gata puede vacunarse ya?', meta: '23:12' },
      { kind: 'booking', title: 'Cita confirmada', text: 'Sábado, 11:30' },
      { kind: 'reminder', title: 'Recordatorio enviado', text: 'Vacuna de Coco, mañana' },
    ],
  },

  leaks: {
    label: 'Dónde se escapan clientes',
    title: 'Cuatro momentos en los que una clínica veterinaria pierde clientes sin darse cuenta',
    items: [
      { icon: 'night', tag: '23:30', text: 'El dueño que escribe con la mascota mala y no recibe respuesta hasta la mañana.' },
      { icon: 'paw', tag: 'Vacunas', text: 'La vacuna o la desparasitación que se pasa de fecha porque nadie se lo recuerda.' },
      { icon: 'revisit', tag: 'Revisión anual', text: 'La revisión anual que el dueño quería hacer y se le va olvidando.' },
      { icon: 'quote', tag: 'Presupuesto', text: 'El presupuesto de una cirugía o de una castración que se queda sin seguimiento.' },
    ],
  },

  chat: {
    ...CHAT_BASE,
    title: 'Escríbele como lo haría un dueño',
    chipsTitle: 'Mensajes de dueños',
    userInitial: 'D',
    userLabel: 'Dueño',
    emptyHint: { before: 'Elige un mensaje de dueño', after: 'para empezar la conversación.' },
    scenarios: [
      {
        id: 'vacuna',
        question: 'Quiero pedir cita para la vacuna de mi perro',
        answer: 'Claro. Tengo hueco el jueves a las 17:30 o el viernes a las 10:00. ¿Cuál te viene mejor?',
        followUp: {
          option: 'Viernes a las 10:00',
          answer: 'Hecho: viernes a las 10:00. Te escribiré el día antes para confirmar. ¿Cómo se llama tu perro?',
          booking: { treatment: 'Vacuna anual', when: 'Viernes, 10:00' },
        },
      },
      {
        id: 'no-come',
        question: 'Mi perro no come desde ayer',
        answer:
          'Siento que esté así. Yo no puedo valorarlo ni darte consejo médico, pero sí avisar ahora al equipo de {clinica} para que te llamen lo antes posible. ¿Me dejas tu nombre y un teléfono?',
      },
      {
        id: 'cambio',
        question: 'Necesito cambiar la cita de mañana',
        answer: 'Sin problema. Veo huecos el miércoles a las 16:00 o el jueves a las 11:30. ¿Cuál prefieres?',
      },
      {
        id: 'castracion',
        question: 'Quiero un presupuesto para castrar a mi gata',
        answer:
          'El presupuesto depende del peso y de lo que indique el equipo tras verla, así que lo da la clínica. Puedo reservarte una visita corta para que te lo preparen. ¿Te lo agendo?',
      },
    ],
  },

  product: {
    ...PRODUCT_BASE,
    title: 'Tu agenda se llena mientras atiendes',
    lead: 'Cada conversación que termina en cita aparece en la agenda. Baja despacio y mira cómo se ocupan los huecos.',
    agendaTitleFallback: 'Agenda de tu clínica',
    day: 'Sábado',
    columns: ['Consulta 1', 'Consulta 2'],
    counterLabel: 'huecos ocupados',
    times: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'],
    // [fila, columna, motivo, mascota]: en orden de llenado
    bookings: [
      [0, 0, 'Vacuna anual', 'Luna, perra'],
      [2, 1, 'Revisión anual', 'Coco, gato'],
      [1, 0, 'Desparasitación', 'Thor, perro'],
      [4, 1, 'Primera visita', 'Nala, gatita'],
      [3, 0, 'Vacuna de cachorro', 'Toby, perro'],
      [6, 0, 'Control tras cirugía', 'Kira, perra'],
      [5, 1, 'Presupuesto de castración', 'Mía, gata'],
      [7, 1, 'Revisión anual', 'Bruno, perro'],
      [6, 1, 'Vacuna anual', 'Simba, gato'],
      [0, 1, 'Primera visita', 'Lola, perra'],
      [4, 0, 'Chip y cartilla', 'Rocky, perro'],
    ],
    metrics: [
      { id: 'conversations', label: 'Conversaciones atendidas', value: 31 },
      { id: 'bookings', label: 'Citas agendadas', value: 11 },
      { id: 'followups', label: 'Recordatorios enviados', value: 14 },
    ],
  },

  calculator: {
    ...CALCULATOR_BASE,
    title: '¿Cuántas citas se te escapan?',
    lead: 'Pon los números de tu clínica. El cálculo se hace en tu navegador y no se guarda en ningún sitio.',
    fields: [
      { id: 'messages', label: 'Mensajes de dueños por semana', min: 0, max: 400, step: 5, value: 50 },
      { id: 'late', label: 'De cada 100, cuántos se responden tarde o nunca', min: 0, max: 100, step: 1, value: 20 },
      { id: 'booked', label: 'De cada 10 sin respuesta, cuántos habrían reservado', hint: 'tu estimación', min: 0, max: 10, step: 1, value: 2 },
      { id: 'value', label: 'Valor medio de un cliente nuevo', hint: 'ajusta con tus datos', unit: '€', min: 0, max: 5000, step: 10, value: 60 },
    ],
    resultAppointments: 'Citas que se te escapan al mes',
    resultMoney: 'Lo que suponen al mes',
  },

  day: {
    label: 'Un día en tu clínica',
    title: 'Lo que hace el asistente mientras tu equipo atiende',
    items: [
      { icon: 'message', time: '23:10', text: 'Un dueño escribe porque su perro no come desde ayer. El asistente no diagnostica: avisa al equipo y le pide un teléfono.' },
      { icon: 'calendar', time: 'Al abrir', text: 'El equipo ve el aviso a primera hora y llama al dueño. Nadie se ha quedado sin respuesta.' },
      { icon: 'bell', time: 'El día anterior', text: 'Otro dueño recibe un recordatorio con la hora de la cita de su mascota.' },
      { icon: 'paw', time: 'Cuando toca', text: 'Si se acerca la fecha de una vacuna o una desparasitación, el asistente avisa y propone cita.' },
      { icon: 'file', time: 'Tras un presupuesto', text: 'A los pocos días, un mensaje amable por si al dueño le quedan dudas.' },
    ],
    note: 'La integración con tu agenda depende del software de tu clínica.',
  },

  steps: {
    label: STEPS_BASE.label,
    title: STEPS_BASE.title,
    items: [
      {
        title: 'Demo gratuita de 30 minutos',
        text: 'Te enseñamos el asistente funcionando con casos de clínica veterinaria y vemos cómo trabajáis hoy.',
      },
      {
        title: 'Puesta en marcha',
        text: 'Conectamos WhatsApp y tu agenda, y configuramos tus servicios, tus avisos de urgencia y tu tono. Trabajamos con GoHighLevel, Make y n8n.',
      },
      { title: STEPS_BASE.thirdTitle, text: STEPS_BASE.thirdText },
    ],
  },

  faq: {
    label: FAQ_LABEL,
    title: 'Lo que suelen preguntar las clínicas',
    items: [
      {
        q: '¿Puede decirle algo al dueño sobre la salud de su mascota?',
        a: 'No. El asistente no diagnostica, no da consejo clínico ni recomienda medicación. Informa, agenda y, si el dueño habla de síntomas o de una urgencia, avisa al equipo para que le llame cuanto antes.',
      },
      {
        q: '¿Qué pasa si escriben de madrugada?',
        a: 'El asistente contesta al momento y avisa al equipo con las reglas que acordemos. Si quieres, también indica al dueño el teléfono de la clínica. Qué se hace y a quién se avisa lo decides tú.',
      },
      {
        q: '¿Puede recordar vacunas y desparasitaciones?',
        a: 'Sí. Con las fechas de tu agenda, avisa al dueño cuando toca y le propone cita. Depende del software de tu clínica y lo vemos en la demo.',
      },
      {
        q: '¿El dueño sabe que habla con una IA?',
        a: 'Sí. El asistente siempre se presenta como asistente de IA de tu clínica y, antes de pedir ningún dato, enlaza la política de privacidad.',
      },
      FAQ_PRICE,
    ],
  },

  example: {
    title: 'Esta página también es un ejemplo.',
    text: 'El asistente, la calculadora y la agenda que acabas de ver son el tipo de web interactiva que montamos para cada clínica, con sus servicios y su forma de hablar.',
    link: EXAMPLE_LINK,
  },

  booking: {
    ...BOOKING_BASE,
    lead: 'Elige día y hora. Te enseñamos el asistente atendiendo a dueños de mascotas.',
    points: ['30 minutos, sin compromiso', 'Casos de clínica veterinaria, no genéricos', 'El precio para tu clínica, sin rodeos'],
  },
};

export default veterinarias;
