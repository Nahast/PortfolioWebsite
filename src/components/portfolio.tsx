'use client'

import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import ReadingProgress from './reading-progress'
import { experience, profile, type CareerRole } from '@/data/profile'

// ── Content ─────────────────────────────────────────────────────────────────
const CONTENT = {
  name: ['Romain', 'Jouffret'],
  about: {
    body: [
      { t: 'I turn complex technology into ' },
      { t: 'products people can use', hl: true },
      { t: '. As co-founder and CPO at ' },
      { t: 'Warp Laboratory', strong: true },
      { t: ', I lead Droplet from concept and architecture to customer pilots. ' },
      { t: 'My 8+ years in software span distributed systems, ML experimentation, and privacy governance, including engineering at Amazon and Kanopy.', muted: true },
    ],
    meta: [
      { k: 'Now', v: 'Co-founder & CPO — Warp Laboratory' },
      { k: 'Building', v: 'Droplet · On-premise AI' },
      { k: 'Based', v: profile.location },
      { k: 'Education', v: 'M.Eng — EPITA' },
    ],
  },
  skills: [
    { idx: '01', head: 'Product leadership', desc: 'Product ownership from concept and architecture through execution and customer pilots.', stack: ['Strategy', 'Product operations', 'Technical leadership'] },
    { idx: '02', head: 'AI & privacy', desc: 'On-premise AI, distributed agent workflows, and ML-driven experimentation.', stack: ['On-premise AI', 'Agents', 'ML experiments'] },
    { idx: '03', head: 'Cloud & systems', desc: 'Distributed workflows, microservices, and reliable content-processing services.', stack: ['AWS Lambda', 'ECS', 'S3'] },
    { idx: '04', head: 'Backend engineering', desc: 'Job systems, business tools, and integrations with third-party APIs.', stack: ['TypeScript', 'Python', 'PHP', 'NestJS'] },
    { idx: '05', head: 'Frontend & platforms', desc: 'Content management tools, caption workflows, and smart TV interfaces.', stack: ['Vue.js', 'Nuxt.js', 'Drupal'] },
    { idx: '06', head: 'DevOps & resilience', desc: 'Deployment improvements, disaster recovery planning, and portal authentication.', stack: ['DevOps', 'Disaster recovery', 'Authentication'] },
    { idx: '07', head: 'Privacy governance', desc: 'Former Amazon Privacy Bar Raiser: security audits, compliance, and secure design mentoring.', stack: ['GDPR', 'Data governance', 'Secure design'] },
    { idx: '08', head: 'Customer delivery', desc: 'Customer pilots, commercial offerings, client projects, and quality assurance.', stack: ['Pilots', 'Commercial strategy', 'QA'] },
  ],
  projects: [
    { num: '01', title: 'Droplet', company: 'Warp Laboratory', year: '2026 — present', desc: 'Leading product for an on-premise AI appliance that brings modern AI to small and medium-sized businesses in regulated industries, with no data leaving their premises.', tags: ['Product strategy', 'On-premise AI', 'Privacy'], outcome: 'From concept to customer pilots', detail: 'Three-year lease offering; pilots in photo, automotive, and real estate.', roleId: 'warp-laboratory' },
    { num: '02', title: 'Internal Applications Portal', company: 'Capital Group', year: '2026', desc: 'Delivered DevOps improvements and disaster recovery planning for the internal applications portal during a senior full stack engineering contract.', tags: ['DevOps', 'Disaster recovery', 'Authentication'], outcome: 'Portal authentication migrated', detail: 'Moved portal authentication to NerveCenter.', roleId: 'capital-group' },
    { num: '03', title: 'Distributed agent workflows', company: 'Amazon', year: '2024 — 2026', desc: 'Automated xBR operational pipelines with distributed agent workflows, improving cross-service data validation accuracy.', tags: ['Agents', 'Distributed systems', 'Automation'], outcome: '4+ hours reclaimed each week', detail: 'Product manager time saved through workflow automation.', roleId: 'amazon' },
    { num: '04', title: 'Marketing & Discoverability', company: 'Amazon', year: '2024 — 2026', desc: 'Built and deployed ML-driven experiments with AWS Lambda, Python, and internal experimentation frameworks for Amazon Private Brands.', tags: ['ML experiments', 'AWS Lambda', 'Python'], outcome: 'Personalization at scale', detail: 'Improved personalization and merchandising for millions of customers.', roleId: 'amazon' },
    { num: '05', title: 'Reliable content ingestion', company: 'Kanopy', year: '2021 — 2024', desc: 'Developed the Lambda job system for external supplier files and upgraded AWS ECS services in TypeScript and NestJS.', tags: ['TypeScript', 'NestJS', 'AWS'], outcome: '98% ingestion success rate', detail: 'ECS upgrades also reduced post-release errors from 2,000+ per day to near zero.', roleId: 'kanopy-2021' },
    { num: '06', title: 'Publishing automation', company: 'Kanopy', year: '2021 — 2024', desc: 'Revamped asset bundling and versioning, automated caption conversion, and synchronized databases with a third-party API.', tags: ['Content operations', 'Nuxt.js', 'API integration'], outcome: '150% more title throughput YoY', detail: 'Caption editing time reduced by 80%; data exports saved the publishing team 4 hours daily.', roleId: 'kanopy-2021' },
  ],
  contact: {
    headline: ["Let's", 'build something', 'useful.'],
    links: [
      { l: 'Email', v: profile.email, href: `mailto:${profile.email}` },
      { l: 'LinkedIn', v: 'in/romainjouffret', href: profile.linkedin },
      { l: 'Résumé', v: 'Download PDF', href: profile.resume, download: true },
      { l: 'Full experience', v: 'All roles & education', href: '/experience/' },
    ],
  },
}

// ── Reveal observer hook ────────────────────────────────────────────────────
function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.18): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!ref.current || seen) return
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSeen(true); io.disconnect() } },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, seen])
  return [ref, seen]
}

// ── Theme ───────────────────────────────────────────────────────────────────
function readTheme() {
  try {
    const saved = localStorage.getItem('rj-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
function subscribeTheme(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener('rj-theme-change', onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener('rj-theme-change', onChange)
  }
}
function useTheme(): [string, (theme: string) => void] {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = readTheme()
  }, [theme])
  return [theme, (nextTheme) => {
    try { localStorage.setItem('rj-theme', nextTheme) } catch {}
    document.documentElement.dataset.theme = nextTheme
    window.dispatchEvent(new Event('rj-theme-change'))
  }]
}

// ── Live clock ──────────────────────────────────────────────────────────────
function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}
function fmtTime(d: Date | null, tz: string) {
  if (!d) return '--:--:--'
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz, hour12: false })
}

// ── Crosshair cursor ────────────────────────────────────────────────────────
function Crosshair() {
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

// ── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  const now = useClock()
  return (
    <nav className="nav">
      <div className="nav-mark mono">
        <span className="dot" />
        <span>RJ — Portfolio / 2026</span>
      </div>
      <div className="nav-clock mono tnum">
        <span><span className="k">LAX</span> {fmtTime(now, 'America/Los_Angeles')}</span>
        <span><span className="k">NYC</span> {fmtTime(now, 'America/New_York')}</span>
      </div>
      <div className="nav-right mono">
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <button className="theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          <span className="sw" />
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </nav>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const [in1, setIn1] = useState(false)
  const [in2, setIn2] = useState(false)
  const [inMark, setInMark] = useState(false)
  useEffect(() => {
    const a = setTimeout(() => setIn1(true), 200)
    const b = setTimeout(() => setIn2(true), 380)
    const c = setTimeout(() => setInMark(true), 1200)
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c) }
  }, [])

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      const y = Math.min(window.scrollY, 800)
      ref.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`
      ref.current.style.opacity = String(1 - Math.min(y / 700, 1) * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="hero">
      <div ref={ref}>
        <div className="hero-tag">
          <div className="a">— Romain Jouffret / Portfolio</div>
          <div className="b">Product &amp; engineering</div>
          <div className="c">Los Angeles, CA</div>
          <div className="d">Building Droplet</div>
        </div>
        <h1 className={'hero-name' + (inMark ? ' in' : '')}>
          <span className="line"><span className={'word' + (in1 ? ' in' : '')}>{CONTENT.name[0]}</span></span>
          <span className="line"><span className={'word' + (in2 ? ' in' : '')}>{CONTENT.name[1]}<span className="accent-mark" /></span></span>
        </h1>
      </div>
      <div className="hero-foot">
        <div className="role">
          <b>{profile.role}</b> at Warp Laboratory. Leading Droplet, an on-premise AI appliance for businesses in regulated industries. Previously Amazon &amp; Kanopy.
        </div>
        <div className="now">
          <a href={profile.resume} download className="resume-link">Download résumé <span aria-hidden="true">↓</span></a>
        </div>
        <div className="scroll">
          <span>Scroll</span>
          <span className="arrow" />
        </div>
      </div>
    </header>
  )
}

// ── Section header ──────────────────────────────────────────────────────────
function SecMeta({ num, label, desc }: { num: string; label: string; desc: string }) {
  return (
    <div className="sec-meta">
      <span className="num">{num}</span>
      <h2 className="lbl">{label}</h2>
      <span className="desc">{desc}</span>
    </div>
  )
}

// ── About ───────────────────────────────────────────────────────────────────
function About() {
  const [ref, seen] = useReveal<HTMLDivElement>(0.2)
  return (
    <section id="about" className="sec about shell">
      <SecMeta num="01" label="About — Product & engineering" desc="Who I am, what I work on, and how I work." />
      <div className="grid-12" ref={ref}>
        <aside className="about-side">
          {CONTENT.about.meta.map((m, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <span className="k">{m.k}</span>
              <span className="v">{m.v}</span>
            </div>
          ))}
        </aside>
        <p className={'about-body reveal' + (seen ? ' in' : '')}>
          {CONTENT.about.body.map((seg, i) => {
            if (seg.hl) return <span key={i} className="hl">{seg.t}</span>
            if (seg.strong) return <b key={i} style={{ fontWeight: 500 }}>{seg.t}</b>
            if (seg.muted) return <span key={i} className="accent">{seg.t}</span>
            return <span key={i}>{seg.t}</span>
          })}
        </p>
      </div>
    </section>
  )
}

// ── Skills ──────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="sec skills shell">
      <SecMeta num="04" label="Expertise — Product to production" desc="Product leadership grounded in hands-on engineering." />
      <div className="skills-grid">
        {CONTENT.skills.map((s, i) => <SkillCell key={s.idx} s={s} delay={i * 60} />)}
      </div>
    </section>
  )
}
function SkillCell({ s, delay }: { s: typeof CONTENT.skills[number]; delay: number }) {
  const [ref, seen] = useReveal<HTMLDivElement>(0.15)
  return (
    <div ref={ref} className={'skill-cell reveal' + (seen ? ' in' : '')} style={{ transitionDelay: seen ? `${delay}ms` : '0ms' }}>
      <div className="idx">— {s.idx}</div>
      <div className="head">{s.head}</div>
      <div className="desc">{s.desc}</div>
      <div className="stack">{s.stack.map((t) => <span key={t}>{t}</span>)}</div>
    </div>
  )
}

// ── Work ────────────────────────────────────────────────────────────────────
function Work() {
  return (
    <section id="work" className="sec work shell">
      <SecMeta num="02" label="Selected work" desc="Current product leadership and selected engineering outcomes." />
      <div className="work-list">
        {CONTENT.projects.map((p, i) => <Project key={p.num} p={p} i={i} />)}
      </div>
    </section>
  )
}

function Project({ p, i }: { p: typeof CONTENT.projects[number]; i: number }) {
  const [ref, seen] = useReveal<HTMLElement>(0.12)
  return (
    <article ref={ref} className={'proj reveal' + (seen ? ' in' : '')} style={{ transitionDelay: seen ? `${i * 80}ms` : '0ms' }}>
      <div className="num">— {p.num}</div>
      <div className="meta">
        <h3 className="ttl">
          <a href={`/experience/#${p.roleId}`}>{p.title}<span className="arrow" aria-hidden="true"> ↗</span></a>
          <span className="yr">{p.year}</span>
        </h3>
        <div className="company">{p.company}</div>
        <p className="desc">{p.desc}</p>
        <div className="tags">{p.tags.map((t) => <span key={t}>· {t}</span>)}</div>
      </div>
      <div className="outcome">
        <p className="outcome-title">{p.outcome}</p>
        <p className="outcome-detail">{p.detail}</p>
      </div>
    </article>
  )
}

// ── Experience ──────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="sec experience shell">
      <SecMeta num="03" label="Experience — Recent roles" desc="From software engineering to company building. Explore the full career below." />
      <div className="grid-12">
        <div className="exp-list">
          {experience.slice(0, 4).map((e, i) => <ExpRow key={i} e={e} i={i} />)}
        </div>
      </div>
      <div className="grid-12" style={{ marginTop: 24 }}>
        <div style={{ gridColumn: '1 / 13', display: 'flex', justifyContent: 'flex-end' }}>
          <a href="/experience/" className="full-link mono">
            View full experience &amp; education <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
function ExpRow({ e, i }: { e: CareerRole; i: number }) {
  const [ref, seen] = useReveal<HTMLDivElement>(0.1)
  return (
    <div ref={ref} className={'exp-row reveal' + (seen ? ' in' : '')} style={{ transitionDelay: seen ? `${i * 50}ms` : '0ms' }}>
      <div className="yrs tnum">{e.yrs}</div>
      <div className="role"><a href={`/experience/#${e.id}`}>{e.role}</a> <span className="co">{e.co}</span></div>
      <div className="scope">{e.scope}</div>
      <div className="loc">{e.loc ?? "Contract"}</div>
    </div>
  )
}

// ── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, seen] = useReveal<HTMLDivElement>(0.2)
  return (
    <section id="contact" className="sec contact shell">
      <SecMeta num="05" label="Contact — Channels" desc="Get in touch about products, AI, and engineering." />
      <div className="grid-12">
        <div className="contact-inner" ref={ref}>
          <h2 className={'reveal' + (seen ? ' in' : '')}>
            {CONTENT.contact.headline[0]}<br />
            {CONTENT.contact.headline[1]}<br />
            <span className="em">{CONTENT.contact.headline[2]}</span>
          </h2>
          <div className="contact-side">
            {CONTENT.contact.links.map((l, i) => (
              <a key={i} href={l.href} download={l.download || undefined}>
                <span>{l.l} <span style={{ color: 'var(--ink-3)', marginLeft: 8 }}>{l.v}</span></span>
                <span className="arr">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const now = useClock()
  return (
    <footer className="footer">
      <div className="a">© {now?.getFullYear() ?? '2026'} — Romain Jouffret</div>
      <div className="b">Product leadership · Software engineering</div>
      <div className="c">{profile.location}</div>
    </footer>
  )
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useTheme()

  return (
    <>
      <ReadingProgress />
      <Crosshair />
      <Nav theme={theme} setTheme={setTheme} />
      <div className="portfolio-frame">
        <main>
          <Hero />
          <About />
          <Work />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
