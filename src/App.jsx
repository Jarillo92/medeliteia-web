import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionsSection from './components/SolutionsSection'
import SectorsSection from './components/SectorsSection'
import ProcessSection from './components/ProcessSection'
import InvestmentSection from './components/InvestmentSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionsSection />
        <SectorsSection />
        <ProcessSection />
        <InvestmentSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
