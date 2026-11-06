import { useEffect, useRef } from 'react'
import { BellRing, CalendarCheck2, Dumbbell, FileText, MessageCircle, PawPrint, Repeat, Scissors, Sparkles, UserPlus } from 'lucide-react'
import { useMotionValueEvent } from 'framer-motion'
import { useScrollFill } from '../hooks'
import { Reveal } from '../motion'
import { pickTone } from '../tone'
import SectionHeading from './SectionHeading'

const TONE = {
  dark: {
    section: 'relative border-y border-line bg-surface py-20 md:py-28',
    heading: 'dark',
    note: 'mt-6 max-w-[30rem] text-[15px] leading-relaxed text-subtle',
    rail: 'absolute bottom-7 left-[27px] top-7 w-[2px] rounded-full bg-white/[0.07]',
    fill: 'absolute bottom-7 left-[27px] top-7 w-[2px] origin-top rounded-full bg-gradient-to-b from-sector to-sector/60',
    nodeOn: 'scale-100 border-sector/50 bg-sector-node text-sector shadow-[0_0_0_6px_rgb(var(--sector)/0.08)]',
    nodeOff: 'scale-90 border-white/10 bg-surface text-subtle',
    timeOn: 'text-sector',
    timeOff: 'text-subtle',
    textOn: 'text-ink',
    textOff: 'text-muted',
  },
  warm: {
    section: 'relative border-y border-cream-line bg-cream py-20 md:py-28',
    heading: 'warm',
    note: 'mt-6 max-w-[30rem] text-[15px] leading-relaxed text-cream-subtle',
    rail: 'absolute bottom-7 left-[27px] top-7 w-[2px] rounded-full bg-cream-line',
    fill: 'absolute bottom-7 left-[27px] top-7 w-[2px] origin-top rounded-full bg-gradient-to-b from-sector-ink to-sector-ink/60',
    nodeOn: 'scale-100 border-sector-ink/50 bg-cream-card text-sector-ink shadow-[0_0_0_6px_rgb(var(--sector-ink)/0.10)]',
    nodeOff: 'scale-90 border-cream-line bg-cream-card text-cream-subtle',
    timeOn: 'text-sector-ink',
    timeOff: 'text-cream-subtle',
    textOn: 'text-cream-ink',
    textOff: 'text-cream-muted',
  },
};

const ICONS = {
  message: MessageCircle,
  calendar: CalendarCheck2,
  bell: BellRing,
  file: FileText,
  repeat: Repeat,
  paw: PawPrint,
  sparkles: Sparkles,
  scissors: Scissors,
  dumbbell: Dumbbell,
  userPlus: UserPlus,
};
const OFFSET = ['start 70%', 'end 55%'];

/**
 * Línea de tiempo: la línea se ilumina con el scroll (scaleY ligado al progreso, sin re-render por fotograma)
 * y cada nodo se enciende al llegar a él. En el HTML del servidor y sin JavaScript se ve entera y encendida.
 */
function DayTimeline({ sector }) {
  const { day } = sector;
  const t = pickTone(sector, TONE);
  const listRef = useRef(null);
  const fillRef = useRef(null);
  const steps = day.items.length;
  const { step, progress, active } = useScrollFill(listRef, { steps, offset: OFFSET });

  // Tras montar (si hay animación), la línea parte del progreso real en vez de estar llena
  useEffect(() => {
    if (active.current && fillRef.current) fillRef.current.style.transform = `scaleY(${progress.get()})`;
  }, [active, progress]);

  useMotionValueEvent(progress, 'change', (v) => {
    if (active.current && fillRef.current) fillRef.current.style.transform = `scaleY(${v})`;
  });

  return (
    <section id="un-dia" className={t.section}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading label={day.label} title={day.title} tone={t.heading} />
            <Reveal as="p" index={2} className={t.note}>
              {day.note}
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          {/* Raíl y relleno: el relleno escala en vertical con el progreso del scroll */}
          <span className={t.rail} aria-hidden="true" />
          <span
            ref={fillRef}
            className={t.fill}
            style={{ transform: 'scaleY(1)' }}
            aria-hidden="true"
          />
          {day.items.map((item, i) => {
            const on = i < step;
            const Icon = ICONS[item.icon] || MessageCircle;
            return (
              <li key={item.time} className="relative pb-12 pl-[84px] last:pb-0">
                <span
                  className={`lp-node absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border ${
                    on ? t.nodeOn : t.nodeOff
                  }`}
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" />
                </span>
                <p className={`pt-1 text-[15px] font-semibold transition-colors duration-200 ${on ? t.timeOn : t.timeOff}`}>{item.time}</p>
                <p className={`mt-2 max-w-[34rem] text-[19px] leading-relaxed transition-colors duration-200 sm:text-[21px] ${on ? t.textOn : t.textOff}`}>
                  {item.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default DayTimeline
