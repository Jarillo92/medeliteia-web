import { CalendarX2, FileText, MessageCircleOff, PawPrint, RotateCcw, Sparkles, UserMinus, Users } from 'lucide-react'
import { Reveal } from '../motion'
import { pickTone } from '../tone'
import SectionHeading from './SectionHeading'

const TONE = {
  dark: {
    section: 'relative border-y border-line bg-surface py-20 md:py-24',
    heading: 'dark',
    item: 'relative border-t border-white/[0.08] pt-6',
    line: 'absolute -top-px left-0 h-px w-12 bg-sector/70',
    chip: 'flex h-11 w-11 items-center justify-center rounded-xl bg-sector/10 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]',
    tag: 'mt-5 text-[14px] font-semibold text-sector',
    text: 'mt-2 text-[18px] leading-snug text-ink-soft',
  },
  warm: {
    section: 'relative border-y border-cream-line bg-cream py-20 md:py-24',
    heading: 'warm',
    item: 'group relative border-t border-cream-line pt-6',
    line: 'absolute -top-px left-0 h-px w-12 bg-sector-ink/80',
    chip: 'lp-chip-pop flex h-11 w-11 items-center justify-center rounded-xl bg-sector-ink/10 text-sector-ink shadow-[inset_0_0_0_1px_rgb(var(--sector-ink)/0.25)]',
    tag: 'mt-5 text-[14px] font-semibold text-sector-ink',
    text: 'mt-2 text-[18px] leading-snug text-cream-ink',
  },
};

// Iconos por nombre (item.icon). Sin nombre, se usan en este orden.
const LEAK_ICONS = { night: MessageCircleOff, quote: FileText, revisit: RotateCcw, cancel: CalendarX2, paw: PawPrint, sparkles: Sparkles, lapsed: UserMinus, group: Users };
const LEAK_ORDER = ['night', 'quote', 'revisit', 'cancel'];

// Franja "Dónde se escapan pacientes": cuatro columnas separadas por líneas finas, sin tarjetas
function LeaksStrip({ sector }) {
  const { leaks } = sector;
  const t = pickTone(sector, TONE);
  return (
    <section className={t.section}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={leaks.label} title={leaks.title} titleClassName="lg:text-[2.75rem]" tone={t.heading} />
        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {leaks.items.map((item, i) => {
            const Icon = LEAK_ICONS[item.icon || LEAK_ORDER[i % LEAK_ORDER.length]];
            return (
              <Reveal as="li" key={item.tag} index={i} className={t.item}>
                <span className={t.line} aria-hidden="true" />
                <span className={t.chip}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className={t.tag}>{item.tag}</p>
                <p className={t.text}>{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default LeaksStrip
