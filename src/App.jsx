import React, { useState, useEffect } from 'react'
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
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    // Enable hover listener only if device supports hover interactions (desktops)
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (mediaQuery.matches) {
      setIsHovering(true);
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-dark text-white selection:bg-brand-electric selection:text-white overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none z-0"></div>

      {/* Interactive Cursor Spotlight (Desktop only for performance) */}
      {isHovering && (
        <div
          className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(700px circle at ${coords.x}px ${coords.y}px, rgba(37, 99, 235, 0.07), transparent 75%)`,
          }}
        />
      )}

      {/* Aurora Ambient Lighting Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cobalt/10 blur-[120px] pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[15%] left-[20%] w-[450px] h-[450px] rounded-full bg-brand-cobalt/5 blur-[120px] pointer-events-none z-0 animate-pulse-slow"></div>

      {/* Page Structure */}
      <div className="relative z-20">
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
    </div>
  )
}

export default App
