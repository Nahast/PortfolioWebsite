import './experience.css'
import ReadingProgress from '@/components/reading-progress'

export const metadata = {
  title: 'Romain Jouffret — Full Experience',
  description: 'Complete work and education history of Romain Jouffret.',
}

export default function ExperiencePage() {
  return (
    <>
      <ReadingProgress />
      <main className="page">

        <div className="back-row">
          <a href="/"><span className="arr">←</span> Back to portfolio</a>
          <div className="b">Romain Jouffret — Full experience</div>
          <div className="c">Index — 02 sections</div>
        </div>

        <div className="grid-12">
          <h1 className="page-title">Full<br />experience.</h1>
          <div className="page-sub">
            <span>Complete chronology — work, education, freelance</span>
            <span>13 entries</span>
          </div>
        </div>

        {/* WORK */}
        <section className="full-block">
          <div className="head">
            <span className="num">A.</span>
            <span className="lbl">Work</span>
            <span className="desc">Full work history with detail on responsibilities and outcomes.</span>
          </div>

          <article className="role-card">
            <div className="yrs">10/2024 — Current</div>
            <div className="body">
              <h3 className="ttl">Software Development Engineer II <span className="co">Amazon</span></h3>
              <ul>
                <li>Designed and implemented distributed agent workflows automating xBR operational pipelines, reclaiming 4+ hours of PM bandwidth weekly and improving cross-service data validation accuracy.</li>
                <li>Developed and deployed ML-driven experiments for Marketing &amp; Discoverability using AWS Lambda, Python, and internal experimentation frameworks — enhancing personalization and merchandising optimization for millions of customers.</li>
                <li>Acted as Privacy Bar Raiser, conducting security audits, driving compliance initiatives, and mentoring teams on data governance, GDPR alignment, and secure software design principles.</li>
                <li>Collaborated with cross-functional teams to architect scalable cloud microservices and improve system reliability (SLA 99.99%) under high-traffic workloads.</li>
              </ul>
            </div>
            <div className="meta-side">
              <div><span className="k">Location</span><span className="v">Santa Monica, CA</span></div>
              <div><span className="k">Stack</span><span className="v">AWS · Python · ML · Microservices</span></div>
            </div>
          </article>

          <article className="role-card">
            <div className="yrs">02/2021 — 10/2024</div>
            <div className="body">
              <h3 className="ttl">Software Development Engineer I <span className="co">Kanopy</span></h3>
              <ul>
                <li>Architected fault-tolerant serverless data ingestion systems in TypeScript (Nest.js) and AWS Lambda, achieving 98% reliability processing external supplier content.</li>
                <li>Optimized cloud storage and post-processing pipelines using AWS S3 and ECS, cutting latency and improving file delivery times by &gt;60%.</li>
                <li>Deployed scalable containerized services with Docker and AWS ECS, reducing system errors from 2,000+ per day to near zero post-deployment.</li>
                <li>Automated video captioning pipelines with Nuxt.js, Python and FFmpeg, reducing manual editing time by 80% and streamlining accessibility workflows.</li>
                <li>Engineered API synchronization microservices integrating multiple third-party data sources, improving data throughput and operational efficiency by 4+ hours per user daily.</li>
                <li>Redesigned versioning and asset management systems, improving content publication throughput by 150% YoY and ensuring CI/CD release stability.</li>
              </ul>
            </div>
            <div className="meta-side">
              <div><span className="k">Location</span><span className="v">San Francisco, CA</span></div>
              <div><span className="k">Stack</span><span className="v">TypeScript · Nest.js · Nuxt.js · AWS</span></div>
            </div>
          </article>

          <article className="role-card">
            <div className="yrs">10/2019 — 05/2021</div>
            <div className="body">
              <h3 className="ttl">Project Manager <span className="co">HeadMind</span></h3>
              <ul>
                <li>Oversaw software automation initiatives for a major European telecom operator, orchestrating deployments for 4M+ consumer devices with zero downtime.</li>
                <li>Led Agile development teams across QA, DevOps, and product delivery, driving continuous integration and deployment (CI/CD) improvements.</li>
                <li>Defined quality assurance frameworks, acceptance criteria and process documentation — increasing deployment velocity and test coverage while reducing operational overhead.</li>
              </ul>
            </div>
            <div className="meta-side">
              <div><span className="k">Location</span><span className="v">Paris, France</span></div>
              <div><span className="k">Stack</span><span className="v">Consulting · QA · DevOps</span></div>
            </div>
          </article>

          <article className="role-card">
            <div className="yrs">02/2018 — 02/2019</div>
            <div className="body">
              <h3 className="ttl">Backend Software Engineer <span className="co">Kanopy</span></h3>
              <ul>
                <li>Developed backend systems in PHP, Python and SQL for ERP, billing and analytics, improving data processing efficiency by 20%.</li>
                <li>Modernized legacy architectures with Drupal and RESTful APIs, achieving 15% faster response times and enhanced scalability.</li>
                <li>Directed end-to-end project lifecycles through Agile sprints, code reviews and testing pipelines, resulting in 25% faster delivery times.</li>
                <li>Built cross-platform media applications using TypeScript and Vue.js for Amazon Fire TV and Smart TVs, increasing user engagement by 30% and satisfaction by 40%.</li>
                <li>Served as technical lead for API integration and automation, cutting manual data handling by 20% and strengthening system reliability and observability.</li>
              </ul>
            </div>
            <div className="meta-side">
              <div><span className="k">Location</span><span className="v">San Francisco, CA</span></div>
              <div><span className="k">Stack</span><span className="v">PHP · Python · Vue.js · Drupal</span></div>
            </div>
          </article>

          <article className="role-card">
            <div className="yrs">03/2016 — 01/2018</div>
            <div className="body">
              <h3 className="ttl">Treasurer <span className="co">Cristal — EPITA Junior Co.</span></h3>
              <ul>
                <li>Managed financial operations and software project lifecycles for EPITA&apos;s junior enterprise — coordinating client relations, accounting automation and software delivery.</li>
                <li>Delivered technical workshops and mentorship programs to upskill junior developers in JavaScript, C++ and Agile methodologies.</li>
                <li>Freelance work for students.</li>
              </ul>
            </div>
            <div className="meta-side">
              <div><span className="k">Location</span><span className="v">Paris, France</span></div>
              <div><span className="k">Stack</span><span className="v">JavaScript · C++ · Mentoring</span></div>
            </div>
          </article>

          <article className="role-card">
            <div className="yrs">04/2017 — 12/2017</div>
            <div className="body">
              <h3 className="ttl">Software Engineer Intern <span className="co">Capstone — French Air Force</span></h3>
              <ul>
                <li>Engineered an Augmented Reality visualization platform using C#, Unity and the HoloLens SDK — enabling 3D interactive diagnostics for aircraft engine systems.</li>
                <li>Integrated real-time 3D rendering and data streaming pipelines, establishing the foundation for immersive training simulations used by engineering teams.</li>
              </ul>
            </div>
            <div className="meta-side">
              <div><span className="k">Location</span><span className="v">Paris, France</span></div>
              <div><span className="k">Stack</span><span className="v">C# · Unity · HoloLens · 3D</span></div>
            </div>
          </article>
        </section>

        {/* EDUCATION */}
        <section className="full-block">
          <div className="head">
            <span className="num">B.</span>
            <span className="lbl">Education &amp; Languages</span>
            <span className="desc">Formal training, exchange and spoken languages.</span>
          </div>

          <article className="edu-card">
            <div className="yrs">2013 — 2018</div>
            <div>
              <h3 className="ttl">EPITA — École pour l&apos;Informatique et les Techniques Avancées</h3>
              <p className="scope">Master of Engineering: Multimedia &amp; Information Technology · Minor: Global Economics &amp; Geopolitics.</p>
            </div>
            <div className="loc">Paris, France</div>
          </article>

          <article className="edu-card">
            <div className="yrs">2016</div>
            <div>
              <h3 className="ttl">California State University, Monterey Bay</h3>
              <p className="scope">Academic exchange — semester abroad in California.</p>
            </div>
            <div className="loc">Monterey Bay, CA</div>
          </article>

          <article className="edu-card">
            <div className="yrs">Languages</div>
            <div>
              <h3 className="ttl">French &amp; English</h3>
              <p className="scope">Native / bilingual in both.</p>
            </div>
            <div className="loc">FR · EN</div>
          </article>
        </section>

        <div className="back-row" style={{ marginTop: 80, marginBottom: 0 }}>
          <a href="/"><span className="arr">←</span> Back to portfolio</a>
          <div className="b">Romain Jouffret — © 2026</div>
          <div className="c">romain.jouffret31@gmail.com</div>
        </div>

      </main>
    </>
  )
}
