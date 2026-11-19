import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight, CalendarCheck, CalendarDays, ClipboardList, Globe, Instagram, LayoutDashboard, Lock,
  MessageCircle, MessagesSquare, Sparkles, Target, Zap,
} from 'lucide-react'
import Particles from './Particles'
import './recursos.css'
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
      <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6">
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

const ICONS = { CalendarCheck, CalendarDays, ClipboardList, Globe, LayoutDashboard, MessageCircle, MessagesSquare, Sparkles, Target, Zap }
const HUES = [
  'linear-gradient(135deg,#0B2A4A,#0A1124 70%)',
  'linear-gradient(135deg,#083344,#0A1124 70%)',
  'linear-gradient(135deg,#12305F,#0A1124 70%)',
  'linear-gradient(135deg,#0B3B46,#0A1124 70%)',
]

// Portada generada: cuadrícula, icono con brillo y la palabra del reel
function Cover({ r, index = 0, small = false }) {
  const Icon = ICONS[r.icono] || Sparkles
  return (
    <div
      className={`rc-cover relative overflow-hidden ${small ? 'h-24 rounded-xl' : 'h-40 rounded-t-2xl'}`}
      style={{ '--rc-bg': HUES[index % HUES.length] }}
      aria-hidden="true"
    >
      <Icon className="absolute -right-4 -top-4 text-[#22D3EE]/10" size={small ? 90 : 150} strokeWidth={1.2} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rc-float flex items-center justify-center rounded-2xl border border-[#22D3EE]/40 bg-[#22D3EE]/15 shadow-[0_0_40px_rgba(34,211,238,0.35)]" style={{ width: small ? 44 : 68, height: small ? 44 : 68 }}>
          <Icon className="text-[#67E8F9]" size={small ? 24 : 34} strokeWidth={2} />
        </div>
      </div>
      {!small && (
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white/80 backdrop-blur-sm">
          {r.tipo}
        </span>
      )}
      {!small && r.palabra && (
        <span className="absolute bottom-3 left-3 rounded-full bg-[#050A18]/70 px-3 py-1 text-xs font-extrabold tracking-wider text-[#22D3EE] backdrop-blur-sm">
          {r.palabra}
        </span>
      )}
    </div>
  )
}

function ResourceCard({ r, index }) {
  const ref = useRef(null)
  const external = r.enlace.startsWith('http')
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const b = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - b.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - b.top}px`)
  }
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { delay: Math.min(index, 8) * 0.05, duration: 0.45, ease: [0.23, 1, 0.32, 1] } }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
    >
      <div ref={ref} onPointerMove={onMove} className="rc-card flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A1124]/90 backdrop-blur-sm">
        <div className="relative">
          <Cover r={r} index={index} />
          {r.nuevo && (
            <span className="absolute right-3 top-3 rounded-full bg-[#22D3EE] px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-[#04101C] shadow-[0_0_20px_rgba(34,211,238,0.6)]">Nuevo</span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl font-extrabold leading-tight tracking-tight text-white text-balance">{r.nombre}</h3>
          <p className="mt-2 flex-1 text-[15px] leading-relaxed text-white/65">{r.descripcion}</p>
          <a href={r.enlace} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`${CYAN_BTN} mt-5 w-full`}>
            Abrir recurso <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.li>
  )
}

// Átomo decorativo que gira despacio detrás del título
function Atom({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className="rc-spin h-full w-full">
        <svg viewBox="-100 -100 200 200" className="h-full w-full" fill="none" stroke="#22D3EE" strokeWidth="0.7">
          {[0, 60, 120].map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <ellipse rx="92" ry="34" opacity="0.5" />
              <circle cx="92" cy="0" r="4" fill="#67E8F9" stroke="none" />
            </g>
          ))}
          <circle r="9" fill="#22D3EE" stroke="none" opacity="0.9" />
          <circle r="18" opacity="0.3" />
        </svg>
      </div>
    </div>
  )
}

function Library() {
  const tipos = useMemo(() => ['Todos', ...new Set(SORTED_RESOURCES.map((r) => r.tipo))], [])
  const [tipo, setTipo] = useState('Todos')
  const list = SORTED_RESOURCES.filter((r) => tipo === 'Todos' || r.tipo === tipo)
  return (
    <>
      <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filtrar por tipo">
        {tipos.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tipo === t}
            onClick={() => setTipo(t)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-extrabold transition-[transform,background-color,color] duration-200 active:scale-[0.97] ${
              tipo === t ? 'border-[#22D3EE] bg-[#22D3EE] text-[#04101C]' : 'border-white/20 bg-white/5 text-white [@media(hover:hover)]:hover:bg-white/10'
            }`}
          >
            {t === 'Todos' ? `Todos · ${SORTED_RESOURCES.length}` : t}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((r, i) => (
            <ResourceCard key={r.id} r={r} index={i} />
          ))}
        </AnimatePresence>
      </ul>
    </>
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
    <div className={`${NAVY} relative min-h-screen overflow-x-clip text-white`}>
      <Particles />
      {/* Brillos de fondo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden="true">
        <div className="rc-drift absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#22D3EE]/20 blur-[90px]" />
        <div className="rc-drift absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#2F6BFF]/25 blur-[100px]" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
          <div className="relative">
            <Atom className="absolute -right-24 -top-16 h-[300px] w-[300px] opacity-40 sm:opacity-70 sm:-right-10 sm:-top-24 sm:h-[460px] sm:w-[460px]" />
            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/40 bg-[#22D3EE]/10 px-3.5 py-1.5 text-sm font-extrabold text-[#67E8F9]">
                <Sparkles size={15} aria-hidden="true" /> {SORTED_RESOURCES.length} recursos · 100 % gratis
              </span>
              <h1 className="mt-5 text-[2.9rem] font-extrabold leading-[1] tracking-[-0.035em] text-balance sm:text-7xl">
                Mis recursos <span className="bg-gradient-to-r from-[#22D3EE] to-[#93C5FD] bg-clip-text text-transparent">gratuitos</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
                {unlocked
                  ? 'Prompts, plantillas y guías para tu negocio. Los más nuevos, primero.'
                  : 'Prompts, plantillas y guías para que tu negocio atienda y venda más. Déjame tus datos y entras a toda la biblioteca.'}
              </p>
            </div>
          </div>

          {unlocked ? (
            <>
              <Library />
              <section className="relative mt-16 overflow-hidden rounded-3xl border border-[#22D3EE]/40 bg-gradient-to-br from-[#22D3EE]/15 to-[#2F6BFF]/10 p-6 sm:p-10">
                <Atom className="absolute -right-16 -top-16 h-56 w-56 opacity-40" />
                <h2 className="relative max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl">
                  ¿Tienes un negocio con citas? Escribe <span className="text-[#22D3EE]">PRUEBA</span> y te monto el asistente de WhatsApp gratis 14 días
                </h2>
                <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${CYAN_BTN} sm:min-w-[260px]`}>
                    <Instagram size={20} aria-hidden="true" /> Instagram @rafajarillo
                  </a>
                  <a href={`${WHATSAPP_URL}?text=${encodeURIComponent('PRUEBA')}`} target="_blank" rel="noopener noreferrer" className={`${GHOST_BTN} sm:min-w-[260px]`}>
                    <MessageCircle size={20} aria-hidden="true" /> Escríbeme por WhatsApp
                  </a>
                </div>
              </section>
            </>
          ) : (
            <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_440px] lg:gap-12">
              {/* Vista previa bloqueada de los recursos */}
              <div className="relative order-2 lg:order-1" aria-hidden="true">
                <div className="grid grid-cols-3 gap-3 blur-[3px] sm:gap-4 lg:grid-cols-2">
                  {SORTED_RESOURCES.slice(0, 6).map((r, i) => (
                    <div key={r.id} className="rc-in overflow-hidden rounded-xl border border-white/10 bg-[#0A1124]" style={{ animationDelay: `${i * 80}ms` }}>
                      <Cover r={r} index={i} small />
                      <div className="p-2.5 sm:p-3">
                        <div className="h-2 w-4/5 rounded bg-white/25" />
                        <div className="mt-2 h-2 w-3/5 rounded bg-white/10" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center gap-2 rounded-full border border-[#22D3EE]/50 bg-[#050A18]/85 px-5 py-3 text-sm font-extrabold text-[#67E8F9] shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                    <Lock size={16} /> Desbloquea los {SORTED_RESOURCES.length} recursos
                  </span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <AccessForm onUnlock={handleUnlock} />
              </div>
            </div>
          )}
        </main>

        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-5xl flex-wrap gap-x-5 gap-y-2 px-4 py-6 text-sm text-white/50 sm:px-6">
            <span>© MedElite IA</span>
            <a href="/aviso-legal" className="underline-offset-2 hover:text-white hover:underline">Aviso legal</a>
            <a href="/politica-privacidad" className="underline-offset-2 hover:text-white hover:underline">Privacidad</a>
            <a href="/politica-cookies" className="underline-offset-2 hover:text-white hover:underline">Cookies</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Recursos
