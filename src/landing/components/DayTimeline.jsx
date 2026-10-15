import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks'
import SectionLabel from './SectionLabel'

// Línea de tiempo que se va encendiendo al bajar: cada momento se activa al pasar por el centro de la pantalla.
// En el HTML del servidor (y sin JavaScript) se ve entera y encendida.
function DayTimeline({ sector }) {
  const { day } = sector;
  const last = day.items.length - 1;
  const [active, setActive] = useState(last);
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
    // Si ya se ha pasado de largo (p. ej. al recargar a media página), se queda encendida
    if (list.getBoundingClientRect().top < window.innerHeight * 0.5) return undefined;

    setActive(-1);
    const steps = Array.from(list.querySelectorAll('[data-step]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute('data-step'));
          setActive((prev) => Math.max(prev, index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    steps.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const progress = active < 0 ? 0 : (active + 1) / day.items.length;

  return (
    <section id="un-dia" className="relative py-20 md:py-28">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32" data-reveal>
            <SectionLabel>{day.label}</SectionLabel>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.6rem]">{day.title}</h2>
            <p className="mt-6 max-w-[30rem] text-[14px] leading-relaxed text-subtle">{day.note}</p>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          {/* Raíl y relleno: el relleno escala en vertical según los momentos ya vistos */}
          <span className="absolute bottom-3 left-[7px] top-3 w-px bg-white/[0.08]" aria-hidden="true" />
          <span
            className="lp-line-fill absolute bottom-3 left-[7px] top-3 w-px bg-sector"
            style={{ transform: `scaleY(${progress})` }}
            aria-hidden="true"
          />
          {day.items.map((item, i) => {
            const on = i <= active;
            return (
              <li key={item.time} data-step={i} className="relative pb-10 pl-10 last:pb-0">
                <span
                  className={`lp-dot absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                    on ? 'scale-100 border-sector bg-ground opacity-100' : 'scale-75 border-white/20 bg-ground opacity-70'
                  }`}
                  aria-hidden="true"
                />
                <p className={`font-mono text-[13px] uppercase tracking-[0.14em] transition-colors duration-200 ${on ? 'text-sector' : 'text-subtle'}`}>
                  {item.time}
                </p>
                <p className={`mt-2 max-w-[34rem] text-[18px] leading-relaxed transition-colors duration-200 sm:text-[19px] ${on ? 'text-ink' : 'text-muted'}`}>
                  {item.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default DayTimeline
