import { useEffect, useRef } from 'react'

// Fondo de partículas: un único canvas fijo detrás del contenido, sin librerías.
// Colores de marca (accent y accent.bright de tailwind.config.js).
const COUNT = 70
const LINK_DIST = 130
const ATTRACT_DIST = 200
const MAX_SPEED = 0.35
const COLORS = ['91,140,255', '156,187,255']

// Opacidad objetivo por sección; por defecto, DEFAULT_ALPHA.
const DEFAULT_ALPHA = 0.6
const SECTION_ALPHA = [
  ['#hero', 0],
  ['#contacto', 0],
  ['footer', 0],
  ['#como-funciona', 0.35],
  ['#sectores', 0.35],
  ['#proceso', 0.35],
]

function ParticlesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let alpha = 0
    let target = 0
    const mouse = { x: -9999, y: -9999 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const rand = (a, b) => a + Math.random() * (b - a)
    const dots = Array.from({ length: COUNT }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-MAX_SPEED, MAX_SPEED),
      vy: rand(-MAX_SPEED, MAX_SPEED),
      r: rand(1, 2.2),
      c: COLORS[Math.random() < 0.5 ? 0 : 1],
    }))

    const frame = () => {
      alpha += (target - alpha) * 0.06
      ctx.clearRect(0, 0, w, h)
      if (alpha > 0.005) {
        for (const p of dots) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d = Math.hypot(dx, dy)
          if (d < ATTRACT_DIST && d > 1) {
            const f = (1 - d / ATTRACT_DIST) * 0.012
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
          const s = Math.hypot(p.vx, p.vy)
          if (s > MAX_SPEED * 1.6) {
            p.vx *= 0.97
            p.vy *= 0.97
          }
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        ctx.lineWidth = 1
        for (let i = 0; i < dots.length; i++) {
          const a = dots[i]
          for (let j = i + 1; j < dots.length; j++) {
            const b = dots[j]
            const d = Math.hypot(a.x - b.x, a.y - b.y)
            if (d < LINK_DIST) {
              ctx.strokeStyle = `rgba(${a.c},${(1 - d / LINK_DIST) * 0.5 * alpha})`
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
        for (const p of dots) {
          ctx.fillStyle = `rgba(${p.c},${0.8 * alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || document.hidden) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // Opacidad según la sección que cruza el centro de la pantalla
    const active = new Map()
    const updateTarget = () => {
      let t = DEFAULT_ALPHA
      active.forEach((value, el) => {
        if (value.hit) t = value.alpha
        else if (!el.isConnected) active.delete(el)
      })
      target = t
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) active.get(e.target).hit = e.isIntersecting
        updateTarget()
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const [selector, a] of SECTION_ALPHA) {
      const el = document.querySelector(selector)
      if (!el) continue
      active.set(el, { alpha: a, hit: false })
      io.observe(el)
    }
    updateTarget()

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: -1 }}
    />
  )
}

export default ParticlesBackground
