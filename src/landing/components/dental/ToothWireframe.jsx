// Diente (molar) en malla de alambre, en SVG inline y en el color del sector. Decorativo (aria-hidden).
// Solo transform y opacity: nada de trazo dibujado. Las animaciones están en landing.css (.lp-tooth-*).
// width y height fijos (la caja se reserva antes de pintar); el tamaño real lo dan las clases del contenedor.

const OUTLINE =
  'M60 150C52 100 80 60 120 66C145 70 160 92 180 92C200 92 215 70 240 66C280 60 308 100 300 150C296 190 282 214 276 250C270 300 262 370 238 384C218 394 208 340 200 290C196 270 164 270 160 290C152 340 142 394 122 384C98 370 90 300 84 250C78 214 64 190 60 150Z';

// Paralelos (horizontales) y meridianos (verticales) de la malla
const PARALLELS = [
  'M66 128C120 150 240 150 294 128',
  'M62 168C120 196 240 196 298 168',
  'M76 212C130 236 230 236 284 212',
  'M88 256C140 274 220 274 272 256',
];
const MERIDIANS = [
  'M120 66C100 150 104 250 126 384',
  'M150 80C142 150 146 230 152 282',
  'M180 92C178 170 180 252 180 276',
  'M210 80C218 150 214 230 208 282',
  'M240 66C262 150 256 250 234 384',
];
// Nodos en los cruces principales; los 6 primeros son los del contorno (en móvil solo se ven esos)
const NODES = [
  [180, 92], [120, 66], [240, 66], [62, 168], [298, 168], [126, 384],
  [234, 384], [180, 196], [110, 150], [250, 150], [140, 236], [220, 236],
];

function ToothWireframe({ className = '' }) {
  return (
    <svg className={`lp-tooth ${className}`} width="360" height="420" viewBox="0 0 360 420" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="lp-tooth-clip">
          <path d={OUTLINE} />
        </clipPath>
      </defs>
      {/* 1. Contorno */}
      <g className="lp-tooth-g lp-tooth-g1">
        <path d={OUTLINE} strokeWidth="2" />
      </g>
      {/* 2. Paralelos y 3. meridianos: la malla solo se dibuja desde sm (en móvil, versión simple) */}
      <g clipPath="url(#lp-tooth-clip)" strokeWidth="1" strokeOpacity="0.55" className="lp-tooth-mesh">
        <g className="lp-tooth-g lp-tooth-g2">
          {PARALLELS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="lp-tooth-g lp-tooth-g3">
          {MERIDIANS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
      {/* 4. Nodos que pulsan, desfasados */}
      <g className="lp-tooth-g lp-tooth-g4">
        {NODES.map(([x, y], i) => (
          <circle key={`${x}-${y}`} className="lp-tooth-node" cx={x} cy={y} r="3.4" style={{ '--n': i }} />
        ))}
      </g>
    </svg>
  );
}

export default ToothWireframe
