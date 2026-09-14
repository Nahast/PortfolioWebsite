// Career facts from Romain_Jouffret_Resume_v10.pdf.
// Shared by the portfolio and full experience page to keep both in sync.
export const profile = {
  name: 'Romain Jouffret',
  role: 'Co-founder & Chief Product Officer',
  location: 'Los Angeles, CA',
  email: 'romain.jouffret31@gmail.com',
  linkedin: 'https://www.linkedin.com/in/romainjouffret',
  resume: '/uploads/Romain_Jouffret_Resume_v10.pdf',
  description: 'Romain Jouffret is co-founder and Chief Product Officer at Warp Laboratory, leading Droplet, an on-premise AI appliance. Former Amazon engineer and Privacy Bar Raiser, based in Los Angeles.',
}

export type CareerRole = {
  id: string
  yrs: string
  role: string
  co: string
  loc?: string
  team?: string
  scope: string
  focus: string
  details: string[]
}

export const experience: CareerRole[] = [
  {
    id: 'warp-laboratory',
    yrs: 'Mar 2026 — present',
    role: 'Co-founder & Chief Product Officer',
    co: 'Warp Laboratory, Inc.',
    loc: 'Newport Beach, CA',
    scope: 'Leading Droplet from product strategy and architecture to customer pilots.',
    focus: 'Product strategy · On-premise AI · Customer pilots',
    details: [
      'Lead product strategy and execution for Droplet, an on-premise AI appliance for small and medium-sized businesses in regulated industries, including legal, healthcare, financial services, automotive, and real estate.',
      'Designed the product around a fully on-premise deployment model, giving customers modern AI capabilities with no data leaving their premises.',
      'Structured the offering as a three-year lease and launched customer pilots across the photo, automotive, and real estate verticals.',
    ],
  },
  {
    id: 'capital-group',
    yrs: 'Feb 2026 — Apr 2026',
    role: 'Senior Full Stack Engineer (Contract)',
    co: 'Capital Group',
    team: 'Internal Applications Portal',
    scope: 'Internal portal DevOps, disaster recovery planning, and authentication migration.',
    focus: 'DevOps · Disaster recovery · Authentication',
    details: [
      'Delivered DevOps improvements for the internal applications portal, including disaster recovery planning.',
      'Migrated portal authentication to NerveCenter.',
    ],
  },
  {
    id: 'amazon',
    yrs: 'Oct 2024 — Mar 2026',
    role: 'Software Development Engineer II',
    co: 'Amazon',
    loc: 'Santa Monica, CA',
    team: 'Amazon Private Brands · Marketing & Discoverability',
    scope: 'Distributed agent workflows, ML experimentation, and privacy governance.',
    focus: 'AWS Lambda · Python · ML · Privacy',
    details: [
      'Designed and implemented distributed agent workflows automating xBR operational pipelines, reclaiming 4+ hours of product manager bandwidth per week and improving cross-service data validation accuracy.',
      'Built and deployed ML-driven experiments for Marketing & Discoverability using AWS Lambda, Python, and internal experimentation frameworks, improving personalization and merchandising for millions of customers.',
      'Served as Privacy Bar Raiser: conducted security audits, drove compliance initiatives, and mentored teams on data governance, GDPR alignment, and secure software design.',
      'Partnered with cross-functional teams to architect scalable cloud microservices and improve reliability to a 99.99% SLA under high-traffic workloads.',
    ],
  },
  {
    id: 'kanopy-2021',
    yrs: 'Feb 2021 — Nov 2024',
    role: 'Software Engineer I',
    co: 'Kanopy',
    loc: 'Irvine, CA',
    scope: 'Content ingestion, reliable cloud services, and publishing automation.',
    focus: 'TypeScript · NestJS · Nuxt.js · AWS',
    details: [
      'Led development of new features for the Lambda job system in TypeScript and NestJS, achieving a 98% success rate ingesting external supplier files into the Content Management System.',
      'Upgraded and deployed scalable AWS ECS container services in TypeScript and NestJS, reducing post-release errors from 2,000+ per day to near zero.',
      'Revamped the asset bundling and versioning system, accelerating throughput of published titles by 150% year over year.',
      'Engineered a service to sync databases with a third-party API, saving the publishing team 4 hours per day on data exports.',
      'Automated caption format conversion with ccconverter and Nuxt.js, reducing editing time by 80%.',
      'Added an AWS S3 post-processing pipeline that accelerated file availability on the platform.',
    ],
  },
  {
    id: 'headmind',
    yrs: 'Oct 2019 — May 2021',
    role: 'Digital Business Application Consultant',
    co: 'HeadMind Partners',
    loc: 'Paris, France',
    scope: 'Telecom automation, quality assurance, and CMS deployments.',
    focus: 'Telecom · CMS · QA · Deployment',
    details: [
      'Managed automation projects for Electronic Program Guides at a major French telecom operator, ensuring timely and safe deployments to 4M+ consumer set-top boxes.',
      'Led acceptance, quality assurance, and deployment phases for Content Management System releases.',
      'Created acceptance processes and documented QC software and Excel tooling used by management teams.',
    ],
  },
  {
    id: 'kanopy-2018',
    yrs: 'Feb 2018 — Feb 2019',
    role: 'Back End Software Engineer',
    co: 'Kanopy',
    loc: 'San Francisco, CA',
    scope: 'Business tools, smart TV applications, and API integrations.',
    focus: 'PHP · Drupal · TypeScript · Vue.js',
    details: [
      'Built and supported PHP business tools for accounting, ERP integration, billing and invoicing, data analysis, and reporting; managed modernization of the PHP and Drupal architecture.',
      'Created a TypeScript and Vue.js web application for Amazon Fire TV and smart TVs, implementing the complete user interface.',
      'Served as technical lead for third-party API integrations, including Xero, and data-processing automation; supervised test processes and phases.',
    ],
  },
  {
    id: 'imerys',
    yrs: 'Aug 2016 — Jan 2017',
    role: 'Software Engineering Trainee',
    co: 'Imerys',
    loc: 'San Jose, CA',
    scope: 'Project database automation and embedded electronics prototyping.',
    focus: 'Web applications · Cloud · Embedded electronics',
    details: [
      'Designed and developed a web application automating project databases from treatment through reporting, using cloud technologies for document sharing; prototyped embedded electronics for filtration systems.',
    ],
  },
  {
    id: 'airbus',
    yrs: 'Jul 2015 — Aug 2015',
    role: 'Software Engineering Intern',
    co: 'Airbus Defence and Space (Space Systems, Inc.)',
    team: 'Optimization and Payload Telecom Management Products',
    scope: 'Optimization and payload telecom management products.',
    focus: 'Software engineering · Telecom',
    details: [],
  },
]

export const leadership: CareerRole[] = [
  {
    id: 'cristal',
    yrs: 'Apr 2016 — Jan 2018',
    role: 'Treasurer, Board Member & Commercial Engineer',
    co: 'Association Cristal',
    loc: 'Paris, France',
    scope: 'Client projects, commercial delivery, and financial accountability.',
    focus: 'Client relations · Project delivery · Finance',
    details: [
      'Created, negotiated, and delivered projects for external clients, including training, customer service, and project guidance; held financial accountability for the organization as treasurer.',
    ],
  },
]

export const education = [
  { yrs: '2013 — 2018', school: 'EPITA, Ingénierie Informatique', qualification: 'Master of Engineering (M.Eng.), Multimedia and Information Technology', loc: 'Paris, France' },
  { yrs: '2015', school: 'California State University, Monterey Bay', qualification: 'Computer Science', loc: 'Monterey Bay, CA' },
]

export const languages = 'French (native) · English (native or bilingual) · Spanish (elementary)'
