import { CONTACT_EMAIL, LEGAL_LINKS, WHATSAPP_NUMBER_LABEL, WHATSAPP_URL } from '../../config'

// Pie ligero de las landings: el de la home enlaza a secciones de la home (/#...), este solo a la home y a las legales
function LandingFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#04060A] pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-line pb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="/" className="inline-block py-1" aria-label="MedElite IA, ir a la página principal">
              <img src="/logo-dark.webp" alt="MedElite IA" width="640" height="167" loading="lazy" className="h-9 w-auto" />
            </a>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Agencia española de automatización con IA. Asistentes en WhatsApp que atienden, dan cita y recuerdan.
            </p>
          </div>
          <ul className="space-y-1 text-[15px]">
            <li>
              <a href="/" className="inline-block py-2 text-muted transition-colors duration-200 hover:text-ink">
                Página principal
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block py-2 text-muted transition-colors duration-200 hover:text-ink">
                WhatsApp {WHATSAPP_NUMBER_LABEL}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block py-2 text-muted transition-colors duration-200 hover:text-ink">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>

        {/* Cartel de subvención Castilla-La Mancha, igual que en la home */}
        <div className="flex justify-center py-8">
          <div className="w-full max-w-[560px] rounded-xl bg-white p-4">
            <img
              src="/subvencion-clm.jpg"
              alt="Ayudas para el fomento del autoempleo - Cofinanciado por la Unión Europea, Ministerio de Trabajo y Economía Social, Castilla-La Mancha"
              loading="lazy"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted lg:flex-row">
          <div>
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> MedElite IA. Todos los derechos reservados.
          </div>
          <nav aria-label="Textos legales">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-block py-2 transition-colors duration-200 hover:text-ink">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter
