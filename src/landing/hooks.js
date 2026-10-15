import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Aparición al hacer scroll para los elementos con data-reveal dentro de rootRef.
 * Tras montar, solo se ocultan los que todavía están por debajo de la pantalla; los visibles no parpadean.
 * Sin JavaScript o con movimiento reducido, todo se queda visible.
 */
export function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;

    const items = Array.from(root.querySelectorAll('[data-reveal]'));
    const below = items.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    below.forEach((el) => el.setAttribute('data-reveal', 'pending'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-reveal', 'in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.15 }
    );
    below.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
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
 */
export function useCountUp(value, format, duration = 260) {
  const ref = useRef(null);
  const shown = useRef(value);

  useIsoLayoutEffect(() => {
    const text = ref.current?.firstChild;
    const from = shown.current;
    if (!text || from === value || prefersReducedMotion()) {
      shown.current = value;
      return undefined;
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
  }, [value, format, duration]);

  return ref;
}
