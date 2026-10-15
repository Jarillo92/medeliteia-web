import { DEMO_LABEL } from '../../config'

// Barra ligera: logo a la home y botón a la reserva de esta misma página
function LandingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ground/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <a href="/" className="flex-shrink-0 py-1.5" aria-label="MedElite IA, ir a la página principal">
          <img src="/logo-dark.webp" alt="MedElite IA" width="640" height="167" className="h-7 w-auto min-[400px]:h-8 sm:h-10" />
        </a>
        <a href="#reserva" className="btn-primary whitespace-nowrap px-4 py-2.5 text-[14px] sm:px-5 sm:text-[15px]">
          <span className="hidden min-[400px]:inline">{DEMO_LABEL}</span>
          <span className="min-[400px]:hidden">Reservar demo</span>
        </a>
      </div>
    </header>
  );
}

export default LandingNav
