import type { Metadata } from 'next'
import Link from 'next/link'
import './experience.css'
import ReadingProgress from '@/components/reading-progress'
import { education, experience, languages, leadership, profile, type CareerRole } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Romain Jouffret — Experience & Leadership',
  description: 'The career of Romain Jouffret: co-founder and CPO at Warp Laboratory, with engineering experience at Capital Group, Amazon, and Kanopy. Leadership and education included.',
}

function RoleCard({ entry }: { entry: CareerRole }) {
  return (
    <article className="role-card" id={entry.id}>
      <div className="yrs">{entry.yrs}</div>
      <div className="body">
        <h3 className="ttl">{entry.role} <span className="co">{entry.co}</span></h3>
        {entry.team && <p className="team">{entry.team}</p>}
        {entry.details.length > 0 && (
          <ul>{entry.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
        )}
      </div>
      <div className="meta-side">
        {entry.loc && <div><span className="k">Location</span><span className="v">{entry.loc}</span></div>}
        <div><span className="k">Focus</span><span className="v">{entry.focus}</span></div>
      </div>
    </article>
  )
}

export default function ExperiencePage() {
  return (
    <>
      <ReadingProgress />
      <main className="page">
        <div className="back-row">
          <Link href="/"><span className="arr">←</span> Back to portfolio</Link>
          <div className="b">Romain Jouffret — Full experience</div>
          <a className="resume-download" href={profile.resume} download>Download résumé (PDF) ↓</a>
        </div>

        <div className="grid-12">
          <h1 className="page-title">Full<br />experience.</h1>
          <div className="page-sub">
            <span>Product leadership, software engineering, and company building.</span>
            <span>{experience.length} roles · {leadership.length} leadership role · {education.length} education entries</span>
          </div>
        </div>

        <nav className="experience-index" aria-label="Experience sections">
          <a href="#work">Work <span>{String(experience.length).padStart(2, '0')}</span></a>
          <a href="#leadership">Leadership <span>{String(leadership.length).padStart(2, '0')}</span></a>
          <a href="#education">Education &amp; languages</a>
        </nav>

        <section className="full-block" id="work" aria-labelledby="work-heading">
          <div className="head">
            <span className="num">A.</span>
            <h2 className="lbl" id="work-heading">Work</h2>
            <span className="desc">Professional roles, most recent first.</span>
          </div>
          {experience.map(entry => <RoleCard key={entry.id} entry={entry} />)}
        </section>

        <section className="full-block" id="leadership" aria-labelledby="leadership-heading">
          <div className="head">
            <span className="num">B.</span>
            <h2 className="lbl" id="leadership-heading">Leadership</h2>
            <span className="desc">Client delivery and organizational responsibility.</span>
          </div>
          {leadership.map(entry => <RoleCard key={entry.id} entry={entry} />)}
        </section>

        <section className="full-block" id="education" aria-labelledby="education-heading">
          <div className="head">
            <span className="num">C.</span>
            <h2 className="lbl" id="education-heading">Education &amp; languages</h2>
            <span className="desc">Formal training and spoken languages.</span>
          </div>
          {education.map(entry => (
            <article className="edu-card" key={entry.school}>
              <div className="yrs">{entry.yrs}</div>
              <div>
                <h3 className="ttl">{entry.school}</h3>
                <p className="scope">{entry.qualification}</p>
              </div>
              <div className="loc">{entry.loc}</div>
            </article>
          ))}
          <article className="edu-card">
            <div className="yrs">Languages</div>
            <div>
              <h3 className="ttl">French, English &amp; Spanish</h3>
              <p className="scope">{languages}</p>
            </div>
            <div className="loc">FR · EN · ES</div>
          </article>
        </section>

        <div className="back-row experience-footer">
          <Link href="/"><span className="arr">←</span> Back to portfolio</Link>
          <div className="b">Romain Jouffret</div>
          <a className="email-link" href={`mailto:${profile.email}`}>Email Romain ↗</a>
        </div>
      </main>
    </>
  )
}
