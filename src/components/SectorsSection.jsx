import { Stethoscope, PawPrint, Sparkles, Scissors, Check } from 'lucide-react'

function SectorsSection() {
  const sectors = [
    {
      name: 'Clínicas Dentales',
      tagline: 'Llenamos gabinetes optimizando la agenda real.',
      desc: 'Integración absoluta para captar tratamientos de alto valor como ortodoncias, implantes y estética dental, reduciendo cancelaciones.',
      icon: Stethoscope,
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
      icon: PawPrint,
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
      icon: Sparkles,
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
      icon: Scissors,
      features: [
        'Reserva 100% autónoma por WhatsApp',
        'Recordatorios de citas recurrentes',
        'Avisos de ofertas y promociones'
      ]
    }
  ];

  return (
    <section id="sectores" className="relative py-20 md:py-28 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            Estructuras optimizadas para cada tipo de negocio
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
            No creemos en soluciones generales. Cada sector tiene dinámicas de agenda distintas y entrenamos a nuestros agentes de IA según tus pacientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectors.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.name} className="flex flex-col rounded-2xl border border-line bg-ground p-7 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink">{sec.name}</h3>
                    <p className="text-[15px] text-muted">{sec.tagline}</p>
                  </div>
                </div>

                <p className="mt-5 text-base leading-relaxed text-muted">{sec.desc}</p>

                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {sec.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[15px] text-ink">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  )
}

export default SectorsSection
