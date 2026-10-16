import { Plus } from 'lucide-react'
import { Reveal } from '../motion'
import SectionHeading from './SectionHeading'

/**
 * Sección clara de la landing (rompe el ritmo del tema oscuro): cómo funciona (3 pasos con números grandes)
 * y preguntas frecuentes en acordeón. Los colores salen de los tokens paper-* y sector-ink (AA sobre fondo claro).
 * El acordeón usa <details>: las respuestas están en el HTML (SEO) y funciona sin JavaScript.
 */
function HowItWorks({ sector }) {
  const { steps, faq } = sector;
  return (
    <section id="como-funciona" className="relative bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={steps.label} title={steps.title} tone="light" />

        <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {steps.items.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              index={i}
              className="relative flex flex-col overflow-hidden rounded-[22px] border border-paper-line bg-paper-card p-7 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_18px_40px_-28px_rgba(11,18,32,0.35)] sm:p-8"
            >
              <span
                className="lp-num pointer-events-none select-none text-[5.5rem] font-semibold leading-[0.85] tracking-[-0.06em] text-sector-ink/25 sm:text-[6.5rem]"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-8 text-[22px] font-semibold leading-snug tracking-[-0.015em] text-paper-ink">
                <span className="sr-only">Paso {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 text-[17px] leading-relaxed text-paper-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-24 grid grid-cols-1 gap-10 border-t border-paper-line pt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading title={faq.title} titleClassName="lg:text-[2.6rem]" tone="light" />
          </div>
          <div className="border-t border-paper-line lg:col-span-8">
            {faq.items.map((item, i) => (
              <Reveal key={item.q} index={i} className="border-b border-paper-line">
                <details className="lp-faq lp-faq-light group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[19px] font-semibold text-paper-ink/80 transition-colors duration-200 group-open:text-paper-ink sm:text-[21px]">{item.q}</h3>
                    <span
                      className="lp-faq-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-paper-line bg-paper-card text-paper-muted group-open:border-sector-ink/50 group-open:bg-sector-ink/10 group-open:text-sector-ink"
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="lp-faq-answer max-w-2xl pb-8 pr-14 text-[17px] leading-relaxed text-paper-muted sm:text-[18px]">{item.a}</p>
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
