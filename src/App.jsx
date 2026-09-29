import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import HowItWorksSection from './components/HowItWorksSection'
import SectorsSection from './components/SectorsSection'
import WebSection from './components/WebSection'
import ProcessSection from './components/ProcessSection'
import InvestmentSection from './components/InvestmentSection'
import FaqSection from './components/FaqSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'

function App() {
  // Al llegar desde otra página con un ancla (p. ej. /#contacto), saltar a esa sección
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorksSection />
        <SectorsSection />
        <WebSection />
        <ProcessSection />
        <InvestmentSection />
        <FaqSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}

export default App
