import { Plus } from 'lucide-react'
import { Reveal } from '../motion'
import { pickTone } from '../tone'
import SectionHeading from './SectionHeading'

// Sección clara de siempre (paper, azulada) y su versión crema cálida (cream) para la landing dental
const TONE = {
  dark: {
    section: 'relative bg-paper py-20 md:py-28',
    heading: 'light',
    card: 'relative flex flex-col overflow-hidden rounded-[22px] border border-paper-line bg-paper-card p-7 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_18px_40px_-28px_rgba(11,18,32,0.35)] sm:p-8',
    cardTitle: 'mt-8 text-[22px] font-semibold leading-snug tracking-[-0.015em] text-paper-ink',
    cardText: 'mt-3 text-[17px] leading-relaxed text-paper-muted',
    divider: 'mt-24 grid grid-cols-1 gap-10 border-t border-paper-line pt-20 lg:grid-cols-12 lg:gap-16',
    list: 'border-t border-paper-line lg:col-span-8',
    row: 'border-b border-paper-line',
    faq: 'lp-faq lp-faq-light group',
    question: 'text-[19px] font-semibold text-paper-ink/80 transition-colors duration-200 group-open:text-paper-ink sm:text-[21px]',
    icon: 'lp-faq-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-paper-line bg-paper-card text-paper-muted group-open:border-sector-ink/50 group-open:bg-sector-ink/10 group-open:text-sector-ink',
    answer: 'lp-faq-answer max-w-2xl pb-8 pr-14 text-[17px] leading-relaxed text-paper-muted sm:text-[18px]',
  },
  warm: {
    section: 'relative bg-cream py-20 md:py-28',
    heading: 'warm',
    card: 'relative flex flex-col overflow-hidden rounded-[22px] border border-cream-line bg-cream-card p-7 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_18px_40px_-28px_rgba(43,29,20,0.35)] sm:p-8',
    cardTitle: 'mt-8 text-[22px] font-semibold leading-snug tracking-[-0.015em] text-cream-ink',
    cardText: 'mt-3 text-[17px] leading-relaxed text-cream-muted',
    divider: 'mt-24 grid grid-cols-1 gap-10 border-t border-cream-line pt-20 lg:grid-cols-12 lg:gap-16',
    list: 'border-t border-cream-line lg:col-span-8',
    row: 'border-b border-cream-line',
    faq: 'lp-faq lp-faq-warm group',
    question: 'text-[19px] font-semibold text-cream-ink/80 transition-colors duration-200 group-open:text-cream-ink sm:text-[21px]',
    icon: 'lp-faq-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-cream-line bg-cream-card text-cream-muted group-open:border-sector-ink/50 group-open:bg-sector-ink/10 group-open:text-sector-ink',
    answer: 'lp-faq-answer max-w-2xl pb-8 pr-14 text-[17px] leading-relaxed text-cream-muted sm:text-[18px]',
  },
};

/**
 * Sección clara de la landing (rompe el ritmo del tema oscuro): cómo funciona (3 pasos con números grandes)
 * y preguntas frecuentes en acordeón. Los colores salen de los tokens paper-* y sector-ink (AA sobre fondo claro).
 * El acordeón usa <details>: las respuestas están en el HTML (SEO) y funciona sin JavaScript.
 */
function HowItWorks({ sector }) {
  const { steps, faq } = sector;
  const t = pickTone(sector, TONE);
  return (
    <section id="como-funciona" className={t.section}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={steps.label} title={steps.title} tone={t.heading} />

        <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {steps.items.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              index={i}
              className={t.card}
            >
              <span
                className="lp-num pointer-events-none select-none text-[5.5rem] font-semibold leading-[0.85] tracking-[-0.06em] text-sector-ink/25 sm:text-[6.5rem]"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={t.cardTitle}>
                <span className="sr-only">Paso {i + 1}: </span>
                {step.title}
              </h3>
              <p className={t.cardText}>{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className={t.divider}>
          <div className="lg:col-span-4">
            <SectionHeading title={faq.title} titleClassName="lg:text-[2.6rem]" tone={t.heading} />
          </div>
          <div className={t.list}>
            {faq.items.map((item, i) => (
              <Reveal key={item.q} index={i} className={t.row}>
                <details className={t.faq} open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className={t.question}>{item.q}</h3>
                    <span
                      className={t.icon}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className={t.answer}>{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks
