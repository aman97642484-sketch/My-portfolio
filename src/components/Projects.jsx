import { useEffect, useRef } from 'react'
import './Projects.css'

const PROJECTS = [
  {
    title: 'PrepVerse',
    subtitle: 'AI-Powered Placement Preparation Platform',
    category: 'Full-Stack MERN / AI Integration',
    status: 'Development complete; deployment in progress',
    description:
      'An AI-driven placement-preparation platform that brings coding practice, mock interviews, resume screening and aptitude assessment together in a single student dashboard.',
    listLabel: 'Key features',
    highlights: [
      'Personalized learning paths',
      'Adaptive mock interviews',
      'ATS-based resume analysis',
      'Performance analytics',
    ],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'AI/ML Integration'],
  },
  {
    title: 'EOS Chambers of Law',
    subtitle: 'Live Client Website',
    category: 'Professional Client Project',
    status: 'Live',
    description:
      'Worked on frontend development and delivery of a live law-firm website during my internship at Texmith Infotech.',
    listLabel: 'Key contributions',
    highlights: [
      'Developed and shipped frontend features',
      'Built responsive layouts for desktop and mobile',
      'Improved layout consistency and usability',
    ],
    stack: ['React.js', 'HTML', 'CSS', 'JavaScript'],
    link: { href: 'https://eoschambersoflaw.com/', label: 'Visit website' },
  },
  {
    title: 'School Management Website',
    subtitle: 'Admin dashboard with role-based access',
    category: 'Full-Stack MERN Application',
    description:
      'Developed a school management website with an admin dashboard and role-based authentication.',
    listLabel: 'Key features',
    highlights: [
      'Admin dashboard',
      'Role-based access control',
      'Inquiry and contact forms',
      'Backend data handling and storage',
    ],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
  },
]

function Projects() {
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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects__grid" aria-hidden="true" />
      <div className="projects__orb" aria-hidden="true" />
      <span className="projects__numeral" aria-hidden="true">04</span>

      <div className="projects__inner">
        <header className="projects__header">
          <p className="projects__eyebrow" data-reveal>
            <span className="projects__eyebrow-line" />
            Projects
          </p>
          <h2 className="projects__title">
            <span className="projects__title-line" data-reveal>Selected</span>
            <span className="projects__title-line projects__title-line--indent" data-reveal style={{ '--delay': '0.1s' }}>
              work
            </span>
            <span className="projects__title-line" data-reveal style={{ '--delay': '0.2s' }}>
              <em>&amp;</em> builds<b>.</b>
            </span>
          </h2>
        </header>

        <ol className="projects__list">
          {PROJECTS.map((project, index) => {
            const number = String(index + 1).padStart(2, '0')
            return (
              <li key={project.title} className="project" data-reveal>
                <aside className="project__side">
                  <span className="project__number" aria-hidden="true">{number}</span>
                  <p className="project__category">{project.category}</p>
                  {project.status && (
                    <p className="project__status">
                      <span className="project__status-dot" aria-hidden="true" />
                      {project.status}
                    </p>
                  )}
                </aside>

                <article className="project__main">
                  <h3 className="project__name">{project.title}</h3>
                  <p className="project__subtitle">{project.subtitle}</p>
                  <p className="project__description">{project.description}</p>

                  <div className="project__details">
                    <h4 className="project__label">{project.listLabel}</h4>
                    <ul className="project__highlights">
                      {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project__details">
                    <h4 className="project__label">Tech stack</h4>
                    <ul className="project__stack">
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>

                  {project.link && (
                    <a
                      className="project__link"
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{project.link.label}</span>
                      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
                        <path
                          d="M3 13 13 3M5 3h8v8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="square"
                        />
                      </svg>
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  )}
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Projects
