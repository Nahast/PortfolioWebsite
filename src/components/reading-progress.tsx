'use client'

import { useEffect, useRef } from 'react'

export default function ReadingProgress() {
  const barRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement
        const max = h.scrollHeight - h.clientHeight
        const pct = max > 0 ? (h.scrollTop / max) * 100 : 0
        if (barRef.current) barRef.current.style.width = pct.toFixed(2) + '%'
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="progress">
      <i ref={barRef} />
    </div>
  )
}
