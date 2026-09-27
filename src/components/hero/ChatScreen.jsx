import { CalendarCheck2, CheckCheck, ChevronLeft, Phone, Video, Mic } from 'lucide-react'
import { MESSAGES } from './useConversation'

// Pantalla de WhatsApp dibujada en HTML a tamaño fijo (300 x 636 px).
// Se usa dentro del móvil 3D y en la versión ligera para móviles.
export const SCREEN_WIDTH = 300
export const SCREEN_HEIGHT = 636

function TypingBubble() {
  return (
    <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-md bg-[#18202E] px-3.5 py-3" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#8A96AB] animate-bounce"
          style={{ animationDelay: `${i * 140}ms`, animationDuration: '900ms' }}
        />
      ))}
    </div>
  );
}

function ChatScreen({ visible, typing, confirmed }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden bg-[#070B12] text-left font-sans"
      style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, borderRadius: 34 }}
    >
      {/* Barra de estado */}
      <div className="flex items-center justify-between px-7 pt-3.5 pb-1 text-[12px] font-semibold text-[#E6EBF3]">
        <span>19:43</span>
        <span className="h-[22px] w-[84px] rounded-full bg-black" aria-hidden="true" />
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="h-2.5 w-4 rounded-[3px] border border-[#E6EBF3]/80" />
        </span>
      </div>

      {/* Cabecera del chat */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] bg-[#0B111B] px-3 py-2.5">
        <ChevronLeft className="h-5 w-5 text-[#7FA8FF]" aria-hidden="true" />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2F6BFF] to-[#1a3fa8] text-[12px] font-bold text-white">
          ME
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-semibold leading-tight text-[#EDF1F7]">Clínica Dental Sonrisa</div>
          <div className="text-[11px] leading-tight text-[#7FA8FF]">{typing ? 'escribiendo…' : 'en línea'}</div>
        </div>
        <Video className="h-[18px] w-[18px] text-[#7FA8FF]" aria-hidden="true" />
        <Phone className="h-4 w-4 text-[#7FA8FF]" aria-hidden="true" />
      </div>

      {/* Mensajes */}
      <div className="flex flex-1 flex-col gap-2 px-3 pt-4" role="log" aria-label="Conversación de ejemplo por WhatsApp">
        <div className="mb-1 self-center rounded-md bg-[#101826] px-2 py-0.5 text-[10.5px] text-[#8A96AB]">Hoy</div>

        {MESSAGES.slice(0, visible).map((msg, i) => {
          const isPatient = msg.from === 'patient';
          return (
            <div
              key={i}
              className={`msg-in max-w-[82%] ${isPatient ? 'self-start origin-bottom-left' : 'self-end origin-bottom-right'}`}
            >
              <div
                className={`px-3 pt-2 pb-1.5 text-[13px] leading-[1.35] ${
                  isPatient
                    ? 'rounded-2xl rounded-bl-md bg-[#18202E] text-[#E6EBF3]'
                    : 'rounded-2xl rounded-br-md bg-[#1D4ED8] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                }`}
              >
                {msg.text}
                <span className={`ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[10px] ${isPatient ? 'text-[#8A96AB]' : 'text-[#BFD1FF]'}`}>
                  {msg.time}
                  {!isPatient && <CheckCheck className="h-3 w-3" aria-hidden="true" />}
                </span>
              </div>
            </div>
          );
        })}

        {typing && <TypingBubble />}

        {/* Tarjeta de cita confirmada */}
        {confirmed && (
          <div className="msg-in mt-1 w-[82%] self-end origin-bottom-right">
            <div className="rounded-2xl border border-[#2F6BFF]/40 bg-[#0C1A36] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-[#9CBBFF]">
                <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
                Cita confirmada
              </div>
              <div className="mt-1.5 text-[14px] font-semibold text-white">Revisión dental</div>
              <div className="text-[12px] text-[#AFC0DE]">Mañana, 18:00</div>
            </div>
          </div>
        )}
      </div>

      {/* Barra de escritura */}
      <div className="flex items-center gap-2 px-2.5 pb-5 pt-2" aria-hidden="true">
        <div className="flex-1 rounded-full bg-[#121A27] px-4 py-2.5 text-[12.5px] text-[#6E7A8F]">Mensaje</div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2F6BFF] text-white">
          <Mic className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export default ChatScreen
