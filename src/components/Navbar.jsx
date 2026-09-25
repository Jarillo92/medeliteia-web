import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Soluciones', href: '#soluciones' },
    { name: 'Sectores', href: '#sectores' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Inversión', href: '#inversion' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Container with visual cropping and transparency blending */}
          <div className="flex-shrink-0 flex items-center py-1">
            <a href="#" className="relative block w-52 h-14 overflow-hidden select-none bg-transparent">
              <img 
                src="/logo.webp" 
                alt="MedElite IA Logo" 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340%] h-[340%] max-w-none object-contain pointer-events-none"
                style={{ mixBlendMode: 'screen' }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-brand-silver hover:text-white transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/34694262425"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-brand-cobalt to-brand-accent group-hover:from-brand-cobalt group-hover:to-brand-accent hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800 transition-all duration-300"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-brand-dark rounded-md group-hover:bg-opacity-0">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-accent" />
                  Solicitar Análisis
                </span>
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-silver hover:text-white hover:bg-white/5 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark/95 border-b border-white/5" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-silver hover:text-white hover:bg-white/5 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-2 px-3">
              <a
                href="https://wa.me/34694262425"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 px-5 py-3 text-center text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-brand-cobalt to-brand-electric shadow-lg shadow-brand-cobalt/25 hover:from-brand-electric hover:to-brand-cobalt transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                Solicitar Análisis
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
