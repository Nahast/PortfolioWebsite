'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type TweakValues = Record<string, string | number | boolean>

// ── useTweaks ────────────────────────────────────────────────────────────────

export function useTweaks<T extends TweakValues>(
  defaults: T
): [T, (key: keyof T, value: T[keyof T]) => void] {
  const [values, setValues] = useState<T>(defaults)
  const setTweak = useCallback((key: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }, [])
  return [values, setTweak]
}

// ── TweaksPanel ──────────────────────────────────────────────────────────────

export function TweaksPanel({ title = 'Tweaks', children }: { title?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef({ x: 16, y: 16 })
  const PAD = 16

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current
    if (!panel) return
    const w = panel.offsetWidth
    const h = panel.offsetHeight
    offsetRef.current = {
      x: Math.min(Math.max(PAD, window.innerWidth - w - PAD), Math.max(PAD, offsetRef.current.x)),
      y: Math.min(Math.max(PAD, window.innerHeight - h - PAD), Math.max(PAD, offsetRef.current.y)),
    }
    panel.style.right = offsetRef.current.x + 'px'
    panel.style.bottom = offsetRef.current.y + 'px'
  }, [])

  useEffect(() => {
    if (!open) return
    clampToViewport()
    const ro = new ResizeObserver(clampToViewport)
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [open, clampToViewport])

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const t = e?.data?.type
      if (t === '__activate_edit_mode') setOpen(true)
      else if (t === '__deactivate_edit_mode') setOpen(false)
    }
    // Press T (when no input focused) to toggle tweaks
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName
      if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('message', onMsg)
    window.addEventListener('keydown', onKey)
    window.parent.postMessage({ type: '__edit_mode_available' }, '*')
    return () => {
      window.removeEventListener('message', onMsg)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const dismiss = () => {
    setOpen(false)
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*')
  }

  const onDragStart = (e: React.MouseEvent) => {
    const panel = dragRef.current
    if (!panel) return
    const r = panel.getBoundingClientRect()
    const sx = e.clientX
    const sy = e.clientY
    const startRight = window.innerWidth - r.right
    const startBottom = window.innerHeight - r.bottom
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      }
      clampToViewport()
    }
    const up = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  if (!open) return null

  return (
    <div ref={dragRef} className="twk-panel" style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
      <div className="twk-hd" onMouseDown={onDragStart}>
        <b>{title}</b>
        <button className="twk-x" aria-label="Close tweaks" onMouseDown={(e) => e.stopPropagation()} onClick={dismiss}>✕</button>
      </div>
      <div className="twk-body">{children}</div>
    </div>
  )
}

// ── Layout helpers ────────────────────────────────────────────────────────────

export function TweakSection({ label }: { label: string }) {
  return <div className="twk-sect">{label}</div>
}

function TweakRow({ label, value, children, inline = false }: {
  label: string; value?: string | number; children: React.ReactNode; inline?: boolean
}) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  )
}

// ── Controls ──────────────────────────────────────────────────────────────────

export function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }: {
  label: string; value: number; min?: number; max?: number; step?: number; unit?: string; onChange: (v: number) => void
}) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  )
}

export function TweakToggle({ label, value, onChange }: {
  label: string; value: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
        role="switch" aria-checked={value} onClick={() => onChange(!value)}>
        <i />
      </button>
    </div>
  )
}

export function TweakRadio({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef(value)
  valueRef.current = value
  const n = options.length
  const idx = Math.max(0, options.indexOf(value))

  const segAt = (clientX: number) => {
    const r = trackRef.current!.getBoundingClientRect()
    const i = Math.floor(((clientX - r.left - 2) / (r.width - 4)) * n)
    return options[Math.max(0, Math.min(n - 1, i))]
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const v0 = segAt(e.clientX)
    if (v0 !== valueRef.current) onChange(v0)
    const move = (ev: PointerEvent) => {
      if (!trackRef.current) return
      const v = segAt(ev.clientX)
      if (v !== valueRef.current) onChange(v)
    }
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown} className="twk-seg">
        <div className="twk-seg-thumb"
          style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`, width: `calc((100% - 4px) / ${n})` }} />
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={o === value}>{o}</button>
        ))}
      </div>
    </TweakRow>
  )
}

export function TweakColor({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <input type="color" className="twk-swatch" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
