import { useRef } from 'react'
import { CalendarDays, Dumbbell, MessageCircle } from 'lucide-react'
import { formatNumber } from '../format'
import { useCountUp, useScrollFill } from '../hooks'
import { Reveal } from '../motion'
import SectionHeading from './SectionHeading'

function ExampleTag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] font-semibold text-muted">{children}</span>
  );
}

// Hueco de la agenda: la capa "libre" y la capa "ocupado" se cruzan con opacity/transform
function Slot({ booking, detail, booked, free, via }) {
  return (
    <div className="relative h-[58px] sm:h-[62px]">
      <div
        className={`lp-slot absolute inset-0 flex items-center rounded-xl border border-dashed border-white/[0.09] px-3 text-[13px] text-subtle ${
          booked ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden={booked}
      >
        {free}
      </div>
      {booking && (
        <div
          className={`lp-slot absolute inset-0 flex flex-col justify-center rounded-xl border border-sector/35 bg-sector-deep px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${
            booked ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-0'
          }`}
          aria-hidden={!booked}
        >
          <span className="truncate text-[13.5px] font-semibold text-ink sm:text-[14px]">{booking}</span>
          <span className="mt-0.5 flex min-w-0 items-center gap-1 text-[11.5px] text-sector">
            <MessageCircle className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{detail || via}</span>
          </span>
        </div>
      )}
    </div>
  );
}

// Parrilla de clases: cada reserva ocupa una plaza de su clase. Plazas como segmentos, sin número inventado.
function ClassRow({ item, taken, labels }) {
  const free = Math.max(0, item.capacity - taken);
  return (
    <li className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-x-3 rounded-xl border border-white/[0.07] bg-raised/50 px-3 py-3 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:px-4">
      <span className="lp-num text-[13px] text-subtle">{item.time}</span>
      <div className="min-w-0">
        <p className="truncate text-[14.5px] font-semibold text-ink">{item.name}</p>
        <div className="mt-2 flex gap-1" role="img" aria-label={`${taken} de ${item.capacity} plazas ocupadas`}>
          {Array.from({ length: item.capacity }, (_, i) => (
            <span key={i} className="relative h-2 min-w-0 flex-1 rounded-full bg-white/[0.08]">
              <span className={`lp-slot absolute inset-0 rounded-full bg-sector ${i < taken ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-0'}`} />
            </span>
          ))}
        </div>
      </div>
      <span className={`lp-num whitespace-nowrap text-right text-[13px] ${free === 0 ? 'font-semibold text-ink' : 'text-muted'}`}>
        {free === 0 ? labels.full : `${free} ${free === 1 ? labels.freeOne : labels.freeMany}`}
      </span>
    </li>
  );
}

function Metric({ label, value, live, liveLabel = 'según la agenda' }) {
  const ref = useCountUp(value, formatNumber, { duration: 220 });
  return (
    <div className="border-t border-white/[0.07] pt-5 first:border-t-0 first:pt-0">
      <p className="text-[15px] text-muted">{label}</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span ref={ref} className="lp-num text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-ink">
          {formatNumber(value)}
        </span>
        {live && <span className="text-[13px] font-medium text-sector">{liveLabel}</span>}
      </p>
    </div>
  );
}

/**
 * Mockups de producto en código: agenda de un día que se va llenando al hacer scroll y un panel
 * de métricas ligado a ella. Todo son datos de ejemplo, etiquetados como tal.
 */
function ProductPreview({ sector, clinic }) {
  const { product } = sector;
  const agendaRef = useRef(null);
  const isClasses = product.kind === 'classes';
  const total = product.bookings.length;
  const { step: filled } = useScrollFill(agendaRef, { steps: total });

  // Agenda por huecos: [fila-columna] -> { orden de llenado, texto }
  const order = new Map(isClasses ? [] : product.bookings.map(([row, col, label, detail], i) => [`${row}-${col}`, { i, label, detail }]));
  // Parrilla de clases: plazas ocupadas por clase con el progreso actual
  const baseTaken = isClasses ? product.classes.reduce((sum, c) => sum + c.base, 0) : 0;
  const capacity = isClasses ? product.classes.reduce((sum, c) => sum + c.capacity, 0) : product.times.length * product.columns.length;
  const counter = isClasses ? baseTaken + filled : filled;
  const ratio = total ? filled / total : 1;
  const metricValue = (m) => (m.id === 'bookings' ? filled : Math.round(m.value * ratio));
  const agendaTitle = clinic ? `${product.agendaTitlePrefix || 'Agenda'} · ${clinic}` : product.agendaTitleFallback;
  const HeaderIcon = isClasses ? Dumbbell : CalendarDays;

  return (
    <section id="agenda" className="relative border-y border-line bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={product.label} title={product.title} lead={product.lead} />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Agenda o parrilla */}
          <Reveal className="panel overflow-hidden lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sector/15 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]">
                  <HeaderIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-semibold text-ink">{agendaTitle}</p>
                  <p className="text-[13.5px] text-subtle">{product.day}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[13.5px] text-muted" aria-live="off">
                  <span className="lp-num font-semibold text-ink">{counter}</span> de {capacity} {product.counterLabel}
                </p>
                <ExampleTag>{product.exampleTag}</ExampleTag>
              </div>
            </div>

            <div ref={agendaRef} className="p-4 sm:p-6">
              {isClasses ? (
                <ul className="space-y-2">
                  {product.classes.map((item, ci) => (
                    <ClassRow
                      key={item.time + item.name}
                      item={item}
                      taken={item.base + product.bookings.filter((target, i) => target === ci && i < filled).length}
                      labels={product.classLabels}
                    />
                  ))}
                </ul>
              ) : (
                <div className="lp-agenda-grid grid gap-x-2 gap-y-2 sm:gap-x-3" style={{ '--cols': product.columns.length }}>
                  <span aria-hidden="true" />
                  {product.columns.map((column) => (
                    <p key={column} className="truncate pb-1 text-[13px] font-semibold text-muted">
                      {column}
                    </p>
                  ))}
                  {product.times.map((time, row) => (
                    <div key={time} className="contents">
                      <p className="lp-num pt-2 text-[13px] text-subtle">{time}</p>
                      {product.columns.map((column, col) => {
                        const slot = order.get(`${row}-${col}`);
                        return (
                          <Slot
                            key={column}
                            booking={slot?.label}
                            detail={slot?.detail}
                            booked={Boolean(slot) && slot.i < filled}
                            free={product.free}
                            via={product.via}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {/* Métricas ligadas a la agenda */}
          <Reveal index={1} className="panel flex flex-col p-6 sm:p-8 lg:col-span-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[16px] font-semibold text-ink">{product.metricsTitle}</p>
              <ExampleTag>{product.exampleTag}</ExampleTag>
            </div>
            <div className="mt-8 space-y-5">
              {product.metrics.map((m) => (
                <Metric key={m.id} label={m.label} value={metricValue(m)} live={m.id === 'bookings'} liveLabel={product.liveLabel} />
              ))}
            </div>
            <p className="mt-auto pt-8 text-[13.5px] leading-relaxed text-subtle">{product.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ProductPreview
