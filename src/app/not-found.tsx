import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="mono">404 — Page not found</p>
      <h1>Nothing here.</h1>
      <Link href="/" className="full-link mono"><span aria-hidden="true">←</span> Back to portfolio</Link>
    </main>
  )
}
