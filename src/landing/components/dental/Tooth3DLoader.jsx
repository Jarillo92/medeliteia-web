import { Suspense, lazy, useEffect, useState } from 'react'

// El chunk con three solo se pide desde aquí, y solo si se cumplen las salvaguardas de canLoad3D
const Tooth3D = lazy(() => import('./Tooth3D'));

// Salvaguardas en todos los anchos: sin movimiento reducido, sin ahorro de datos y con memoria suficiente (si el navegador la expone)
function canLoad3D() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (navigator.connection?.saveData) return false;
  if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory < 4) return false;
  return true;
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Carga diferida del diente 3D (solo dental, en todos los anchos). En el servidor y hasta que el navegador
 * está libre no pinta nada: el SVG de ToothWireframe es el estado inicial y el respaldo (sin WebGL, con
 * movimiento reducido, con ahorro de datos o con menos de 4 GB de memoria).
 * Cuando el 3D pinta su primer fotograma avisa con onReady y DentalHero funde el SVG.
 */
function Tooth3DLoader({ color, onReady }) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!canLoad3D() || !hasWebGL()) return undefined;
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
