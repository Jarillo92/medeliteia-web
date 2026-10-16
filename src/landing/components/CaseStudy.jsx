import { ArrowUpRight, UserPlus } from 'lucide-react'
import { MOOV_CASE } from '../../config'
import { Reveal } from '../motion'
import SectionHeading from './SectionHeading'

/**
 * Caso real (solo si el sector define `case`, hoy gimnasios): MOOV Huesca.
 * De MOOV_CASE salen el nombre, la entradilla, el enlace, el estado y el testimonio.
 * No se pintan las fases de MOOV_CASE: aquí solo se cuenta el alta de socios automatizada.
 * El testimonio de Álvaro se muestra solo cuando MOOV_CASE.quote tenga texto.
 */
function CaseStudy({ sector }) {
  const { case: study } = sector;
  if (!study) return null;
  return (
    <section id="caso" className="relative border-t border-line bg-ground py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading label={study.label} title={study.title} />
        </div>

        <Reveal className="lg:col-span-7">
          <div className="rounded-[22px] border border-white/[0.08] bg-surface p-6 shadow-soft sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-[22px] font-semibold tracking-[-0.015em] text-ink sm:text-[24px]">{MOOV_CASE.name}</h3>
              <span className="rounded-full border border-sector/30 bg-sector/10 px-3 py-1 text-[13px] font-semibold text-sector">{MOOV_CASE.status}</span>
            </div>
            <p className="mt-3 max-w-[38rem] text-[17px] leading-relaxed text-muted">{MOOV_CASE.intro}</p>

            <div className="mt-7 flex items-start gap-4 border-t border-white/[0.07] pt-7">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sector/10 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]">
                <UserPlus className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[19px] font-semibold text-ink">{study.point.title}</p>
                <p className="mt-1.5 max-w-[34rem] text-[17px] leading-relaxed text-muted">{study.point.text}</p>
              </div>
            </div>

            {MOOV_CASE.quote && (
              <figure className="mt-7 border-t border-white/[0.07] pt-7">
                <blockquote className="max-w-[36rem] text-[18px] leading-relaxed text-ink-soft">{MOOV_CASE.quote}</blockquote>
                {MOOV_CASE.author && <figcaption className="mt-3 text-[15px] text-subtle">{MOOV_CASE.author}</figcaption>}
              </figure>
            )}

            <a
              href={MOOV_CASE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2 py-1 text-[16px] font-semibold text-sector underline decoration-sector/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-sector"
            >
              {MOOV_CASE.linkLabel}
              <ArrowUpRight className="lp-nudge h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CaseStudy
