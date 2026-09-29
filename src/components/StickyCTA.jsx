import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { DEMO_HREF, DEMO_LABEL } from '../config'

// Botón fijo en móvil: visible cuando el CTA del hero ya no se ve y el calendario aún no
function StickyCTA() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero-cta');
    const contact = document.getElementById('contacto');
    const observers = [];
    if (hero) {
      const o = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
      o.observe(hero);
      observers.push(o);
    }
    if (contact) {
      const o = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { rootMargin: '0px 0px -20% 0px' });
      o.observe(contact);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = !heroVisible && !contactVisible;

  // En móvil deja 88 px a la derecha para la burbuja del chat de GoHighLevel
  return (
    <div
      className={`fixed left-3 right-[88px] z-50 sm:right-auto sm:left-1/2 sm:w-[420px] sm:-translate-x-1/2 lg:hidden transition-[opacity,transform] duration-300 ease-out ${
        show ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-4'
      }`}
      style={{ bottom: 'max(12px, env(safe-area-inset-bottom))' }}
      aria-hidden={!show}
    >
      <a href={DEMO_HREF} tabIndex={show ? 0 : -1} className="btn-primary w-full py-4 text-base">
        {DEMO_LABEL}
        <ArrowRight className="h-5 w-5" />
      </a>
    </div>
  );
}

export default StickyCTA
