import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, MessageCircle, RotateCcw } from 'lucide-react'
import { fillClinic } from '../clinicName'
import { prefersReducedMotion } from '../hooks'
import { Reveal } from '../motion'
import { BookingCard, Bubble, ChatHeader, ComposerBar, TypingBubble } from './Phone'
import SectionHeading from './SectionHeading'

// Tiempo que el asistente "escribe" antes de contestar
const TYPING_MS = 1100;
const TYPING_MS_REDUCED = 300;

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

/**
 * Chat jugable con aspecto de bandeja de WhatsApp Business: a la izquierda los mensajes de pacientes
 * (chips), a la derecha la conversación. En móvil, la conversación va arriba y los chips debajo.
 */
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
  const logRef = useRef(null);
  const real = useRealAssistant();

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({ top: log.scrollHeight, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [messages.length, typing]);

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
    <section id="prueba" className="relative overflow-x-clip bg-ground py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={chat.label} title={chat.title} lead={chat.lead} />

        <Reveal index={1} className="relative mt-12">
          <div
            className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-[40px]"
            style={{ background: 'radial-gradient(50% 60% at 65% 50%, rgb(var(--sector) / 0.14), transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 overflow-hidden rounded-[26px] border border-white/[0.08] bg-surface shadow-lift md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
            {/* Mensajes de pacientes: chips como botones */}
            <div className="order-2 border-t border-white/[0.07] p-4 sm:p-5 md:order-1 md:border-r md:border-t-0">
              <p id="chat-chips" className="px-1 text-[15px] font-semibold text-ink">
                {chat.chipsTitle}
              </p>
              <p className="mt-1 px-1 text-[14px] text-subtle">Toca uno para enviarlo.</p>
              <ul className="mt-4 space-y-2" role="group" aria-labelledby="chat-chips">
                {chat.scenarios.map((scenario) => {
                  const done = asked.includes(scenario.id);
                  return (
                    <li key={scenario.id}>
                      <button
                        type="button"
                        onClick={() => ask(scenario)}
                        disabled={typing || done}
                        className={`lp-chip flex w-full items-start gap-3 rounded-2xl border p-3 text-left disabled:cursor-not-allowed ${
                          done ? 'border-transparent bg-transparent' : 'border-white/[0.07] bg-raised/60 disabled:opacity-60'
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                            done ? 'bg-white/[0.05] text-subtle' : 'bg-sector/15 text-sector'
                          }`}
                          aria-hidden="true"
                        >
                          {done ? <Check className="h-4 w-4" /> : chat.userInitial}
                        </span>
                        <span className={`text-[15.5px] leading-snug ${done ? 'text-subtle' : 'text-ink-soft'}`}>
                          {scenario.question}
                          {done && <span className="sr-only"> (ya enviado)</span>}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {(messages.length > 0 || real.available) && (
                <div className="mt-5 flex flex-wrap gap-2 px-1">
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
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Conversación */}
            <div className="order-1 flex h-[400px] min-w-0 flex-col bg-[#070B12] md:order-2 md:h-[560px]">
              <ChatHeader title={title} typing={typing} />
              <div
                ref={logRef}
                className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-3 py-4 sm:px-6"
                role="log"
                aria-live="polite"
                aria-label="Conversación de ejemplo por WhatsApp"
              >
                {/* mt-auto: los mensajes se apilan desde abajo, como en WhatsApp */}
                <div className="mb-1 mt-auto self-center rounded-md bg-[#101826] px-2 py-0.5 text-[11px] text-[#8A96AB]">Hoy</div>
                {messages.length === 0 && (
                  <p className="mx-auto mb-auto mt-6 max-w-[16rem] text-center text-[14px] leading-relaxed text-[#8A96AB]">
                    {chat.emptyHint.before} <span className="md:hidden">(debajo) </span>{chat.emptyHint.after}
                  </p>
                )}
                {messages.map((msg) =>
                  msg.booking ? (
                    <BookingCard key={msg.key} booking={msg.booking} />
                  ) : (
                    <Bubble key={msg.key} from={msg.from} userLabel={chat.userLabel}>
                      {fillClinic(msg.text, clinicName)}
                    </Bubble>
                  )
                )}
                {typing && <TypingBubble />}
              </div>
              {offered ? (
                <div className="lp-msg flex flex-wrap items-center gap-2 border-t border-white/[0.06] px-3 py-3 sm:px-6">
                  <span className="text-[13.5px] text-[#8A96AB]">Respuesta rápida:</span>
                  <button
                    type="button"
                    onClick={() => answerFollowUp(offered)}
                    disabled={typing}
                    className="lp-chip rounded-full border border-sector/50 bg-sector/10 px-4 py-2 text-[14.5px] font-semibold text-ink"
                  >
                    {offered.followUp.option}
                  </button>
                </div>
              ) : (
                <ComposerBar />
              )}
            </div>
          </div>
        </Reveal>
        <p className="mt-5 text-center text-[14px] leading-relaxed text-subtle">{chat.note}</p>
      </div>
    </section>
  );
}

export default PlayableChat
