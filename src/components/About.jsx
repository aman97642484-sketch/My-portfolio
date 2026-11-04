import { useEffect, useRef } from 'react'
import './About.css'

const EDUCATION = {
  degree: 'B.Tech Computer Science Engineering',
  institute: 'Shivajirao Kadam Institute of Technology & Management',
  years: '2023–2027',
  cgpa: '7.93',
}

const HIGHLIGHTS = [
  {
    title: 'Full Stack Development',
    text: 'Interfaces, APIs and databases, built end to end.',
  },
  {
    title: 'Problem Solving',
    text: 'Breaking hard problems into clear, working solutions.',
  },
  {
    title: 'Continuous Learning',
    text: 'Always picking up the next tool, pattern or idea.',
  },
]

function About() {
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
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__grid" aria-hidden="true" />
      <div className="about__orb" aria-hidden="true" />
      <span className="about__numeral" aria-hidden="true">02</span>

      <div className="about__inner">
        <header className="about__header">
          <p className="about__eyebrow" data-reveal>
            <span className="about__eyebrow-line" />
            About
          </p>
          <h2 className="about__title">
            <span className="about__title-line" data-reveal>A little</span>
            <span className="about__title-line about__title-line--indent" data-reveal style={{ '--delay': '0.1s' }}>
              about
            </span>
            <span className="about__title-line" data-reveal style={{ '--delay': '0.2s' }}>
              <em>me</em><b>.</b>
            </span>
          </h2>
        </header>

        <div className="about__body">
          <p className="about__intro" data-reveal>
            I&apos;m Aman Dubey, a final-year Computer Science Engineering student
            passionate about <mark>full-stack development</mark>,{' '}
            <mark>problem solving</mark> and building meaningful digital products.
          </p>

          <dl className="about__education" data-reveal style={{ '--delay': '0.1s' }}>
            <div className="about__edu-head">
              <dt>Education</dt>
              <dd>{EDUCATION.years}</dd>
            </div>
            <div className="about__edu-main">
              <dt className="visually-hidden">Degree</dt>
              <dd className="about__degree">{EDUCATION.degree}</dd>
              <dt className="visually-hidden">Institute</dt>
              <dd className="about__institute">{EDUCATION.institute}</dd>
            </div>
            <div className="about__cgpa">
              <dt>CGPA</dt>
              <dd>{EDUCATION.cgpa}</dd>
            </div>
          </dl>
        </div>

        <ol className="about__highlights">
          {HIGHLIGHTS.map(({ title, text }, index) => (
            <li
              key={title}
              className="about__highlight"
              data-reveal
              style={{ '--delay': `${index * 0.12}s` }}
            >
              <span className="about__highlight-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default About
