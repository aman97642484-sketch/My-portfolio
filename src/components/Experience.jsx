import { useEffect, useRef } from 'react'
import './Experience.css'

const ROLE = {
  company: 'Texmith Infotech',
  title: 'Full Stack Developer Intern',
  meta: [
    { label: 'Duration', value: 'August 2025 – November 2025' },
    { label: 'Work mode', value: 'Remote' },
    { label: 'Type', value: 'Paid Internship (90 Days)' },
  ],
}

// Each point is written as JSX so key technologies can be highlighted in place.
const POINTS = [
  <>
    Delivered <mark>production-ready features</mark> across 3 live client
    projects while collaborating with clients and senior developers in an{' '}
    <mark>Agile</mark> workflow.
  </>,
  <>
    Developed <mark>responsive UI components</mark> for EOS Chambers of Law and
    Vidhu Duggal &amp; Co.
  </>,
  <>
    Built dynamic frontend functionality and integrated{' '}
    <mark>third-party APIs</mark> for an AI Smart Business Tool using{' '}
    <mark>React</mark>.
  </>,
  <>
    Worked on <mark>REST APIs</mark> and full-stack development using{' '}
    <mark>React</mark>, <mark>Node.js</mark>, <mark>Express.js</mark> and{' '}
    <mark>MongoDB</mark>.
  </>,
  <>
    Used <mark>Git</mark> and <mark>GitHub</mark> for version control and
    distributed team collaboration.
  </>,
]

function Experience() {
  const sectionRef = useRef(null)

  // Reveal each [data-reveal] element once as it scrolls into view.
  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll('[data-reveal]') ?? []
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="experience__grid" aria-hidden="true" />
      <div className="experience__orb" aria-hidden="true" />
      <span className="experience__numeral" aria-hidden="true">05</span>

      <div className="experience__inner">
        <header className="experience__header">
          <p className="experience__eyebrow" data-reveal>
            <span className="experience__eyebrow-line" />
            Experience
          </p>
          <h2 className="experience__heading">
            <span className="experience__company" data-reveal>
              {ROLE.company}
            </span>
            <span
              className="experience__role"
              data-reveal
              style={{ '--delay': '0.1s' }}
            >
              {ROLE.title}<b>.</b>
            </span>
          </h2>
        </header>

        <dl className="experience__meta" data-reveal style={{ '--delay': '0.1s' }}>
          {ROLE.meta.map(({ label, value }) => (
            <div key={label} className="experience__meta-item">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="experience__body">
          <p className="experience__label" data-reveal>
            Responsibilities &amp; achievements
          </p>

          <ol className="experience__points">
            {POINTS.map((point, index) => (
              <li key={index} className="experience__point" data-reveal>
                <span className="experience__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p>{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Experience
