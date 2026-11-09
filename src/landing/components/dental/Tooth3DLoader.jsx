import { Suspense, lazy, useEffect, useState } from 'react'

// El chunk con three solo se pide desde aquí, y solo si se cumplen las condiciones de escritorio
const Tooth3D = lazy(() => import('./Tooth3D'));

const DESKTOP_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Carga diferida del diente 3D (solo dental, solo escritorio). En el servidor y hasta que el navegador
 * está libre no pinta nada: el SVG de ToothWireframe sigue siendo el respaldo y la versión de móvil y tablet.
 * Cuando el 3D pinta su primer fotograma avisa con onReady y DentalHero funde el SVG.
 */
function Tooth3DLoader({ color, onReady }) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!window.matchMedia(DESKTOP_QUERY).matches || !hasWebGL()) return undefined;
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1200));
    const cancel = window.cancelIdleCallback || window.clearTimeout;
    const id = idle(() => setLoad(true), { timeout: 3000 });
    return () => cancel(id);
  }, []);

  if (!load) return null;
  return (
    <Suspense fallback={null}>
      <Tooth3D color={color} onReady={onReady} />
    </Suspense>
  );
}

export default Tooth3DLoader
