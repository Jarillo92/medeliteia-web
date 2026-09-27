import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Html, Lightformer, PerformanceMonitor, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { CalendarCheck2, Zap } from 'lucide-react'
import ChatScreen, { SCREEN_HEIGHT, SCREEN_WIDTH } from './ChatScreen'
import { useConversation } from './useConversation'
import { pointer, trackPointer } from './pointer'

// drei Html en modo transform: 1 px de HTML = DISTANCE_FACTOR / 400 unidades 3D
const DISTANCE_FACTOR = 2;
const PX = DISTANCE_FACTOR / 400;
const SCREEN_W = SCREEN_WIDTH * PX;
const SCREEN_H = SCREEN_HEIGHT * PX;
const BODY_W = SCREEN_W + 0.13;
const BODY_H = SCREEN_H + 0.13;
const DEPTH = 0.17;

function FloatingCard({ show, icon: Icon, title, detail, align = 'left' }) {
  return (
    <div
      className={`w-[236px] rounded-2xl border border-white/10 bg-[#0B1120]/90 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-[opacity,transform] duration-500 ${
        align === 'left' ? 'origin-bottom-left' : 'origin-bottom-right'
      } ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.96]'}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2F6BFF]/15 text-[#9CBBFF] shadow-[inset_0_0_0_1px_rgba(91,140,255,0.3)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[14px] font-semibold leading-tight text-white">{title}</div>
          <div className="mt-0.5 text-[12.5px] leading-tight text-[#96A1B4]">{detail}</div>
        </div>
      </div>
    </div>
  );
}

function Phone({ conversation, scrollProgress }) {
  const rig = useRef();
  const cards = useRef();

  useFrame((state, delta) => {
    const p = scrollProgress ? scrollProgress.get() : 0;
    const t = state.clock.elapsedTime;
    const damp = THREE.MathUtils.damp;
    // El móvil sigue al ratón con retardo (sensación de muelle) y gira al hacer scroll
    const targetRotY = -0.38 + pointer.x * 0.3 + p * 0.85;
    const targetRotX = 0.08 - pointer.y * 0.16 + p * 0.3;
    rig.current.rotation.y = damp(rig.current.rotation.y, targetRotY, 3, delta);
    rig.current.rotation.x = damp(rig.current.rotation.x, targetRotX, 3, delta);
    rig.current.rotation.z = damp(rig.current.rotation.z, 0.04 - pointer.x * 0.03, 3, delta);
    rig.current.position.y = damp(rig.current.position.y, Math.sin(t * 0.8) * 0.05 + p * 0.7, 4, delta);
    // Las tarjetas flotan en otra capa de profundidad: se mueven un poco menos (paralaje)
    cards.current.rotation.y = damp(cards.current.rotation.y, targetRotY * 0.55, 2.5, delta);
    cards.current.rotation.x = damp(cards.current.rotation.x, targetRotX * 0.55, 2.5, delta);
    cards.current.position.y = damp(cards.current.position.y, Math.sin(t * 0.8 + 1.2) * 0.07 + p * 0.5, 3, delta);
  });

  return (
    <>
      <group ref={rig}>
        {/* Marco metálico */}
        <RoundedBox args={[BODY_W + 0.05, BODY_H + 0.05, DEPTH - 0.03]} radius={0.27} smoothness={8}>
          <meshPhysicalMaterial color="#9AA3B5" metalness={1} roughness={0.28} clearcoat={0.5} />
        </RoundedBox>
        {/* Cuerpo lacado */}
        <RoundedBox args={[BODY_W, BODY_H, DEPTH]} radius={0.25} smoothness={8}>
          <meshPhysicalMaterial color="#0A0F1A" metalness={0.5} roughness={0.3} clearcoat={1} clearcoatRoughness={0.12} />
        </RoundedBox>
        {/* Botones laterales */}
        <RoundedBox args={[0.035, 0.46, 0.07]} radius={0.015} position={[BODY_W / 2 + 0.02, 0.75, 0]}>
          <meshStandardMaterial color="#8C95A8" metalness={1} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.035, 0.26, 0.07]} radius={0.015} position={[-BODY_W / 2 - 0.02, 0.95, 0]}>
          <meshStandardMaterial color="#8C95A8" metalness={1} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.035, 0.26, 0.07]} radius={0.015} position={[-BODY_W / 2 - 0.02, 0.6, 0]}>
          <meshStandardMaterial color="#8C95A8" metalness={1} roughness={0.3} />
        </RoundedBox>

        {/* Pantalla: la conversación real en HTML, encajada en el cristal */}
        <Html
          transform
          distanceFactor={DISTANCE_FACTOR}
          position={[0, 0, DEPTH / 2 + 0.004]}
          pointerEvents="none"
          zIndexRange={[20, 0]}
        >
          <ChatScreen {...conversation} />
        </Html>
      </group>

      <group ref={cards}>
        <Html transform distanceFactor={DISTANCE_FACTOR} position={[-1.18, 1.42, 0.7]} pointerEvents="none" zIndexRange={[30, 21]}>
          <FloatingCard show={conversation.visible >= 2} icon={Zap} title="Respondido en segundos" detail="19:42, fuera de horario" />
        </Html>
        <Html transform distanceFactor={DISTANCE_FACTOR} position={[1.12, -1.05, 0.9]} pointerEvents="none" zIndexRange={[30, 21]}>
          <FloatingCard show={conversation.confirmed} icon={CalendarCheck2} title="Cita confirmada" detail="Revisión dental · mañana 18:00" align="right" />
        </Html>
      </group>
    </>
  );
}

function PhoneScene({ active = true, scrollProgress }) {
  const conversation = useConversation({ playing: active });
  const [dpr, setDpr] = useState(1.75);
  useEffect(() => trackPointer(), []);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 7], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: import.meta.env.DEV }}
      style={{ pointerEvents: 'none' }}
    >
      {/* Si el equipo no llega a 60 fps, baja la resolución de render */}
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.75)} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      {/* Luz azul de contorno por detrás: separa el móvil del fondo */}
      <pointLight position={[-2.6, 1.2, -1.6]} color="#2F6BFF" intensity={28} distance={9} />
      <pointLight position={[2.4, -1.5, -1.2]} color="#7FA8FF" intensity={10} distance={7} />

      {/* Reflejos generados en la propia escena (sin descargar mapas de entorno) */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.5} position={[0, 4, 3]} scale={[8, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" color="#3B6DFF" intensity={5} position={[-4, 0, 1]} scale={[1.5, 7, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.4} position={[4, -1, 2]} scale={[1.5, 6, 1]} target={[0, 0, 0]} />
      </Environment>

      <Phone conversation={conversation} scrollProgress={scrollProgress} />

      <ContactShadows position={[0, -2.1, 0]} scale={7} blur={2.8} opacity={0.6} far={3.5} resolution={256} color="#000000" />
    </Canvas>
  );
}

export default PhoneScene
