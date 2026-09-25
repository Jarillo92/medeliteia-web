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
    <div className="rounded-2xl border border-line bg-surface p-2 sm:p-4 shadow-soft overflow-hidden">
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
    <section id="contacto" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Datos de contacto directo */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
              Reserva tu Análisis Inicial
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
              Elige el hueco que mejor te venga en el calendario y cuéntanos brevemente tu situación. Si lo prefieres, puedes escribirnos o llamarnos directamente por WhatsApp.
            </p>

            <dl className="mt-8 space-y-5 border-t border-line pt-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <dt className="text-sm text-muted">WhatsApp y teléfono</dt>
                  <dd>
                    <a href="https://wa.me/34694262425" className="inline-block py-2 text-lg font-semibold text-ink hover:text-accent transition-colors duration-200">
                      +34 694 26 24 25
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <dt className="text-sm text-muted">Correo electrónico</dt>
                  <dd>
                    <a href="mailto:medeliteia@gmail.com" className="inline-block py-2 text-lg font-semibold text-ink hover:text-accent transition-colors duration-200">
                      medeliteia@gmail.com
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <dt className="text-sm text-muted">Ubicación</dt>
                  <dd className="text-lg font-semibold text-ink">España</dd>
                </div>
              </div>
            </dl>
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