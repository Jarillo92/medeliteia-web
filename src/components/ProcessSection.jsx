import { Search, Settings2, Rocket, HeartHandshake } from 'lucide-react'

function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Análisis Inicial Sin Coste',
      desc: 'Realizamos una auditoría en profundidad de tus flujos de atención y puntos de pérdida de pacientes para trazar el plan óptimo.',
      icon: <Search className="w-5 h-5 text-brand-electric" />
    },
    {
      num: '02',
      title: 'Configuración a Medida',
      desc: 'Entrenamos al agente de IA con las directrices de tu clínica e integramos la agenda médica con el número de WhatsApp oficial.',
      icon: <Settings2 className="w-5 h-5 text-brand-accent" />
    },
    {
      num: '03',
      title: 'Puesta en Marcha',
      desc: 'Activamos la IA y la nueva web sin detener tu operativa diaria. Tu clínica sigue atendiendo pacientes mientras la tecnología se despliega.',
      icon: <Rocket className="w-5 h-5 text-emerald-400" />
    },
    {
      num: '04',
      title: 'Mantenimiento y Soporte',
      desc: 'Supervisamos las conversaciones de forma mensual, optimizamos respuestas y garantizamos soporte técnico continuo ante cualquier duda.',
      icon: <HeartHandshake className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section id="proceso" className="relative py-24 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-semibold tracking-wider text-brand-electric uppercase mb-3">El Proceso</h2>
          <p className="text-3xl sm:text-4xl font-bold font-serif text-white mb-4">
            Cómo transformamos la operativa de tu clínica en 4 pasos
          </p>
          <p className="text-brand-silver font-light">
            Un despliegue rápido, transparente y estructurado para que no tengas que preocuparte de la parte técnica.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-brand-electric/30 via-brand-accent/30 to-emerald-500/20 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              
              {/* Icon Container with glowing ring */}
              <div className="w-16 h-16 rounded-2xl bg-brand-graphite border border-white/10 flex items-center justify-center mb-6 group-hover:border-brand-electric/50 transition-all duration-300 shadow-xl relative">
                <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                {step.icon}
                
                {/* Number Badge */}
                <span className="absolute -top-2 -right-2 bg-brand-dark border border-white/10 text-[10px] font-bold text-brand-accent w-6 h-6 rounded-full flex items-center justify-center">
                  {step.num}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-brand-accent transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-xs text-brand-silver font-light leading-relaxed max-w-xs">
                {step.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ProcessSection
