import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BellRing, CalendarCheck2, MessageCircle } from 'lucide-react'
import { DEMO_LABEL } from '../../config'
import { fillClinic } from '../clinicName'
import { hasFinePointer, prefersReducedMotion } from '../hooks'
import { BookingCard, Bubble, ChatHeader, ComposerBar, PhoneShell, TypingBubble } from './Phone'

// Inclinación de reposo del teléfono y recorrido máximo al seguir al ratón (grados)
const BASE = { x: 5, y: -14 };
const RANGE = { x: 9, y: 14 };

const CARD_ICONS = { message: MessageCircle, booking: CalendarCheck2, reminder: BellRing };

// Posición y profundidad de cada tarjeta flotante (translateZ: más cerca, más se mueve con la inclinación)
const CARD_SLOTS = [
  // Mensaje entrante: arriba a la izquierda, sobre la barra de estado
  'left-[-18%] top-[-3%] sm:left-[-44%] sm:top-[4%] [--z:70px]',
  // Cita confirmada: a la derecha, sobre el margen libre que dejan los mensajes del asistente (desde sm)
  'right-[-50%] top-[52%] hidden sm:block [--z:110px]',
  // Recordatorio: abajo a la izquierda, sobre la barra de escritura
  'bottom-[1%] left-[-16%] sm:bottom-[6%] sm:left-[-40%] [--z:45px]',
];

/**
 * El teléfono sigue suavemente al ratón (solo con ratón de verdad y sin movimiento reducido).
 * Se escribe el transform directamente en el nodo con requestAnimationFrame: sin re-render de React.
 */
function useTilt(areaRef, tiltRef) {
  useEffect(() => {
    const area = areaRef.current;
    const tilt = tiltRef.current;
    if (!area || !tilt || !hasFinePointer() || prefersReducedMotion()) return undefined;

    const current = { ...BASE };
    const target = { ...BASE };
    let frame = 0;

    const step = () => {
      current.x += (target.x - current.x) * 0.09;
      current.y += (target.y - current.y) * 0.09;
      tilt.style.transform = `rotateX(${current.x.toFixed(2)}deg) rotateY(${current.y.toFixed(2)}deg)`;
      const settled = Math.abs(target.x - current.x) < 0.02 && Math.abs(target.y - current.y) < 0.02;
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    const onMove = (e) => {
      const rect = area.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = BASE.x - py * RANGE.x;
      target.y = BASE.y + px * RANGE.y;
      kick();
    };
    const onLeave = () => {
      target.x = BASE.x;
      target.y = BASE.y;
      kick();
    };

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    return () => {
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [areaRef, tiltRef]);
}

/**
 * Conversación del teléfono del hero. El HTML del servidor trae la pregunta y la primera respuesta;
 * tras montar, el paciente elige hueco y el asistente confirma la cita.
 */
function useHeroConversation(scenario, intro) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setStep(4);
      return undefined;
    }
    const timers = [900, 1500, 2700, 3200].map((at, i) => setTimeout(() => setStep(i + 1), at));
    return () => timers.forEach(clearTimeout);
  }, []);

  const { followUp } = scenario;
  const messages = [
    { key: 'q', from: 'patient', text: scenario.question },
    { key: 'a', from: 'agent', text: `${intro} ${scenario.answer}` },
  ];
  if (step >= 1) messages.push({ key: 'f', from: 'patient', text: followUp.option });
  if (step >= 3) messages.push({ key: 'fa', from: 'agent', text: followUp.answer });
  return { messages, typing: step === 2, booking: step >= 4 ? followUp.booking : null };
}

function HeroPhone({ sector, clinic }) {
  const scenario = sector.chat.scenarios.find((s) => s.followUp) || sector.chat.scenarios[0];
  const { messages, typing, booking } = useHeroConversation(scenario, sector.chat.intro);
  const clinicName = clinic || sector.clinicFallback;
  const title = clinic || sector.chatTitleFallback;

  return (
    <PhoneShell className="h-[500px] w-[256px] sm:h-[560px] sm:w-[296px] lg:h-[600px] lg:w-[318px]">
      <ChatHeader title={title} typing={typing} />
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3.5" aria-label="Conversación de ejemplo por WhatsApp" role="img">
        {messages.map((msg) => (
          <Bubble key={msg.key} from={msg.from}>
            {fillClinic(msg.text, clinicName)}
          </Bubble>
        ))}
        {typing && <TypingBubble />}
        {booking && <BookingCard booking={booking} title="Cita confirmada" />}
      </div>
      <ComposerBar />
    </PhoneShell>
  );
}

function FloatingCard({ card, slot, index }) {
  const Icon = CARD_ICONS[card.kind] || MessageCircle;
  return (
    <div className={`absolute ${slot}`} style={{ transform: 'translateZ(var(--z))' }} aria-hidden="true">
      {/* Entrada escalonada (60 ms entre tarjetas) y, dentro, una flotación muy leve */}
      <div className="lp-pop" style={{ '--i': index }}>
        <div className="lp-float" style={{ animationDelay: `${index * -1.7}s` }}>
          <div className="flex w-[196px] items-center gap-3 rounded-2xl border border-white/[0.09] bg-[#0E1420]/95 p-3 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-md sm:w-[218px]">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sector/15 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.25)]">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center justify-between gap-2 whitespace-nowrap text-[12.5px] font-semibold text-ink">
                {card.title}
                {card.meta && <span className="font-normal text-subtle">{card.meta}</span>}
              </span>
              <span className="mt-0.5 block truncate text-[13px] text-muted">{card.text}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingHero({ sector, clinic }) {
  const { hero } = sector;
  const areaRef = useRef(null);
  const tiltRef = useRef(null);
  useTilt(areaRef, tiltRef);

  return (
    <section ref={areaRef} className="relative overflow-hidden bg-ground pt-28 pb-20 sm:pt-32 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        style={{ background: 'radial-gradient(45% 50% at 15% 20%, rgb(var(--sector) / 0.12), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-7">
          <p className="lp-rise font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-sector">{hero.label}</p>
          <h1
            className="lp-rise mt-5 text-[clamp(2.6rem,5.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink"
            style={{ '--i': 1 }}
          >
            {clinic || hero.titleLead}, <span className="text-sector">{hero.titleAccent}</span> {hero.titleTail}
          </h1>
          <p className="lp-rise mt-7 max-w-[36rem] text-[19px] leading-relaxed text-muted sm:text-[21px]" style={{ '--i': 2 }}>
            {hero.subtitle}
          </p>
          <div className="lp-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ '--i': 3 }}>
            <a href="#reserva" className="btn-primary px-7 py-4 text-[17px]">
              {DEMO_LABEL}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#prueba" className="btn-ghost px-7 py-4 text-[17px]">
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Escenario 3D: teléfono y tarjetas a distinta profundidad */}
        <div className="relative flex justify-center lg:col-span-5">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgb(var(--sector) / 0.38), rgb(var(--sector) / 0.10) 55%, transparent)', filter: 'blur(36px)' }}
            aria-hidden="true"
          />
          {/* La entrada (lp-rise) va en un envoltorio propio para no pisar el transform de la inclinación */}
          <div className="lp-rise" style={{ '--i': 2, perspective: '1600px' }}>
            <div
              ref={tiltRef}
              className="relative"
              style={{ transformStyle: 'preserve-3d', transform: `rotateX(${BASE.x}deg) rotateY(${BASE.y}deg)` }}
            >
              <HeroPhone sector={sector} clinic={clinic} />
              {hero.floating.map((card, i) => (
                <FloatingCard key={card.kind} card={card} slot={CARD_SLOTS[i]} index={4 + i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero
