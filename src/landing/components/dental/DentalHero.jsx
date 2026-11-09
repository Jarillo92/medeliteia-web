import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { DEMO_LABEL } from '../../../config'
import { FloatingCard, HeroPhone, useTilt } from '../LandingHero'
import Tooth3DLoader from './Tooth3DLoader'
import ToothWireframe from './ToothWireframe'

// Inclinación de reposo (la misma que el hero de siempre)
const BASE = { x: 5, y: -14 };

// Mismas posiciones que el hero genérico hasta lg. En escritorio (lg) las tarjetas salen de la zona central del diente:
// "Nuevo mensaje" a la izquierda, junto a la raíz, y "Cita confirmada" abajo a la derecha; "Recordatorio enviado" se oculta.
const CARD_SLOTS = [
  'left-[-18%] top-[-3%] sm:left-[-44%] sm:top-[4%] lg:left-[-66%] lg:top-[60%] [--z:70px]',
  'right-[-50%] top-[52%] hidden sm:block lg:right-[-36%] lg:top-[86%] [--z:110px]',
  'bottom-[1%] left-[-16%] hidden sm:bottom-[6%] sm:left-[-40%] sm:block lg:hidden [--z:45px]',
];

/**
 * Hero de dental: mismo escenario 3D con perspectiva que el genérico, con un diente en malla de alambre
 * (SVG, color cobre) como capa más profunda (translateZ negativo) y el teléfono delante.
 * Móvil: texto compacto y el teléfono entero debajo (sin recorte): el primer pantallazo llega al primer mensaje y el resto aparece al bajar.
 * Las animaciones del diente se pausan cuando el hero sale de pantalla (data-paused, sin re-render).
 */
function DentalHero({ sector, clinic }) {
  const { hero } = sector;
  const areaRef = useRef(null);
  const tiltRef = useRef(null);
  useTilt(areaRef, tiltRef);
  // Escritorio: cuando el diente 3D pinta su primer fotograma, el SVG se funde y queda como respaldo
  const [tooth3d, setTooth3d] = useState(false);
  const onTooth3dReady = useCallback(() => setTooth3d(true), []);

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
    <section ref={areaRef} className="lp-dh relative overflow-hidden bg-ground pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pb-28">
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

        {/* Escenario 3D (el teléfono se ve entero también en móvil) */}
        <div className="lp-dh-stage relative flex justify-center py-14 sm:py-28 lg:py-0 lg:col-span-5">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgb(var(--sector) / 0.38), rgb(var(--sector) / 0.10) 55%, transparent)', filter: 'blur(36px)' }}
            aria-hidden="true"
          />
          {/* sm+: el diente va FUERA del contenedor inclinado (la inclinación lo desplazaría a la derecha, detrás del teléfono),
              centrado en el escenario y más grande que el teléfono: cúspides arriba, raíces abajo. Primero en el DOM = detrás. */}
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 hidden transition-opacity duration-500 sm:block sm:-ml-[373px] sm:-mt-[476px] sm:w-[746px] lg:scale-[0.78] xl:scale-100 ${tooth3d ? 'opacity-0' : ''}`}
            style={{ perspective: '1600px' }}
            aria-hidden="true"
          >
            <div className="lp-tooth-sway lp-tooth-sway-lg">
              <ToothWireframe className="block h-auto w-full" clipId="lp-tooth-clip-lg" />
            </div>
          </div>
          {/* Diente 3D real (todos los anchos, con salvaguardas en Tooth3DLoader), centrado en el escenario y detrás del teléfono.
              Entre 1024 y 1279 px las dos cajas del diente van al 78 % para no tocar el titular */}
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 -ml-[307px] -mt-[392px] h-[716px] w-[614px] transition-opacity duration-700 sm:-ml-[373px] sm:-mt-[476px] sm:h-[870px] sm:w-[746px] lg:scale-[0.78] xl:scale-100 ${tooth3d ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
          >
            <Tooth3DLoader color={sector.colors.accent} onReady={onTooth3dReady} />
          </div>
          {/* Escritorio: teléfono un 12 % más pequeño y algo a la derecha, para que el diente se vea por la izquierda.
              Envoltorio propio: lp-rise anima el transform del de dentro */}
          <div className="lg:translate-x-14 lg:scale-[0.88]">
            <div className="lp-rise" style={{ '--i': 2, perspective: '1600px' }}>
              <div
                ref={tiltRef}
                className="lp-dh-tilt relative"
                style={{ transformStyle: 'preserve-3d', transform: `rotateX(${BASE.x}deg) rotateY(${BASE.y}deg)` }}
              >
                {/* Móvil: el diente va como capa más profunda del escenario (sin inclinación, ver landing.css) */}
                <div
                  className={`pointer-events-none absolute left-1/2 top-[211px] -ml-[351px] -mt-[410px] w-[702px] transition-opacity duration-500 sm:hidden ${tooth3d ? 'opacity-0' : ''}`}
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default DentalHero
