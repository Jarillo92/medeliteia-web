import { Stethoscope, PawPrint, Sparkles, Scissors, CheckCircle } from 'lucide-react'

function SectorsSection() {
  const sectors = [
    {
      name: 'Clínicas Dentales',
      tagline: 'Llenamos gabinetes optimizando la agenda real.',
      desc: 'Integración absoluta para captar tratamientos de alto valor como ortodoncias, implantes y estética dental, reduciendo cancelaciones.',
      icon: <Stethoscope className="w-6 h-6 text-brand-electric" />,
      features: [
        'Confirmación inmediata de citas',
        'Recordatorios preventivos anti-no-show',
        'Reactivación de limpiezas anuales'
      ]
    },
    {
      name: 'Clínicas Veterinarias',
      tagline: 'Triaje automático y gestión de consultas.',
      desc: 'Liberamos a tu equipo médico de llamadas repetitivas sobre precios de vacunas o antiparasitarios, filtrando emergencias reales de forma ágil.',
      icon: <PawPrint className="w-6 h-6 text-brand-accent" />,
      features: [
        'Filtro de urgencias y triaje básico',
        'Recordatorio automático de vacunación',
        'Consultas rápidas automatizadas'
      ]
    },
    {
      name: 'Centros de Estética',
      tagline: 'Agilidad inmediata para leads de alta gama.',
      desc: 'Respondemos al segundo los formularios de redes sociales para asegurar tratamientos premium (rellenos, láser, peelings) antes de que se enfríen.',
      icon: <Sparkles className="w-6 h-6 text-brand-electric" />,
      features: [
        'Respuesta instantánea a leads de Instagram',
        'Agenda automatizada de valoraciones',
        'Fidelización y packs post-tratamiento'
      ]
    },
    {
      name: 'Salones de Belleza',
      tagline: 'Atención continua sin interrumpir los servicios.',
      desc: 'Tu equipo no tendrá que dejar de peinar o realizar tratamientos para responder llamadas. Tu agente en WhatsApp se encarga de gestionar la agenda.',
      icon: <Scissors className="w-6 h-6 text-brand-accent" />,
      features: [
        'Reserva 100% autónoma por WhatsApp',
        'Recordatorios de citas recurrentes',
        'Avisos de ofertas y promociones'
      ]
    }
  ];

  return (
    <section id="sectores" className="relative py-24 z-20 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-brand-electric uppercase mb-3">Especialización</h2>
          <p className="text-3xl sm:text-4xl font-bold font-serif text-white mb-4">
            Estructuras optimizadas para cada tipo de negocio
          </p>
          <p className="text-brand-silver font-light">
            No creemos en soluciones generales. Cada sector tiene dinámicas de agenda distintas y entrenamos a nuestros agentes de IA según tus pacientes.
          </p>
        </div>

        {/* Uniform Grid - 2 columns x 2 rows on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((sec, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-2xl p-8 flex flex-col justify-between h-full border border-white/5"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {sec.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{sec.name}</h3>
                    <p className="text-xs text-brand-accent font-medium mt-0.5">{sec.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-brand-silver font-light leading-relaxed mb-6">
                  {sec.desc}
                </p>
              </div>

              {/* Bullet points */}
              <div className="border-t border-white/5 pt-6 mt-2">
                <ul className="space-y-3">
                  {sec.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-xs text-slate-200">
                      <CheckCircle className="w-4 h-4 text-brand-accent flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SectorsSection
