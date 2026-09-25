import { Stethoscope, Sparkles, PawPrint, CircleSlash } from 'lucide-react'

function ProblemSection() {
  const problems = [
    {
      sector: 'Clínicas Dentales',
      icon: <Stethoscope className="w-5 h-5 text-accent" />,
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
      icon: <Sparkles className="w-5 h-5 text-accent" />,
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
      icon: <PawPrint className="w-5 h-5 text-accent" />,
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
    <section id="problemas" className="relative py-20 md:py-28 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            Los problemas reales que drenan la rentabilidad de tu clínica
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
            Las clínicas privadas pierden decenas de citas al mes no por falta de pacientes, sino por procesos manuales obsoletos y lentitud en la atención.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {problems.map((prob) => (
            <div key={prob.sector} className="flex flex-col rounded-2xl border border-line bg-ground p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft">
                  {prob.icon}
                </div>
                <span className="text-sm font-semibold text-accent">{prob.sector}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-snug text-ink">{prob.tagline}</h3>

              <div className="mt-6 space-y-5 border-t border-line pt-6">
                {prob.pains.map((pain) => (
                  <div key={pain.title} className="flex gap-3">
                    <CircleSlash className="mt-1 h-4 w-4 flex-shrink-0 text-subtle" />
                    <div>
                      <h4 className="text-base font-semibold text-ink">{pain.title}</h4>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted">{pain.desc}</p>
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
