import { ArrowRight, Check, MessageCircle, Rocket, ShieldCheck } from 'lucide-react'
import { DEMO_HREF, DEMO_LABEL, WHATSAPP_URL } from '../config'
import SectionHeader from './ui/SectionHeader'
import SpotlightCard from './ui/SpotlightCard'
import { Reveal, Stagger, StaggerItem } from './ui/Reveal'

const PLANS = [
  {
    icon: Rocket,
    tag: 'Al empezar',
    title: 'Puesta en marcha',
    text: 'Dejamos el asistente listo para trabajar en tu negocio.',
    items: [
      'Demo y auditoría de cómo atiendes hoy',
      'Configuración con tus servicios, precios, horarios y normas',
      'Conexión con tu agenda: GoHighLevel, Make y n8n',
      'Pruebas contigo antes de activarlo',
      'Formación para tu equipo',
    ],
  },
  {
    icon: ShieldCheck,
    tag: 'Sin permanencia',
    title: 'Cuota mensual',
    text: 'Lo mantenemos al día y lo mejoramos cada mes.',
    items: [
      'Soporte directo cuando lo necesites',
      'Supervisión mensual de las conversaciones',
      'Mejoras a partir de conversaciones reales',
      'Actualización de servicios, precios u horarios',
    ],
  },
];

function InvestmentSection() {
  return (
    <section id="inversion" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Inversión"
          title="Un precio a la medida de tu negocio,"
          accent="sin permanencia"
          lead="No hay tarifa cerrada: depende de lo que necesites. Te damos el precio exacto en la demo, sin compromiso."
        />

        <Stagger gap={0.1} className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <StaggerItem key={plan.title} className="h-full">
                <SpotlightCard className="panel flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,140,255,0.22)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[13px] font-semibold text-ink-soft">
                      {plan.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink">{plan.title}</h3>
                  <p className="mt-2 text-[16px] text-muted">{plan.text}</p>
                  <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Llamada a la acción con la misma luz que el hero */}
        <Reveal className="relative mt-5 overflow-hidden rounded-[28px] border border-accent/25 bg-[#07102A] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(60% 90% at 50% 0%, rgba(47,107,255,0.35), transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-[15%] top-0 h-px bg-gradient-to-r from-transparent via-accent-bright/70 to-transparent" aria-hidden="true" />
          <div className="relative">
            <h3 className="text-[1.75rem] leading-tight sm:text-4xl font-semibold tracking-[-0.03em] text-white">
              ¿Cuánto costaría en tu negocio?
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] sm:text-lg leading-relaxed text-[#C9D8F5]">
              Resérvate 30 minutos: te enseñamos el asistente con casos de tu sector y te damos el precio exacto.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={DEMO_HREF} className="btn-primary group w-full px-7 py-4 text-base sm:w-auto">
                {DEMO_LABEL}
                <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full px-7 py-4 text-base sm:w-auto">
                <MessageCircle className="h-5 w-5 text-accent" />
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default InvestmentSection
