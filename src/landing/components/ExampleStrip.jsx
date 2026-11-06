import { ArrowRight, Calculator, CalendarDays, MessageCircle } from 'lucide-react'
import { Reveal } from '../motion'
import { pickTone } from '../tone'

const TONE = {
  dark: {
    section: 'relative overflow-hidden border-y border-line bg-raised py-16 md:py-20',
    title: 'text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.4rem]',
    text: 'mt-4 max-w-[44rem] text-[18px] leading-relaxed text-muted sm:text-[19px]',
    link: 'group mt-6 inline-flex items-center gap-2 py-1 text-[17px] font-semibold text-sector underline decoration-sector/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-sector',
    chip: 'lp-chip inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-2.5 text-[15px] font-medium text-ink-soft',
    icon: 'h-4 w-4 text-sector',
  },
  warm: {
    section: 'relative overflow-hidden border-y border-cream-line bg-cream-deep py-16 md:py-20',
    title: 'text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-cream-ink sm:text-[2.4rem]',
    text: 'mt-4 max-w-[44rem] text-[18px] leading-relaxed text-cream-muted sm:text-[19px]',
    link: 'group mt-6 inline-flex items-center gap-2 py-1 text-[17px] font-semibold text-sector-ink underline decoration-sector-ink/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-sector-ink',
    chip: 'lp-chip inline-flex items-center gap-2 rounded-full border border-cream-line bg-cream-card px-4 py-2.5 text-[15px] font-medium text-cream-ink',
    icon: 'h-4 w-4 text-sector-ink',
  },
};

// Piezas de esta misma página que sirven de ejemplo, con enlace a cada una (la agenda puede llamarse de otra forma por sector)
const pieces = (sector) => [
  { href: '#prueba', label: 'Asistente', Icon: MessageCircle },
  { href: '#calculadora', label: 'Calculadora', Icon: Calculator },
  { href: '#agenda', label: sector.example.agendaLabel || 'Agenda', Icon: CalendarDays },
];

function ExampleStrip({ sector }) {
  const { example } = sector;
  const t = pickTone(sector, TONE);
  return (
    <section className={t.section}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(40% 80% at 90% 50%, rgb(var(--sector) / 0.10), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-8">
          <h2 className={t.title}>{example.title}</h2>
          <p className={t.text}>{example.text}</p>
          <a
            href="#reserva"
            className={t.link}
          >
            {example.link}
            <ArrowRight className="lp-nudge h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal as="ul" index={1} className="flex flex-wrap gap-2.5 lg:col-span-4 lg:justify-end">
          {pieces(sector).map(({ href, label, Icon }) => (
            <li key={href}>
              <a href={href} className={t.chip}>
                <Icon className={t.icon} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default ExampleStrip
