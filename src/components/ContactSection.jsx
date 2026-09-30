import { useEffect, useState } from 'react'
import { Check, Mail, Phone } from 'lucide-react'
import { CONTACT_EMAIL, WHATSAPP_NUMBER_LABEL, WHATSAPP_URL } from '../config'
import SectionHeader from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

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
    // Marco oscuro sin borde; el recorte redondeado va en una capa propia para que el iframe no enseñe esquinas
    <div className="rounded-[26px] bg-surface p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:p-3">
      {/* Recorta la línea fina de arriba (-2px) y la franja blanca de abajo (-16px) del calendario */}
      <div
        className="isolate overflow-hidden rounded-[20px] bg-[#0B0F19] [transform:translateZ(0)]"
        style={{ height: `${iframeHeight - 16}px`, transition: 'height 0.3s ease' }}
      >
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/ZFBJGeef7qz5jyRrEyYa"
        style={{ width: '100%', border: 'none', overflow: 'hidden', height: `${iframeHeight}px`, marginTop: '-2px', display: 'block', background: '#0B0F19', transition: 'height 0.3s ease' }}
        scrolling="no"
        id="ZFBJGeef7qz5jyRrEyYa_1784279743535"
        title="Reserva tu demo gratuita"
      />
      </div>
    </div>
  );
}

const DEMO_POINTS = [
  '30 minutos, sin compromiso',
  'Ves el asistente funcionando con casos de tu sector',
  'Te damos el precio exacto para tu negocio',
];

function ContactSection() {
  return (
    <section id="contacto" className="relative py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: 'radial-gradient(45% 60% at 70% 30%, rgba(47,107,255,0.10), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="Demo gratuita"
              title="Reserva tu demo"
              accent="y mira el asistente funcionando"
              lead="Elige día y hora en el calendario. Si lo prefieres, escríbenos o llámanos por WhatsApp."
            />

            <Reveal as="ul" delay={0.12} className="mt-8 space-y-3">
              {DEMO_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[16px] text-ink-soft">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </Reveal>

            <Reveal as="dl" delay={0.16} className="mt-10 space-y-4 border-t border-white/[0.07] pt-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,140,255,0.22)]">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-sm text-subtle">WhatsApp y teléfono</dt>
                  <dd>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-lg font-semibold text-ink hover:text-accent-bright transition-colors duration-200">
                      {WHATSAPP_NUMBER_LABEL}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,140,255,0.22)]">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-sm text-subtle">Correo electrónico</dt>
                  <dd>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block py-1.5 text-lg font-semibold text-ink hover:text-accent-bright transition-colors duration-200">
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <BookingCalendar />
            <p className="mt-4 text-center text-[14px] text-subtle">
              Al reservar aceptas la{' '}
              <a href="/politica-privacidad" className="text-muted underline decoration-white/20 hover:text-ink hover:decoration-white/50 transition-colors duration-200">
                política de privacidad
              </a>
              .
            </p>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

export default ContactSection
