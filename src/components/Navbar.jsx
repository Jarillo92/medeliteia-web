import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line/80 bg-ground/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          <a href="#" className="flex-shrink-0 flex items-center py-1.5" aria-label="MedElite IA, volver al inicio">
            <img
              src="/logo-light.webp"
              alt="MedElite IA"
              width="640"
              height="165"
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
            <a
              href="https://wa.me/34694262425"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-[15px] font-semibold text-white shadow-soft hover:bg-accent-strong active:scale-[0.98] transition-[background-color,transform] duration-200"
            >
              Solicitar Análisis
            </a>
          </div>

          {/* Botón del menú móvil */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 transition-colors duration-200"
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
        <div className="md:hidden border-t border-line bg-ground" id="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-ink/5 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="https://wa.me/34694262425"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-accent px-5 py-3.5 text-base font-semibold text-white hover:bg-accent-strong transition-colors duration-200"
              >
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
