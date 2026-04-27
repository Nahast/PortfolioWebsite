'use client'

import { useState, useEffect, useRef } from 'react'
import ReadingProgress from './reading-progress'

// ── Content ─────────────────────────────────────────────────────────────────
const CONTENT = {
  name: ['Romain', 'Jouffret'],
  role: 'Software Engineer',
  tagline: 'Shaping the future of AI & data',
  edu: 'M.Eng Computer Science · EPITA',
  location: 'Irvine, CA',
  about: {
    body: [
      { t: 'Software engineer building systems that are ' },
      { t: 'intelligent and lightning-fast', hl: true },
      { t: '. I work across cloud architecture, distributed computing, and ML integration — currently at ' },
      { t: 'Amazon', strong: true },
      { t: ', previously at Kanopy. ' },
      { t: 'I care about correctness under load, scalable design, and shipping software that quietly does its job for millions of customers.', muted: true },
    ],
    meta: [
      { k: 'Now', v: 'SDE II — Amazon' },
      { k: 'Based', v: 'Irvine / Santa Monica, CA' },
      { k: 'Education', v: 'M.Eng CS — EPITA' },
      { k: 'Languages', v: 'English · French (bilingual)' },
    ],
  },
  skills: [
    { idx: '01', head: 'Cloud / AWS', desc: 'Lambda, ECS, S3 — fault-tolerant serverless and containerized services.', stack: ['AWS Lambda', 'ECS', 'S3', 'Docker'] },
    { idx: '02', head: 'Backend services', desc: 'Distributed microservices, job systems, third-party API integrations.', stack: ['TypeScript', 'Nest.js', 'Node', 'Python'] },
    { idx: '03', head: 'ML / AI', desc: 'ML-driven experiments, agent workflows, data pipelines and integration.', stack: ['Python', 'ML pipelines', 'Agents'] },
    { idx: '04', head: 'Frontend / UI', desc: 'Product UIs and operations tooling for media and content platforms.', stack: ['Vue.js', 'Nuxt.js', 'Next.js', 'Django'] },
    { idx: '05', head: 'Languages', desc: 'Production work across web, systems and scripting languages.', stack: ['TS / JS', 'Python', 'C / C++ / C#', 'Java', 'PHP', 'SQL'] },
    { idx: '06', head: 'Tooling', desc: 'Daily-driver workflow, REST APIs, CI/CD and observability stack.', stack: ['Git', 'Docker', 'Jira', 'REST'] },
    { idx: '07', head: 'Practice', desc: 'Privacy Bar Raiser, security audits, GDPR, secure design mentoring.', stack: ['Scrum', 'Agile', 'Privacy'] },
    { idx: '08', head: 'Domains', desc: 'E-commerce, streaming media, content management, telecom.', stack: ['Marketing', 'OTT', 'CMS'] },
  ],
  projects: [
    { num: '01', title: 'xBR Agent Workflows', year: '2024 — present', desc: 'Distributed agent workflows automating xBR operational pipelines at Amazon. Reclaimed 4+ hours of PM bandwidth weekly and improved cross-service data validation accuracy.', tags: ['Agents', 'AWS', 'Distributed'], ph: 'xBR — workflow graph' },
    { num: '02', title: 'Marketing & Discoverability ML', year: '2025', desc: 'ML-driven experiments deployed on AWS Lambda + Python, plugged into internal experimentation frameworks. Personalization and merchandising optimization for millions of customers.', tags: ['ML', 'Lambda', 'Python'], ph: 'Experimentation — ML rollout' },
    { num: '03', title: 'Serverless Ingestion @ Kanopy', year: '2021 — 2024', desc: 'Architected fault-tolerant serverless ingestion in TypeScript (Nest.js) and AWS Lambda. 98% reliability across external supplier content.', tags: ['TypeScript', 'Nest.js', 'Lambda'], ph: 'Ingestion — pipeline diagram' },
    { num: '04', title: 'ECS Containerization', year: '2023', desc: 'Deployed scalable containerized services with Docker + AWS ECS. Reduced system errors from 2,000+/day to near zero post-deployment.', tags: ['ECS', 'Docker', 'Reliability'], ph: 'ECS — service topology' },
    { num: '05', title: 'Captions Automation', year: '2022', desc: 'Automated video captioning pipelines with Nuxt.js, Python and FFmpeg. Cut manual editing time by 80% and streamlined accessibility workflows.', tags: ['Nuxt.js', 'Python', 'FFmpeg'], ph: 'Captions — internal UI' },
    { num: '06', title: 'Asset Versioning Revamp', year: '2024', desc: 'Redesigned versioning and asset management systems. Improved publication throughput by 150% YoY and stabilized the CI/CD release pipeline.', tags: ['Versioning', 'CI/CD', 'Throughput'], ph: 'Bundler — throughput chart' },
  ],
  experience: [
    { yrs: 'Oct 2024 — present', role: 'Software Development Engineer II', co: 'Amazon', scope: 'Distributed agent workflows, ML experimentation, Privacy Bar Raiser.', loc: 'Santa Monica, CA' },
    { yrs: 'Feb 2021 — Oct 2024', role: 'Software Development Engineer I', co: 'Kanopy', scope: 'Serverless ingestion, ECS services, captioning automation, asset versioning.', loc: 'San Francisco, CA' },
    { yrs: 'Oct 2019 — May 2021', role: 'Project Manager', co: 'HeadMind', scope: 'Telecom automation for 4M+ devices; QA, DevOps, and CI/CD frameworks.', loc: 'Paris, FR' },
    { yrs: 'Feb 2018 — Feb 2019', role: 'Backend Software Engineer', co: 'Kanopy', scope: 'PHP / Python / SQL backends, Vue.js apps for Fire TV and smart TVs.', loc: 'San Francisco, CA' },
  ],
  contact: {
    headline: ["Let's", 'build something', 'exact.'],
    links: [
      { l: 'Email', v: 'romain.jouffret31@gmail.com' },
      { l: 'Phone', v: '+1 (949) 430-1149' },
      { l: 'LinkedIn', v: 'in/romainjouffret' },
      { l: 'Full experience', v: 'View — all roles & education ↗', href: '/experience' },
    ],
  },
}

// ── Reveal observer hook ────────────────────────────────────────────────────
function useReveal(threshold = 0.18): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null)
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
function useTheme(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('rj-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('rj-theme', theme)
  }, [theme])
  return [theme, setTheme]
}

// ── Live clock ──────────────────────────────────────────────────────────────
function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}
function fmtTime(d: Date, tz: string) {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz, hour12: false })
}

// ── Crosshair cursor ────────────────────────────────────────────────────────
function Crosshair() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return
    const onMove = (e: MouseEvent) => {
      if (ref.current) ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      setShow(true)
    }
    const onLeave = () => setShow(false)
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
      <div className="hero-grid" />
      <div ref={ref}>
        <div className="hero-tag">
          <div className="a">— Portfolio / 2026.04</div>
          <div className="b">Software Engineer · USA</div>
          <div className="c">Index — 08 sections</div>
          <div className="d">Open to opportunities ↗</div>
        </div>
        <h1 className={'hero-name' + (inMark ? ' in' : '')}>
          <span className="line"><span className={'word' + (in1 ? ' in' : '')}>{CONTENT.name[0]}</span></span>
          <span className="line"><span className={'word' + (in2 ? ' in' : '')}>{CONTENT.name[1]}<span className="accent-mark" /></span></span>
        </h1>
      </div>
      <div className="hero-foot">
        <div className="role">
          <b>{CONTENT.role}</b> — Currently SDE II at Amazon, working on distributed agent workflows and ML experimentation. Previously Kanopy. {CONTENT.edu}.
        </div>
        <div className="now">
          <span className="pulse" /> Available — Q2 2026
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
      <span className="lbl">{label}</span>
      <span className="desc">{desc}</span>
    </div>
  )
}

// ── About ───────────────────────────────────────────────────────────────────
function About() {
  const [ref, seen] = useReveal(0.2)
  return (
    <section id="about" className="sec about shell">
      <SecMeta num="01" label="About — Origin & focus" desc="Who I am, what I work on, and how I work." />
      <div className="grid-12" ref={ref as React.RefObject<HTMLDivElement>}>
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
      <SecMeta num="02" label="Stack — Disciplines" desc="Areas where I ship production work, with current tooling." />
      <div className="skills-grid">
        {CONTENT.skills.map((s, i) => <SkillCell key={s.idx} s={s} delay={i * 60} />)}
      </div>
    </section>
  )
}
function SkillCell({ s, delay }: { s: typeof CONTENT.skills[number]; delay: number }) {
  const [ref, seen] = useReveal(0.15)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={'skill-cell reveal' + (seen ? ' in' : '')} style={{ transitionDelay: seen ? `${delay}ms` : '0ms' }}>
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
      <SecMeta num="03" label="Selected work — 2023 → 2026" desc="A short list. Press any item for detail." />
      <div className="work-list">
        {CONTENT.projects.map((p, i) => <Project key={p.num} p={p} i={i} />)}
      </div>
    </section>
  )
}

function Project({ p, i }: { p: typeof CONTENT.projects[number]; i: number }) {
  const [ref, seen] = useReveal(0.12)
  const previewRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cardEl = ref.current
    const onScroll = () => {
      if (!previewRef.current || !cardEl) return
      const r = cardEl.getBoundingClientRect()
      const center = window.innerHeight / 2
      const offset = (r.top + r.height / 2 - center) * -0.06
      previewRef.current.style.transform = `translate3d(0, ${offset}px, 0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
  return (
    <article ref={ref as React.RefObject<HTMLElement>} className={'proj reveal' + (seen ? ' in' : '')} style={{ transitionDelay: seen ? `${i * 80}ms` : '0ms' }}>
      <div className="num">— {p.num}</div>
      <div className="meta">
        <h3 className="ttl">
          <span>{p.title}</span>
          <span className="yr">{p.year}</span>
          <span className="arrow">↗</span>
        </h3>
        <p className="desc">{p.desc}</p>
        <div className="tags">{p.tags.map((t) => <span key={t}>· {t}</span>)}</div>
      </div>
      <div className="preview" ref={previewRef}>
        <div className="ph">{p.ph}</div>
        <span className="corner tl" /><span className="corner tr" />
        <span className="corner bl" /><span className="corner br" />
      </div>
    </article>
  )
}

// ── Experience ──────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="sec experience shell">
      <SecMeta num="04" label="Experience — Last 4 roles" desc="Most recent work shown here. Full history available on the dedicated page." />
      <div className="grid-12">
        <div className="exp-list">
          {CONTENT.experience.map((e, i) => <ExpRow key={i} e={e} i={i} />)}
        </div>
      </div>
      <div className="grid-12" style={{ marginTop: 24 }}>
        <div style={{ gridColumn: '1 / 13', display: 'flex', justifyContent: 'flex-end' }}>
          <a href="/experience" className="full-link mono">
            View full experience &amp; education <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
function ExpRow({ e, i }: { e: typeof CONTENT.experience[number]; i: number }) {
  const [ref, seen] = useReveal(0.1)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={'exp-row reveal' + (seen ? ' in' : '')} style={{ transitionDelay: seen ? `${i * 50}ms` : '0ms' }}>
      <div className="yrs tnum">{e.yrs}</div>
      <div className="role">{e.role} <span className="co">{e.co}</span></div>
      <div className="scope">{e.scope}</div>
      <div className="loc">{e.loc}</div>
    </div>
  )
}

// ── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, seen] = useReveal(0.2)
  return (
    <section id="contact" className="sec contact shell">
      <SecMeta num="05" label="Contact — Channels" desc="Quickest path is email. I reply within 24h." />
      <div className="grid-12">
        <div className="contact-inner" ref={ref as React.RefObject<HTMLDivElement>}>
          <h2 className={'reveal' + (seen ? ' in' : '')}>
            {CONTENT.contact.headline[0]}<br />
            {CONTENT.contact.headline[1]}<br />
            <span className="em">{CONTENT.contact.headline[2]}</span>
          </h2>
          <div className="contact-side">
            {CONTENT.contact.links.map((l, i) => (
              <a key={i} href={l.href || '#'} onClick={l.href ? undefined : (ev) => ev.preventDefault()}>
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
      <div className="a">© {now.getFullYear()} — Romain Jouffret</div>
      <div className="b">Designed &amp; built in code · No frameworks for the chrome · 2026</div>
      <div className="c tnum">v 2.6.{String(now.getDate()).padStart(2, '0')}</div>
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
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
