import { useRef } from 'react'
import LandingNav from './components/LandingNav'
import LandingHero from './components/LandingHero'
import PlayableChat from './components/PlayableChat'
import LossCalculator from './components/LossCalculator'
import DayTimeline from './components/DayTimeline'
import HowItWorks from './components/HowItWorks'
import BookingSection from './components/BookingSection'
import LandingFooter from './components/LandingFooter'
import { readClinicName } from './clinicName'
import { useClientValue, useReveal } from './hooks'

const readFromUrl = () => readClinicName(window.location.search);

/**
 * Landing genérica por sector: todo el contenido sale de src/landings/sectors/<sector>.js.
 * Se prerenderiza en el build (scripts/prerender.mjs) y se hidrata en el navegador.
 */
function LandingPage({ sector }) {
  const rootRef = useRef(null);
  // Modo demo: ?c=Nombre. En el servidor y hasta montar no hay nombre ("tu clínica").
  const clinic = useClientValue(readFromUrl);
  useReveal(rootRef);

  return (
    <div ref={rootRef} className="relative min-h-screen" style={{ '--sector': sector.accent }}>
      <LandingNav />
      <main>
        <LandingHero sector={sector} clinic={clinic} />
        <PlayableChat sector={sector} clinic={clinic} />
        <LossCalculator sector={sector} />
        <DayTimeline sector={sector} />
        <HowItWorks sector={sector} />
        <BookingSection sector={sector} />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingPage
