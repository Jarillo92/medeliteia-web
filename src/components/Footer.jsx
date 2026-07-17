import React from 'react'
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
    <footer className="relative bg-[#02050c] border-t border-white/5 pt-16 pb-8 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          
          {/* Column 1: Brand & Desc */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center">
              <div className="relative block w-48 h-12 overflow-hidden select-none bg-transparent">
                <img 
                  src="/logo.webp" 
                  alt="MedElite IA Logo" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340%] h-[340%] max-w-none object-contain pointer-events-none"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
            </div>
            <p className="text-xs text-brand-silver font-light leading-relaxed max-w-sm">
              Agencia española pionera en sistemas de automatización con Inteligencia Artificial. Diseñamos e implementamos agentes de WhatsApp inteligentes y páginas web premium para llenar la agenda de clínicas privadas.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/rafael-jose-jarillo-espejo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-silver hover:text-white hover:border-brand-electric hover:bg-brand-electric/10 transition-all duration-300"
                aria-label="LinkedIn de Rafael José Jarillo Espejo"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/medelite.ia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-silver hover:text-white hover:border-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                aria-label="Instagram de MedElite IA"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4 md:pl-8">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-xs text-brand-silver hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Coordinates */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3.5">
              
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wide">Correo de soporte</span>
                  <a href="mailto:medeliteia@gmail.com" className="text-brand-silver hover:text-white transition-colors duration-200">
                    medeliteia@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wide">Llamadas y WhatsApp</span>
                  <a href="https://wa.me/34694262425" className="text-brand-silver hover:text-white transition-colors duration-200">
                    +34 694 26 24 25
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wide">Operaciones</span>
                  <span className="text-brand-silver">España</span>
                </div>
              </li>

            </ul>
          </div>

        </div>
        {/* Cartel de subvención Castilla-La Mancha */}
        <div className="w-full flex justify-center md:justify-start py-8">
          <div className="bg-white rounded-lg p-4 max-w-[560px] w-full">
            <img
              src="/subvencion-clm.jpg"
              alt="Ayudas para el fomento del autoempleo - Cofinanciado por la Unión Europea, Ministerio de Trabajo y Economía Social, Castilla-La Mancha"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] text-slate-500 font-light space-y-4 sm:space-y-0">
          <div>
            &copy; {currentYear} MedElite IA. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span>Desarrollado en España con pasión por el crecimiento clínico</span>
          </div>
        </div>

        
      </div>
    </footer>
  )
}

export default Footer
