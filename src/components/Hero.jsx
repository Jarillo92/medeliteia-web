import React, { useState, useEffect } from 'react'
import { MessageSquare, ArrowRight, Play, CheckCircle2, Cpu, Calendar } from 'lucide-react'

function Hero() {
  const [activeStep, setActiveStep] = useState(0);

  // Cycle through chat messages simulation for a dynamic feel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const conversation = [
    { sender: 'patient', text: 'Buenas, ¿tenéis hueco para una revisión mañana por la tarde?', time: '19:42' },
    { sender: 'agent', text: '¡Hola! Sí, para odontología general mañana tengo libre a las 16:30 y a las 18:00. ¿Cuál te va mejor?', time: '19:42' },
    { sender: 'patient', text: 'A las 18:00 me viene perfecto, déjamela reservada.', time: '19:43' },
    { sender: 'agent', text: '¡Hecho! Acabo de registrar tu revisión para mañana a las 18:00. Te acabo de enviar la confirmación por correo y te recordaré unas horas antes por aquí. ¡Nos vemos!', time: '19:43' }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/20 border border-brand-electric/30 text-brand-accent text-xs font-semibold mb-6 animate-pulse-slow">
              <Cpu className="w-3.5 h-3.5" />
              <span>Automatización Inteligente en España</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight text-white mb-6">
              La agenda de tu clínica <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric via-brand-accent to-white">
                llena de citas confirmadas
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-brand-silver max-w-2xl mb-8 font-sans font-light leading-relaxed">
              Desarrollamos <strong className="text-white font-medium">agentes de IA en WhatsApp</strong> que atienden a tus pacientes y agendan citas automáticamente, junto con <strong className="text-white font-medium">páginas web a medida</strong> diseñadas exclusivamente para convertir visitas en ingresos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="https://wa.me/34694262425"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-brand-cobalt to-brand-electric shadow-lg shadow-brand-cobalt/20 hover:shadow-brand-electric/30 transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <span>Solicitar Análisis Inicial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href="#soluciones"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Ver cómo funciona</span>
              </a>
            </div>

            {/* Sub-benefits summary */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-brand-silver font-light">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                <span>Configuración a Medida</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                <span>Sin cuotas de configuración gratuitas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                <span>Soporte Mensual Técnico</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp & Badges Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient behind-device light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-electric/15 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Smart Phone Wrapper */}
            <div className="relative w-[320px] sm:w-[350px] aspect-[9/18] rounded-[40px] border-4 border-slate-800 bg-slate-950 shadow-2xl p-3 overflow-hidden select-none">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-800 rounded-b-xl z-30"></div>

              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-3 pt-4 px-2">
                <div className="relative w-8 h-8 rounded-full bg-brand-cobalt/30 flex items-center justify-center border border-brand-accent/20">
                  <span className="text-[11px] font-bold text-brand-accent">ME</span>
                  <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950"></div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Asistente MedElite</div>
                  <div className="text-[9px] text-emerald-400 font-light flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                    En línea
                  </div>
                </div>
              </div>

              {/* Chat Screen / Message Container */}
              <div className="h-[380px] sm:h-[420px] overflow-y-auto pt-4 px-1 space-y-3 flex flex-col scroll-smooth">
                {conversation.map((msg, index) => {
                  const isVisible = index <= activeStep;
                  return (
                    <div 
                      key={index} 
                      className={`flex flex-col max-w-[85%] transition-all duration-500 transform ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
                      } ${msg.sender === 'patient' ? 'self-start' : 'self-end'}`}
                    >
                      <div className={`p-3 text-xs leading-relaxed text-slate-100 ${
                        msg.sender === 'patient' ? 'chat-bubble-patient' : 'chat-bubble-agent'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-slate-500 mt-1 px-1 self-end">{msg.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Simulated Input Area */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 border-t border-white/5 pt-3 bg-slate-950">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-full py-1.5 px-3 text-[10px] text-brand-silver font-light">
                  Escribe un mensaje...
                </div>
                <div className="w-7 h-7 rounded-full bg-brand-cobalt flex items-center justify-center text-white">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* FLOATING BADGE 1: Cita Confirmada */}
            <div className="absolute -left-6 top-[20%] glass-card p-3 rounded-xl border border-white/10 flex items-center gap-2.5 shadow-lg animate-float-slow z-30 max-w-[170px]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] text-brand-silver leading-none mb-1">WhatsApp AI</div>
                <div className="text-xs font-semibold text-white leading-tight">Cita confirmada en la agenda</div>
              </div>
            </div>

            {/* FLOATING BADGE 2: Sin Intervención Humana */}
            <div className="absolute -right-6 bottom-[25%] glass-card p-3 rounded-xl border border-white/10 flex items-center gap-2.5 shadow-lg animate-float-medium z-30 max-w-[170px]">
              <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center flex-shrink-0">
                <Cpu className="w-4 h-4 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] text-brand-silver leading-none mb-1">100% Autónomo</div>
                <div className="text-xs font-semibold text-white leading-tight">Sin intervención humana</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
