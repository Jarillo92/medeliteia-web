import { CalendarCheck2, Check, ChevronLeft, Mic, Phone as PhoneIcon, Video } from 'lucide-react'

function initials(name) {
  const words = name.replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/).filter(Boolean);
  if (!words.length) return 'IA';
  return words.slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

export function TypingBubble() {
  return (
    <div className="lp-msg flex items-center gap-1 self-start rounded-2xl rounded-bl-md bg-[#1A2334] px-4 py-3.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="lp-typing-dot h-1.5 w-1.5 rounded-full bg-[#8A96AB]" style={{ animationDelay: `${i * 150}ms` }} aria-hidden="true" />
      ))}
      <span className="sr-only">El asistente está escribiendo</span>
    </div>
  );
}

export function BookingCard({ booking, title = 'Cita reservada' }) {
  return (
    <div className="lp-msg w-[86%] origin-bottom-left self-start">
      <div className="rounded-2xl border border-sector/40 bg-sector/10 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-sector">
          <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
          {title}
        </div>
        <div className="mt-1.5 text-[15px] font-semibold text-white">{booking.treatment}</div>
        <div className="text-[13px] text-[#AFC0DE]">{booking.when}</div>
      </div>
    </div>
  );
}

// Burbuja de WhatsApp (paciente a la derecha en azul, asistente a la izquierda)
export function Bubble({ from, userLabel = 'Cliente', children }) {
  const isPatient = from === 'patient';
  return (
    <div className={`lp-msg max-w-[86%] ${isPatient ? 'origin-bottom-right self-end' : 'origin-bottom-left self-start'}`}>
      <span className="sr-only">{isPatient ? `${userLabel}: ` : 'Asistente: '}</span>
      <div
        className={`px-3 pt-2 pb-2 text-[14.5px] leading-[1.4] ${
          isPatient
            ? 'rounded-2xl rounded-br-md bg-sector-solid text-sector-on shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
            : 'rounded-2xl rounded-bl-md bg-[#1A2334] text-[#E9EEF6]'
        }`}
      >
        {children}
        {isPatient && <Check className="ml-1.5 inline h-3 w-3 opacity-70" aria-hidden="true" />}
      </div>
    </div>
  );
}

// Cabecera del chat de WhatsApp con el nombre de la clínica
export function ChatHeader({ title, typing }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-white/[0.06] bg-[#0B111B] px-3 py-2.5">
      <ChevronLeft className="h-5 w-5 flex-shrink-0 text-sector" aria-hidden="true" />
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sector-solid text-[12px] font-bold text-sector-on shadow-[inset_0_-8px_12px_rgba(0,0,0,0.18)]" aria-hidden="true">
        {initials(title)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold leading-tight text-[#EDF1F7]">{title}</div>
        <div className="text-[11.5px] leading-tight text-sector">{typing ? 'escribiendo…' : 'asistente de IA · en línea'}</div>
      </div>
      <Video className="h-[18px] w-[18px] flex-shrink-0 text-sector" aria-hidden="true" />
      <PhoneIcon className="h-4 w-4 flex-shrink-0 text-sector" aria-hidden="true" />
    </div>
  );
}

// Barra de escritura decorativa
export function ComposerBar() {
  return (
    <div className="flex items-center gap-2 px-2.5 pb-5 pt-2" aria-hidden="true">
      <div className="flex-1 rounded-full bg-[#121A27] px-4 py-2.5 text-[12.5px] text-[#6E7A8F]">Mensaje</div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sector-solid text-sector-on">
        <Mic className="h-4 w-4" />
      </div>
    </div>
  );
}

// Carcasa del móvil en CSS (mismo aspecto que el móvil del hero de la home)
export function PhoneShell({ children, className = '' }) {
  return (
    <div
      className={`relative rounded-[46px] bg-gradient-to-b from-[#2A3244] via-[#141A26] to-[#0B0F18] p-[9px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.18)] ${className}`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[38px] bg-[#070B12] text-left">
        <div className="flex items-center justify-between px-7 pt-3.5 pb-1 text-[12px] font-semibold text-[#E6EBF3]" aria-hidden="true">
          <span>22:41</span>
          <span className="h-[22px] w-[84px] rounded-full bg-black" />
          <span className="h-2.5 w-4 rounded-[3px] border border-[#E6EBF3]/80" />
        </div>
        {children}
      </div>
      {/* Reflejo del cristal */}
      <div
        className="pointer-events-none absolute inset-[9px] rounded-[38px]"
        style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 30%)' }}
        aria-hidden="true"
      />
    </div>
  );
}
