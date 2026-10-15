import { useRef } from 'react'
import { CalendarDays, MessageCircle } from 'lucide-react'
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
function Slot({ booking, booked, free, via }) {
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
          className={`lp-slot absolute inset-0 flex flex-col justify-center rounded-xl border border-sector/35 bg-[#0F1C38] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${
            booked ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-0'
          }`}
          aria-hidden={!booked}
        >
          <span className="truncate text-[13.5px] font-semibold text-ink sm:text-[14px]">{booking}</span>
          <span className="mt-0.5 flex items-center gap-1 text-[11.5px] text-sector">
            <MessageCircle className="h-3 w-3" aria-hidden="true" />
            {via}
          </span>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value, live }) {
  const ref = useCountUp(value, formatNumber, { duration: 220 });
  return (
    <div className="border-t border-white/[0.07] pt-5 first:border-t-0 first:pt-0">
      <p className="text-[15px] text-muted">{label}</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span ref={ref} className="lp-num text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-ink">
          {formatNumber(value)}
        </span>
        {live && <span className="text-[13px] font-medium text-sector">según la agenda</span>}
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
  const total = product.bookings.length;
  const { step: filled } = useScrollFill(agendaRef, { steps: total });

  // Qué huecos están ocupados con el progreso actual: [fila-gabinete] -> índice de llenado
  const order = new Map(product.bookings.map(([row, room, label], i) => [`${row}-${room}`, { i, label }]));
  const slotsTotal = product.times.length * product.rooms.length;
  const ratio = total ? filled / total : 1;
  const metricValue = (m) => (m.id === 'bookings' ? filled : Math.round(m.value * ratio));
  const agendaTitle = clinic ? `Agenda · ${clinic}` : product.agendaTitleFallback;

  return (
    <section id="agenda" className="relative border-y border-line bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={product.label} title={product.title} lead={product.lead} />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Agenda */}
          <Reveal className="panel overflow-hidden lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sector/15 text-sector shadow-[inset_0_0_0_1px_rgb(var(--sector)/0.22)]">
                  <CalendarDays className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-semibold text-ink">{agendaTitle}</p>
                  <p className="text-[13.5px] text-subtle">{product.day}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[13.5px] text-muted" aria-live="off">
                  <span className="lp-num font-semibold text-ink">{filled}</span> de {slotsTotal} huecos ocupados
                </p>
                <ExampleTag>{product.exampleTag}</ExampleTag>
              </div>
            </div>

            <div ref={agendaRef} className="p-4 sm:p-6">
              <div className="grid grid-cols-[44px_minmax(0,1fr)_minmax(0,1fr)] gap-x-2 gap-y-2 sm:grid-cols-[56px_minmax(0,1fr)_minmax(0,1fr)] sm:gap-x-3">
                <span aria-hidden="true" />
                {product.rooms.map((room) => (
                  <p key={room} className="pb-1 text-[13px] font-semibold text-muted">
                    {room}
                  </p>
                ))}
                {product.times.map((time, row) => (
                  <div key={time} className="contents">
                    <p className="lp-num pt-2 text-[13px] text-subtle">{time}</p>
                    {product.rooms.map((room, col) => {
                      const slot = order.get(`${row}-${col}`);
                      return (
                        <Slot
                          key={room}
                          booking={slot?.label}
                          booked={Boolean(slot) && slot.i < filled}
                          free={product.free}
                          via={product.via}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
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
                <Metric key={m.id} label={m.label} value={metricValue(m)} live={m.id === 'bookings'} />
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
