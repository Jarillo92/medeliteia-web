import { useRef } from 'react'

/**
 * Tarjeta oscura con borde de luz que sigue al cursor (solo con ratón).
 * El brillo se dibuja en CSS (.spotlight en index.css); aquí solo se pasa la posición.
 */
function SpotlightCard({ as: Comp = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    if (event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <Comp ref={ref} onPointerMove={handleMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </Comp>
  );
}

export default SpotlightCard
