import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { DEMO_HREF, DEMO_LABEL } from '../config'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Cómo funciona', href: '/#como-funciona' },
    { name: 'Sectores', href: '/#sectores' },
    { name: 'Proceso', href: '/#proceso' },
    { name: 'Inversión', href: '/#inversion' },
    { name: 'Preguntas', href: '/#preguntas' },
  ];

  // Sección visible: se marca en el menú
  const [active, setActive] = useState('');
  useEffect(() => {
    const ids = ['problema', 'como-funciona', 'sectores', 'webs', 'proceso', 'inversion', 'preguntas', 'contacto'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-ground/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          <a href="/" className="flex-shrink-0 flex items-center py-1.5" aria-label="MedElite IA, volver al inicio">
            <img
              src="/logo-dark.webp"
              alt="MedElite IA"
              width="640"
              height="167"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          {/* Navegación de escritorio */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = item.href === `/#${active}`;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-gradient-to-r from-transparent via-accent-bright to-transparent transition-[opacity,transform] duration-300 ease-out ${
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-0'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center">
            <a href={DEMO_HREF} className="btn-primary px-5 py-2.5 text-[15px]">
              {DEMO_LABEL}
            </a>
          </div>

          {/* Botón del menú móvil */}
          <div className="flex lg:hidden">
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
        <div className="lg:hidden border-t border-white/[0.06] bg-ground/95 backdrop-blur-xl" id="mobile-menu">
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
