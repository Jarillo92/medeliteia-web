import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

function BookingCalendar() {
  const [iframeHeight, setIframeHeight] = useState(900);

  useEffect(() => {
    const scriptId = 'ghl-form-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }

    const handleMessage = (event) => {
      if (event.data && event.data.type === 'iframe-resize' && event.data.height) {
        setIframeHeight(event.data.height + 20);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-2 sm:p-4 border border-white/5 overflow-hidden">
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/ZFBJGeef7qz5jyRrEyYa"
        style={{ width: '100%', border: 'none', overflow: 'hidden', height: `${iframeHeight}px`, transition: 'height 0.3s ease' }}
        scrolling="no"
        id="ZFBJGeef7qz5jyRrEyYa_1784279743535"
        title="Reserva tu Análisis Inicial"
      />
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 z-20 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/20 border border-brand-electric/30 text-brand-accent text-xs font-semibold">
              <span>Contacto Directo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white leading-tight">
              Reserva tu Análisis Inicial
            </h2>
            <p className="text-brand-silver font-light leading-relaxed">
              Elige el hueco que mejor te venga en el calendario y cuéntanos brevemente tu situación. Si lo prefieres, puedes escribirnos o llamarnos directamente por WhatsApp.
            </p>

            <div className="border-t border-white/5 pt-8 space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-brand-silver uppercase tracking-wider">WhatsApp / Teléfono</div>
                  <a href="https://wa.me/34694262425" className="text-base font-semibold text-white hover:text-brand-accent transition-colors duration-200">
                    +34 694 26 24 25
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-brand-silver uppercase tracking-wider">Correo Electrónico</div>
                  <a href="mailto:medeliteia@gmail.com" className="text-base font-semibold text-white hover:text-brand-accent transition-colors duration-200">
                    medeliteia@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-brand-silver uppercase tracking-wider">Ubicación</div>
                  <div className="text-base font-semibold text-white">
                    España
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Booking Calendar */}
          <div className="lg:col-span-7">
            <BookingCalendar />
          </div>

        </div>

      </div>
    </section>
  )
}

export default ContactSection