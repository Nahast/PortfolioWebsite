'use client'

import { useEffect, useRef, useState } from 'react'

export default function Crosshair() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const showRef = useRef(false)
  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return
    const onMove = (e: MouseEvent) => {
      if (ref.current) ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      // Native cursor takes over on interactive elements (see .cursor.hide in globals.css).
      ref.current?.classList.toggle('hide', !!(e.target as Element | null)?.closest?.('a, button, input, [role="switch"]'))
      if (!showRef.current) { showRef.current = true; setShow(true) }
    }
    const onLeave = () => { showRef.current = false; setShow(false) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])
  return <div ref={ref} className={'cursor' + (show ? ' show' : '')} />
}
