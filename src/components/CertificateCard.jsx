import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Certificado de formación: miniatura que se abre ampliada en un modal accesible
// (Esc cierra, el foco queda atrapado y vuelve al botón al cerrar).
function CertificateCard() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const trigger = triggerRef.current
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      } else if (e.key === 'Tab') {
        const items = dialogRef.current?.querySelectorAll(FOCUSABLE)
        if (!items || items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <div className="relative mt-8 flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-surface/60 p-4 shadow-soft sm:flex-row sm:items-center sm:p-5">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ampliar el certificado de MKT Hackers"
          className="group shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] transition-transform duration-200 ease-out active:scale-[0.98]"
        >
          <img
            src="/certificado-mkthackers-thumb.webp"
            alt="Certificado de MKT Hackers que acredita a Rafa como experto en creación e implementación de agentes de IA"
            width="320"
            height="226"
            loading="lazy"
            className="block h-auto w-full sm:w-[200px]"
          />
        </button>
        <div>
          <p className="text-[15px] font-semibold text-ink">Experto/a en creación e implementación de agentes de IA · MKT Hackers</p>
          <p className="mt-1 text-[14px] text-muted">Formación: «Crea tu propia Agencia de IA»</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-3 text-[14px] font-semibold text-accent underline decoration-accent/40 hover:decoration-accent"
          >
            Ver certificado ampliado
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Certificado de MKT Hackers"
            className="relative max-h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar certificado"
              className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.15] bg-raised text-ink shadow-lift"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <img
              src="/certificado-mkthackers.webp"
              alt="Certificado de MKT Hackers: experto en creación e implementación de agentes de IA, formación «Crea tu propia Agencia de IA»"
              width="1600"
              height="1131"
              className="mx-auto max-h-[88vh] w-auto max-w-full rounded-xl bg-white object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CertificateCard
