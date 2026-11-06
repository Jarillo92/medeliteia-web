import { ArrowUpRight, CalendarCheck2, MessageCircle, UserPlus } from 'lucide-react'
import { DENTAL_PROOF, MOOV_CASE } from '../../config'
import { Reveal } from '../motion'
import { pickTone } from '../tone'
import SectionHeading from './SectionHeading'

// Icono del punto del caso por nombre (case.point.icon); sin nombre, el de alta de socios
const POINT_ICONS = { userPlus: UserPlus, message: MessageCircle, calendar: CalendarCheck2 };
// Hueco de testimonio propio del sector (case.proof), configurado en src/config.js
const PROOFS = { dental: DENTAL_PROOF };

const TONE = {
  dark: {
    section: 'relative border-t border-line bg-ground py-20 md:py-28',
    heading: 'dark',
    card: 'rounded-[22px] border border-white/[0.08] bg-surface p-6 shadow-soft sm:p-8',
    name: 'text-[22px] font-semibold tracking-[-0.015em] text-ink sm:text-[24px]',
    status: 'rounded-full border border-sector/30 bg-sector/10 px-3 py-1 text-[13px] font-semibold text-sector',
    intro: 'mt-3 max-w-[38rem] text-[17px] leading-relaxed text-muted',
    divider: 'border-t border-white/[0.07] pt-7',
    chip: 'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sector/10 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]',
    pointTitle: 'text-[19px] font-semibold text-ink',
    pointText: 'mt-1.5 max-w-[34rem] text-[17px] leading-relaxed text-muted',
    note: 'mt-7 max-w-[38rem] border-t border-white/[0.07] pt-7 text-[16px] leading-relaxed text-muted',
    quote: 'max-w-[36rem] text-[18px] leading-relaxed text-ink-soft',
    author: 'mt-3 text-[15px] text-subtle',
    link: 'group mt-7 inline-flex items-center gap-2 py-1 text-[16px] font-semibold text-sector underline decoration-sector/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-sector',
  },
  warm: {
    section: 'relative border-y border-cream-line bg-cream-deep py-20 md:py-28',
    heading: 'warm',
    card: 'rounded-[22px] border border-cream-line bg-cream-card p-6 shadow-[0_18px_40px_-28px_rgba(43,29,20,0.4)] sm:p-8',
    name: 'text-[22px] font-semibold tracking-[-0.015em] text-cream-ink sm:text-[24px]',
    status: 'rounded-full border border-sector-ink/30 bg-sector-ink/10 px-3 py-1 text-[13px] font-semibold text-sector-ink',
    intro: 'mt-3 max-w-[38rem] text-[17px] leading-relaxed text-cream-muted',
    divider: 'border-t border-cream-line pt-7',
    chip: 'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sector-ink/10 text-sector-ink shadow-[inset_0_0_0_1px_rgb(var(--sector-ink)/0.25)]',
    pointTitle: 'text-[19px] font-semibold text-cream-ink',
    pointText: 'mt-1.5 max-w-[34rem] text-[17px] leading-relaxed text-cream-muted',
    note: 'mt-7 max-w-[38rem] border-t border-cream-line pt-7 text-[16px] leading-relaxed text-cream-muted',
    quote: 'max-w-[36rem] text-[18px] leading-relaxed text-cream-ink',
    author: 'mt-3 text-[15px] text-cream-subtle',
    link: 'group mt-7 inline-flex items-center gap-2 py-1 text-[16px] font-semibold text-sector-ink underline decoration-sector-ink/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-sector-ink',
  },
};

/**
 * Caso real (solo si el sector define `case`, hoy gimnasios): MOOV Huesca.
 * De MOOV_CASE salen el nombre, la entradilla, el enlace, el estado y el testimonio.
 * No se pintan las fases de MOOV_CASE: aquí solo se cuenta el alta de socios automatizada.
 * El testimonio de Álvaro se muestra solo cuando MOOV_CASE.quote tenga texto.
 */
function CaseStudy({ sector }) {
  const { case: study } = sector;
  if (!study) return null;
  const t = pickTone(sector, TONE);
  const PointIcon = POINT_ICONS[study.point.icon] || UserPlus;
  const proof = PROOFS[study.proof];
  return (
    <section id="caso" className={t.section}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading label={study.label} title={study.title} tone={t.heading} />
        </div>

        <Reveal className="lg:col-span-7">
          <div className={t.card}>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className={t.name}>{MOOV_CASE.name}</h3>
              <span className={t.status}>{MOOV_CASE.status}</span>
            </div>
            <p className={t.intro}>{MOOV_CASE.intro}</p>

            <div className={`mt-7 flex items-start gap-4 ${t.divider}`}>
              <span className={t.chip}>
                <PointIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className={t.pointTitle}>{study.point.title}</p>
                <p className={t.pointText}>{study.point.text}</p>
              </div>
            </div>

            {study.note && <p className={t.note}>{study.note}</p>}

            {MOOV_CASE.quote && (
              <figure className={`mt-7 ${t.divider}`}>
                <blockquote className={t.quote}>{MOOV_CASE.quote}</blockquote>
                {MOOV_CASE.author && <figcaption className={t.author}>{MOOV_CASE.author}</figcaption>}
              </figure>
            )}

            <a
              href={MOOV_CASE.url}
              target="_blank"
              rel="noopener noreferrer"
              className={t.link}
            >
              {MOOV_CASE.linkLabel}
              <ArrowUpRight className="lp-nudge h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Testimonio de una clínica dental: solo cuando haya permiso y se rellene en src/config.js (DENTAL_PROOF) */}
          {proof?.name && proof?.quote && (
            <figure className={`mt-6 ${t.card}`}>
              <figcaption className={t.name}>{proof.name}</figcaption>
              <blockquote className={`mt-4 ${t.quote}`}>{proof.quote}</blockquote>
              {proof.author && <p className={t.author}>{proof.author}</p>}
              {proof.url && (
                <a href={proof.url} target="_blank" rel="noopener noreferrer" className={t.link}>
                  Ver la web de la clínica
                  <ArrowUpRight className="lp-nudge h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </figure>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export default CaseStudy
