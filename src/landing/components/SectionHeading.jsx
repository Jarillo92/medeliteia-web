import { Reveal } from '../motion'

/**
 * Cabecera de sección: una sola etiqueta monoespaciada (opcional), título y entradilla apilados.
 */
function SectionHeading({ label, title, lead, className = '', titleClassName = '', tone = 'dark' }) {
  const light = tone === 'light';
  return (
    <div className={`max-w-3xl ${className}`}>
      {label && (
        <Reveal as="p" className={`font-mono text-[13px] font-medium uppercase tracking-[0.12em] ${light ? 'text-sector-ink' : 'text-sector'}`}>
          {label}
        </Reveal>
      )}
      <Reveal
        as="h2"
        index={1}
        className={`mt-4 text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[2.9rem] lg:text-[3.3rem] ${light ? 'text-paper-ink' : 'text-ink'} ${titleClassName}`}
      >
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" index={2} className={`mt-5 max-w-[40rem] text-[18px] leading-relaxed sm:text-[19px] ${light ? 'text-paper-muted' : 'text-muted'}`}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}

export default SectionHeading
