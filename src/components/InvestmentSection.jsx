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
      icon: <Cpu className="w-6 h-6 text-brand-electric" />,
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
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
      tag: 'Cuota de Mantenimiento'
    }
  ];

  return (
    <section id="inversion" className="relative py-24 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-semibold tracking-wider text-brand-electric uppercase mb-3">Inversión</h2>
          <p className="text-3xl sm:text-4xl font-bold font-serif text-white mb-4">
            Un modelo comercial transparente y orientado a resultados
          </p>
          <p className="text-brand-silver font-light">
            No cobramos licencias de software genéricas. Inviertes en un sistema adaptado a tu clínica y en un equipo de ingeniería español que vela por su funcionamiento.
          </p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {columns.map((col, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-2xl p-8 relative flex flex-col justify-between overflow-hidden border border-white/5"
            >
              
              {/* Highlight ribbon tag */}
              <div className="absolute top-4 right-4 bg-brand-cobalt/20 border border-brand-electric/30 text-[10px] font-semibold text-brand-accent px-2.5 py-1 rounded-full uppercase tracking-wider">
                {col.tag}
              </div>

              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {col.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">{col.title}</h3>
                    <p className="text-xs text-brand-silver font-light mt-1">{col.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed mb-8">
                  {col.description}
                </p>

                {/* Features list */}
                <div className="border-t border-white/5 pt-6">
                  <ul className="space-y-4">
                    {col.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs text-brand-silver font-light leading-relaxed">
                        <div className="w-5 h-5 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-brand-accent" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto text-center glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-3">
            ¿Quieres saber la inversión exacta para tu clínica?
          </h3>
          <p className="text-sm text-brand-silver font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            Analizamos la estructura de tus citas y tus canales para ofrecerte una propuesta económica personalizada y adaptada al volumen de tu clínica.
          </p>

          <a
            href="https://wa.me/34694262425"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-brand-cobalt to-brand-electric shadow-lg shadow-brand-cobalt/20 hover:shadow-brand-electric/30 transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            <span>Solicitar Propuesta Personalizada</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </section>
  )
}

export default InvestmentSection
