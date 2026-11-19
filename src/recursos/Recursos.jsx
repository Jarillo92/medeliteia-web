import { useEffect, useState } from 'react'
import { ArrowUpRight, Instagram, Lock, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../config'
import { BUSINESS_TYPES, INSTAGRAM_URL, SORTED_RESOURCES } from './resources'
import { ORIGEN, hasAccess, saveAccess, submitLead } from './form'

// Paleta propia de la página: azul marino casi negro + cian
const NAVY = 'bg-[#050A18]'
const CYAN_BTN =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-5 py-3.5 text-base font-extrabold text-[#04101C] ' +
  'transition-[transform,background-color] duration-200 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:bg-[#67E8F9]'
const GHOST_BTN =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-base font-extrabold text-white ' +
  'transition-[transform,background-color] duration-200 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:bg-white/10'
const FIELD =
  'mt-2 w-full rounded-xl border border-white/15 bg-[#0B1226] px-4 py-3.5 text-base text-white placeholder:text-white/40 ' +
  'focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40'
const LABEL = 'block text-sm font-bold text-white'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-3xl items-center px-4 py-4 sm:px-6">
        <span className="text-lg font-extrabold tracking-tight text-white">
          Rafa Jarillo <span className="text-[#22D3EE]">·</span> Recursos
        </span>
      </div>
    </header>
  )
}

function AccessForm({ onUnlock }) {
  const [values, setValues] = useState({ nombre: '', email: '', telefono: '', tiene: '', tipo: '', consent: false, web: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!values.nombre.trim()) er.nombre = 'Escribe tu nombre.'
    if (!EMAIL_RE.test(values.email.trim())) er.email = 'Escribe un email válido.'
    if (!values.tiene) er.tiene = 'Elige una opción.'
    if (values.tiene === 'si' && !values.tipo) er.tipo = 'Dinos de qué tipo es.'
    if (!values.consent) er.consent = 'Necesitamos tu consentimiento para enviarte los recursos.'
    return er
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) {
      document.querySelector('[data-error="true"]')?.focus()
      return
    }
    if (values.web) return // honeypot: solo lo rellenan los bots
    setSending(true)
    await submitLead({
      nombre: values.nombre.trim(),
      email: values.email.trim(),
      telefono: values.telefono.trim(),
      tiene_negocio: values.tiene === 'si' ? 'si' : 'no',
      tipo_negocio: values.tiene === 'si' ? values.tipo : '',
      consentimiento: 'si',
      recurso: 'biblioteca',
      origen: ORIGEN,
    })
    saveAccess()
    onUnlock()
  }

  const errorText = (key) =>
    errors[key] ? (
      <p id={`err-${key}`} className="mt-1.5 text-sm font-semibold text-[#FCA5A5]">{errors[key]}</p>
    ) : null
  const aria = (key) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `err-${key}` : undefined,
    'data-error': errors[key] ? 'true' : undefined,
  })

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/10 bg-[#0A1124] p-5 sm:p-7">
      <div className="space-y-5">
        <div>
          <label htmlFor="nombre" className={LABEL}>Nombre</label>
          <input id="nombre" name="nombre" type="text" autoComplete="given-name" value={values.nombre} onChange={set('nombre')} className={FIELD} {...aria('nombre')} />
          {errorText('nombre')}
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>Email</label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set('email')} className={FIELD} {...aria('email')} />
          {errorText('email')}
        </div>
        <div>
          <label htmlFor="telefono" className={LABEL}>
            Teléfono <span className="font-medium text-white/50">(opcional)</span>
          </label>
          <input id="telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel" value={values.telefono} onChange={set('telefono')} className={FIELD} />
        </div>

        <fieldset>
          <legend className={LABEL}>¿Tienes un negocio con citas?</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {[
              ['no', 'No'],
              ['si', 'Sí'],
            ].map(([val, label]) => (
              <label
                key={val}
                className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3.5 text-base font-bold transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#22D3EE]/60 ${
                  values.tiene === val ? 'border-[#22D3EE] bg-[#22D3EE]/15 text-[#67E8F9]' : 'border-white/15 bg-[#0B1226] text-white'
                }`}
              >
                <input type="radio" name="tiene_negocio" value={val} checked={values.tiene === val} onChange={set('tiene')} className="sr-only" {...(val === 'no' ? aria('tiene') : {})} />
                {label}
              </label>
            ))}
          </div>
          {errorText('tiene')}
        </fieldset>

        {values.tiene === 'si' && (
          <div>
            <label htmlFor="tipo" className={LABEL}>¿De qué tipo?</label>
            <select id="tipo" name="tipo_negocio" value={values.tipo} onChange={set('tipo')} className={FIELD} {...aria('tipo')}>
              <option value="">Elige una opción</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            {errorText('tipo')}
          </div>
        )}

        {/* Honeypot: oculto para personas */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>Web<input type="text" tabIndex={-1} autoComplete="off" value={values.web} onChange={set('web')} /></label>
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consentimiento"
              checked={values.consent}
              onChange={set('consent')}
              className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-[#22D3EE]"
              {...aria('consent')}
            />
            <span className="text-sm leading-relaxed text-white/80">
              Acepto recibir estos recursos y, si me interesa, información comercial de MedElite IA por email o WhatsApp. Puedo darme de
              baja cuando quiera. Más información en la{' '}
              <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer" className="font-bold text-[#22D3EE] underline underline-offset-2">
                política de privacidad
              </a>
              .
            </span>
          </label>
          {errorText('consent')}
        </div>
      </div>

      <button type="submit" disabled={sending} className={`${CYAN_BTN} mt-7 w-full disabled:opacity-60`}>
        {sending ? 'Enviando…' : 'Ver los recursos'}
      </button>
    </form>
  )
}

function ResourceCard({ r }) {
  const external = r.enlace.startsWith('http')
  return (
    <li className="flex flex-col rounded-2xl border border-white/10 bg-[#0A1124] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-extrabold leading-tight tracking-tight text-white text-balance">{r.nombre}</h3>
        {r.nuevo && (
          <span className="shrink-0 rounded-full bg-[#22D3EE] px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-[#04101C]">Nuevo</span>
        )}
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-white/65">{r.descripcion}</p>
      <a
        href={r.enlace}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`${CYAN_BTN} mt-5 w-full`}
      >
        Abrir recurso <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </li>
  )
}

function Recursos() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    document.title = 'Recursos gratuitos | Rafa Jarillo'
    window.scrollTo(0, 0)
    // Página privada: no se indexa y su canonical es propio
    const robots = document.querySelector('meta[name="robots"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'robots' }))
    robots.content = 'noindex'
    const link = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }))
    link.href = 'https://www.medeliteia.com/recursos'
    setUnlocked(hasAccess())
  }, [])

  const handleUnlock = () => {
    setUnlocked(true)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className={`${NAVY} min-h-screen text-white`}>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <h1 className="text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-balance sm:text-6xl">
          Mis recursos <span className="text-[#22D3EE]">gratuitos</span>
        </h1>

        {unlocked ? (
          <>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Prompts, plantillas y guías para tu negocio. Los más nuevos, primero.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {SORTED_RESOURCES.map((r) => (
                <ResourceCard key={r.id} r={r} />
              ))}
            </ul>

            <section className="mt-14 rounded-2xl border border-[#22D3EE]/40 bg-[#22D3EE]/10 p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-balance sm:text-3xl">
                ¿Tienes un negocio con citas? Escribe <span className="text-[#22D3EE]">PRUEBA</span> y te monto el asistente de WhatsApp gratis 14 días
              </h2>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${CYAN_BTN} sm:flex-1`}>
                  <Instagram size={20} aria-hidden="true" /> Instagram @rafajarillo
                </a>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent('PRUEBA')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${GHOST_BTN} sm:flex-1`}
                >
                  <MessageCircle size={20} aria-hidden="true" /> Escríbeme por WhatsApp
                </a>
              </div>
            </section>
          </>
        ) : (
          <>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Déjame tus datos y accede a toda la biblioteca: prompts, plantillas y guías para tu negocio.
            </p>
            <div className="mt-8">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[#22D3EE]">
                <Lock size={16} aria-hidden="true" /> {SORTED_RESOURCES.length} recursos gratis
              </p>
              <AccessForm onUnlock={handleUnlock} />
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-x-5 gap-y-2 px-4 py-6 text-sm text-white/50 sm:px-6">
          <span>© MedElite IA</span>
          <a href="/aviso-legal" className="underline-offset-2 hover:text-white hover:underline">Aviso legal</a>
          <a href="/politica-privacidad" className="underline-offset-2 hover:text-white hover:underline">Privacidad</a>
          <a href="/politica-cookies" className="underline-offset-2 hover:text-white hover:underline">Cookies</a>
        </div>
      </footer>
    </div>
  )
}

export default Recursos
