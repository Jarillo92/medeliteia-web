import { useId, useState } from 'react'
import { formatEuros } from '../format'

// Envío opcional del resultado. Casilla de consentimiento sin marcar; el envío solo ocurre al pulsar el botón.
function LeadForm({ form, endpoint, result }) {
  const id = useId();
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('web')) return; // trampa para robots: campo oculto que una persona no rellena
    if (!data.get('consent')) return;
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          origen: 'calculadora',
          nombre: String(data.get('nombre') || '').trim(),
          email: String(data.get('email') || '').trim(),
          consentimiento: true,
          mensajes_dia: result.messages,
          porcentaje_tarde: result.late,
          valor_cita: result.value,
          reservarian_de_10: result.booked,
          clientes_mes: result.clients,
          euros_mes: result.money,
          euros_mes_texto: formatEuros(result.money),
          pagina: '/calculadora',
        }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const field =
    'mt-1.5 w-full rounded-xl border border-white/10 bg-raised px-4 py-3 text-[16px] text-ink placeholder:text-subtle focus:border-sector/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-sector';

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-5 sm:p-7">
      <div>
        <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{form.title}</h2>
        <p className="mt-1 text-[15px] text-muted">{form.lead}</p>
      </div>
      <label htmlFor={`${id}-nombre`} className="block text-[15px] text-ink-soft">
        Nombre
        <input id={`${id}-nombre`} name="nombre" type="text" required autoComplete="name" maxLength={80} className={field} />
      </label>
      <label htmlFor={`${id}-email`} className="block text-[15px] text-ink-soft">
        Email
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" maxLength={120} className={field} />
      </label>
      {/* Campo trampa, fuera de la vista y del teclado */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input name="web" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex items-start gap-3 text-[14px] leading-snug text-muted">
        <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[rgb(var(--sector))]" />
        <span>
          {form.consent}{' '}
          <a href={form.privacyHref} className="text-ink-soft underline decoration-white/30 underline-offset-2 hover:text-ink">
            {form.privacyLabel}
          </a>
          .
        </span>
      </label>
      <button type="submit" disabled={status === 'sending' || status === 'ok'} className="btn-primary w-full px-6 py-3.5 text-[16px] disabled:opacity-60">
        {status === 'sending' ? form.sending : form.submit}
      </button>
      <p role="status" aria-live="polite" className={`text-[14px] ${status === 'error' ? 'text-[#F5A3A3]' : 'text-sector'}`}>
        {status === 'ok' && form.ok}
        {status === 'error' && form.error}
      </p>
    </form>
  );
}

export default LeadForm
