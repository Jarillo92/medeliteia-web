import { lazy, Suspense, useRef } from 'react'
import { useInView, useScroll } from 'framer-motion'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'
import { ASSISTANT_LIVE, ASSISTANT_URL, DEMO_HREF, DEMO_LABEL, WHATSAPP_URL } from '../config'
import PhoneFallback from './hero/PhoneFallback'
import { useDeviceTier, useIdleMount } from './hero/useDeviceTier'

// La escena 3D se carga aparte: el texto y el botón no esperan a Three.js
const PhoneScene = lazy(() => import('./hero/PhoneScene'))

// Globo en CSS detrás del móvil en la versión ligera
function StaticGlobe({ className }) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(closest-side,rgba(47,107,255,0.28),transparent)] blur-2xl" />
      <div
        className="absolute inset-0 rounded-full shadow-[inset_-18px_-24px_60px_rgba(0,0,0,0.85),inset_10px_14px_40px_rgba(91,140,255,0.25),0_0_60px_rgba(47,107,255,0.25)]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent 0 22px, rgba(91,140,255,0.12) 22px 23px), repeating-linear-gradient(90deg, transparent 0 22px, rgba(91,140,255,0.08) 22px 23px), radial-gradient(circle at 35% 30%, #13264F, #050B1A 70%)',
        }}
      />
    </div>
  );
}

function HeroStage({ scrollProgress }) {
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { margin: '0px 0px -15% 0px' });
  const tier = useDeviceTier();
  const idle = useIdleMount();

  const use3D = tier.webgl && tier.desktop && !tier.reducedMotion;
  const fallback = (
    <div className="relative flex h-full items-center justify-center">
      {/* Versión ligera: globo tenue detrás del móvil, como en la escena 3D */}
      {!use3D && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
          <StaticGlobe className="w-[min(125vw,560px)]" />
        </div>
      )}
      <PhoneFallback width={tier.desktop ? 300 : Math.min(272, (typeof window !== 'undefined' ? window.innerWidth : 375) - 56)} playing={inView} reducedMotion={tier.reducedMotion} />
    </div>
  );
  const content = use3D && idle ? (
    <Suspense fallback={fallback}>
      <div className="fade-in absolute inset-y-0 -inset-x-[22%]">
        <PhoneScene active={inView} scrollProgress={scrollProgress} />
      </div>
    </Suspense>
  ) : (
    fallback
  );

  return (
    <div ref={stageRef} className="relative h-[600px] lg:h-[680px]">
      {/* Halo azul detrás del móvil: lo separa del fondo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(47,107,255,0.42), rgba(47,107,255,0.14) 55%, transparent)', filter: 'blur(28px)' }}
        aria-hidden="true"
      />
      {/* Suelo: una línea de luz que asienta el objeto */}
      <div className="pointer-events-none absolute inset-x-[12%] bottom-[6%] h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-[25%] bottom-[3%] h-10 rounded-[100%] bg-accent-solid/20 blur-2xl" aria-hidden="true" />
      {content}
    </div>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-28 pb-12 md:pt-32 md:pb-20">
      {/* Una sola fuente de luz: foco azul detrás del objeto y luz cenital suave */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 60% at 72% 42%, rgba(47,107,255,0.20), transparent 70%), radial-gradient(45% 35% at 50% -5%, rgba(156,187,255,0.10), transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Fundido inferior hacia la siguiente sección */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ground" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          <div className="lg:col-span-6">
            <h1 className="rise-in text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.035em] text-ink">
              La agenda de tu clínica,{' '}
              <span className="text-accent-bright">llena de citas confirmadas</span>
            </h1>

            <p className="rise-in mt-6 max-w-[37rem] text-lg sm:text-xl leading-relaxed text-muted" style={{ animationDelay: '70ms', textWrap: 'balance' }}>
              Un asistente de IA en WhatsApp contesta a tus pacientes al momento, les da cita en tu agenda y les recuerda que vengan.
            </p>

            <div className="rise-in mt-9 flex flex-col sm:flex-row gap-3" style={{ animationDelay: '140ms' }}>
              <a id="hero-cta" href={DEMO_HREF} className="btn-primary group px-7 py-4 text-base">
                {DEMO_LABEL}
                <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost px-7 py-4 text-base">
                <MessageCircle className="h-5 w-5 text-accent" />
                Escríbenos por WhatsApp
              </a>
            </div>

            {ASSISTANT_LIVE && (
              <a
                href={ASSISTANT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rise-in mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-accent-bright hover:text-white transition-colors duration-200"
                style={{ animationDelay: '210ms' }}
              >
                <Sparkles className="h-4 w-4" />
                Pruébalo tú mismo: escríbele a nuestro asistente
              </a>
            )}
          </div>

          <div className="lg:col-span-6">
            <HeroStage scrollProgress={scrollYProgress} />
          </div>

        </div>
      </div>

    </section>
  )
}

export default Hero
