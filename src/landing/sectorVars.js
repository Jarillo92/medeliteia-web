// Variables CSS del sector (canales RGB) que usan los tokens sector-* de Tailwind
// Los canales opcionales (burbuja, avatar, hover...) salen del color principal si el sector no los define;
// dental los define para conservar exactamente el aspecto que tenía antes de que hubiera más sectores.
const mix = (rgb, to, t) => rgb.split(' ').map((v, i) => Math.round(Number(v) + (to[i] - Number(v)) * t)).join(' ');
export const sectorVars = (c) => ({
  '--sector': c.accent,
  '--sector-solid': c.solid,
  '--sector-on': c.on,
  '--sector-deep': c.deep,
  '--sector-ink': c.ink,
  '--sector-solid-hover': c.solidHover || mix(c.solid, [255, 255, 255], 0.12),
  '--sector-bubble': c.bubble || c.solid,
  '--sector-bubble-on': c.bubbleOn || c.on,
  '--sector-check': c.check || c.on,
  '--sector-chrome': c.chrome || c.accent,
  '--sector-avatar-from': c.avatarFrom || c.solid,
  '--sector-avatar-to': c.avatarTo || mix(c.solid, [0, 0, 0], 0.4),
  '--sector-slot': c.slot || c.deep,
  '--sector-node': c.node || c.deep,
});
