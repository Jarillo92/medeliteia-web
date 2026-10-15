import { useEffect, useRef } from 'react'
import { m, useAnimationControls } from 'framer-motion'
import { prefersReducedMotion } from './hooks'

// Misma curva de salida que la home (src/components/ui/motion.js)
const EASE_OUT = [0.23, 1, 0.32, 1];

/**
 * Entrada de sección con framer-motion: fundido + translateY 12px, escalonado con `index` (60 ms).
 * El HTML del servidor no lleva opacity:0 (initial={false}): sin JavaScript todo se ve.
 * Tras montar, solo se esconden los bloques que todavía están por debajo de la pantalla.
 */
export function Reveal({ as = 'div', index = 0, children, ...rest }) {
  const ref = useRef(null);
  const controls = useAnimationControls();
  const Comp = m[as];

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return undefined;

    controls.set({ opacity: 0, transform: 'translateY(12px)' });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        controls.start({
          opacity: 1,
          transform: 'translateY(0px)',
          transition: { duration: 0.28, ease: EASE_OUT, delay: index * 0.06 },
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [controls, index]);

  return (
    <Comp ref={ref} initial={false} animate={controls} {...rest}>
      {children}
    </Comp>
  );
}
