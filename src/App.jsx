import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import HowItWorksSection from './components/HowItWorksSection'
import SolutionsSection from './components/SolutionsSection'
import SectorsSection from './components/SectorsSection'
import ProcessSection from './components/ProcessSection'
import InvestmentSection from './components/InvestmentSection'
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
        <SolutionsSection />
        <SectorsSection />
        <ProcessSection />
        <InvestmentSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}

export default App
