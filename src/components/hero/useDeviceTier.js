import { useEffect, useState } from 'react'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function readTier() {
  if (typeof window === 'undefined') {
    return { webgl: false, desktop: false, lowPower: true, reducedMotion: false };
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  return {
    webgl: supportsWebGL(),
    desktop,
    lowPower: cores <= 4 || memory <= 4,
    reducedMotion,
  };
}

// Qué nivel de efectos puede permitirse este dispositivo
export function useDeviceTier() {
  const [tier, setTier] = useState(readTier);

  useEffect(() => {
    const queries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)'),
    ];
    const update = () => setTier(readTier());
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);

  return tier;
}

// Monta el contenido pesado cuando el navegador está libre, después de pintar el texto
export function useIdleMount(enabled = true) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(id);
  }, [enabled]);

  return ready;
}
