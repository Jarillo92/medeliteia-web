// Landing de clínicas dentales: /clinicas-dentales
// {clinica} se sustituye por "tu clínica" en el HTML prerenderizado, o por el nombre de ?c= en el navegador.
// Sin precios, sin cifras inventadas y solo GoHighLevel, Make y n8n como herramientas.

const dental = {
  slug: 'clinicas-dentales',
  // Acento del sector en canales RGB (variable CSS --sector). Dental usa el azul de la web.
  accent: '91 140 255',

  meta: {
    title: 'IA para clínicas dentales: citas por WhatsApp | MedElite IA',
    description:
      'Asistente de IA para clínicas dentales: contesta por WhatsApp, agenda citas y sigue los presupuestos. Pide una demo gratuita de 30 minutos.',
    breadcrumb: 'IA para clínicas dentales',
    ogImageAlt: 'Panel de MedElite IA con el asistente de IA en WhatsApp atendiendo y agendando citas',
  },

  // Datos del Service en JSON-LD
  service: {
    name: 'Asistente de IA en WhatsApp para clínicas dentales',
    serviceType: 'Asistente de IA para atención y citas por WhatsApp',
    audience: 'Clínicas dentales privadas',
  },

  // Nombre genérico (HTML del servidor) y cabecera del chat cuando no hay ?c=
  clinicFallback: 'tu clínica',
  chatTitleFallback: 'Tu clínica dental',

  hero: {
    label: 'IA para clínicas dentales',
    // H1 en tres partes: la primera se sustituye por el nombre en modo demo y la segunda va en el color del sector
    titleLead: 'Tu clínica dental',
    titleAccent: 'atendida por WhatsApp',
    titleTail: 'a cualquier hora',
    subtitle:
      'Un asistente de IA responde a tus pacientes, les da cita y les hace seguimiento. Tu equipo se queda con lo que importa: el sillón.',
    secondaryCta: 'Pruébalo tú mismo',
    // Tarjetas flotantes alrededor del teléfono (ejemplos de lo que hace el asistente)
    floating: [
      { kind: 'message', title: 'Nuevo mensaje', text: '¿Tenéis hueco esta semana?', meta: '22:41' },
      { kind: 'booking', title: 'Cita confirmada', text: 'Viernes, 10:00' },
      { kind: 'reminder', title: 'Recordatorio enviado', text: 'Cita de mañana a las 10:00' },
    ],
  },

  leaks: {
    label: 'Dónde se escapan pacientes',
    title: 'Cuatro momentos en los que una clínica pierde pacientes sin darse cuenta',
    items: [
      { tag: '22:00', text: 'El paciente que escribe a las 22:00 y no recibe respuesta hasta mañana.' },
      { tag: 'Presupuesto', text: 'El presupuesto de ortodoncia o implantes que nadie vuelve a mencionar.' },
      { tag: 'Revisión', text: 'La limpieza que se pasó de fecha y nadie recuerda.' },
      { tag: 'Cancelación', text: 'El hueco que deja una cita cancelada a última hora.' },
    ],
  },

  chat: {
    label: 'Pruébalo tú mismo',
    title: 'Escríbele como lo haría un paciente',
    lead: 'Elige un mensaje y mira cómo contesta el asistente. Siempre se presenta como una IA.',
    note: 'Conversación de ejemplo con respuestas preparadas. El asistente real se adapta a tu clínica.',
    // Primera frase del asistente en cualquier conversación: siempre se presenta como IA
    intro: 'Hola, soy el asistente de {clinica} (una IA).',
    scenarios: [
      {
        id: 'limpieza',
        question: '¿Cuánto cuesta una limpieza?',
        answer:
          'Una limpieza depende de si necesitas la básica o tratamiento de encías, y eso se ve en la valoración. ¿Te viene mejor jueves a las 17:30 o viernes a las 10:00?',
        followUp: {
          option: 'Viernes a las 10:00',
          answer: 'Hecho: viernes a las 10:00. Te escribiré el día antes para confirmar. ¿A qué nombre pongo la cita?',
          booking: { treatment: 'Valoración y limpieza', when: 'Viernes, 10:00' },
        },
      },
      {
        id: 'dolor',
        question: 'Me duele una muela desde ayer',
        answer:
          'Siento que tengas dolor. Yo no puedo valorarlo, pero sí avisar ahora al equipo de {clinica} para que te llamen lo antes posible. ¿Me dejas tu nombre y un teléfono?',
      },
      {
        id: 'cambio',
        question: 'Necesito cambiar mi cita de mañana',
        answer: 'Claro. Veo huecos el miércoles a las 16:00 o el jueves a las 11:30. ¿Cuál prefieres?',
      },
      {
        id: 'ortodoncia',
        question: 'Me dieron un presupuesto de ortodoncia y lo estoy pensando',
        answer:
          'Normal, es una decisión importante. Si te ayuda, puedo reservarte una visita corta con el equipo para resolver dudas sin compromiso. ¿Te lo preparo?',
      },
    ],
  },

  // Mockups de producto: agenda que se llena al hacer scroll y panel de métricas. Todo son datos de ejemplo.
  product: {
    label: 'El asistente, por dentro',
    title: 'Tu agenda se llena mientras atiendes',
    lead: 'Cada conversación que termina en cita aparece en la agenda. Baja despacio y mira cómo se ocupan los huecos.',
    agendaTitleFallback: 'Agenda de tu clínica',
    day: 'Jueves',
    rooms: ['Gabinete 1', 'Gabinete 2'],
    times: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'],
    // Huecos que se ocupan, en orden de llenado: [fila, gabinete, tratamiento]
    bookings: [
      [0, 0, 'Revisión'],
      [2, 1, 'Limpieza'],
      [1, 0, 'Valoración de ortodoncia'],
      [4, 1, 'Paciente nuevo'],
      [3, 0, 'Limpieza'],
      [6, 0, 'Revisión de implante'],
      [5, 1, 'Blanqueamiento: 1.ª visita'],
      [7, 1, 'Limpieza'],
      [6, 1, 'Revisión'],
      [0, 1, 'Paciente nuevo'],
      [4, 0, 'Seguimiento de presupuesto'],
    ],
    via: 'por WhatsApp',
    free: 'Libre',
    metricsTitle: 'Esta semana',
    metrics: [
      { id: 'conversations', label: 'Conversaciones atendidas', value: 26 },
      { id: 'bookings', label: 'Citas agendadas', value: 11 },
      { id: 'followups', label: 'Seguimientos enviados', value: 8 },
    ],
    exampleTag: 'Ejemplo',
    note: 'Datos de ejemplo para enseñar cómo se ve. No son resultados de ninguna clínica.',
  },

  calculator: {
    label: 'Calculadora',
    title: '¿Cuántos pacientes se te escapan?',
    lead: 'Pon los números de tu clínica. El cálculo se hace en tu navegador y no se guarda en ningún sitio.',
    fields: [
      { id: 'messages', label: 'Mensajes de pacientes por semana', min: 0, max: 400, step: 5, value: 60 },
      { id: 'late', label: 'De cada 100, cuántos se responden tarde o nunca', min: 0, max: 100, step: 1, value: 20 },
      { id: 'booked', label: 'De cada 10 sin respuesta, cuántos habrían reservado', hint: 'tu estimación', min: 0, max: 10, step: 1, value: 2 },
      { id: 'value', label: 'Valor medio de un paciente nuevo', hint: 'ajusta con tus datos', unit: '€', min: 0, max: 5000, step: 10, value: 200 },
    ],
    resultAppointments: 'Citas que se te escapan al mes',
    resultMoney: 'Lo que suponen al mes',
    formula: 'Mensajes por semana × 4,33 semanas × los que se responden tarde × los que habrían reservado.',
    disclaimer: 'Estimación con tus propios números, no una promesa de resultados.',
  },

  day: {
    label: 'Un día en tu clínica',
    title: 'Lo que hace el asistente mientras tu equipo atiende',
    items: [
      { icon: 'message', time: '22:40', text: 'Un paciente nuevo pregunta el precio. El asistente le responde y le propone un hueco.' },
      { icon: 'calendar', time: '23:05', text: 'La cita queda en la agenda, sin que nadie de la clínica toque el móvil.' },
      { icon: 'bell', time: 'El día anterior', text: 'El paciente recibe un recordatorio para confirmar que viene.' },
      { icon: 'file', time: 'Tras un presupuesto', text: 'A los pocos días, un seguimiento amable por si le quedan dudas.' },
      { icon: 'repeat', time: 'A los 6 meses', text: 'Quien se hizo una limpieza recibe el aviso para su revisión.' },
    ],
    note: 'La integración con tu agenda depende del software de tu clínica.',
  },

  steps: {
    label: 'Cómo funciona',
    title: 'Tres pasos, sin permanencia',
    items: [
      {
        title: 'Demo gratuita de 30 minutos',
        text: 'Te enseñamos el asistente funcionando con casos de clínica dental y vemos cómo trabajáis hoy.',
      },
      {
        title: 'Puesta en marcha',
        text: 'Conectamos WhatsApp y tu agenda, y configuramos tus tratamientos y tu tono. Trabajamos con GoHighLevel, Make y n8n.',
      },
      {
        title: 'Cuota mensual, sin permanencia',
        text: 'Revisamos las conversaciones y ajustamos las respuestas. El precio es a consultar y te lo damos en la demo.',
      },
    ],
  },

  faq: {
    label: 'Preguntas frecuentes',
    title: 'Lo que suelen preguntar las clínicas',
    items: [
      {
        q: '¿Sustituye a mi recepcionista?',
        a: 'No. La libera de lo repetitivo: contestar las mismas preguntas, dar huecos y recordar citas. Así tiene más tiempo para los pacientes que están en la clínica.',
      },
      {
        q: '¿Y si es una urgencia?',
        a: 'El asistente no diagnostica ni da consejo clínico. Si un paciente habla de dolor o de una urgencia, avisa al equipo para que le llame cuanto antes.',
      },
      {
        q: '¿El paciente sabe que habla con una IA?',
        a: 'Sí. El asistente siempre se presenta como asistente de IA de tu clínica.',
      },
      {
        q: '¿Y la protección de datos?',
        a: 'Antes de pedir ningún dato, el asistente avisa de que es una IA y enlaza la política de privacidad. Los detalles para tu clínica los cerramos en la demo.',
      },
      {
        q: '¿Cuánto cuesta y cuánto tarda?',
        a: 'El precio es a consultar: depende de tu agenda y de los canales que quieras conectar. En la demo te lo concretamos, junto con los plazos.',
      },
    ],
  },

  // Franja final: la propia página como ejemplo de lo que se construye
  example: {
    title: 'Esta página también es un ejemplo.',
    text: 'El asistente, la calculadora y la agenda que acabas de ver son el tipo de web interactiva que montamos para cada clínica, con sus tratamientos y su forma de hablar.',
    link: 'Te la enseñamos en la demo',
  },

  booking: {
    label: 'Demo gratuita',
    title: 'Reserva tu demo de 30 minutos',
    lead: 'Elige día y hora. Te enseñamos el asistente atendiendo a pacientes de una clínica dental.',
    points: ['30 minutos, sin compromiso', 'Casos de clínica dental, no genéricos', 'El precio para tu clínica, sin rodeos'],
  },
};

export default dental;
