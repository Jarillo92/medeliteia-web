import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2, CalendarCheck, SendHorizontal } from 'lucide-react'

const conversation = [
  { sender: 'patient', text: 'Buenas, ¿tenéis hueco para una revisión mañana por la tarde?', time: '19:42' },
  { sender: 'agent', text: '¡Hola! Sí, para odontología general mañana tengo libre a las 16:30 y a las 18:00. ¿Cuál te va mejor?', time: '19:42' },
  { sender: 'patient', text: 'A las 18:00 me viene perfecto, déjamela reservada.', time: '19:43' },
  { sender: 'agent', text: '¡Hecho! Acabo de registrar tu revisión para mañana a las 18:00. Te acabo de enviar la confirmación por correo y te recordaré unas horas antes por aquí. ¡Nos vemos!', time: '19:43' }
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function ChatDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  // La conversación se reproduce en bucle; con movimiento reducido se muestra completa
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < conversation.length - 1 ? prev + 1 : 0));
    }, 3200);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  const visibleUntil = reducedMotion ? conversation.length - 1 : activeStep;

  return (
    <div className="relative w-[300px] sm:w-[330px] rounded-[44px] bg-ink p-2.5 shadow-lift">
      <div className="overflow-hidden rounded-[36px] bg-[#EEF2F7]">
        {/* Cabecera del chat */}
        <div className="flex items-center gap-3 bg-surface px-4 pt-7 pb-3 border-b border-line">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
            ME
          </div>
          <div>
            <div className="text-sm font-semibold text-ink leading-tight">Asistente MedElite</div>
            <div className="text-xs text-subtle">en línea</div>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex h-[400px] flex-col gap-3 px-3 pt-4" aria-live="polite">
          {conversation.map((msg, index) => {
            const isVisible = index <= visibleUntil;
            const isPatient = msg.sender === 'patient';
            return (
              <div
                key={index}
                className={`flex max-w-[84%] flex-col transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                } ${isPatient ? 'self-start' : 'self-end'}`}
                aria-hidden={!isVisible}
              >
                <div
                  className={`px-3 py-2 text-[13px] leading-snug text-ink shadow-[0_1px_1px_rgba(15,23,42,0.06)] ${
                    isPatient ? 'rounded-2xl rounded-bl-md bg-surface' : 'rounded-2xl rounded-br-md bg-[#DCE7FE]'
                  }`}
                >
                  {msg.text}
                </div>
                <span className={`mt-1 px-1 text-[11px] text-subtle ${isPatient ? 'self-start' : 'self-end'}`}>{msg.time}</span>
              </div>
            );
          })}
        </div>

        {/* Barra de escritura simulada */}
        <div className="flex items-center gap-2 bg-surface px-3 py-3 border-t border-line" aria-hidden="true">
          <div className="flex-1 rounded-full bg-ground px-4 py-2 text-xs text-subtle">Escribe un mensaje</div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
            <SendHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Texto y llamadas a la acción */}
          <div className="lg:col-span-7">
            <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.75rem] font-bold tracking-[-0.03em] text-ink">
              La agenda de tu clínica{' '}
              <span className="text-accent">llena de citas confirmadas</span>
            </h1>

            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
              Desarrollamos <strong className="font-semibold text-ink">agentes de IA en WhatsApp</strong> que atienden a tus pacientes y agendan citas automáticamente, junto con <strong className="font-semibold text-ink">páginas web a medida</strong> diseñadas exclusivamente para convertir visitas en ingresos.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/34694262425"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-white shadow-soft hover:bg-accent-strong active:scale-[0.98] transition-[background-color,transform] duration-200"
              >
                Solicitar Análisis Inicial
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#soluciones"
                className="inline-flex items-center justify-center rounded-full border border-line bg-surface px-7 py-4 text-base font-semibold text-ink hover:border-ink/30 transition-colors duration-200"
              >
                Ver cómo funciona
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                Configuración a Medida
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                Sin cuotas de configuración gratuitas
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                Soporte Mensual Técnico
              </li>
            </ul>
          </div>

          {/* Demostración: el asistente atendiendo por WhatsApp */}
          <div className="lg:col-span-5">
            <div className="relative flex justify-center rounded-[32px] bg-accent-deep px-6 py-10 sm:py-12">
              <ChatDemo />

              <div className="absolute left-3 bottom-20 hidden sm:flex max-w-[190px] items-center gap-3 rounded-2xl bg-surface p-3 shadow-lift lg:-left-8">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent-soft">
                  <CalendarCheck className="h-5 w-5 text-accent" />
                </div>
                <div className="text-sm font-semibold leading-tight text-ink">Cita confirmada en la agenda</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
