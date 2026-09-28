import { motion, useReducedMotion } from 'framer-motion'
import { MoonStar, PhoneOff, CalendarX2, UserX, Clock3, ArrowUpRight } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SpotlightCard from './ui/SpotlightCard'
import { Stagger, StaggerItem } from './ui/Reveal'
import { EASE_OUT } from './ui/motion'

// Una noche cualquiera en el WhatsApp de una clínica sin asistente
const MISSED = [
  { time: 'Jueves · 21:47', text: 'Hola, ¿hacéis blanqueamientos? ¿Qué precio tiene?' },
  { time: 'Jueves · 22:15', text: '¿Tenéis cita para el sábado por la mañana?' },
  { time: 'Sábado · 10:02', text: 'Buenas, me duele una muela. ¿Me podéis ver hoy?' },
];

const PAINS = [
  {
    icon: MoonStar,
    title: 'Mensajes fuera de horario',
    text: 'Tus pacientes escriben al salir de trabajar, por la noche o en fin de semana. Si nadie contesta, preguntan en otra clínica.',
  },
  {
    icon: PhoneOff,
    title: 'Recepción que no da abasto',
    text: 'Entre el teléfono, el mostrador y WhatsApp, tu equipo no llega a todo y los mensajes se quedan esperando.',
  },
  {
    icon: CalendarX2,
    title: 'Citas que no se presentan',
    text: 'Sin un recordatorio a tiempo, los olvidos dejan huecos en la agenda que ya no puedes llenar.',
  },
  {
    icon: UserX,
    title: 'Pacientes que no vuelven',
    text: 'Quien no recibe un aviso para su revisión o su siguiente sesión acaba olvidándose de ti.',
  },
];

function MissedNight() {
  const reduce = useReducedMotion();
  const item = (i) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: reduce ? 0.2 : 0.6, ease: EASE_OUT, delay: reduce ? 0 : i * 0.35 },
  });

  return (
    <div className="panel relative overflow-hidden p-5 sm:p-7">
      {/* Luz fría de pantalla por la noche */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-solid/10 blur-3xl" aria-hidden="true" />

      <div className="relative flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2334] text-[12px] font-bold text-ink-soft">CS</div>
          <div>
            <div className="text-[15px] font-semibold text-ink">WhatsApp de la clínica</div>
            <div className="text-[13px] text-subtle">Recepción cerrada</div>
          </div>
        </div>
        <span className="rounded-full border border-[#F5B454]/25 bg-[#F5B454]/10 px-2.5 py-1 text-[12px] font-semibold text-[#F5C27A]">
          3 sin leer
        </span>
      </div>

      <ul className="relative mt-5 space-y-3">
        {MISSED.map((msg, i) => (
          <motion.li key={msg.time} {...item(i)} className="flex items-end gap-3">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#141B28] px-4 py-3">
              <p className="text-[15px] leading-snug text-ink">{msg.text}</p>
              <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-subtle">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                {msg.time}
                <span className="text-[#F5C27A]">· sin respuesta</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.div
        {...item(MISSED.length)}
        className="relative mt-5 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-ground/60 px-4 py-3.5"
      >
        <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-subtle" aria-hidden="true" />
        <p className="text-[15px] leading-snug text-muted">
          <span className="font-semibold text-ink">Lunes, 9:30.</span> Cuando alguien los lee, esos pacientes ya han reservado en otra clínica.
        </p>
      </motion.div>
    </div>
  );
}

function ProblemSection() {
  return (
    <section id="problema" className="relative pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="El problema"
              title="Cada mensaje sin responder"
              accent="es una cita que se va a otra clínica"
              lead="No te faltan pacientes: se te escapan entre mensajes que llegan a deshoras, una recepción que no da abasto y citas que se olvidan."
            />
          </div>
          <div className="lg:col-span-6">
            <MissedNight />
          </div>
        </div>

        <Stagger className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PAINS.map((pain) => {
            const Icon = pain.icon;
            return (
              <StaggerItem key={pain.title} className="h-full">
                {/* En móvil, icono a la izquierda para que las tarjetas no se alarguen */}
                <SpotlightCard className="panel flex h-full gap-4 p-5 sm:block sm:p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,140,255,0.22)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink sm:mt-5">{pain.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted sm:mt-2">{pain.text}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  )
}

export default ProblemSection
