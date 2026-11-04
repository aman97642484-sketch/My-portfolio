import { useEffect, useRef } from 'react'
import './Skills.css'

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    note: 'Interfaces that feel considered.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Bootstrap', 'Three.js'],
  },
  {
    category: 'Backend',
    note: 'Logic, APIs and secure access.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
  },
  {
    category: 'Database',
    note: 'Where the data lives.',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    category: 'Programming',
    note: 'Fundamentals and problem solving.',
    skills: ['C++'],
  },
  {
    category: 'Tools',
    note: 'The daily workbench.',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
]

function Skills() {
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
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills__grid" aria-hidden="true" />
      <div className="skills__orb" aria-hidden="true" />
      <span className="skills__numeral" aria-hidden="true">03</span>

      <div className="skills__inner">
        <header className="skills__header">
          <p className="skills__eyebrow" data-reveal>
            <span className="skills__eyebrow-line" />
            Skills
          </p>
          <h2 className="skills__title">
            <span className="skills__title-line" data-reveal>What I</span>
            <span className="skills__title-line skills__title-line--indent" data-reveal style={{ '--delay': '0.1s' }}>
              build
            </span>
            <span className="skills__title-line" data-reveal style={{ '--delay': '0.2s' }}>
              with<em>.</em>
            </span>
          </h2>
        </header>

        <ol className="skills__groups">
          {SKILL_GROUPS.map(({ category, note, skills }, index) => (
            <li
              key={category}
              className="skills__group"
              data-reveal
              style={{ '--delay': '0.05s' }}
            >
              <div className="skills__meta">
                <span className="skills__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="skills__category">{category}</h3>
                <p className="skills__note">{note}</p>
              </div>

              <ul className="skills__list" aria-label={`${category} skills`}>
                {skills.map((skill) => (
                  <li key={skill} className="skills__item">
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Skills
