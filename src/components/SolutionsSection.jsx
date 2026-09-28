import { LayoutTemplate, Zap, MapPin } from 'lucide-react'

function SolutionsSection() {
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

        {/* Solución 2: webs a medida */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
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
