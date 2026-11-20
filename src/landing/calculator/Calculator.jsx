import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, Instagram } from 'lucide-react'
import { DEMO_HREF, FORM_ENDPOINT } from '../../config'
import { formatEuros, formatNumber } from '../format'
import { hasFinePointer, useCountUp } from '../hooks'
import { Reveal } from '../motion'
import LeadForm from './LeadForm'

// Misma fórmula que la calculadora de las landings (LossCalculator.jsx), con mensajes al día en vez de por semana
const WEEKS_PER_MONTH = 4.33;

// Luz que sigue al cursor sobre un panel (solo ratón): escribe variables CSS en el nodo, sin re-render
function useSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer()) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    el.addEventListener('pointermove', move, { passive: true });
    return () => el.removeEventListener('pointermove', move);
  }, []);
  return ref;
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

// Número grande editable + deslizador para el mismo valor, con una sola etiqueta visible
function BigField({ field, value, onChange }) {
  const id = useId();
  const [draft, setDraft] = useState(null);
  const fill = ((value - field.min) / (field.max - field.min)) * 100;

  const commit = (raw) => {
    const n = Number(String(raw).replace(',', '.'));
    if (Number.isFinite(n)) onChange(clamp(Math.round(n), field.min, field.max));
  };

  return (
    <div className="border-t border-white/[0.07] pt-7 first:border-t-0 first:pt-0">
      <label id={`${id}-label`} htmlFor={`${id}-range`} className="block text-[17px] font-medium text-ink-soft">
        {field.label}
      </label>
      {field.hint && <p className="mt-1 text-[14px] text-subtle">{field.hint}</p>}
      <div className="mt-3 flex items-baseline gap-2">
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
          className="lp-num cp-num min-w-0 rounded-lg border-0 bg-transparent p-0 text-[3.25rem] font-semibold leading-none tracking-[-0.04em] text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sector sm:text-[3.75rem]"
          style={{ width: `${String(draft ?? value).length * 0.92 + 0.15}ch` }}
        />
        <span className="text-[1.5rem] font-medium text-sector sm:text-[1.75rem]">{field.unit === '%' || field.unit === '€' ? field.unit : ''}</span>
        {field.unit !== '%' && field.unit !== '€' && <span className="text-[16px] text-muted">{field.unit}</span>}
      </div>
      <input
        id={`${id}-range`}
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="cp-range mt-3 w-full"
        style={{ '--fill': `${fill}%` }}
      />
    </div>
  );
}

// Hipótesis ajustable, recogida por defecto para que el resultado no parezca más seguro de lo que es
function Assumption({ field, value, onChange }) {
  const id = useId();
  const fill = ((value - field.min) / (field.max - field.min)) * 100;
  return (
    <details className="group border-t border-white/[0.07] pt-5">
      <summary className="cp-summary flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 text-[15px] text-muted">
        <span>{`Hipótesis de partida: ${value} de cada 10 habrían reservado`}</span>
        <span className="flex-shrink-0 text-[14px] font-medium text-sector underline decoration-sector/40 underline-offset-4">Ajustar</span>
      </summary>
      <div className="pb-1 pt-3">
        <label htmlFor={`${id}-range`} className="block text-[15px] text-ink-soft">
          {field.label}: <span className="lp-num font-semibold text-white">{value}</span>
        </label>
        <input
          id={`${id}-range`}
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="cp-range mt-2 w-full"
          style={{ '--fill': `${fill}%` }}
        />
      </div>
    </details>
  );
}

function Calculator({ page }) {
  const { calculator: calc, form } = page;
  const [values, setValues] = useState(() => ({
    ...Object.fromEntries(calc.fields.map((f) => [f.id, f.value])),
    [calc.assumption.id]: calc.assumption.value,
  }));
  const set = (id) => (n) => setValues((prev) => ({ ...prev, [id]: n }));

  // Citas perdidas al mes = mensajes/día × 7 × 4,33 × (% / 100) × (reservas / 10); euros = citas × valor
  const clients = Math.round(values.messages * 7 * WEEKS_PER_MONTH * (values.late / 100) * (values.booked / 10));
  const money = clients * values.value;

  const moneyRef = useCountUp(money, formatEuros, { pulse: true });
  const clientsRef = useCountUp(clients, formatNumber, { pulse: true });
  const inputsRef = useSpotlight();
  const resultRef = useSpotlight();

  return (
    <section id="calculadora" className="relative scroll-mt-20 pb-20 pt-4 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          <Reveal nodeRef={inputsRef} className="cp-spot panel space-y-7 p-5 sm:p-8 lg:col-span-6">
            <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.75rem]">{calc.title}</h2>
            {calc.fields.map((field) => (
              <BigField key={field.id} field={field} value={values[field.id]} onChange={set(field.id)} />
            ))}
            <Assumption field={calc.assumption} value={values.booked} onChange={set('booked')} />
          </Reveal>

          <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-6">
            <Reveal
              index={1}
              nodeRef={resultRef}
              className="cp-spot relative overflow-hidden rounded-[22px] border border-sector/25 bg-sector-deep p-6 shadow-lift sm:p-8"
            >
              <div
                className="cp-glow pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full"
                style={{ background: 'radial-gradient(closest-side, rgb(var(--sector) / 0.32), transparent)' }}
                aria-hidden="true"
              />
              <div className="relative" aria-hidden="true">
                <span className="inline-block rounded-full border border-sector/40 bg-sector/10 px-3 py-1 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-sector">
                  {calc.resultTag}
                </span>
                <p className="mt-4 text-[17px] text-ink-soft">{calc.resultMoney}</p>
                <p
                  ref={moneyRef}
                  className="lp-num mt-2 whitespace-nowrap text-[clamp(3.5rem,17vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
                >
                  {formatEuros(money)}
                </p>
                <div className="mt-7 flex items-baseline gap-3 border-t border-white/10 pt-6">
                  <span ref={clientsRef} className="lp-num text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-sector">
                    {formatNumber(clients)}
                  </span>
                  <span className="text-[17px] text-ink-soft">{calc.resultAppointments.toLowerCase()}</span>
                </div>
              </div>
              {/* Resultado para lectores de pantalla, sin los pasos intermedios de la animación */}
              <p className="sr-only" aria-live="polite">
                {calc.resultTag}. {calc.resultMoney}: {formatEuros(money)}. {calc.resultAppointments}: {formatNumber(clients)}.
              </p>
              <div className="relative mt-7 space-y-2 text-[14px] leading-relaxed text-[#AFC0DE]">
                <p className="font-medium text-ink-soft">{calc.note}</p>
                <p>{calc.formula}</p>
                <p>{calc.privacy}</p>
              </div>

              <a href={DEMO_HREF} className="btn-primary relative mt-7 w-full px-6 py-4 text-[17px]">
                {calc.cta}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <p className="relative mt-4 flex flex-wrap items-center justify-center gap-x-1.5 text-center text-[15px] text-ink-soft">
                <Instagram className="h-4 w-4 text-sector" aria-hidden="true" />
                <span>{calc.instagramPre}</span>
                <strong className="font-semibold text-white">{calc.instagramKeyword}</strong>
                <span>{calc.instagramPost}</span>
                <a
                  href={calc.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-2 font-semibold text-sector underline decoration-sector/40 underline-offset-4 transition-colors duration-200 hover:text-accent-bright"
                >
                  {calc.instagramHandle}
                </a>
              </p>
            </Reveal>

            {/* Solo se pinta cuando hay FORM_ENDPOINT en config.js */}
            {FORM_ENDPOINT && (
              <Reveal index={2}>
                <LeadForm form={form} endpoint={FORM_ENDPOINT} result={{ ...values, clients, money }} />
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculator
