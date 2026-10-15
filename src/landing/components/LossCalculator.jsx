import { useId, useState } from 'react'
import { formatEuros, formatNumber } from '../format'
import { useCountUp } from '../hooks'
import SectionLabel from './SectionLabel'

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
    <div className="border-t border-white/[0.07] pt-5 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <label id={`${id}-label`} htmlFor={`${id}-range`} className="text-[15.5px] font-medium text-ink-soft">
          {field.label}
          {field.unit && <span className="text-subtle"> ({field.unit})</span>}
        </label>
        {field.hint && <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-subtle">{field.hint}</span>}
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

  const appointmentsRef = useCountUp(appointments, formatNumber);
  const moneyRef = useCountUp(money, formatEuros);

  return (
    <section id="calculadora" className="relative py-20 md:py-28">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl" data-reveal>
          <SectionLabel>{calculator.label}</SectionLabel>
          <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.6rem]">{calculator.title}</h2>
          <p className="mt-4 max-w-[38rem] text-lg leading-relaxed text-muted">{calculator.lead}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="panel space-y-5 p-5 sm:p-8 lg:col-span-7" data-reveal>
            {calculator.fields.map((field) => (
              <Field
                key={field.id}
                field={field}
                value={values[field.id]}
                onChange={(n) => setValues((prev) => ({ ...prev, [field.id]: n }))}
              />
            ))}
          </div>

          <div
            className="relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-sector/25 bg-accent-deep p-6 sm:p-8 lg:col-span-5"
            style={{ '--i': 1 }}
            data-reveal
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgb(var(--sector) / 0.28), transparent)' }}
              aria-hidden="true"
            />
            <div className="relative space-y-8" aria-hidden="true">
              <div>
                <p className="text-[15px] text-ink-soft">{calculator.resultAppointments}</p>
                <p ref={appointmentsRef} className="lp-num mt-2 text-[3.5rem] font-semibold leading-none tracking-[-0.03em] text-white sm:text-[4.25rem]">
                  {formatNumber(appointments)}
                </p>
              </div>
              <div className="border-t border-white/10 pt-8">
                <p className="text-[15px] text-ink-soft">{calculator.resultMoney}</p>
                <p ref={moneyRef} className="lp-num mt-2 text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-sector sm:text-[3rem]">
                  {formatEuros(money)}
                </p>
              </div>
            </div>
            {/* Resultado para lectores de pantalla, sin los pasos intermedios de la animación */}
            <p className="sr-only" aria-live="polite">
              {calculator.resultAppointments}: {formatNumber(appointments)}. {calculator.resultMoney}: {formatEuros(money)}.
            </p>
            <div className="relative mt-10 space-y-2 text-[13px] leading-relaxed text-[#AFC0DE]">
              <p>{calculator.formula}</p>
              <p className="text-ink-soft">{calculator.disclaimer}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LossCalculator
