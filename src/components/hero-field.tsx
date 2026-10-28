'use client'

import { useEffect, useRef } from 'react'

// Flow-field background for the hero. Each particle drifts along a slowly evolving
// angle field with inertia, and keeps a short trail of points. The oldest points are
// dropped as it moves (and faster once it dies), so traces fade out instead of piling up.

const TRAIL = 84 // points kept per particle
const BUCKETS = 4 // alpha steps from tail to head
const QUIET_ALPHA = [0.06, 0.16, 0.3, 0.5]
const LIME_ALPHA = [0.15, 0.35, 0.6, 0.95]

type Particle = { x: number; y: number; vx: number; vy: number; life: number; lime: boolean; pts: number[] }

// Smooth layered-sine field; low frequencies and slow time drift give long, fluid curves.
function angleAt(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.0021 + t * 0.07) * 1.6 +
    Math.cos(y * 0.0026 - t * 0.06) * 1.6 +
    Math.sin((x + y) * 0.0014 + t * 0.045) * 1.2 +
    Math.cos((x - y) * 0.0019 - t * 0.035)
  )
}

export default function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const hero = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !hero || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, last = 0, t = 0, frame = 0
    let particles: Particle[] = []
    const ptr = { x: 0, y: 0, on: false }
    let colors = { quiet: '', lime: '' }

    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      colors = { quiet: s.getPropertyValue('--ink-3').trim(), lime: s.getPropertyValue('--accent').trim() }
    }

    const spawn = (p: Partial<Particle> = {}): Particle => ({
      x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0,
      life: 220 + Math.random() * 300, lime: Math.random() < 0.09, pts: [], ...p,
    })

    const resize = () => {
      const r = hero.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(170, Math.round((w * h) / 7000))
      // Stagger lives so the field is populated, not all-new, on first paint.
      particles = Array.from({ length: n }, () => spawn({ life: Math.random() * 300 }))
    }

    const step = (k: number) => {
      t += k / 60
      frame++
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (p.life > 0) {
          const a = angleAt(p.x, p.y, t)
          p.vx += (Math.cos(a) * 1.5 - p.vx) * 0.045 * k
          p.vy += (Math.sin(a) * 1.5 - p.vy) * 0.045 * k
          if (ptr.on) {
            // Soft swirl around the pointer: tangential push plus a gentle repel.
            const dx = p.x - ptr.x, dy = p.y - ptr.y, d = Math.hypot(dx, dy)
            if (d < 220 && d > 1) {
              const f = (1 - d / 220) ** 2
              p.vx += ((-dy / d) * 0.22 + (dx / d) * 0.12) * f * k
              p.vy += ((dx / d) * 0.22 + (dy / d) * 0.12) * f * k
            }
          }
          p.x += p.vx * k; p.y += p.vy * k
          p.life -= k
          if (p.x < -20 || p.y < -20 || p.x > w + 20 || p.y > h + 20) p.life = 0
          if (frame % 2 === 0) p.pts.push(p.x, p.y)
          if (p.pts.length > TRAIL * 2) p.pts.splice(0, 2)
        } else {
          // Dead: let the tail catch up with the head until nothing is left, then respawn.
          p.pts.splice(0, 4)
          if (p.pts.length < 4) particles[i] = spawn()
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ;([['quiet', QUIET_ALPHA], ['lime', LIME_ALPHA]] as const).forEach(([kind, alphas]) => {
        const paths = Array.from({ length: BUCKETS }, () => new Path2D())
        for (const p of particles) {
          if ((kind === 'lime') !== p.lime) continue
          const n = p.pts.length / 2
          for (let i = 0; i < n - 1; i++) {
            const path = paths[Math.min(BUCKETS - 1, Math.floor((i * BUCKETS) / (n - 1)))]
            path.moveTo(p.pts[i * 2], p.pts[i * 2 + 1])
            path.lineTo(p.pts[i * 2 + 2], p.pts[i * 2 + 3])
          }
        }
        ctx.strokeStyle = colors[kind]
        ctx.lineWidth = kind === 'lime' ? 1.4 : 1
        ctx.lineCap = 'round'
        paths.forEach((path, b) => { ctx.globalAlpha = alphas[b]; ctx.stroke(path) })
      })
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      const k = Math.min((now - last) / 16.67, 3) // normalise to 60fps, cap after tab stalls
      last = now
      step(k)
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => { if (!raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(loop) } }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    readColors()
    resize()
    if (reduced) { for (let i = 0; i < 200; i++) step(1); draw() }

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect()
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top
      ptr.on = ptr.y >= 0 && ptr.y <= r.height
    }
    const onLeave = () => { ptr.on = false }
    const onVisibility = () => (document.hidden ? stop() : start())

    const ro = new ResizeObserver(() => { resize(); if (reduced) { for (let i = 0; i < 200; i++) step(1); draw() } })
    ro.observe(hero)
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()))
    io.observe(hero)
    const mo = new MutationObserver(() => { readColors(); if (reduced) draw() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop(); ro.disconnect(); io.disconnect(); mo.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />
}
