// ─────────────────────────────────────────────────────────────
// Biblioteca de recursos gratuitos (/recursos)
// Para añadir uno nuevo: copia un bloque, cambia los datos y listo.
// La página los ordena sola de más nuevo a más antiguo (por `fecha`).
//   id          identificador único (corto, en minúsculas)
//   tipo        Prompt | Plantilla | Guía | Mensajes (genera solo los filtros)
//   icono       nombre de un icono de lucide-react de ICONS (Recursos.jsx)
//   nombre      título de la tarjeta
//   descripcion frase corta
//   enlace      URL del recurso ("#" mientras no esté)
//   nuevo       true → etiqueta "Nuevo"
//   fecha       AAAA-MM-DD
//   palabra     (opcional) palabra clave del reel de Instagram
// ─────────────────────────────────────────────────────────────

const drive = (id) => `https://drive.google.com/file/d/${id}/view?usp=drive_link`;

export const RESOURCES = [
  {
    id: 'reservas',
    tipo: 'Prompt',
    icono: 'CalendarCheck',
    nombre: 'Prompt de reservas',
    descripcion: 'El prompt y los pasos para que Claude te monte un sistema de reservas.',
    enlace: drive('17Mb4EIs4TuOq9C7t3_2q9CSl1WP-zHdG'),
    nuevo: true,
    fecha: '2026-11-18',
    palabra: 'RESERVAS',
  },
  {
    id: 'panel',
    tipo: 'Prompt',
    icono: 'LayoutDashboard',
    nombre: 'Prompt del panel',
    descripcion: 'Pídele a Claude un panel para ver tus citas y clientes de un vistazo.',
    enlace: drive('1bwgNSRDQ6F2O3V0Q43P6k_8kVB0uz3OP'),
    nuevo: true,
    fecha: '2026-11-17',
    palabra: 'PANEL',
  },
  {
    id: 'webs-no-ia',
    tipo: 'Guía',
    icono: 'Sparkles',
    nombre: 'Webs que no parecen hechas con IA',
    descripcion: 'Cómo pedir una web con personalidad y que no salga genérica.',
    enlace: drive('1Wb9lFI34Fa68TeLKsQVjjjrbsffb_F_s'),
    nuevo: false,
    fecha: '2026-11-13',
  },
  {
    id: 'seguimiento',
    tipo: 'Mensajes',
    icono: 'MessagesSquare',
    nombre: '6 mensajes de WhatsApp para Claude',
    descripcion: 'Seis mensajes de seguimiento para recuperar clientes que no contestaron.',
    enlace: drive('1y11TMPqtcNFS-3cuf9g5EWztYRKJWBTU'),
    nuevo: false,
    fecha: '2026-11-10',
    palabra: 'SEGUIMIENTO',
  },
  {
    id: 'briefing-web',
    tipo: 'Plantilla',
    icono: 'ClipboardList',
    nombre: 'Briefing para pedirle una web a Claude',
    descripcion: 'La plantilla para explicarle tu negocio y que acierte a la primera.',
    enlace: drive('1avyF8Yi8WrPhC30Uy9-P2ujjNGG59e3A'),
    nuevo: false,
    fecha: '2026-10-28',
  },
  {
    id: 'respuestas',
    tipo: 'Mensajes',
    icono: 'Zap',
    nombre: '5 mensajes de WhatsApp Business',
    descripcion: 'Cinco respuestas rápidas listas para configurar en tu WhatsApp Business.',
    enlace: drive('1HNHNuO1xXXVfQ90i5J58DjzXY1mT1IMb'),
    nuevo: false,
    fecha: '2026-10-26',
    palabra: 'RESPUESTAS',
  },
  {
    id: 'mensajes',
    tipo: 'Prompt',
    icono: 'MessageCircle',
    nombre: '6 prompts de WhatsApp para Claude',
    descripcion: 'Seis prompts para que Claude redacte tus mensajes de WhatsApp.',
    enlace: drive('1n50hkpi-ISduev1HVSq11QZ6-UGPaNKv'),
    nuevo: false,
    fecha: '2026-10-22',
    palabra: 'MENSAJES',
  },
  {
    id: 'semana',
    tipo: 'Prompt',
    icono: 'CalendarDays',
    nombre: 'Prompt de la semana para Instagram',
    descripcion: 'Un prompt para planificar tu semana de contenido en Instagram.',
    enlace: drive('1F61rS60ehfEaIMvc1LLN74MXm0xlxi_5'),
    nuevo: false,
    fecha: '2026-10-20',
    palabra: 'SEMANA',
  },
  {
    id: 'web',
    tipo: 'Guía',
    icono: 'Globe',
    nombre: '3 cosas que no pueden faltar en tu web',
    descripcion: 'Lo mínimo que tiene que tener la web de un negocio con citas.',
    enlace: drive('1OXftBA5fPszuO8YQY8Kfqwj17JCsFxzE'),
    nuevo: false,
    fecha: '2026-10-16',
    palabra: 'WEB',
  },
  {
    id: 'clientes',
    tipo: 'Prompt',
    icono: 'Target',
    nombre: 'Dónde se te escapan clientes',
    descripcion: 'Un prompt para descubrir en qué punto pierdes clientes por WhatsApp.',
    enlace: 'https://www.medeliteia.com/prompt-clientes',
    nuevo: false,
    fecha: '2026-10-10',
    palabra: 'CLIENTES',
  },
];

// Más nuevo primero
export const SORTED_RESOURCES = [...RESOURCES].sort((a, b) => b.fecha.localeCompare(a.fecha));

export const BUSINESS_TYPES = [
  { value: 'clinica', label: 'Clínica' },
  { value: 'veterinaria', label: 'Veterinaria' },
  { value: 'estetica', label: 'Estética' },
  { value: 'peluqueria', label: 'Peluquería' },
  { value: 'gimnasio', label: 'Gimnasio' },
  { value: 'otro', label: 'Otro' },
];

export const INSTAGRAM_URL = 'https://www.instagram.com/rafajarillo/';
