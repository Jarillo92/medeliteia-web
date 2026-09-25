import { Check, ShieldCheck, Cpu, ArrowRight } from 'lucide-react'

function InvestmentSection() {
  const columns = [
    {
      title: 'Arquitectura Inicial',
      subtitle: 'Configuración, entrenamiento y puesta en marcha.',
      description: 'El trabajo de ingeniería inicial necesario para diseñar y acoplar el sistema de automatización a la operativa real de tu clínica.',
      features: [
        'Auditoría y análisis de procesos de tu clínica.',
        'Entrenamiento personalizado de la IA con tus políticas y servicios.',
        'Integración con tu CRM, PMS o agenda médica actual.',
        'Pruebas y control de calidad (testing de conversación).',
        'Formación práctica para tu personal de recepción.'
      ],
      icon: Cpu,
      tag: 'Pago Único de Setup'
    },
    {
      title: 'Evolución Continua',
      subtitle: 'Soporte, monitorización y optimización mensual.',
      description: 'El mantenimiento y auditoría constante para garantizar que la IA se adapte a nuevos tratamientos y atienda de forma excelente a los pacientes.',
      features: [
        'Soporte técnico directo y prioritario.',
        'Optimización continua del agente basada en chats reales.',
        'Actualización de precios, servicios o doctores en la base de datos.',
        'Monitorización de servidores y control de incidencias.',
        'Acceso a mejoras de motor y actualizaciones de modelos de lenguaje.'
      ],
      icon: ShieldCheck,
      tag: 'Cuota de Mantenimiento'
    }
  ];

  return (
    <section id="inversion" className="relative py-20 md:py-28 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            Un modelo comercial transparente y orientado a resultados
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
            No cobramos licencias de software genéricas. Inviertes en un sistema adaptado a tu clínica y en un equipo de ingeniería español que vela por su funcionamiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <div key={col.title} className="flex flex-col rounded-2xl border border-line bg-ground p-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="rounded-full bg-surface border border-line px-3 py-1 text-sm font-medium text-muted">
                    {col.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink">{col.title}</h3>
                <p className="mt-1 text-[15px] text-muted">{col.subtitle}</p>
                <p className="mt-4 text-base leading-relaxed text-muted">{col.description}</p>

                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {col.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Llamada a la acción sobre campo azul */}
        <div className="rounded-[28px] bg-accent-deep px-6 py-10 sm:px-12 sm:py-14 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-white">
            ¿Quieres saber la inversión exacta para tu clínica?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg leading-relaxed text-[#C9D8F5]">
            Analizamos la estructura de tus citas y tus canales para ofrecerte una propuesta económica personalizada y adaptada al volumen de tu clínica.
          </p>
          <a
            href="https://wa.me/34694262425"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-accent-deep hover:bg-accent-soft active:scale-[0.98] transition-[background-color,transform] duration-200"
          >
            Solicitar Propuesta Personalizada
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

      </div>
    </section>
  )
}

export default InvestmentSection
