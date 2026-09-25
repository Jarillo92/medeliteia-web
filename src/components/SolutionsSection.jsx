import { Check, MessageSquare, CalendarRange, RefreshCw, LayoutTemplate, Zap, MapPin } from 'lucide-react'

function SolutionsSection() {
  const steps = [
    {
      title: 'El paciente pregunta',
      desc: 'El paciente escribe a tu número de WhatsApp a cualquier hora para consultar dudas o pedir cita. El agente responde al instante con tono humano.'
    },
    {
      title: 'El agente responde y agenda',
      desc: 'Nuestra IA consulta tu disponibilidad real, le ofrece opciones y registra la cita en tu CRM de gestión médica, sin duplicar reservas.'
    },
    {
      title: 'Seguimiento automático',
      desc: 'El agente envía recordatorios previos para evitar inasistencias y contacta con pacientes antiguos para reactivarlos automáticamente.'
    }
  ];

  const badges = [
    { title: 'Respuestas naturales en español', desc: 'Adaptado al vocabulario y empatía que requiere la atención sanitaria.', icon: MessageSquare },
    { title: 'Sincronización con tu agenda real', desc: 'Integración directa con agendas médicas (Cliniko, Clinic Cloud, Gesden, Google Calendar, etc.).', icon: CalendarRange },
    { title: 'Reactivación de pacientes inactivos', desc: 'Campañas periódicas y personalizadas para rellenar huecos vacíos.', icon: RefreshCw },
    { title: 'Configuración a medida', desc: 'Entrenamos al agente con el dossier y reglas específicas de tu propia clínica.', icon: Check }
  ];

  const webBenefits = [
    {
      title: 'Diseño a medida, no plantillas',
      desc: 'Desarrollamos una identidad digital premium y única para tu clínica, reflejando tu autoridad y diferenciándote de las franquicias.',
      icon: LayoutTemplate
    },
    {
      title: 'Estructura orientada a conversión',
      desc: 'Cada sección, título y botón está estratégicamente colocado para que las visitas reserven una llamada o dejen sus datos.',
      icon: Zap
    },
    {
      title: 'SEO local y visibilidad',
      desc: 'Optimizada para cargar en menos de un segundo y posicionarse en los primeros puestos de Google Maps y búsquedas locales de tu ciudad.',
      icon: MapPin
    }
  ];

  return (
    <section id="soluciones" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            Servicios integrales para acelerar el crecimiento de tu clínica
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
            Soluciones complementarias que se integran en tu operativa diaria o se adquieren por separado para multiplicar la rentabilidad.
          </p>
        </div>

        {/* Solución 1: agente de WhatsApp */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.02em] text-ink">
              Agentes de Inteligencia Artificial en WhatsApp
            </h3>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
              Automatiza el 100% de la primera toma de contacto. Tus pacientes recibirán atención personalizada en segundos, aumentando las reservas sin sobrecargar a tus recepcionistas.
            </p>

            <ol className="relative mt-10 ml-4 space-y-8 border-l border-line pl-8">
              {steps.map((step, idx) => (
                <li key={step.title} className="relative">
                  <span className="absolute -left-[49px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold text-accent">
                    {idx + 1}
                  </span>
                  <h4 className="text-lg font-semibold text-ink">{step.title}</h4>
                  <p className="mt-1.5 text-base leading-relaxed text-muted">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.title} className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h4 className="mt-4 text-base font-semibold text-ink">{badge.title}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Solución 2: webs a medida */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-t border-line pt-20 md:pt-28">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
              <img
                src="/dashboard-mockup.png"
                alt="Ejemplo de página web a medida para una clínica"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.02em] text-ink">
              Páginas Web Premium Orientadas a Conversión
            </h3>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
              No hacemos webs informativas aburridas. Diseñamos la infraestructura de ventas digital para tu clínica, enfocada en resolver dudas y guiar al usuario a agendar una cita de inmediato.
            </p>

            <div className="mt-8 space-y-6">
              {webBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-soft">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-ink">{benefit.title}</h4>
                      <p className="mt-1 text-base leading-relaxed text-muted">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default SolutionsSection
