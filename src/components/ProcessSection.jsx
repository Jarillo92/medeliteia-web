import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { CalendarCheck2, HeartHandshake, Rocket, Settings2 } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

const STEPS = [
  {
    icon: CalendarCheck2,
    title: 'Demo gratuita',
    text: 'En 30 minutos te enseñamos el asistente funcionando con casos de tu sector y vemos dónde se te escapan citas. Sin compromiso.',
  },
  {
    icon: Settings2,
    title: 'Configuración a medida',
    text: 'Lo preparamos con tus servicios, precios, horarios y normas, y lo conectamos a tu agenda y a tu WhatsApp.',
  },
  {
    icon: Rocket,
    title: 'Puesta en marcha',
    text: 'Lo probamos contigo antes de activarlo. Mientras tanto, tu equipo sigue trabajando como siempre.',
  },
  {
    icon: HeartHandshake,
    title: 'Seguimiento mensual',
    text: 'Revisamos las conversaciones, ajustamos respuestas y actualizamos lo que cambie en tu negocio.',
  },
];

// Cada paso se enciende cuando la línea de progreso llega a él
function Step({ step, index, progress }) {
  const Icon = step.icon;
  const at = index / (STEPS.length - 1);
  const lit = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1]);
  const nodeOpacity = useTransform(lit, [0, 1], [0.35, 1]);
  const glow = useTransform(lit, [0, 1], ['0 0 0 0 rgba(47,107,255,0)', '0 0 0 6px rgba(47,107,255,0.12), 0 0 24px rgba(91,140,255,0.55)']);
  const textOpacity = useTransform(lit, [0, 1], [0.45, 1]);

  return (
    <li className="relative flex gap-5 lg:block">
      <motion.div
        style={{ opacity: nodeOpacity, boxShadow: glow }}
        className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-[#0B1325] text-accent-bright"
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </motion.div>
      <motion.div style={{ opacity: textOpacity }} className="pb-2 lg:mt-7 lg:pr-4">
        <div className="text-[13px] font-semibold tabular-nums text-accent">Paso {index + 1}</div>
        <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
      </motion.div>
    </li>
  );
}

function ProcessSection() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 85%', 'end 55%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  // Con movimiento reducido, todo encendido desde el principio
  const progress = useTransform(smooth, (v) => (reduce ? 1 : v));

  return (
    <section id="proceso" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Proceso"
          title="De la demo a tu agenda llena,"
          accent="en cuatro pasos"
          lead="Nos encargamos de toda la parte técnica. Tú solo nos cuentas cómo trabajas."
        />

        <ol ref={listRef} className="relative mt-14 md:mt-16 grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Raíl horizontal (escritorio) */}
          <div className="pointer-events-none absolute left-6 right-[calc(25%-2.625rem)] top-6 hidden h-px bg-white/10 lg:block" aria-hidden="true">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-accent-solid via-accent to-accent-bright" />
          </div>
          {/* Raíl vertical (móvil) */}
          <div className="pointer-events-none absolute bottom-10 left-6 top-6 w-px bg-white/10 lg:hidden" aria-hidden="true">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-gradient-to-b from-accent-solid via-accent to-accent-bright" />
          </div>

          {STEPS.map((step, i) => (
            <Step key={step.title} step={step} index={i} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ProcessSection
