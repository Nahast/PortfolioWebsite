'use client'

import { useState, useEffect, useRef } from 'react'
import ReadingProgress from './reading-progress'

// ── Content ─────────────────────────────────────────────────────────────────
const CONTENT = {
  name: ['Romain', 'Jouffret'],
  role: 'Software Engineer · Founder',
  tagline: 'On-prem AI, instead of the cloud.',
  edu: 'M.Eng Computer Science · EPITA',
  location: 'Costa Mesa, CA',
  about: {
    body: [
      { t: 'Software engineer, founder and CPO at ' },
      { t: 'Warp Lab', strong: true },
      { t: ', building a ' },
      { t: 'private, on-prem AI appliance', hl: true },
      { t: ' that replaces the cloud stack.' },
      { t: ' Previously at ' },
      { t: 'Amazon', strong: true },
      { t: '.' },
    ],
    meta: [
      { k: 'Now', v: 'CPO & Founder — Warp Lab' },
      { k: 'Building', v: 'Replaces cloud stack with an on-prem AI appliance' },
      { k: 'Based', v: 'Costa Mesa, CA' },
      { k: 'Education', v: 'M.Eng CS — EPITA' },
      { k: 'Awards', v:'Second Runner-up in Amazon Private Brands Summer Hackathon' },
    ],
  },
  skills: [
    { idx: '01', head: 'Edge AI', desc: 'Private, on-device AI — built so data never has to leave the box.', stack: ['LLMs', 'Inference', 'Vision'] },
    { idx: '02', head: 'Product & UX', desc: 'Turning a complex hardware + AI stack into something a non-technical user can set up in minutes.', stack: ['Roadmap', 'UX', 'Onboarding'] },
    { idx: '03', head: 'Software', desc: 'Backend services, mobile and web — the full software surface of the product.', stack: ['Backend', 'Mobile', 'Web'] },
    { idx: '04', head: 'Hardware integration', desc: 'Bringing the software up on real boards and steering it toward custom silicon.', stack: ['Edge', 'Networking', 'Custom PCB'] },
    { idx: '05', head: 'Cloud (legacy)', desc: 'Years of fault-tolerant serverless and containerized services from Amazon and Kanopy.', stack: ['AWS', 'Lambda', 'ECS', 'Docker'] },
    { idx: '06', head: 'AI-native engineering', desc: 'Use AI dev tools as a daily driver to ship at lean-team velocity.', stack: ['Claude Code', 'Copilot'] },
    { idx: '07', head: 'Languages', desc: 'Production work across web, systems and scripting languages.', stack: ['TS / JS', 'Python', 'C / C++ / C#', 'Java', 'SQL'] },
    { idx: '08', head: 'Practice', desc: 'Privacy-by-design and security mindset — formerly Privacy Bar Raiser at Amazon.', stack: ['Privacy', 'Security', 'GDPR'] },
  ],
  projects: [
    { num: '01', title: 'Warp Lab — On-prem AI Appliance', year: '2026 — present', desc: 'A single appliance that replaces your router, NAS, and smart-home hub with one private box running everything locally — including an AI assistant that configures the network, manages files, and controls home automation. Working prototype today; custom hardware in progress.', tags: ['Edge AI', 'Privacy', 'Hardware'], ph: 'Warp Lab — on-prem AI appliance' },
    { num: '02', title: 'xBR Agent Workflows', year: '2024 — 2026', desc: 'Distributed agent workflows automating xBR operational pipelines at Amazon. Reclaimed 4+ hours of PM bandwidth weekly and improved cross-service data validation accuracy.', tags: ['Agents', 'AWS', 'Distributed'], ph: 'xBR — workflow graph' },
    { num: '03', title: 'Marketing & Discoverability ML', year: '2025', desc: 'ML-driven experiments deployed on AWS Lambda + Python, plugged into internal experimentation frameworks. Personalization and merchandising optimization for millions of customers.', tags: ['ML', 'Lambda', 'Python'], ph: 'Experimentation — ML rollout' },
    { num: '04', title: 'Serverless Ingestion @ Kanopy', year: '2021 — 2024', desc: 'Architected fault-tolerant serverless ingestion in TypeScript (Nest.js) and AWS Lambda. 98% reliability across external supplier content.', tags: ['TypeScript', 'Nest.js', 'Lambda'], ph: 'Ingestion — pipeline diagram' },
    { num: '05', title: 'ECS Containerization', year: '2023', desc: 'Deployed scalable containerized services with Docker + AWS ECS. Reduced system errors from 2,000+/day to near zero post-deployment.', tags: ['ECS', 'Docker', 'Reliability'], ph: 'ECS — service topology' },
    { num: '06', title: 'Captions Automation', year: '2022', desc: 'Automated video captioning pipelines with Nuxt.js, Python and FFmpeg. Cut manual editing time by 80% and streamlined accessibility workflows.', tags: ['Nuxt.js', 'Python', 'FFmpeg'], ph: 'Captions — internal UI' },
    { num: '07', title: 'Asset Versioning Revamp', year: '2024', desc: 'Redesigned versioning and asset management systems. Improved publication throughput by 150% YoY and stabilized the CI/CD release pipeline.', tags: ['Versioning', 'CI/CD', 'Throughput'], ph: 'Bundler — throughput chart' },
  ],
  experience: [
    { yrs: '2026 — present', role: 'Software Engineer', co: 'Zapier', scope: 'Software engineering on the automation platform; contributing to Warp Lab evenings and weekends.', loc: 'Remote, CA' },
    { yrs: '2026 — present', role: 'CPO & Software Lead', co: 'Warp Lab', scope: 'Building an on-prem AI appliance that privately manages your network, storage, and smart home — keeping data on device instead of in the cloud.', loc: 'Costa Mesa, CA' },
    { yrs: 'Oct 2024 — Mar 2026', role: 'Sr. Software Development Engineer', co: 'Amazon', scope: 'Distributed microservices and ETL on AWS Lambda, ML-driven experiments in SageMaker, Privacy Bar Raiser.', loc: 'Santa Monica, CA' },
    { yrs: 'Feb 2021 — Oct 2024', role: 'Full Stack Engineer', co: 'Kanopy', scope: 'Serverless ingestion, ECS services, captioning automation, asset versioning.', loc: 'San Francisco, CA' },
  ],
  contact: {
    headline: ["Let's", 'build something', 'exact.'],
    links: [
      { l: 'Email', v: 'romain.jouffret31@gmail.com' },
      { l: 'Phone', v: '+1 (949) 430-1149' },
      { l: 'LinkedIn', v: 'in/romainjouffret', href: 'https://www.linkedin.com/in/romainjouffret' },
      { l: 'Full experience', v: 'View — all roles & education ↗', href: '/experience' },
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
function useTheme(): [string, React.Dispatch<React.SetStateAction<string>>, boolean] {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('rj-theme')
    const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(initial)
    setMounted(true)
  }, [])
  useEffect(() => {
    if (!mounted) return
    document.documentElement.dataset.theme = theme
    localStorage.setItem('rj-theme', theme)
  }, [theme, mounted])
  return [theme, setTheme, mounted]
}

// ── Live clock ──────────────────────────────────────────────────────────────
function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}
function fmtTime(d: Date, tz: string) {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz, hour12: false })
}
const TIME_PLACEHOLDER = '--:--:--'

// ── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ theme, setTheme, mounted }: { theme: string; setTheme: (t: string) => void; mounted: boolean }) {
  const now = useClock()
  return (
    <>
      <div className="nav-blur" aria-hidden="true" />
    <nav className="nav">
      <div className="nav-mark mono">
        <span className="dot" />
        <span>RJ — Portfolio / 2026</span>
      </div>
      <div className="nav-clock mono tnum">
        <span><span className="k">LAX</span> {now ? fmtTime(now, 'America/Los_Angeles') : TIME_PLACEHOLDER}</span>
        <span><span className="k">NYC</span> {now ? fmtTime(now, 'America/New_York') : TIME_PLACEHOLDER}</span>
      </div>
      <div className="nav-right mono">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <button className="theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          <span className="sw" />
          <span suppressHydrationWarning>{mounted ? (theme === 'dark' ? 'Dark' : 'Light') : 'Light'}</span>
        </button>
      </div>
    </nav>
    </>
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
          <div className="a">— Portfolio / 2026.04</div>
          <div className="b">Founder · Software Engineer</div>
          <div className="c">Index — 08 sections</div>
          <a href="mailto:romain.jouffret31@gmail.com" className="d">Investor inquiries ↗</a>
        </div>
        <h1 className={'hero-name' + (inMark ? ' in' : '')}>
          <span className="line"><span className={'word' + (in1 ? ' in' : '')}>{CONTENT.name[0]}</span></span>
          <span className="line"><span className={'word' + (in2 ? ' in' : '')}>{CONTENT.name[1]}<span className="accent-mark" /></span></span>
        </h1>
      </div>
      <div className="hero-foot">
        <div className="role">
          <b>{CONTENT.role}</b> — CPO &amp; software lead at <b>Warp Lab</b>, building an on-prem AI appliance that replaces your router, NAS, and smart-home hub with one private box. Day job at <b>Zapier</b>. {CONTENT.edu}.
        </div>
        <div className="now">
          <span className="pulse" /> Building Warp Lab — Q2 2026
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
  const [ref, seen] = useReveal<HTMLDivElement>(0.2)
  return (
    <section id="about" className="sec about shell">
      <SecMeta num="01" label="About — Founder + builder" desc="Who I am, what I work on, and how I work." />
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
            if ('hl' in seg && seg.hl) return <span key={i} className="hl">{seg.t}</span>
            if ('strong' in seg && seg.strong) return <b key={i} style={{ fontWeight: 500 }}>{seg.t}</b>
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
      <SecMeta num="03" label="Selected work — 2021 → 2026" desc="A short list. Press any item for detail." />
      <div className="work-list">
        {CONTENT.projects.map((p, i) => <Project key={p.num} p={p} i={i} />)}
      </div>
    </section>
  )
}

function Project({ p, i }: { p: typeof CONTENT.projects[number]; i: number }) {
  const [ref, seen] = useReveal<HTMLElement>(0.12)
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
    <article ref={ref} className={'proj reveal' + (seen ? ' in' : '')} style={{ transitionDelay: seen ? `${i * 80}ms` : '0ms' }}>
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
  const [ref, seen] = useReveal<HTMLDivElement>(0.1)
  return (
    <div ref={ref} className={'exp-row reveal' + (seen ? ' in' : '')} style={{ transitionDelay: seen ? `${i * 50}ms` : '0ms' }}>
      <div className="yrs tnum">{e.yrs}</div>
      <div className="role">{e.role} <span className="co">{e.co}</span></div>
      <div className="scope">{e.scope}</div>
      <div className="loc">{e.loc}</div>
    </div>
  )
}

// ── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, seen] = useReveal<HTMLDivElement>(0.2)
  return (
    <section id="contact" className="sec contact shell">
      <SecMeta num="05" label="Contact — Channels" desc="Quickest path is email. I reply within 24h." />
      <div className="grid-12">
        <div className="contact-inner" ref={ref}>
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
  const year = now ? now.getFullYear() : 2026
  const day = now ? String(now.getDate()).padStart(2, '0') : '01'
  return (
    <footer className="footer">
      <div className="a" suppressHydrationWarning>© {year} — Romain Jouffret</div>
      <div className="b">Designed &amp; built in code · No frameworks for the chrome · 2026</div>
      <div className="c tnum" suppressHydrationWarning>v 2.6.{day}</div>
    </footer>
  )
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme, mounted] = useTheme()

  return (
    <>
      <ReadingProgress />
      <Nav theme={theme} setTheme={setTheme} mounted={mounted} />
      <div style={{ paddingInline: '20px' }}>
        <main>
          <Hero />
          <About />
          <Skills />
          <Work />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
