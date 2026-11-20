import { LazyMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import LandingNav from '../components/LandingNav'
import LandingFooter from '../components/LandingFooter'
import { Reveal } from '../motion'
import { sectorVars } from '../sectorVars'
import { SECTORS } from '../../landings/sectors'
import { DEMO_HREF } from '../../config'
import Calculator from './Calculator'

const loadMotionFeatures = () => import('../motionFeatures').then((mod) => mod.default);

/**
 * /calculadora: calculadora general de clientes que se te escapan. Se prerenderiza y se hidrata como las landings.
 * Un único H1; el texto indexable va bajo la calculadora.
 */
function CalculatorPage({ page }) {
  const { hero, why } = page;
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div className="relative min-h-screen" style={sectorVars(page.colors)}>
        <LandingNav href={DEMO_HREF} />
        <main>
          <section className="relative overflow-x-clip bg-ground pb-10 pt-28 sm:pb-14 sm:pt-36">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[460px]"
              style={{ background: 'radial-gradient(50% 65% at 50% 0%, rgb(var(--sector) / 0.20), transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
              <p className="lp-rise font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-sector">{hero.label}</p>
              <h1 className="lp-rise mt-4 text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.035em] text-ink text-balance sm:text-6xl">
                {hero.titleLead} <span className="text-sector">{hero.titleAccent}</span> {hero.titleTail}
              </h1>
              <p className="lp-rise mt-5 text-[17px] leading-relaxed text-muted sm:text-[19px]">{hero.subtitle}</p>
              <a href="#calculadora" className="lp-rise btn-primary mt-8 w-full px-7 py-4 text-[17px] sm:w-auto">
                {hero.cta}
                <ArrowDown className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </section>

          <Calculator page={page} />

          <section className="relative border-t border-white/[0.06] bg-surface py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <Reveal as="h2" className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.25rem]">
                {why.title}
              </Reveal>
              <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted">
                {why.text.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-8 text-[15px] font-medium text-ink-soft">{why.sectorsLead}</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
                {Object.values(SECTORS).map((s) => (
                  <li key={s.slug}>
                    <a href={`/${s.slug}`} className="inline-block py-1.5 text-sector underline decoration-sector/30 underline-offset-4 transition-colors duration-200 hover:text-accent-bright">
                      {s.meta.breadcrumb}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <LandingFooter current={page.slug} heading="Por sector" />
      </div>
    </LazyMotion>
  );
}

export default CalculatorPage
