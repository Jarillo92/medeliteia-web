import { LazyMotion } from 'framer-motion'
import LandingNav from './components/LandingNav'
import LandingHero from './components/LandingHero'
import LeaksStrip from './components/LeaksStrip'
import PlayableChat from './components/PlayableChat'
import ProductPreview from './components/ProductPreview'
import LossCalculator from './components/LossCalculator'
import DayTimeline from './components/DayTimeline'
import HowItWorks from './components/HowItWorks'
import ExampleStrip from './components/ExampleStrip'
import BookingSection from './components/BookingSection'
import LandingFooter from './components/LandingFooter'
import { readClinicName } from './clinicName'
import { useClientValue } from './hooks'

const readFromUrl = () => readClinicName(window.location.search);
// Las funciones de animación de framer-motion llegan en un chunk aparte, sin bloquear el primer pintado
const loadMotionFeatures = () => import('./motionFeatures').then((mod) => mod.default);

/**
 * Landing genérica por sector: todo el contenido sale de src/landings/sectors/<sector>.js.
 * Se prerenderiza en el build (scripts/prerender.mjs) y se hidrata en el navegador.
 * Fondos alternos ground / surface / raised, separados por líneas finas.
 */
function LandingPage({ sector }) {
  // Modo demo: ?c=Nombre. En el servidor y hasta montar no hay nombre ("tu clínica").
  const clinic = useClientValue(readFromUrl);

  return (
    // LazyMotion con domAnimation: solo la parte de framer-motion que usan las entradas, cargada en diferido
    <LazyMotion features={loadMotionFeatures} strict>
      <div className="relative min-h-screen" style={{ '--sector': sector.accent }}>
        <LandingNav />
        <main>
          <LandingHero sector={sector} clinic={clinic} />
          <LeaksStrip sector={sector} />
          <PlayableChat sector={sector} clinic={clinic} />
          <ProductPreview sector={sector} clinic={clinic} />
          <LossCalculator sector={sector} />
          <DayTimeline sector={sector} />
          <HowItWorks sector={sector} />
          <ExampleStrip sector={sector} />
          <BookingSection sector={sector} />
        </main>
        <LandingFooter />
      </div>
    </LazyMotion>
  );
}

export default LandingPage
