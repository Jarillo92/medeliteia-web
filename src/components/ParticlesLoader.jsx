import { lazy, Suspense, useEffect, useState } from 'react'

// Carga diferida del fondo de partículas: solo en pantallas >= 768 px, sin
// prefers-reduced-motion y cuando el navegador está libre (no afecta al LCP).
const ParticlesBackground = lazy(() => import('./ParticlesBackground'))

const QUERY_WIDE = '(min-width: 768px)'
const QUERY_REDUCED = '(prefers-reduced-motion: reduce)'

function ParticlesLoader() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const wide = window.matchMedia(QUERY_WIDE)
    const reduced = window.matchMedia(QUERY_REDUCED)
    let idle = 0
    let timer = 0
    let ready = false

    const sync = () => setEnabled(ready && wide.matches && !reduced.matches)
    const onIdle = () => {
      ready = true
      sync()
    }

    if ('requestIdleCallback' in window) idle = window.requestIdleCallback(onIdle, { timeout: 3000 })
    else timer = window.setTimeout(onIdle, 2000)

    wide.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      if (idle) window.cancelIdleCallback(idle)
      window.clearTimeout(timer)
      wide.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [])

  if (!enabled) return null
  return (
    <Suspense fallback={null}>
      <ParticlesBackground />
    </Suspense>
  )
}

export default ParticlesLoader
