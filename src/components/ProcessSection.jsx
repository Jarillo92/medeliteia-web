import { Search, Settings2, Rocket, HeartHandshake } from 'lucide-react'

function ProcessSection() {
  const steps = [
    {
      title: 'Análisis Inicial Sin Coste',
      desc: 'Realizamos una auditoría en profundidad de tus flujos de atención y puntos de pérdida de pacientes para trazar el plan óptimo.',
      icon: Search
    },
    {
      title: 'Configuración a Medida',
      desc: 'Entrenamos al agente de IA con las directrices de tu clínica e integramos la agenda médica con el número de WhatsApp oficial.',
      icon: Settings2
    },
    {
      title: 'Puesta en Marcha',
      desc: 'Activamos la IA y la nueva web sin detener tu operativa diaria. Tu clínica sigue atendiendo pacientes mientras la tecnología se despliega.',
      icon: Rocket
    },
    {
      title: 'Mantenimiento y Soporte',
      desc: 'Supervisamos las conversaciones de forma mensual, optimizamos respuestas y garantizamos soporte técnico continuo ante cualquier duda.',
      icon: HeartHandshake
    }
  ];

  return (
    <section id="proceso" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            Cómo transformamos la operativa de tu clínica en 4 pasos
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
            Un despliegue rápido, transparente y estructurado para que no tengas que preocuparte de la parte técnica.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="border-t-2 border-ink pt-6">
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-accent" />
                  <span className="text-sm font-semibold text-subtle">Paso {idx + 1} de {steps.length}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{step.desc}</p>
              </li>
            );
          })}
        </ol>

      </div>
    </section>
  )
}

export default ProcessSection
