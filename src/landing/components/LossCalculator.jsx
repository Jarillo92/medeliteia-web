import { useId, useState } from 'react'
import { formatEuros, formatNumber } from '../format'
import { useCountUp } from '../hooks'
import { Reveal } from '../motion'
import SectionHeading from './SectionHeading'

const WEEKS_PER_MONTH = 4.33;

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

// Deslizador y número editable para el mismo valor, con una sola etiqueta visible
function Field({ field, value, onChange }) {
  const id = useId();
  const [draft, setDraft] = useState(null);

  const commit = (raw) => {
    const n = Number(String(raw).replace(',', '.'));
    if (Number.isFinite(n)) onChange(clamp(Math.round(n), field.min, field.max));
  };

  return (
    <div className="border-t border-white/[0.07] pt-6 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <label id={`${id}-label`} htmlFor={`${id}-range`} className="text-[17px] font-medium text-ink-soft">
          {field.label}
          {field.unit && <span className="text-subtle"> ({field.unit})</span>}
        </label>
        {field.hint && <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[13px] text-muted">{field.hint}</span>}
      </div>
      <div className="mt-3 flex items-center gap-4">
        <input
          id={`${id}-range`}
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="lp-range min-w-0 flex-1"
        />
        <input
          type="number"
          inputMode="numeric"
          min={field.min}
          max={field.max}
          step={field.step}
          value={draft ?? value}
          aria-labelledby={`${id}-label`}
          onChange={(e) => {
            setDraft(e.target.value);
            if (e.target.value !== '') commit(e.target.value);
          }}
          onBlur={() => setDraft(null)}
          className="lp-num w-[5.5rem] flex-shrink-0 rounded-xl border border-white/10 bg-raised px-3 py-2 text-right text-[16px] font-semibold text-ink focus:border-sector/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-sector"
        />
      </div>
    </div>
  );
}

function LossCalculator({ sector }) {
  const { calculator } = sector;
  const [values, setValues] = useState(() => Object.fromEntries(calculator.fields.map((f) => [f.id, f.value])));

  // Citas perdidas al mes = mensajes × 4,33 × (% / 100) × (reservas / 10); euros = citas × valor
  const appointments = Math.round(values.messages * WEEKS_PER_MONTH * (values.late / 100) * (values.booked / 10));
  const money = appointments * values.value;

  const appointmentsRef = useCountUp(appointments, formatNumber, { pulse: true });
  const moneyRef = useCountUp(money, formatEuros, { pulse: true });

  return (
    <section id="calculadora" className="relative bg-ground py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={calculator.label} title={calculator.title} lead={calculator.lead} />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="panel space-y-6 p-5 sm:p-8 lg:col-span-6">
            {calculator.fields.map((field) => (
              <Field
                key={field.id}
                field={field}
                value={values[field.id]}
                onChange={(n) => setValues((prev) => ({ ...prev, [field.id]: n }))}
              />
            ))}
          </Reveal>

          <Reveal
            index={1}
            className="relative flex flex-col overflow-hidden rounded-[22px] border border-sector/25 bg-sector-deep p-6 shadow-lift sm:p-8 lg:col-span-6"
          >
            <div
              className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgb(var(--sector) / 0.30), transparent)' }}
              aria-hidden="true"
            />
            <div className="relative" aria-hidden="true">
              <p className="text-[17px] text-ink-soft">{calculator.resultMoney}</p>
              {/* Cifra de pérdida mensual: enorme, con salto suave al cambiar */}
              <p
                ref={moneyRef}
                className="lp-num mt-3 whitespace-nowrap text-[clamp(3.25rem,9vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
              >
                {formatEuros(money)}
              </p>
              <div className="mt-8 flex items-baseline gap-3 border-t border-white/10 pt-6">
                <span ref={appointmentsRef} className="lp-num text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-sector">
                  {formatNumber(appointments)}
                </span>
                <span className="text-[16px] text-ink-soft">{calculator.resultAppointments.toLowerCase()}</span>
              </div>
            </div>
            {/* Resultado para lectores de pantalla, sin los pasos intermedios de la animación */}
            <p className="sr-only" aria-live="polite">
              {calculator.resultMoney}: {formatEuros(money)}. {calculator.resultAppointments}: {formatNumber(appointments)}.
            </p>
            <div className="relative mt-auto space-y-2 pt-10 text-[14px] leading-relaxed text-[#AFC0DE]">
              <p>{calculator.formula}</p>
              <p className="font-medium text-ink-soft">{calculator.disclaimer}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default LossCalculator
