import { ArrowRight, CalendarX2, FileText, MessageCircleOff, RotateCcw } from 'lucide-react'
import { DEMO_LABEL } from '../../config'
import SectionLabel from './SectionLabel'

// Un icono por fuga, en el mismo orden que leaks.items del sector
const LEAK_ICONS = [MessageCircleOff, FileText, RotateCcw, CalendarX2];

function LandingHero({ sector, clinic }) {
  const { hero, leaks } = sector;
  return (
    <section className="relative overflow-hidden pt-[7.5rem] pb-16 sm:pt-32 md:pb-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px]"
        style={{ background: 'radial-gradient(50% 55% at 18% 18%, rgb(var(--sector) / 0.14), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <SectionLabel className="lp-rise">{hero.label}</SectionLabel>
          <h1
            className="lp-rise mt-5 text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.6rem]"
            style={{ '--i': 1 }}
          >
            <span className="text-sector">{clinic || hero.titleLead}</span>
            {hero.titleRest}
          </h1>
          <p className="lp-rise mt-6 max-w-[36rem] text-lg leading-relaxed text-muted sm:text-xl" style={{ '--i': 2 }}>
            {hero.subtitle}
          </p>
          <div className="lp-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ '--i': 3 }}>
            <a href="#reserva" className="btn-primary px-7 py-4 text-[16px]">
              {DEMO_LABEL}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#prueba" className="btn-ghost px-7 py-4 text-[16px]">
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Fugas de pacientes: avisos apilados como en la pantalla del móvil */}
        <div className="lg:col-span-5">
          <div className="panel p-5 sm:p-6">
            <h2 className="text-[15px] font-semibold text-ink-soft">{leaks.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {leaks.items.map((item, i) => {
                const Icon = LEAK_ICONS[i % LEAK_ICONS.length];
                return (
                  <li
                    key={item.tag}
                    className="lp-rise flex items-start gap-3.5 rounded-2xl border border-white/[0.06] bg-raised/70 p-3.5"
                    style={{ '--i': 3 + i }}
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sector/10 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11.5px] uppercase tracking-[0.12em] text-subtle">{item.tag}</span>
                      <span className="mt-1 block text-[15px] leading-snug text-ink-soft">{item.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero
