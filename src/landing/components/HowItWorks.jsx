import SectionLabel from './SectionLabel'

// Cómo funciona (3 pasos) y preguntas frecuentes, en una sola sección. Las respuestas están siempre visibles.
function HowItWorks({ sector }) {
  const { steps, faq } = sector;
  return (
    <section id="como-funciona" className="relative py-20 md:py-28">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl" data-reveal>
          <SectionLabel>{steps.label}</SectionLabel>
          <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.6rem]">{steps.title}</h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {steps.items.map((step, i) => (
            <li key={step.title} className="relative border-t border-white/[0.08] pt-6" style={{ '--i': i }} data-reveal>
              <span className="absolute -top-px left-0 h-px w-16 bg-sector" aria-hidden="true" />
              <span className="lp-num font-mono text-[13px] text-sector" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4" data-reveal>
            <SectionLabel>{faq.label}</SectionLabel>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.1rem]">{faq.title}</h2>
          </div>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8">
            {faq.items.map((item, i) => (
              <div key={item.q} style={{ '--i': i % 2 }} data-reveal>
                <dt className="text-[17px] font-semibold text-ink">{item.q}</dt>
                <dd className="mt-2.5 text-[15.5px] leading-relaxed text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks
