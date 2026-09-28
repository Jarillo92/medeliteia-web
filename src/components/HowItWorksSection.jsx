import { motion, useReducedMotion } from 'framer-motion'
import { BellRing, BookOpen, CalendarCheck2, CheckCheck, Clock, RefreshCw } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SpotlightCard from './ui/SpotlightCard'
import { Reveal, Stagger, StaggerItem } from './ui/Reveal'
import { EASE_OUT } from './ui/motion'

const inViewOnce = { once: true, amount: 0.6 };

// Paso 1: el paciente escribe y recibe respuesta al momento
function ChatIllustration() {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-5">
      <div className="max-w-[82%] self-start rounded-2xl rounded-bl-md bg-[#1A2334] px-3.5 py-2.5 text-[14px] leading-snug text-ink">
        ¿Tenéis hueco mañana por la tarde?
        <span className="ml-2 text-[11px] text-subtle">21:47</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: reduce ? 0 : 0.5 }}
        className="max-w-[86%] self-end rounded-2xl rounded-br-md bg-[#1D4ED8] px-3.5 py-2.5 text-[14px] leading-snug text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      >
        ¡Sí! Mañana tengo libre a las 16:30 y a las 18:00.
        <span className="ml-2 inline-flex items-center gap-0.5 text-[11px] text-[#BFD1FF]">
          21:47 <CheckCheck className="h-3 w-3" aria-hidden="true" />
        </span>
      </motion.div>
    </div>
  );
}

// Paso 2: el hueco libre pasa a reservado en la agenda
function AgendaIllustration() {
  const reduce = useReducedMotion();
  const slots = [
    { time: '16:00', label: 'Ocupado' },
    { time: '16:30', label: 'Libre' },
    { time: '17:00', label: 'Ocupado' },
  ];
  return (
    <div className="flex h-full flex-col justify-center px-5">
      <div className="mb-2 flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.12em] text-subtle">
        <span>Mañana</span>
        <span>Agenda</span>
      </div>
      <div className="space-y-1.5">
        {slots.map((slot) => (
          <div key={slot.time} className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-1.5 text-[13px]">
            <span className="w-10 tabular-nums text-subtle">{slot.time}</span>
            <span className={slot.label === 'Libre' ? 'text-muted' : 'text-subtle'}>{slot.label}</span>
          </div>
        ))}
        <motion.div
          initial={{ backgroundColor: 'rgba(255,255,255,0.03)', boxShadow: 'inset 0 0 0 1px rgba(91,140,255,0)' }}
          whileInView={{ backgroundColor: 'rgba(47,107,255,0.16)', boxShadow: 'inset 0 0 0 1px rgba(91,140,255,0.5)' }}
          viewport={inViewOnce}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: reduce ? 0 : 0.6 }}
          className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-[13px]"
        >
          <span className="w-10 tabular-nums text-ink">18:00</span>
          <span className="font-semibold text-ink">Revisión · Laura</span>
          <motion.span
            initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: reduce ? 0 : 0.8 }}
            className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-accent-solid text-white"
          >
            <CheckCheck className="h-3 w-3" aria-hidden="true" />
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

// Paso 3: recordatorio el día antes y confirmación del paciente
function ReminderIllustration() {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-5">
      <div className="rounded-2xl border border-white/[0.07] bg-[#111827]/90 p-3.5 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 text-[12px] text-subtle">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent-solid text-[9px] font-bold text-white">CS</span>
          Clínica Sonrisa · ahora
        </div>
        <p className="mt-2 text-[14px] leading-snug text-ink">Te recordamos tu revisión mañana a las 18:00. ¿Nos confirmas?</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: reduce ? 0 : 0.6 }}
        className="self-end rounded-2xl rounded-br-md bg-[#1D4ED8] px-3.5 py-2 text-[14px] text-white"
      >
        Sí, allí estaré
        <span className="ml-2 inline-flex items-center gap-0.5 text-[11px] text-[#BFD1FF]">
          <CheckCheck className="h-3 w-3" aria-hidden="true" />
        </span>
      </motion.div>
    </div>
  );
}

const STEPS = [
  {
    title: 'El paciente escribe',
    text: 'Por WhatsApp, a la hora que sea. El asistente contesta al momento, con un tono cercano y la información de tu clínica.',
    Illustration: ChatIllustration,
  },
  {
    title: 'Le da cita en tu agenda',
    text: 'Consulta los huecos libres reales y reserva sin duplicar citas. Se conecta con GoHighLevel, Calendly o Make.',
    Illustration: AgendaIllustration,
  },
  {
    title: 'Le recuerda que venga',
    text: 'Envía un recordatorio antes de la cita y, más adelante, avisa a quien le toca volver.',
    Illustration: ReminderIllustration,
  },
];

const CAPABILITIES = [
  { icon: Clock, title: 'Responde a cualquier hora', text: 'Noches, festivos y fines de semana.' },
  { icon: BookOpen, title: 'Habla como tu clínica', text: 'Con tus tratamientos, horarios y normas.' },
  { icon: CalendarCheck2, title: 'Conectado a tu agenda', text: 'GoHighLevel, Calendly o Make.' },
  { icon: BellRing, title: 'Recordatorios automáticos', text: 'Menos olvidos y menos huecos vacíos.' },
  { icon: RefreshCw, title: 'Reactiva a quien no vuelve', text: 'Avisos para revisiones y próximas sesiones.' },
];

function HowItWorksSection() {
  const reduce = useReducedMotion();

  return (
    <section id="como-funciona" className="relative py-24 md:py-32">
      {/* Foco de luz bajo los pasos */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[480px]"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(47,107,255,0.10), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Cómo funciona"
          title="Atiende, da cita"
          accent="y se asegura de que vengan"
          lead="Tu asistente trabaja en WhatsApp con la información y las normas de tu clínica. Tu equipo solo ve la agenda llenarse."
        />

        <div className="relative mt-16 md:mt-20">
          {/* Raíl que une los pasos y se llena al entrar en pantalla */}
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[6px] hidden h-px bg-white/[0.08] lg:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent-solid via-accent to-accent-bright"
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.2 }}
            />
          </div>

          <Stagger gap={0.12} className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
            {STEPS.map((step, i) => {
              const Illustration = step.Illustration;
              return (
                <StaggerItem key={step.title} className="flex flex-col">
                  <div className="mb-6 hidden justify-center lg:flex" aria-hidden="true">
                    <span className="h-3 w-3 rounded-full border border-accent bg-ground shadow-[0_0_0_4px_rgba(47,107,255,0.12),0_0_18px_rgba(91,140,255,0.6)]" />
                  </div>
                  <SpotlightCard className="panel flex h-full flex-col overflow-hidden">
                    <div className="h-52 border-b border-white/[0.06] bg-[radial-gradient(120%_90%_at_50%_0%,rgba(47,107,255,0.10),transparent_70%)]">
                      <Illustration />
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="text-[13px] font-semibold tabular-nums text-accent">0{i + 1}</div>
                      <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal className="panel mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y divide-white/[0.06] sm:divide-y-0 lg:divide-x overflow-hidden">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="flex items-start gap-3 p-5 lg:p-6">
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <div className="text-[15px] font-semibold text-ink">{cap.title}</div>
                  <div className="mt-1 text-[14px] leading-snug text-muted">{cap.text}</div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default HowItWorksSection
