import { Check, Mail, Phone } from 'lucide-react'
import { CONTACT_EMAIL, WHATSAPP_NUMBER_LABEL, WHATSAPP_URL } from '../../config'
import BookingCalendar from './BookingCalendar'
import { pickTone } from '../tone'
import SectionHeading from './SectionHeading'

// El calendario de GoHighLevel no se toca: sigue en su contenedor oscuro también sobre el fondo crema
const TONE = {
  dark: {
    section: 'relative bg-ground py-20 md:py-28',
    heading: 'dark',
    point: 'flex items-start gap-3 text-[17px] text-ink-soft',
    check: 'mt-1 h-4 w-4 flex-shrink-0 text-sector',
    contact: 'mt-10 space-y-4 border-t border-white/[0.07] pt-8',
    chip: 'flex h-11 w-11 items-center justify-center rounded-xl bg-sector/10 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]',
    label: 'text-sm text-subtle',
    link: 'inline-block py-1.5 text-lg font-semibold text-ink transition-colors duration-200 hover:text-accent-bright',
    legal: 'mt-4 text-center text-[14px] text-subtle',
    legalLink: 'text-muted underline decoration-white/20 transition-colors duration-200 hover:text-ink hover:decoration-white/50',
  },
  warm: {
    section: 'relative bg-cream py-20 md:py-28',
    heading: 'warm',
    point: 'flex items-start gap-3 text-[17px] text-cream-ink',
    check: 'mt-1 h-4 w-4 flex-shrink-0 text-sector-ink',
    contact: 'mt-10 space-y-4 border-t border-cream-line pt-8',
    chip: 'flex h-11 w-11 items-center justify-center rounded-xl bg-sector-ink/10 text-sector-ink shadow-[inset_0_0_0_1px_rgb(var(--sector-ink)/0.25)]',
    label: 'text-sm text-cream-subtle',
    link: 'inline-block py-1.5 text-lg font-semibold text-cream-ink transition-colors duration-200 hover:text-sector-ink',
    legal: 'mt-4 text-center text-[14px] text-cream-subtle',
    legalLink: 'text-cream-muted underline decoration-cream-ink/25 transition-colors duration-200 hover:text-cream-ink hover:decoration-cream-ink/60',
  },
};

function BookingSection({ sector }) {
  const { booking } = sector;
  const t = pickTone(sector, TONE);
  return (
    <section id="reserva" className={t.section}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: 'radial-gradient(45% 60% at 70% 30%, rgb(var(--sector) / 0.10), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <SectionHeading label={booking.label} title={booking.title} lead={booking.lead} tone={t.heading} />

          <ul className="mt-8 space-y-3">
            {booking.points.map((point) => (
              <li key={point} className={t.point}>
                <Check className={t.check} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <dl className={t.contact}>
            <div className="flex items-center gap-4">
              <div className={t.chip}>
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <dt className={t.label}>¿Prefieres WhatsApp o llamar?</dt>
                <dd>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={t.link}>
                    {WHATSAPP_NUMBER_LABEL}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={t.chip}>
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <dt className={t.label}>Correo electrónico</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={t.link}>
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <BookingCalendar />
          <p className={t.legal}>
            Al reservar aceptas la{' '}
            <a href="/politica-privacidad" className={t.legalLink}>
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
