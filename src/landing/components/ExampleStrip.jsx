import { ArrowRight, Calculator, CalendarDays, MessageCircle } from 'lucide-react'
import { Reveal } from '../motion'

// Piezas de esta misma página que sirven de ejemplo, con enlace a cada una
const PIECES = [
  { href: '#prueba', label: 'Asistente', Icon: MessageCircle },
  { href: '#calculadora', label: 'Calculadora', Icon: Calculator },
  { href: '#agenda', label: 'Agenda', Icon: CalendarDays },
];

function ExampleStrip({ sector }) {
  const { example } = sector;
  return (
    <section className="relative overflow-hidden border-y border-line bg-raised py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(40% 80% at 90% 50%, rgb(var(--sector) / 0.10), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-8">
          <h2 className="text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.4rem]">{example.title}</h2>
          <p className="mt-4 max-w-[44rem] text-[18px] leading-relaxed text-muted sm:text-[19px]">{example.text}</p>
          <a
            href="#reserva"
            className="group mt-6 inline-flex items-center gap-2 py-1 text-[17px] font-semibold text-sector underline decoration-sector/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-sector"
          >
            {example.link}
            <ArrowRight className="lp-nudge h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal as="ul" index={1} className="flex flex-wrap gap-2.5 lg:col-span-4 lg:justify-end">
          {PIECES.map(({ href, label, Icon }) => (
            <li key={href}>
              <a href={href} className="lp-chip inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-2.5 text-[15px] font-medium text-ink-soft">
                <Icon className="h-4 w-4 text-sector" aria-hidden="true" />
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
