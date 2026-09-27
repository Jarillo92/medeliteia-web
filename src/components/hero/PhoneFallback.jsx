import ChatScreen, { SCREEN_HEIGHT, SCREEN_WIDTH } from './ChatScreen'
import { useConversation } from './useConversation'

const BEZEL = 9;

// Móvil en CSS con la conversación real: versión ligera para móviles,
// para movimiento reducido y mientras carga la escena 3D.
function PhoneFallback({ width = 280, playing = true, reducedMotion = false, tilt = true }) {
  const conversation = useConversation({ playing, static: reducedMotion });
  const scale = (width - BEZEL * 2) / SCREEN_WIDTH;
  const height = SCREEN_HEIGHT * scale + BEZEL * 2;

  return (
    <div className="relative" style={{ perspective: 1400 }}>
      <div
        className="relative rounded-[46px] bg-gradient-to-b from-[#2A3244] via-[#141A26] to-[#0B0F18] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.18)]"
        style={{
          width,
          height,
          padding: BEZEL,
          transform: tilt ? 'rotateY(-14deg) rotateX(6deg) rotateZ(1deg)' : undefined,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="overflow-hidden rounded-[38px] bg-black" style={{ width: SCREEN_WIDTH * scale, height: SCREEN_HEIGHT * scale }}>
          <div style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <ChatScreen {...conversation} />
          </div>
        </div>
        {/* Reflejo del cristal */}
        <div
          className="pointer-events-none absolute inset-[9px] rounded-[38px]"
          style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 32%)' }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default PhoneFallback
