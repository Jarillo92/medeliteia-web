import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import { pointer, trackPointer } from './pointer'

const R = 1.55;
// Giro que deja a España (origen de las conexiones) mirando a cámara, algo desplazada a la derecha
const SPAIN_FACING = -1.35;

// Generador pseudoaleatorio con semilla: el globo es siempre igual
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fibonacciSphere(count, radius) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

function latLngToVec(lat, lng, radius) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Rejilla de meridianos y paralelos, como la del globo del logo
function useGridGeometry() {
  return useMemo(() => {
    const pts = [];
    const r = R * 1.002;
    const seg = 96;
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let i = 0; i < seg; i++) {
        pts.push(latLngToVec(lat, (i / seg) * 360, r), latLngToVec(lat, ((i + 1) / seg) * 360, r));
      }
    }
    for (let lng = 0; lng < 360; lng += 15) {
      for (let i = 0; i < seg / 2; i++) {
        const a = -90 + (i / (seg / 2)) * 180;
        const b = -90 + ((i + 1) / (seg / 2)) * 180;
        pts.push(latLngToVec(a, lng, r), latLngToVec(b, lng, r));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
}

const coreMaterial = () => new THREE.ShaderMaterial({
  uniforms: { uDim: { value: 1 } },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vView = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uDim;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
      // Luz clave desde arriba a la izquierda
      float key = max(dot(vNormal, normalize(vec3(-0.5, 0.8, 0.6))), 0.0);
      vec3 base = vec3(0.015, 0.035, 0.09) + vec3(0.03, 0.08, 0.22) * key;
      vec3 rim = vec3(0.23, 0.48, 1.0);
      gl_FragColor = vec4(base * mix(0.6, 1.0, uDim) + rim * fres * 0.9 * uDim, 1.0);
    }
  `,
});

const atmosphereMaterial = () => new THREE.ShaderMaterial({
  uniforms: { uDim: { value: 1 } },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uDim;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
      gl_FragColor = vec4(0.25, 0.5, 1.0, 1.0) * intensity * uDim;
    }
  `,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
  transparent: true,
  depthWrite: false,
});

function Arc({ start, end, speed, delay, dim = 1, color = '#9CBBFF' }) {
  const lineRef = useRef();
  const pulseRef = useRef();
  const points = useMemo(() => {
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const lift = R * (1.18 + start.distanceTo(end) * 0.16);
    mid.normalize().multiplyScalar(lift);
    return new THREE.QuadraticBezierCurve3(start, mid, end).getPoints(64);
  }, [start, end]);

  useFrame((state) => {
    const t = (state.clock.elapsedTime * speed + delay) % 1;
    if (lineRef.current) lineRef.current.material.dashOffset = -t * 2;
    // Pulso en el destino cuando llega el destello
    if (pulseRef.current) {
      const hit = Math.max(0, 1 - Math.abs(t - 0.52) * 6);
      pulseRef.current.scale.setScalar(0.6 + hit * 1.8);
      pulseRef.current.material.opacity = (0.25 + hit * 0.75) * dim;
    }
  });

  return (
    <group>
      <Line points={points} color="#4F7DFF" lineWidth={1.2} transparent opacity={0.4 * dim} />
      <Line
        ref={lineRef}
        points={points}
        color={color}
        lineWidth={2.4}
        dashed
        dashSize={0.26}
        gapSize={1.74}
        dashScale={1}
        transparent
        opacity={0.95 * dim}
      />
      <mesh ref={pulseRef} position={end}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color="#CFE0FF" transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// dim < 1: versión tenue para usarla como fondo luminoso detrás del móvil
export function Globe({ lite, reducedMotion, scrollProgress, dim = 1, follow = 1 }) {
  const rig = useRef();
  const spin = useRef();
  const ringDot = useRef();
  const grid = useGridGeometry();
  const core = useMemo(coreMaterial, []);
  const atmosphere = useMemo(atmosphereMaterial, []);
  core.uniforms.uDim.value = dim;
  atmosphere.uniforms.uDim.value = dim;
  const dots = useMemo(() => fibonacciSphere(lite ? 700 : 1800, R * 1.006), [lite]);

  const arcs = useMemo(() => {
    const rand = mulberry32(7);
    // España como nodo principal: conecta con puntos repartidos
    const origin = latLngToVec(40.4, -3.7, R);
    const count = lite ? 5 : 9;
    return Array.from({ length: count }, (_, i) => {
      const lat = -35 + rand() * 95;
      const lng = -110 + rand() * 180;
      const other = latLngToVec(lat, lng, R);
      const outbound = i % 2 === 0;
      return {
        start: outbound ? origin : other,
        end: outbound ? other : origin,
        speed: 0.09 + rand() * 0.07,
        delay: rand(),
      };
    });
  }, [lite]);

  useFrame((state, delta) => {
    const p = scrollProgress ? scrollProgress.get() : 0;
    const damp = THREE.MathUtils.damp;
    if (!reducedMotion) spin.current.rotation.y = SPAIN_FACING + Math.sin(state.clock.elapsedTime * 0.12) * 0.55;
    rig.current.rotation.x = damp(rig.current.rotation.x, 0.28 - pointer.y * 0.18 * follow + p * 0.35 * follow, 2.5, delta);
    rig.current.rotation.y = damp(rig.current.rotation.y, -0.5 + pointer.x * 0.35 * follow + p * 0.6 * follow, 2.5, delta);
    const s = damp(rig.current.scale.x, 1 - p * 0.12 * follow, 3, delta);
    rig.current.scale.setScalar(s);
    rig.current.position.y = damp(rig.current.position.y, p * 0.5 * follow, 3, delta);
    if (ringDot.current && !reducedMotion) {
      const a = state.clock.elapsedTime * 0.35;
      ringDot.current.position.set(Math.cos(a) * R * 1.27, Math.sin(a) * R * 1.27, 0);
    }
  });

  return (
    <group ref={rig}>
      <group ref={spin} rotation={[0, SPAIN_FACING, 0]}>
        <mesh material={core}>
          <sphereGeometry args={[R, 96, 96]} />
        </mesh>
        <lineSegments geometry={grid}>
          <lineBasicMaterial color="#3B6DFF" transparent opacity={0.16 * Math.max(dim, 0.6)} depthWrite={false} />
        </lineSegments>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={dots.length / 3} array={dots} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color="#8FB3FF" size={0.016} sizeAttenuation transparent opacity={0.75 * dim} depthWrite={false} />
        </points>
        {arcs.map((arc, i) => (
          <Arc key={i} {...arc} dim={dim} />
        ))}
      </group>

      <mesh material={atmosphere} scale={1.16}>
        <sphereGeometry args={[R, 64, 64]} />
      </mesh>

      {/* Anillo en órbita: guiño al arco del logo */}
      <group rotation={[1.25, 0.18, -0.42]}>
        <mesh>
          <torusGeometry args={[R * 1.27, 0.004, 8, 200]} />
          <meshBasicMaterial color="#9CBBFF" transparent opacity={0.45 * dim} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh ref={ringDot} position={[R * 1.27, 0, 0]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#E4EDFF" transparent opacity={Math.min(1, dim * 1.4)} />
        </mesh>
      </group>
    </group>
  );
}

function GlobeScene({ active = true, lite = false, reducedMotion = false, scrollProgress }) {
  const [dpr, setDpr] = useState(lite ? 1.25 : 1.75);
  useEffect(() => trackPointer(), []);

  return (
    <Canvas
      dpr={dpr}
      // Con movimiento reducido se dibuja una sola vez, sin animación continua
      frameloop={!active ? 'never' : reducedMotion ? 'demand' : 'always'}
      camera={{ position: [0, 0, 6.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: import.meta.env.DEV }}
      style={{ pointerEvents: 'none' }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Globe lite={lite} reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
    </Canvas>
  );
}

export default GlobeScene
