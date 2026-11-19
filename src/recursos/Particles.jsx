import { useEffect, useRef } from 'react'

// Átomos de fondo (como en la home) en cian y blanco. Un canvas fijo, sin librerías.
// En móvil, menos partículas; con prefers-reduced-motion no se pinta.
const COLORS = ['34,211,238', '186,236,250']

function Particles() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    const mouse = { x: -9999, y: -9999 }
    const rand = (a, b) => a + Math.random() * (b - a)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const count = w < 768 ? 36 : 75
    const link = w < 768 ? 105 : 140
    const dots = Array.from({ length: count }, () => ({
      x: rand(0, w), y: rand(0, h), vx: rand(-0.3, 0.3), vy: rand(-0.3, 0.3), r: rand(1, 2.4), c: COLORS[Math.random() < 0.6 ? 0 : 1],
    }))

    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of dots) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d = Math.hypot(dx, dy)
        if (d < 200 && d > 1) {
          p.vx += (dx / d) * (1 - d / 200) * 0.012
          p.vy += (dy / d) * (1 - d / 200) * 0.012
        }
        if (Math.hypot(p.vx, p.vy) > 0.55) { p.vx *= 0.97; p.vy *= 0.97 }
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      ctx.lineWidth = 1
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const d = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y)
          if (d < link) {
            ctx.strokeStyle = `rgba(${dots[i].c},${(1 - d / link) * 0.4})`
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
          }
        }
      }
      for (const p of dots) {
        ctx.fillStyle = `rgba(${p.c},0.85)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(frame)
    }
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 h-full w-full" style={{ zIndex: 0 }} />
}

export default Particles
