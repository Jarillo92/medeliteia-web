import { useCallback, useEffect, useRef, useState } from 'react'
import { CalendarCheck2, Check, ChevronLeft, MessageCircle, Mic, Phone, RotateCcw, Video } from 'lucide-react'
import { fillClinic } from '../clinicName'
import { prefersReducedMotion } from '../hooks'
import SectionLabel from './SectionLabel'

// Tiempo que el asistente "escribe" antes de contestar
const TYPING_MS = 1100;
const TYPING_MS_REDUCED = 300;

function initials(name) {
  const words = name.replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/).filter(Boolean);
  if (!words.length) return 'IA';
  return words.slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

// Abre el chat real de GoHighLevel si su API está disponible en la página
function useRealAssistant() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let tries = 0;
    const check = () => typeof window.leadConnector?.chatWidget?.openWidget === 'function';
    if (check()) {
      setAvailable(true);
      return undefined;
    }
    const timer = setInterval(() => {
      tries += 1;
      if (check()) {
        setAvailable(true);
        clearInterval(timer);
      } else if (tries > 30) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const open = useCallback(() => window.leadConnector?.chatWidget?.openWidget(), []);
  return { available, open };
}

function TypingBubble() {
  return (
    <div className="lp-msg flex items-center gap-1 self-start rounded-2xl rounded-bl-md bg-[#1A2334] px-4 py-3.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="lp-typing-dot h-1.5 w-1.5 rounded-full bg-[#8A96AB]" style={{ animationDelay: `${i * 150}ms` }} aria-hidden="true" />
      ))}
      <span className="sr-only">El asistente está escribiendo</span>
    </div>
  );
}

function BookingCard({ booking }) {
  return (
    <div className="lp-msg w-[84%] origin-bottom-left self-start">
      <div className="rounded-2xl border border-sector/40 bg-sector/10 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-sector">
          <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
          Cita reservada
        </div>
        <div className="mt-1.5 text-[15px] font-semibold text-white">{booking.treatment}</div>
        <div className="text-[13px] text-[#AFC0DE]">{booking.when}</div>
      </div>
    </div>
  );
}

// Móvil en CSS con la conversación (mismo aspecto que el móvil del hero de la home)
function PhoneChat({ title, messages, typing, clinicName }) {
  const logRef = useRef(null);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [messages.length, typing]);

  return (
    <div className="mx-auto w-full max-w-[340px] rounded-[46px] bg-gradient-to-b from-[#2A3244] via-[#141A26] to-[#0B0F18] p-[9px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.18)]">
      <div className="flex h-[540px] flex-col overflow-hidden rounded-[38px] sm:h-[600px] bg-[#070B12] text-left">
        <div className="flex items-center justify-between px-7 pt-3.5 pb-1 text-[12px] font-semibold text-[#E6EBF3]" aria-hidden="true">
          <span>22:40</span>
          <span className="h-[22px] w-[84px] rounded-full bg-black" />
          <span className="h-2.5 w-4 rounded-[3px] border border-[#E6EBF3]/80" />
        </div>

        <div className="flex items-center gap-2.5 border-b border-white/[0.06] bg-[#0B111B] px-3 py-2.5">
          <ChevronLeft className="h-5 w-5 text-[#7FA8FF]" aria-hidden="true" />
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2F6BFF] to-[#1a3fa8] text-[12px] font-bold text-white" aria-hidden="true">
            {initials(title)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold leading-tight text-[#EDF1F7]">{title}</div>
            <div className="text-[11.5px] leading-tight text-[#7FA8FF]">{typing ? 'escribiendo…' : 'asistente de IA · en línea'}</div>
          </div>
          <Video className="h-[18px] w-[18px] text-[#7FA8FF]" aria-hidden="true" />
          <Phone className="h-4 w-4 text-[#7FA8FF]" aria-hidden="true" />
        </div>

        <div
          ref={logRef}
          className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-3 py-3.5"
          role="log"
          aria-live="polite"
          aria-label="Conversación de ejemplo por WhatsApp"
        >
          {/* mt-auto: los mensajes se apilan desde abajo, como en WhatsApp, junto a los chips */}
          <div className="mb-1 mt-auto self-center rounded-md bg-[#101826] px-2 py-0.5 text-[11px] text-[#8A96AB]">Hoy</div>
          {messages.length === 0 && (
            <p className="mx-auto mb-auto mt-6 max-w-[15rem] text-center text-[13.5px] leading-relaxed text-[#8A96AB]">
              Elige un mensaje para empezar la conversación.
            </p>
          )}
          {messages.map((msg) => {
            if (msg.booking) return <BookingCard key={msg.key} booking={msg.booking} />;
            const isPatient = msg.from === 'patient';
            return (
              <div key={msg.key} className={`lp-msg max-w-[86%] ${isPatient ? 'origin-bottom-right self-end' : 'origin-bottom-left self-start'}`}>
                <span className="sr-only">{isPatient ? 'Paciente: ' : 'Asistente: '}</span>
                <div
                  className={`px-3 pt-2 pb-2 text-[14.5px] leading-[1.4] ${
                    isPatient
                      ? 'rounded-2xl rounded-br-md bg-[#1D4ED8] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                      : 'rounded-2xl rounded-bl-md bg-[#1A2334] text-[#E9EEF6]'
                  }`}
                >
                  {fillClinic(msg.text, clinicName)}
                  {isPatient && <Check className="ml-1.5 inline h-3 w-3 text-[#BFD1FF]" aria-hidden="true" />}
                </div>
              </div>
            );
          })}
          {typing && <TypingBubble />}
        </div>

        <div className="flex items-center gap-2 px-2.5 pb-5 pt-2" aria-hidden="true">
          <div className="flex-1 rounded-full bg-[#121A27] px-4 py-2.5 text-[12.5px] text-[#6E7A8F]">Mensaje</div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2F6BFF] text-white">
            <Mic className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayableChat({ sector, clinic }) {
  const { chat } = sector;
  const clinicName = clinic || sector.clinicFallback;
  const title = clinic || sector.chatTitleFallback;

  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState([]);
  const [offer, setOffer] = useState(null); // escenario con respuesta rápida pendiente
  const introduced = useRef(false);
  const timers = useRef([]);
  const counter = useRef(0);
  const real = useRealAssistant();

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const push = (msg) => {
    counter.current += 1;
    setMessages((prev) => [...prev, { ...msg, key: counter.current }]);
  };

  // El paciente escribe, el asistente "escribe" y contesta. Su primera respuesta siempre le presenta como IA.
  const converse = (patientText, agentText, after) => {
    push({ from: 'patient', text: patientText });
    setTyping(true);
    const wait = prefersReducedMotion() ? TYPING_MS_REDUCED : TYPING_MS;
    timers.current.push(
      setTimeout(() => {
        const text = introduced.current ? agentText : `${chat.intro} ${agentText}`;
        introduced.current = true;
        setTyping(false);
        push({ from: 'agent', text });
        after?.();
      }, wait)
    );
  };

  const ask = (scenario) => {
    if (typing) return;
    setOffer(null);
    setAsked((prev) => (prev.includes(scenario.id) ? prev : [...prev, scenario.id]));
    converse(scenario.question, scenario.answer, () => {
      if (scenario.followUp) setOffer(scenario.id);
    });
  };

  const answerFollowUp = (scenario) => {
    if (typing) return;
    setOffer(null);
    const { followUp } = scenario;
    converse(followUp.option, followUp.answer, () => push({ booking: followUp.booking }));
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    introduced.current = false;
    setMessages([]);
    setTyping(false);
    setAsked([]);
    setOffer(null);
  };

  const offered = chat.scenarios.find((s) => s.id === offer);

  return (
    <section id="prueba" className="relative py-20 md:py-28">
      {/* En móvil: título, móvil y debajo los chips, para ver la respuesta justo encima de lo que se toca */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6 lg:self-end" data-reveal>
          <SectionLabel>{chat.label}</SectionLabel>
          <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.6rem]">{chat.title}</h2>
          <p className="mt-4 max-w-[34rem] text-lg leading-relaxed text-muted">{chat.lead}</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center" data-reveal>
          <div className="relative">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgb(var(--sector) / 0.30), transparent)', filter: 'blur(30px)' }}
              aria-hidden="true"
            />
            <div className="relative">
              <PhoneChat title={title} messages={messages} typing={typing} clinicName={clinicName} />
            </div>
          </div>
          <p className="mx-auto mt-5 max-w-[340px] text-center text-[13.5px] leading-relaxed text-subtle">{chat.note}</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start" data-reveal>
          <div role="group" aria-label="Mensajes de ejemplo">
            <ul className="flex flex-wrap gap-2.5">
              {chat.scenarios.map((scenario) => {
                const done = asked.includes(scenario.id);
                return (
                  <li key={scenario.id}>
                    <button
                      type="button"
                      onClick={() => ask(scenario)}
                      disabled={typing || done}
                      className={`lp-chip rounded-full border px-4 py-2.5 text-left text-[15px] font-medium disabled:cursor-not-allowed ${
                        done ? 'border-white/[0.05] bg-transparent text-subtle' : 'border-white/10 bg-surface text-ink-soft disabled:opacity-60'
                      }`}
                    >
                      {done && <Check className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px" aria-hidden="true" />}
                      {scenario.question}
                      {done && <span className="sr-only"> (ya preguntado)</span>}
                    </button>
                  </li>
                );
              })}
            </ul>

            {offered && (
              <div className="lp-msg mt-5 flex flex-wrap items-center gap-3">
                <span className="text-[14px] text-subtle">Responde como paciente:</span>
                <button
                  type="button"
                  onClick={() => answerFollowUp(offered)}
                  disabled={typing}
                  className="lp-chip rounded-full border border-sector/50 bg-sector/10 px-4 py-2.5 text-[15px] font-semibold text-ink"
                >
                  {offered.followUp.option}
                </button>
              </div>
            )}
          </div>

          {(messages.length > 0 || real.available) && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {messages.length > 0 && (
              <button type="button" onClick={reset} className="btn-ghost px-4 py-2.5 text-[14px]">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Empezar de nuevo
              </button>
            )}
            {real.available && (
              <button type="button" onClick={real.open} className="btn-ghost px-4 py-2.5 text-[14px]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Hablar con el asistente real
              </button>
            )}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PlayableChat
