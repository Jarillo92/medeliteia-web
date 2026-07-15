import React from 'react'
import { Stethoscope, Sparkles, Ban, Clock, AlertTriangle, MessageSquareCode } from 'lucide-react'

function ProblemSection() {
  const problems = [
    {
      sector: 'Clínicas Dentales',
      icon: <Stethoscope className="w-6 h-6 text-brand-electric" />,
      tagline: 'Gabinete vacío y llamadas perdidas',
      pains: [
        {
          title: 'Llamadas fuera de horario',
          desc: 'Más del 40% de los pacientes intentan agendar al salir de trabajar o en festivos. Si no contestas al instante, se van a otra clínica.'
        },
        {
          title: 'El drama de los no-shows',
          desc: 'Pacientes que reservan y no asisten. Un hueco vacío en tu agenda de implantes o prótesis te cuesta cientos de euros la hora.'
        }
      ]
    },
    {
      sector: 'Centros de Estética y Belleza',
      icon: <Sparkles className="w-6 h-6 text-brand-accent" />,
      tagline: 'Leads fríos por respuestas lentas',
      pains: [
        {
          title: 'La regla de los 5 minutos',
          desc: 'Si un lead interesado en un tratamiento de alta gama (como bótox o depilación láser) no recibe respuesta inmediata, busca otra opción.'
        },
        {
          title: 'Fuga de leads en redes',
          desc: 'Mensajes directos en Instagram y WhatsApp acumulándose sin responder por falta de personal dedicado.'
        }
      ]
    },
    {
      sector: 'Clínicas Veterinarias',
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
      tagline: 'Gestión ineficiente de urgencias',
      pains: [
        {
          title: 'Saturación de consultas simples',
          desc: 'Tu personal pasa horas al teléfono contestando precios de vacunas o desparasitaciones, en lugar de atender a los animales en consulta.'
        },
        {
          title: 'Falta de triaje en urgencias',
          desc: 'Llamadas urgentes mezcladas con citas rutinarias, complicando la organización de tu equipo veterinario.'
        }
      ]
    }
  ];

  return (
    <section id="problemas" className="relative py-24 z-20 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-brand-electric uppercase mb-3">El coste de no digitalizar</h2>
          <p className="text-3xl sm:text-4xl font-bold font-serif text-white mb-4">
            Los problemas reales que drenan la rentabilidad de tu clínica
          </p>
          <p className="text-brand-silver font-light">
            Las clínicas privadas pierden decenas de citas al mes no por falta de pacientes, sino por procesos manuales obsoletos y lentitud en la atención.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {problems.map((prob, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-8 flex flex-col h-full">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {prob.icon}
                </div>
                <div>
                  <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">{prob.sector}</span>
                  <h3 className="text-lg font-semibold text-white mt-0.5">{prob.tagline}</h3>
                </div>
              </div>

              <div className="border-b border-white/5 my-4"></div>

              {/* Card Body Pains */}
              <div className="space-y-6 flex-1">
                {prob.pains.map((pain, pIdx) => (
                  <div key={pIdx} className="flex gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Ban className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-100">{pain.title}</h4>
                      <p className="text-xs text-brand-silver font-light mt-1 leading-relaxed">{pain.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ProblemSection
