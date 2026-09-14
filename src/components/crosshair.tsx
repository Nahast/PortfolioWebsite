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
