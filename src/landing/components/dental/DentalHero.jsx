import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { DEMO_LABEL } from '../../../config'
import { FloatingCard, HeroPhone, useTilt } from '../LandingHero'
import ToothWireframe from './ToothWireframe'

// Inclinación de reposo (la misma que el hero de siempre)
const BASE = { x: 5, y: -14 };

// Mismas posiciones que el hero genérico; la tercera tarjeta queda fuera del recorte del móvil
const CARD_SLOTS = [
  'left-[-18%] top-[-3%] sm:left-[-44%] sm:top-[4%] [--z:70px]',
  'right-[-50%] top-[52%] hidden sm:block [--z:110px]',
  'bottom-[1%] left-[-16%] hidden sm:bottom-[6%] sm:left-[-40%] sm:block [--z:45px]',
];

/**
 * Hero de dental: mismo escenario 3D con perspectiva que el genérico, con un diente en malla de alambre
 * (SVG, color cobre) como capa más profunda (translateZ negativo) y el teléfono delante.
 * Móvil: texto compacto y el teléfono asoma debajo, recortado, con un degradado inferior (el chat se ve sin hacer scroll).
 * Las animaciones del diente se pausan cuando el hero sale de pantalla (data-paused, sin re-render).
 */
function DentalHero({ sector, clinic }) {
  const { hero } = sector;
  const areaRef = useRef(null);
  const tiltRef = useRef(null);
  useTilt(areaRef, tiltRef);

  useEffect(() => {
    const node = areaRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      node.dataset.paused = entry.isIntersecting ? 'false' : 'true';
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={areaRef} className="lp-dh relative overflow-hidden bg-ground pt-24 sm:pt-32 sm:pb-20 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        style={{ background: 'radial-gradient(45% 50% at 15% 20%, rgb(var(--sector) / 0.12), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:gap-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-7">
          <p className="lp-rise font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-sector sm:text-[13px]">{hero.label}</p>
          <h1
            className="lp-rise mt-3 text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:mt-5 sm:text-[clamp(2.6rem,5.6vw,4.5rem)] sm:leading-[1.02]"
            style={{ '--i': 1 }}
          >
            {clinic || hero.titleLead}, <span className="text-sector">{hero.titleAccent}</span> {hero.titleTail}
          </h1>
          <p className="lp-rise mt-4 max-w-[36rem] text-[16.5px] leading-relaxed text-muted sm:mt-7 sm:text-[21px]" style={{ '--i': 2 }}>
            {hero.subtitle}
          </p>
          <div className="lp-rise mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row" style={{ '--i': 3 }}>
            <a href="#reserva" className="btn-primary px-7 py-3.5 text-[17px] sm:py-4">
              {DEMO_LABEL}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#prueba" className="btn-ghost px-7 py-4 text-[17px] max-sm:hidden">
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Escenario 3D. En móvil se recorta a 290 px y un degradado funde el teléfono con el fondo */}
        <div className="lp-dh-stage relative flex h-[290px] justify-center overflow-hidden sm:h-auto sm:overflow-visible lg:col-span-5">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgb(var(--sector) / 0.38), rgb(var(--sector) / 0.10) 55%, transparent)', filter: 'blur(36px)' }}
            aria-hidden="true"
          />
          <div className="lp-rise" style={{ '--i': 2, perspective: '1600px' }}>
            <div
              ref={tiltRef}
              className="relative"
              style={{ transformStyle: 'preserve-3d', transform: `rotateX(${BASE.x}deg) rotateY(${BASE.y}deg)` }}
            >
              {/* Capa más profunda: el diente, detrás del teléfono */}
              <div
                className="pointer-events-none absolute left-1/2 top-[42%] -ml-[180px] -mt-[210px] w-[360px] sm:top-1/2 sm:-ml-[220px] sm:-mt-[257px] sm:w-[440px] lg:-ml-[260px] lg:-mt-[303px] lg:w-[520px]"
                style={{ transform: 'translateZ(-140px)', transformStyle: 'preserve-3d' }}
                aria-hidden="true"
              >
                <div className="lp-tooth-sway">
                  <ToothWireframe className="block h-auto w-full" />
                </div>
              </div>
              <HeroPhone sector={sector} clinic={clinic} />
              {hero.floating.map((card, i) => (
                <FloatingCard key={card.kind} card={card} slot={CARD_SLOTS[i]} index={4 + i} />
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ground via-ground/80 to-transparent sm:hidden" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default DentalHero
