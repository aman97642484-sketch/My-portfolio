import { useEffect, useRef, useState } from 'react'
import profileImage from '../assets/image/profile.png'
import './Hero.css'

const GITHUB_URL = 'https://github.com/aman97642484-sketch'
const LINKEDIN_URL = 'https://linkedin.com/in/amandubey1'

// "Full Stack Developer" is always on screen as the headline identity,
// so the typewriter cycles through the roles that complement it.
const ROLES = ['MERN Developer', 'Problem Solver']
const TYPE_SPEED = 80
const DELETE_SPEED = 40
const HOLD_TIME = 1600

function scrollToSection(id) {
  const section = document.getElementById(id)
  if (!section) return
  const navbar = document.querySelector('.navbar')
  const top =
    section.getBoundingClientRect().top + window.scrollY - (navbar?.offsetHeight ?? 0)
  window.scrollTo({ top, behavior: 'smooth' })
}

const YEAR_SHORT = String(new Date().getFullYear()).slice(2)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useTypewriter(words) {
  const [text, setText] = useState(() => (prefersReducedMotion() ? words[0] : ''))

  useEffect(() => {
    if (prefersReducedMotion()) return

    let wordIndex = 0
    let charCount = 0
    let deleting = false
    let timer

    const tick = () => {
      const word = words[wordIndex]
      charCount += deleting ? -1 : 1
      setText(word.slice(0, charCount))

      let delay = deleting ? DELETE_SPEED : TYPE_SPEED
      if (!deleting && charCount === word.length) {
        deleting = true
        delay = HOLD_TIME
      } else if (deleting && charCount === 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
        delay = 400
      }
      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words])

  return text
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
      <path
        d="M3 13 13 3M5 3h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

function Hero() {
  const sectionRef = useRef(null)
  const role = useTypewriter(ROLES)

  // Write the pointer position straight to CSS variables so moving the mouse
  // never triggers a React re-render.
  const handlePointerMove = (event) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
    el.style.setProperty('--glow-opacity', '1')
  }

  const handlePointerLeave = () => {
    sectionRef.current?.style.setProperty('--glow-opacity', '0')
  }

  return (
    <section
      id="home"
      className="hero"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero__columns" aria-hidden="true" />
      <div className="hero__orb" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner">
        <header className="hero__masthead">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-line" />
            Hi, I&apos;m
          </p>
          <h1 className="hero__name">
            <span className="hero__name-word">Aman</span>{' '}
            <span className="hero__name-word hero__name-word--last">
              Dubey<b>.</b>
            </span>
          </h1>
        </header>

        <div className="hero__content">
          <p className="hero__identity">Full Stack Developer</p>

          <p className="hero__role" aria-label={ROLES.join(', ')}>
            <span className="hero__role-prefix">/</span>
            <span aria-hidden="true">{role}</span>
            <span className="hero__caret" aria-hidden="true" />
          </p>

          <p className="hero__intro">
            I&apos;m a Full Stack MERN Developer who turns ideas into fast, polished
            products &mdash; from pixel-level interfaces to the APIs and databases
            that power them.
          </p>

          <div className="hero__actions">
            <a
              href="#projects"
              className="hero__btn hero__btn--primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('projects')
              }}
            >
              View Projects <span className="hero__btn-arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="#contact"
              className="hero__btn hero__btn--ghost"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact')
              }}
            >
              Let&apos;s Talk
            </a>
          </div>

          <ul className="hero__socials">
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
              >
                GitHub <ExternalArrow />
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in a new tab)"
              >
                LinkedIn <ExternalArrow />
              </a>
            </li>
          </ul>
        </div>

        <figure className="hero__figure">
          <div className="hero__frame">
            <img src={profileImage} alt="Aman Dubey - Full Stack Developer" />
          </div>
          <figcaption className="hero__caption">
            <span className="hero__caption-index" aria-hidden="true">01</span>
            <span>Aman Dubey</span>
            <span>MERN &mdash; Portfolio &rsquo;{YEAR_SHORT}</span>
          </figcaption>
        </figure>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}

export default Hero
