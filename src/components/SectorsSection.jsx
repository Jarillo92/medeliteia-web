import { motion, useReducedMotion } from 'framer-motion'
import { Check, Dumbbell, PawPrint, Quote, Sparkles, Stethoscope } from 'lucide-react'
import { MOOV_CASE } from '../config'
import SectionHeader from './ui/SectionHeader'
import SpotlightCard from './ui/SpotlightCard'
import { Reveal, Stagger, StaggerItem } from './ui/Reveal'
import { EASE_OUT } from './ui/motion'

// Nuestra especialidad: cada sector con lo que preguntan sus clientes y lo que resuelve el asistente
const SPECIALTIES = [
  {
    name: 'IA para clínicas dentales',
    icon: Stethoscope,
    question: '¿Tenéis hueco para una limpieza esta semana?',
    uses: [
      'Primeras visitas y revisiones, reservadas al momento',
      'Recordatorios para no dejar huecos en el gabinete',
      'Avisos de revisión y limpieza anual',
    ],
  },
  {
    name: 'IA para clínicas veterinarias',
    icon: PawPrint,
    question: 'Hola, ¿puedo pedir cita para vacunar a mi perra?',
    uses: [
      'Citas de vacunas y revisiones sin llamadas',
      'Respuestas a dudas frecuentes: horarios, precios, preparación',
      'Recordatorios de la próxima vacuna',
    ],
  },
  {
    name: 'IA para centros de estética y salones de belleza',
    icon: Sparkles,
    question: '¿Tenéis hueco para uñas el viernes por la tarde?',
    uses: [
      'Respuesta inmediata a quien pregunta por un tratamiento',
      'Reservas sin interrumpir a tu equipo mientras trabaja',
      'Avisos para la siguiente sesión',
    ],
  },
];

const ALSO_FOR = ['Gimnasios', 'Centros deportivos', 'Cualquier negocio con cita previa'];

const PHASE_STYLES = {
  done: { tag: 'Hecha', tagClass: 'border-accent/30 bg-accent-soft text-accent-bright' },
  current: { tag: 'En marcha', tagClass: 'border-[#4ADE80]/30 bg-[#4ADE80]/10 text-[#86EFAC]' },
  next: { tag: 'Siguiente', tagClass: 'border-white/10 bg-white/[0.04] text-subtle' },
};

function PhaseNode({ state }) {
  if (state === 'done') {
    return (
      <span className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-solid text-white shadow-[0_0_0_4px_rgba(47,107,255,0.15),0_0_18px_rgba(91,140,255,0.55)]">
        <Check className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }
  if (state === 'current') {
    return (
      <span className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#4ADE80]/60 bg-ground">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#4ADE80]/25 [animation-duration:2.2s]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
      </span>
    );
  }
  return <span className="relative z-10 block h-7 w-7 flex-shrink-0 rounded-full border border-white/20 bg-ground" />;
}

// Caso real por fases: línea de progreso horizontal en escritorio y vertical en móvil
function MoovCase() {
  const reduce = useReducedMotion();
  const { phases } = MOOV_CASE;
  // La línea se llena hasta la fase en curso
  const currentIndex = Math.max(0, phases.findIndex((p) => p.state === 'current'));
  const fill = currentIndex / (phases.length - 1);

  return (
    <SpotlightCard className="panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-solid/10 blur-3xl" aria-hidden="true" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent-bright">
              Caso real
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/10 px-3 py-1 text-[12px] font-semibold text-[#86EFAC]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" aria-hidden="true" />
              {MOOV_CASE.status}
            </span>
          </div>
          <h3 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-ink">{MOOV_CASE.name}</h3>
          <p className="mt-1.5 max-w-2xl text-[16px] text-muted">{MOOV_CASE.intro}</p>
          <a href={MOOV_CASE.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[15px] font-semibold text-accent-bright underline-offset-4 hover:underline">{MOOV_CASE.linkLabel}</a>
        </div>
        <Dumbbell className="hidden h-6 w-6 text-subtle sm:block" aria-hidden="true" />
      </div>

      <ol className="relative mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
        {/* Raíl horizontal (escritorio) */}
        <div className="pointer-events-none absolute left-3.5 right-[calc(33.33%-2.208rem)] top-3.5 hidden h-px bg-white/10 lg:block" aria-hidden="true">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-accent-solid via-accent to-[#4ADE80]"
            style={{ width: `${fill * 100}%` }}
            initial={{ scaleX: reduce ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.2 }}
          />
        </div>
        {/* Raíl vertical (móvil) */}
        <div className="pointer-events-none absolute bottom-6 left-3.5 top-3.5 w-px bg-white/10 lg:hidden" aria-hidden="true">
          <div className="w-full bg-gradient-to-b from-accent-solid to-[#4ADE80]" style={{ height: `${fill * 100}%` }} />
        </div>

        {phases.map((phase) => {
          const style = PHASE_STYLES[phase.state];
          return (
            <li key={phase.label} className="relative flex gap-4 lg:block">
              <PhaseNode state={phase.state} />
              <div className="lg:mt-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-subtle">{phase.label}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[11.5px] font-semibold ${style.tagClass}`}>{style.tag}</span>
                </div>
                <div className={`mt-2 text-lg font-semibold ${phase.state === 'next' ? 'text-ink-soft' : 'text-ink'}`}>{phase.title}</div>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{phase.text}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Testimonio: solo aparece cuando MOOV_CASE.quote tenga texto */}
      {MOOV_CASE.quote && (
        <figure className="relative mt-10 border-t border-white/[0.06] pt-8">
          <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
          <blockquote className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-soft">{MOOV_CASE.quote}</blockquote>
          {MOOV_CASE.author && <figcaption className="mt-3 text-[15px] text-subtle">{MOOV_CASE.author}</figcaption>}
        </figure>
      )}
    </SpotlightCard>
  );
}

function SectorsSection() {
  return (
    <section id="sectores" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Especialidad"
          title="IA para clínicas dentales,"
          accent="veterinarias y centros de estética"
          lead="Configuramos el asistente para tu sector: sabe lo que preguntan tus pacientes y cómo se reserva en tu clínica. Y también gimnasios, centros deportivos y cualquier negocio que viva de su agenda."
        />

        <Stagger gap={0.1} className="mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {SPECIALTIES.map((sector) => {
            const Icon = sector.icon;
            return (
              <StaggerItem key={sector.name} className="h-full">
                <SpotlightCard className="panel flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,140,255,0.22)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-ink">{sector.name}</h3>
                  </div>

                  {/* Lo que pregunta un cliente de verdad */}
                  <div className="mt-6 rounded-2xl rounded-bl-md bg-[#141B28] px-4 py-3 text-[15px] leading-snug text-ink-soft">
                    {sector.question}
                  </div>

                  <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
                    {sector.uses.map((use) => (
                      <li key={use} className="flex items-start gap-3 text-[15px] leading-snug text-muted">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Más allá de las clínicas */}
        <Reveal className="panel mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center p-6 sm:p-8 lg:p-10">
          <div className="lg:col-span-7">
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">También para</div>
            <h3 className="mt-4 text-2xl sm:text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink">
              Gimnasios y cualquier negocio que viva de su agenda
            </h3>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
              Si tus clientes piden cita, preguntan horarios o se olvidan de venir, el asistente funciona igual: responde, reserva y recuerda.
            </p>
          </div>
          <ul className="lg:col-span-5 flex flex-wrap gap-2 lg:justify-end">
            {ALSO_FOR.map((item) => (
              <li key={item} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[14px] text-ink-soft">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-5" delay={0.05}>
          <MoovCase />
        </Reveal>
      </div>
    </section>
  )
}

export default SectorsSection
