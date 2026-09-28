import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import HowItWorksSection from './components/HowItWorksSection'
import SectorsSection from './components/SectorsSection'
import WebSection from './components/WebSection'
import ProcessSection from './components/ProcessSection'
import InvestmentSection from './components/InvestmentSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'

function App() {
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
        <ContactSection />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}

export default App
