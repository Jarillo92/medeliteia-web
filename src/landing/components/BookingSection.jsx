import { Check, Mail, Phone } from 'lucide-react'
import { CONTACT_EMAIL, WHATSAPP_NUMBER_LABEL, WHATSAPP_URL } from '../../config'
import BookingCalendar from './BookingCalendar'
import SectionLabel from './SectionLabel'

function BookingSection({ sector }) {
  const { booking } = sector;
  return (
    <section id="reserva" className="relative py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: 'radial-gradient(45% 60% at 70% 30%, rgb(var(--sector) / 0.10), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionLabel>{booking.label}</SectionLabel>
          <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.6rem]">{booking.title}</h2>
          <p className="mt-4 max-w-[34rem] text-lg leading-relaxed text-muted">{booking.lead}</p>

          <ul className="mt-8 space-y-3">
            {booking.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[16px] text-ink-soft">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-sector" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-10 space-y-4 border-t border-white/[0.07] pt-8">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sector/10 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <dt className="text-sm text-subtle">¿Prefieres WhatsApp o llamar?</dt>
                <dd>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-lg font-semibold text-ink transition-colors duration-200 hover:text-accent-bright">
                    {WHATSAPP_NUMBER_LABEL}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sector/10 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <dt className="text-sm text-subtle">Correo electrónico</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block py-1.5 text-lg font-semibold text-ink transition-colors duration-200 hover:text-accent-bright">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <BookingCalendar />
          <p className="mt-4 text-center text-[14px] text-subtle">
            Al reservar aceptas la{' '}
            <a href="/politica-privacidad" className="text-muted underline decoration-white/20 transition-colors duration-200 hover:text-ink hover:decoration-white/50">
              política de privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default BookingSection
