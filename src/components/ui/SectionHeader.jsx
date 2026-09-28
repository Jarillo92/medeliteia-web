import { Reveal } from './Reveal'

/**
 * Cabecera de sección: etiqueta, título (con la segunda parte en azul claro, como el hero) y entradilla.
 */
function SectionHeader({ eyebrow, title, accent, lead, align = 'left', className = '' }) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" aria-hidden="true" />
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal as="h2" delay={0.05} className="mt-5 text-[2rem] leading-[1.06] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold tracking-[-0.03em] text-ink">
        {title}
        {accent && (
          <>
            {' '}
            <span className="text-accent-bright">{accent}</span>
          </>
        )}
      </Reveal>
      {lead && (
        <Reveal as="p" delay={0.1} className={`mt-5 text-lg sm:text-xl leading-relaxed text-muted ${centered ? 'mx-auto' : ''} max-w-[40rem]`}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}

export default SectionHeader
