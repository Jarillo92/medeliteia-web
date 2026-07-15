import React from 'react'
import { Check, MessageSquare, CalendarRange, RefreshCw, LayoutTemplate, Zap, MapPin, ArrowRight } from 'lucide-react'

function SolutionsSection() {
  const steps = [
    {
      num: '01',
      title: 'El paciente pregunta',
      desc: 'El paciente escribe a tu número de WhatsApp a cualquier hora para consultar dudas o pedir cita. El agente responde al instante con tono humano.'
    },
    {
      num: '02',
      title: 'El agente responde y agenda',
      desc: 'Nuestra IA consulta tu disponibilidad real, le ofrece opciones y registra la cita en tu CRM de gestión médica, sin duplicar reservas.'
    },
    {
      num: '03',
      title: 'Seguimiento automático',
      desc: 'El agente envía recordatorios previos para evitar inasistencias y contacta con pacientes antiguos para reactivarlos automáticamente.'
    }
  ];

  const badges = [
    { title: 'Respuestas naturales en español', desc: 'Adaptado al vocabulario y empatía que requiere la atención sanitaria.' },
    { title: 'Sincronización con tu agenda real', desc: 'Integración directa con agendas médicas (Cliniko, Clinic Cloud, Gesden, Google Calendar, etc.).' },
    { title: 'Reactivación de pacientes inactivos', desc: 'Campañas periódicas y personalizadas para rellenar huecos vacíos.' },
    { title: 'Configuración a medida', desc: 'Entrenamos al agente con el dossier y reglas específicas de tu propia clínica.' }
  ];

  const webBenefits = [
    {
      title: 'Diseño a medida, no plantillas',
      desc: 'Desarrollamos una identidad digital premium y única para tu clínica, reflejando tu autoridad y diferenciándote de las franquicias.',
      icon: <LayoutTemplate className="w-5 h-5 text-brand-electric" />
    },
    {
      title: 'Estructura orientada a conversión',
      desc: 'Cada sección, título y botón está estratégicamente colocado para que las visitas reserven una llamada o dejen sus datos.',
      icon: <Zap className="w-5 h-5 text-brand-accent" />
    },
    {
      title: 'SEO local y visibilidad',
      desc: 'Optimizada para cargar en menos de un segundo y posicionarse en los primeros puestos de Google Maps y búsquedas locales de tu ciudad.',
      icon: <MapPin className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <section id="soluciones" className="relative py-24 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-semibold tracking-wider text-brand-electric uppercase mb-3">Qué Hacemos</h2>
          <p className="text-3xl sm:text-4xl font-bold font-serif text-white mb-4">
            Servicios integrales para acelerar el crecimiento de tu clínica
          </p>
          <p className="text-brand-silver font-light">
            Soluciones complementarias que se integran en tu operativa diaria o se adquieren por separado para multiplicar la rentabilidad.
          </p>
        </div>

        {/* SOLUTION 1: WhatsApp AI */}
        <div className="mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: The Visual Timeline Stepper */}
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/20 border border-brand-electric/30 text-brand-accent text-xs font-semibold">
                <span>Solución 1</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Agentes de Inteligencia Artificial en WhatsApp
              </h3>
              <p className="text-brand-silver font-light leading-relaxed">
                Automatiza el 100% de la primera toma de contacto. Tus pacientes recibirán atención personalizada en segundos, aumentando las reservas sin sobrecargar a tus recepcionistas.
              </p>

              {/* Stepper */}
              <div className="relative border-l border-white/10 ml-4 pl-8 space-y-8 mt-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-12 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-graphite border border-white/15 text-xs font-bold text-brand-accent">
                      {step.num}
                    </span>
                    <h4 className="text-base font-semibold text-white">{step.title}</h4>
                    <p className="text-sm text-brand-silver font-light mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Badge Matrix */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {badges.map((badge, idx) => (
                <div key={idx} className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-brand-cobalt/10 border border-brand-cobalt/25 flex items-center justify-center mb-4">
                      {idx === 0 && <MessageSquare className="w-5 h-5 text-brand-accent" />}
                      {idx === 1 && <CalendarRange className="w-5 h-5 text-brand-accent" />}
                      {idx === 2 && <RefreshCw className="w-5 h-5 text-brand-accent" />}
                      {idx === 3 && <Check className="w-5 h-5 text-brand-accent" />}
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">{badge.title}</h4>
                    <p className="text-xs text-brand-silver font-light leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-12"></div>

        {/* SOLUTION 2: Custom Web Design */}
        <div className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Device Mockup using real dashboard-mockup.png */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative flex justify-center">
              
              {/* Glow border layout around image */}
              <div className="relative w-full max-w-lg rounded-2xl border border-white/10 p-2 bg-slate-900/60 shadow-2xl overflow-hidden group">
                
                {/* Simulated browser header bar */}
                <div className="flex items-center gap-1.5 pb-2.5 px-2 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <div className="ml-4 text-[10px] text-slate-500 select-none">clinica-digital-mockup.com</div>
                </div>

                <div className="relative mt-2 rounded-lg overflow-hidden border border-white/5">
                  <img 
                    src="/dashboard-mockup.png" 
                    alt="Generic Clinic Dashboard Mockup" 
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Glass layout tag overlay */}
                  <div className="absolute bottom-3 right-3 bg-brand-dark/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-[10px] font-medium text-brand-accent">
                    Diseño a medida
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text and Benefits */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/20 border border-brand-electric/30 text-brand-accent text-xs font-semibold">
                <span>Solución 2</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Páginas Web Premium Orientadas a Conversión
              </h3>
              <p className="text-brand-silver font-light leading-relaxed">
                No hacemos webs informativas aburridas. Diseñamos la infraestructura de ventas digital para tu clínica, enfocada en resolver dudas y guiar al usuario a agendar una cita de inmediato.
              </p>

              {/* Web design benefits list */}
              <div className="space-y-6">
                {webBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">{benefit.title}</h4>
                      <p className="text-sm text-brand-silver font-light mt-1 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default SolutionsSection
