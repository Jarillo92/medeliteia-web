import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Html, Lightformer, PerformanceMonitor, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { Zap } from 'lucide-react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './ChatScreen'
import { useConversation } from './useConversation'
import { useChatTexture } from './chatTexture'
import { pointer, trackPointer } from './pointer'
import { Globe } from './GlobeScene'

// Proporciones de un smartphone actual (tipo iPhone 15: 71,6 × 147,6 × 7,8 mm)
const SCREEN_W = 1.5;
const SCREEN_H = SCREEN_W * (SCREEN_HEIGHT / SCREEN_WIDTH);
const BEZEL = 0.055; // marco negro, igual en los cuatro lados
const RIM = 0.02; // canto metálico que asoma por el frontal
const BODY_W = SCREEN_W + BEZEL * 2;
const BODY_H = SCREEN_H + BEZEL * 2;
const CORNER = 0.25;
const CORE_DEPTH = 0.11; // grosor total = CORE_DEPTH + 2 * RIM
const FRONT_Z = CORE_DEPTH / 2 + RIM;

// Giro máximo respecto a la posición de reposo (~9°)
const MAX_TILT = 0.16;
const REST = { x: 0.06, y: -0.14, z: 0.012 };

function roundedRectShape(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function useBodyGeometry() {
  return useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRectShape(BODY_W, BODY_H, CORNER), {
      depth: CORE_DEPTH,
      bevelEnabled: true,
      bevelThickness: RIM,
      bevelSize: RIM,
      bevelSegments: 10,
      curveSegments: 48,
    });
    g.translate(0, 0, -CORE_DEPTH / 2);
    return g;
  }, []);
}

function useScreenGeometry() {
  return useMemo(() => {
    const g = new THREE.ShapeGeometry(roundedRectShape(SCREEN_W, SCREEN_H, CORNER - BEZEL), 48);
    // UV de 0 a 1 sobre el rectángulo de la pantalla, para que la textura encaje exacta
    const pos = g.attributes.position;
    const uv = g.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(i, pos.getX(i) / SCREEN_W + 0.5, pos.getY(i) / SCREEN_H + 0.5);
    }
    return g;
  }, []);
}

function FloatingCard({ icon: Icon, title, detail }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 700);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={`w-[236px] rounded-2xl border border-white/10 bg-[#0B1120]/90 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-[opacity,transform] duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
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

const clamp = THREE.MathUtils.clamp;

function Phone({ conversation, scrollProgress }) {
  const rig = useRef();
  const cards = useRef();
  const body = useBodyGeometry();
  const screen = useScreenGeometry();
  const chat = useChatTexture(conversation);
  // Grupo 0 de la extrusión: frontal y trasera; grupo 1: canto y bisel
  const bodyMaterials = useMemo(() => [
    new THREE.MeshPhysicalMaterial({ color: '#05070B', metalness: 0.2, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 }),
    new THREE.MeshPhysicalMaterial({ color: '#A3ACBD', metalness: 1, roughness: 0.26, clearcoat: 0.4 }),
  ], []);

  useFrame((state, delta) => {
    const p = scrollProgress ? scrollProgress.get() : 0;
    const t = state.clock.elapsedTime;
    const damp = THREE.MathUtils.damp;
    // Giro contenido: ratón + scroll, nunca más de ~9° desde el reposo
    const dy = clamp(pointer.x * 0.1 + p * 0.08, -MAX_TILT, MAX_TILT);
    const dx = clamp(-pointer.y * 0.07 + p * 0.06, -MAX_TILT, MAX_TILT);
    rig.current.rotation.y = damp(rig.current.rotation.y, REST.y + dy, 3, delta);
    rig.current.rotation.x = damp(rig.current.rotation.x, REST.x + dx, 3, delta);
    rig.current.rotation.z = REST.z;
    rig.current.position.y = damp(rig.current.position.y, Math.sin(t * 0.8) * 0.04 + p * 0.6, 4, delta);
    // La tarjeta flota en otra capa: se mueve algo menos (paralaje)
    cards.current.position.x = damp(cards.current.position.x, pointer.x * 0.05, 2.5, delta);
    cards.current.position.y = damp(cards.current.position.y, Math.sin(t * 0.8 + 1.2) * 0.06 + p * 0.45, 3, delta);
  });

  return (
    <>
      <group ref={rig} rotation={[REST.x, REST.y, REST.z]}>
        {/* Cuerpo: frontal y trasera de cristal negro, canto de titanio */}
        <mesh geometry={body} material={bodyMaterials} />
        {/* Botones laterales, casi enrasados */}
        <RoundedBox args={[0.03, 0.44, 0.06]} radius={0.012} position={[BODY_W / 2 + RIM, 0.62, 0]}>
          <meshStandardMaterial color="#9AA3B5" metalness={1} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.03, 0.26, 0.06]} radius={0.012} position={[-BODY_W / 2 - RIM, 0.82, 0]}>
          <meshStandardMaterial color="#9AA3B5" metalness={1} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.03, 0.26, 0.06]} radius={0.012} position={[-BODY_W / 2 - RIM, 0.48, 0]}>
          <meshStandardMaterial color="#9AA3B5" metalness={1} roughness={0.3} />
        </RoundedBox>

        {/* Pantalla: el chat como textura sobre el propio modelo */}
        <mesh geometry={screen} position={[0, 0, FRONT_Z + 0.001]}>
          <meshBasicMaterial map={chat} toneMapped={false} />
        </mesh>
      </group>

      <group ref={cards}>
        <Html center position={[-1.66, 1.42, 0.4]} pointerEvents="none" zIndexRange={[30, 20]}>
          <FloatingCard icon={Zap} title="Respondido en segundos" detail="19:42, fuera de horario" />
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
      // Teleobjetivo: cámara lejos y campo de visión cerrado, sin deformación de gran angular
      camera={{ position: [0, 0, 9.6], fov: 24 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: import.meta.env.DEV }}
      style={{ pointerEvents: 'none' }}
    >
      {/* Si el equipo no llega a 60 fps, baja la resolución de render */}
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.75)} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      {/* Luz azul de contorno por detrás: separa el móvil del fondo */}
      <pointLight position={[-2.6, 1.2, -1.6]} color="#2F6BFF" intensity={48} distance={9} />
      <pointLight position={[2.4, -1.5, -1.2]} color="#7FA8FF" intensity={22} distance={7} />
      <pointLight position={[0, 2.8, -1.4]} color="#5B8CFF" intensity={18} distance={6} />

      {/* Reflejos generados en la propia escena (sin descargar mapas de entorno) */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.5} position={[0, 4, 3]} scale={[8, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" color="#3B6DFF" intensity={9} position={[-4, 0, 1]} scale={[1.5, 7, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" color="#6F9BFF" intensity={4} position={[4, 1, -1]} scale={[1, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.4} position={[4, -1, 2]} scale={[1.5, 6, 1]} target={[0, 0, 0]} />
      </Environment>

      {/* Globo tenue y grande detrás: fondo luminoso, el protagonista sigue siendo el móvil */}
      <group position={[0.05, 0.15, -4.6]} scale={1.28}>
        <Globe lite dim={0.38} follow={0.4} scrollProgress={scrollProgress} />
      </group>

      <Phone conversation={conversation} scrollProgress={scrollProgress} />

      <ContactShadows position={[0, -2.05, 0]} scale={[5, 3]} blur={2.8} opacity={0.55} far={3.5} resolution={256} color="#000000" />
    </Canvas>
  );
}

export default PhoneScene
