import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Ratón de verdad: el efecto 3D del hero solo sigue al puntero en escritorio
export function hasFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/** Valor que solo existe en el navegador (p. ej. ?c=): null en el servidor y hasta que monta el cliente. */
export function useClientValue(read) {
  const [value, setValue] = useState(null);
  const readRef = useRef(read);
  useEffect(() => {
    setValue(readRef.current());
  }, []);
  return value;
}

// useLayoutEffect solo en el navegador (en el servidor React avisaría)
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Número animado: React pinta el valor final y aquí se anima el mismo nodo de texto,
 * sin re-render por fotograma. El HTML del servidor ya trae el valor final formateado.
 * Con `pulse`, el número además da un pequeño salto (transform/opacity) al cambiar.
 */
export function useCountUp(value, format, { duration = 260, pulse = false } = {}) {
  const ref = useRef(null);
  const shown = useRef(value);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    const text = el?.firstChild;
    const from = shown.current;
    if (!text || from === value || prefersReducedMotion()) {
      shown.current = value;
      return undefined;
    }
    if (pulse && el.animate) {
      el.animate(
        [
          { transform: 'translateY(6px)', opacity: 0.55 },
          { transform: 'translateY(0)', opacity: 1 },
        ],
        { duration: 240, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
      );
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(from + (value - from) * eased);
      shown.current = current;
      text.nodeValue = format(current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    text.nodeValue = format(from);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      // Si se interrumpe, React vuelve a pintar el valor final en el siguiente render
      text.nodeValue = format(value);
    };
  }, [value, format, duration, pulse]);

  return ref;
}

/**
 * Paso (0..steps) ligado al scroll de un bloque, para mockups que "se rellenan" al bajar (useScroll de framer-motion).
 * En el servidor y sin JavaScript vale `steps` (bloque completo). Tras montar, si el bloque aún no ha
 * llegado a la pantalla, empieza vacío y avanza con el scroll. Solo hay render cuando cambia el paso.
 * También devuelve el progreso continuo (motion value) para rellenos que no necesitan pasos.
 */
const FILL_OFFSET = ['start 85%', 'end 45%'];

export function useScrollFill(ref, { steps, offset = FILL_OFFSET }) {
  const [step, setStep] = useState(steps);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const active = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    active.current = true;
    if (el.getBoundingClientRect().top > window.innerHeight * 0.85) setStep(0);
  }, [ref]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (active.current) setStep(Math.round(v * steps));
  });

  return { step, progress: scrollYProgress, active };
}
