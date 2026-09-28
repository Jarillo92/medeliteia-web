import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from './motion'

const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' };

/**
 * Aparece al entrar en pantalla: sube unos píxeles y gana opacidad.
 * Con movimiento reducido solo hay un fundido corto.
 */
export function Reveal({ as = 'div', delay = 0, y = 18, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0.2 : 0.7, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Contenedor que escalona la entrada de sus <StaggerItem>. */
export function Stagger({ as = 'div', gap = 0.07, delay = 0, className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ as = 'div', y = 18, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.7, ease: EASE_OUT } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
