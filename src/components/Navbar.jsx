import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { DEMO_HREF, DEMO_LABEL } from '../config'

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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-ground/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          <a href="#" className="flex-shrink-0 flex items-center py-1.5" aria-label="MedElite IA, volver al inicio">
            <img
              src="/logo-dark.webp"
              alt="MedElite IA"
              width="640"
              height="167"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          {/* Navegación de escritorio */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[15px] font-medium text-muted hover:text-ink transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a href={DEMO_HREF} className="btn-primary px-5 py-2.5 text-[15px]">
              {DEMO_LABEL}
            </a>
          </div>

          {/* Botón del menú móvil */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-white/5 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú principal'}</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-ground/95 backdrop-blur-xl" id="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-white/5 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-3">
              <a href={DEMO_HREF} onClick={() => setIsOpen(false)} className="btn-primary w-full py-3.5 text-base">
                {DEMO_LABEL}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
