import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { Stagger, StaggerItem } from './ui/Reveal'
import { EASE_OUT } from './ui/motion'

const FAQS = [
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende de lo que necesite tu negocio. Hay una puesta en marcha y una cuota mensual sin permanencia. En la demo te damos el precio exacto, sin compromiso.',
  },
  {
    q: '¿Hay permanencia?',
    a: 'No. La cuota es mensual y sin permanencia.',
  },
  {
    q: '¿Puedo probarlo gratis?',
    a: 'No hay prueba gratuita, pero la demo sí lo es: en 30 minutos ves el asistente funcionando con casos de tu sector antes de decidir nada.',
  },
  {
    q: '¿Con qué agenda funciona?',
    a: 'El asistente se conecta con GoHighLevel, Make y n8n. En la demo vemos qué encaja mejor con cómo gestionas hoy tus citas.',
  },
  {
    q: '¿Qué responde el asistente?',
    a: 'Lo configuramos con tu información: servicios, precios, horarios y normas. Después revisamos las conversaciones cada mes y ajustamos sus respuestas. También puede atender por teléfono: asistente de voz con IA, a medida.',
  },
  {
    q: '¿Es solo para clínicas?',
    a: 'No. Nuestra especialidad son las clínicas dentales, veterinarias y de estética, pero funciona en cualquier negocio que viva de su agenda, como el centro de Pilates MOOV Huesca.',
  },
];

function FaqItem({ faq, open, onToggle }) {
  const reduce = useReducedMotion();
  const id = useId();
  return (
    <div className="border-b border-white/[0.07]">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className={`text-lg sm:text-xl font-semibold transition-colors duration-200 ${open ? 'text-ink' : 'text-ink-soft group-hover:text-ink'}`}>
            {faq.q}
          </span>
          <span
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-300 ease-out ${
              open ? 'rotate-45 border-accent/50 bg-accent-soft text-accent-bright' : 'border-white/10 text-muted group-hover:border-white/25'
            }`}
            aria-hidden="true"
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pr-12 text-[16px] leading-relaxed text-muted">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="preguntas" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                eyebrow="Preguntas frecuentes"
                title="Lo que suelen preguntarnos"
                accent="antes de la demo"
              />
            </div>
          </div>
          <Stagger gap={0.05} className="lg:col-span-7 border-t border-white/[0.07]">
            {FAQS.map((faq, i) => (
              <StaggerItem key={faq.q} y={10}>
                <FaqItem faq={faq} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
