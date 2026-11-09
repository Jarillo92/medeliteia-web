// Geometría procedural del molar (sin archivos GLB): corona con cuatro cúspides, cuello y dos raíces.
// Cada pieza es una rejilla (u = vuelta, v = altura) que da a la vez la superficie (relleno) y las líneas de malla.
import { BufferAttribute, BufferGeometry, CatmullRomCurve3, Vector3 } from 'three'

const TAU = Math.PI * 2;

// Perfil de la corona y el cuello (radio relativo, altura), de la fisura central hacia abajo hasta la furca
const CROWN_PROFILE = new CatmullRomCurve3(
  [
    [0.0, 0.8],
    [0.3, 0.86],
    [0.62, 0.96],
    [0.9, 0.86],
    [1.0, 0.66],
    [0.98, 0.46],
    [0.84, 0.26],
    [0.8, 0.1],
    [0.72, -0.06],
    [0.4, -0.04],
    [0.0, 0.02],
  ].map(([r, y]) => new Vector3(r, y, 0)),
  false,
  'centripetal',
);

// Cúspides: cuatro, en diagonal (mesio-vestibular, disto-vestibular, mesio-lingual y disto-lingual)
const cuspLift = (theta) => 0.17 * Math.max(0, -Math.cos(4 * theta)) ** 1.5;

function crownPoint(u, v, out) {
  const theta = u * TAU;
  const p = CROWN_PROFILE.getPoint(v);
  // Más ancha en x (mesio-distal) que en z; bajo el cuello se estrecha en z, donde se separan las raíces
  const below = Math.min(1, Math.max(0, (0.3 - p.y) / 0.36));
  const pinch = 1 - 0.42 * below * Math.sin(theta) ** 2;
  const r = p.x * pinch;
  // Las cúspides solo levantan la cara oclusal (la parte alta del perfil)
  const top = Math.max(0, 1 - v / 0.34);
  const lift = cuspLift(theta) * Math.sin(Math.PI * Math.min(1, p.x / 0.95)) * top;
  out.set(r * Math.cos(theta) * 1.02, p.y + lift, r * Math.sin(theta) * 0.86);
  return out;
}

// Raíz: tubo con sección elíptica (ancha en z, estrecha en x) que se curva un poco hacia fuera y se cierra en la punta
function rootPoint(side) {
  const axis = new CatmullRomCurve3(
    [
      [0.36, 0.12],
      [0.46, -0.45],
      [0.5, -0.95],
      [0.42, -1.32],
    ].map(([x, y]) => new Vector3(side * x, y, 0)),
  );
  return (u, v, out) => {
    const theta = u * TAU;
    const c = axis.getPoint(v);
    const r = 0.3 * Math.sqrt(Math.max(0, 1 - v ** 2.4));
    out.set(c.x + r * 0.78 * Math.cos(theta), c.y, r * 1.12 * Math.sin(theta));
    return out;
  };
}

/**
 * Rejilla de nu × nv puntos. Devuelve la geometría del relleno (con normales) y la de las líneas,
 * que siguen solo cada `lineU` columnas (meridianos) y cada `lineV` filas (paralelos).
 */
function buildGrid(fn, nu, nv, lineU, lineV) {
  const positions = new Float32Array(nu * (nv + 1) * 3);
  const p = new Vector3();
  for (let j = 0; j <= nv; j += 1) {
    for (let i = 0; i < nu; i += 1) {
      fn(i / nu, j / nv, p);
      positions.set([p.x, p.y, p.z], (j * nu + i) * 3);
    }
  }
  const idx = (i, j) => j * nu + (i % nu);
  const tris = [];
  for (let j = 0; j < nv; j += 1) {
    for (let i = 0; i < nu; i += 1) {
      tris.push(idx(i, j), idx(i + 1, j), idx(i, j + 1), idx(i + 1, j), idx(i + 1, j + 1), idx(i, j + 1));
    }
  }
  const fill = new BufferGeometry();
  fill.setAttribute('position', new BufferAttribute(positions, 3));
  fill.setIndex(tris);
  fill.computeVertexNormals();

  const segs = [];
  for (let i = 0; i < nu; i += lineU) for (let j = 0; j < nv; j += 1) segs.push(idx(i, j), idx(i, j + 1));
  for (let j = lineV; j < nv; j += lineV) for (let i = 0; i < nu; i += 1) segs.push(idx(i, j), idx(i + 1, j));
  const lines = new BufferGeometry();
  lines.setAttribute('position', new BufferAttribute(positions, 3));
  lines.setIndex(segs);
  return { fill, lines };
}

/** Piezas del molar: corona + cuello y las dos raíces. Nodos: puntas de las cúspides y cruces del ecuador. */
export function buildTooth() {
  const parts = [
    buildGrid(crownPoint, 96, 72, 6, 6),
    buildGrid(rootPoint(-1), 48, 40, 6, 5),
    buildGrid(rootPoint(1), 48, 40, 6, 5),
  ];
  const nodes = [];
  const p = new Vector3();
  for (let k = 0; k < 4; k += 1) nodes.push(crownPoint(0.125 + k * 0.25, 0.17, p).clone());
  for (let k = 0; k < 16; k += 2) nodes.push(crownPoint(k / 16, 0.42, p).clone());
  const nodeGeo = new BufferGeometry().setFromPoints(nodes);
  return { parts, nodeGeo };
}
