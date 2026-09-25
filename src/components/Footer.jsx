import { Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Soluciones', href: '#soluciones' },
    { name: 'Sectores', href: '#sectores' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Inversión', href: '#inversion' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <footer className="relative border-t border-line bg-surface pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-line">

          {/* Marca y descripción */}
          <div className="md:col-span-5">
            <img
              src="/logo-light.webp"
              alt="MedElite IA"
              width="640"
              height="165"
              loading="lazy"
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              Agencia española pionera en sistemas de automatización con Inteligencia Artificial. Diseñamos e implementamos agentes de WhatsApp inteligentes y páginas web premium para llenar la agenda de clínicas privadas.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/rafael-jose-jarillo-espejo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted hover:border-accent hover:text-accent transition-colors duration-200"
                aria-label="LinkedIn de Rafael José Jarillo Espejo"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/medelite.ia/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted hover:border-accent hover:text-accent transition-colors duration-200"
                aria-label="Instagram de MedElite IA"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <nav className="md:col-span-3" aria-label="Navegación del pie">
            <h2 className="text-sm font-semibold text-ink">Navegación</h2>
            <ul className="mt-4 space-y-1">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block py-2.5 text-[15px] text-muted hover:text-ink transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold text-ink">Contacto</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <div className="text-[15px] leading-relaxed">
                  <span className="block text-sm text-muted">Correo de soporte</span>
                  <a href="mailto:medeliteia@gmail.com" className="inline-block py-2.5 text-ink hover:text-accent transition-colors duration-200">
                    medeliteia@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <div className="text-[15px] leading-relaxed">
                  <span className="block text-sm text-muted">Llamadas y WhatsApp</span>
                  <a href="https://wa.me/34694262425" className="inline-block py-2.5 text-ink hover:text-accent transition-colors duration-200">
                    +34 694 26 24 25
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <div className="text-[15px] leading-relaxed">
                  <span className="block text-sm text-muted">Operaciones</span>
                  <span className="text-ink">España</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Cartel de subvención Castilla-La Mancha */}
        <div className="flex justify-center py-8">
          <div className="w-full max-w-[560px] rounded-xl border border-line bg-white p-4">
            <img
              src="/subvencion-clm.jpg"
              alt="Ayudas para el fomento del autoempleo - Cofinanciado por la Unión Europea, Ministerio de Trabajo y Economía Social, Castilla-La Mancha"
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-line text-sm text-muted">
          <div>&copy; {currentYear} MedElite IA. Todos los derechos reservados.</div>
          <div>Desarrollado en España con pasión por el crecimiento clínico</div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
