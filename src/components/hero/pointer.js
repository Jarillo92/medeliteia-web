// Posición del puntero normalizada a la ventana (-1..1), compartida por las escenas 3D.
// Se actualiza con un listener pasivo y no provoca renders de React.
export const pointer = { x: 0, y: 0 };

let listeners = 0;
const onMove = (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
};

export function trackPointer() {
  if (listeners++ === 0) window.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    if (--listeners === 0) window.removeEventListener('pointermove', onMove);
  };
}
