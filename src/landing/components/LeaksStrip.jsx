import { CalendarX2, FileText, MessageCircleOff, RotateCcw } from 'lucide-react'
import { Reveal } from '../motion'
import SectionHeading from './SectionHeading'

// Un icono por fuga, en el mismo orden que leaks.items del sector
const LEAK_ICONS = [MessageCircleOff, FileText, RotateCcw, CalendarX2];

// Franja "Dónde se escapan pacientes": cuatro columnas separadas por líneas finas, sin tarjetas
function LeaksStrip({ sector }) {
  const { leaks } = sector;
  return (
    <section className="relative border-y border-line bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={leaks.label} title={leaks.title} titleClassName="lg:text-[2.75rem]" />
        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {leaks.items.map((item, i) => {
            const Icon = LEAK_ICONS[i % LEAK_ICONS.length];
            return (
              <Reveal as="li" key={item.tag} index={i} className="relative border-t border-white/[0.08] pt-6">
                <span className="absolute -top-px left-0 h-px w-12 bg-sector/70" aria-hidden="true" />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sector/10 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 text-[14px] font-semibold text-sector">{item.tag}</p>
                <p className="mt-2 text-[18px] leading-snug text-ink-soft">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default LeaksStrip
