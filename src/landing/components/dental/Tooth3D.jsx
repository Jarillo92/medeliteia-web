// Diente 3D del hero de dental (solo escritorio). Chunk aparte, cargado en diferido por Tooth3DLoader.
// Solo three (sin r3f ni drei): importando clase a clase, el bundler deja fuera lo que no se usa.
import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three'
import { buildTooth } from './toothGeometry'

// Relleno oscuro semitransparente con brillo cobre en los bordes (fresnel): da volumen sin luces
const FILL_VERTEX = `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const FILL_FRAGMENT = `
  uniform vec3 uDark;
  uniform vec3 uRim;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);
    vec3 col = mix(uDark, uRim, f * 0.85);
    gl_FragColor = vec4(col, 0.5 + f * 0.45);
  }
`;

const toColor = (rgb) => new Color(...rgb.split(' ').map((v) => Number(v) / 255));

function Tooth3D({ color, onReady }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const copper = toColor(color);
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0.55, 5.2);
    camera.lookAt(0, 0.17, 0);

    const { parts, nodeGeo } = buildTooth();
    const fillMat = new ShaderMaterial({
      vertexShader: FILL_VERTEX,
      fragmentShader: FILL_FRAGMENT,
      uniforms: { uDark: { value: new Color(0x0b0705) }, uRim: { value: copper } },
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    // Líneas de delante (con profundidad) y un eco tenue de las de detrás, que se ve a través del relleno
    const frontMat = new LineBasicMaterial({ color: copper, transparent: true, opacity: 0.9 });
    const backMat = new LineBasicMaterial({ color: copper, transparent: true, opacity: 0.14, depthTest: false });
    const nodeMat = new PointsMaterial({ color: copper, size: 0.075, transparent: true, opacity: 0.95, blending: AdditiveBlending, depthWrite: false });

    const tooth = new Group();
    parts.forEach(({ fill, lines }) => {
      const fillMesh = new Mesh(fill, fillMat);
      fillMesh.renderOrder = 0;
      const back = new LineSegments(lines, backMat);
      back.renderOrder = 1;
      const front = new LineSegments(lines, frontMat);
      front.renderOrder = 2;
      tooth.add(fillMesh, back, front);
    });
    const nodes = new Points(nodeGeo, nodeMat);
    nodes.renderOrder = 3;
    tooth.add(nodes);
    tooth.rotation.x = 0.16;
    scene.add(tooth);

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Paralaje con el ratón (el loader solo monta esto con puntero fino)
    const target = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onMove = (e) => {
      target.y = (e.clientX / window.innerWidth - 0.5) * 0.5;
      target.x = (e.clientY / window.innerHeight - 0.5) * 0.25;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    // Bucle: solo corre con el hero en pantalla y la pestaña visible
    let frame = 0;
    let last = 0;
    let spin = -0.5;
    let onScreen = true;
    let first = true;
    const loop = (t) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      spin += dt * 0.22;
      tilt.x += (target.x - tilt.x) * 0.05;
      tilt.y += (target.y - tilt.y) * 0.05;
      tooth.rotation.y = spin + tilt.y;
      tooth.rotation.x = 0.16 + tilt.x;
      renderer.render(scene, camera);
      if (first) {
        first = false;
        onReady?.();
      }
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame && onScreen && document.visibilityState === 'visible') {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(host);
    const onVisibility = () => (document.visibilityState === 'visible' ? start() : stop());
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      parts.forEach(({ fill, lines }) => {
        fill.dispose();
        lines.dispose();
      });
      nodeGeo.dispose();
      [fillMat, frontMat, backMat, nodeMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [color, onReady]);

  return <div ref={hostRef} className="h-full w-full" />;
}

export default Tooth3D
