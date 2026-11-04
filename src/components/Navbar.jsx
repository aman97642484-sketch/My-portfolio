import { useEffect, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const YEAR = new Date().getFullYear()

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      const offset = headerRef.current?.offsetHeight ?? 0
      const top = section.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setActiveId(id)
    setMenuOpen(false)
  }

  const handleClick = (event, id) => {
    event.preventDefault()
    scrollToSection(id)
  }

  // Highlight the link whose section is currently in view.
  useEffect(() => {
    const onScroll = () => {
      const offset = (headerRef.current?.offsetHeight ?? 0) + 80
      let current = NAV_LINKS[0].id
      for (const { id } of NAV_LINKS) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= offset) {
          current = id
        }
      }
      setActiveId(current)
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape (returning focus to the toggle),
  // when the viewport grows to desktop, or on a click outside the header.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        headerRef.current?.querySelector('.navbar__toggle')?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    const mq = window.matchMedia('(min-width: 861px)')
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    mq.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      mq.removeEventListener('change', onChange)
    }
  }, [menuOpen])

  return (
    <header
      className={`navbar${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`}
      ref={headerRef}
    >
      <nav className="navbar__inner" aria-label="Main navigation">
        <a
          href="#home"
          className="navbar__logo"
          aria-label="Aman Dubey, back to top"
          onClick={(e) => handleClick(e, 'home')}
        >
          <span className="navbar__mark" aria-hidden="true">AD</span>
          <span className="navbar__brand">
            <span className="navbar__name">
              Aman<em> Dubey</em>
            </span>
            <span className="navbar__tagline">Portfolio &mdash; {YEAR}</span>
          </span>
        </a>

        <ul id="navbar-menu" className={`navbar__menu${menuOpen ? ' is-open' : ''}`}>
          {NAV_LINKS.map(({ id, label }, index) => (
            <li key={id} style={{ '--i': index }}>
              <a
                href={`#${id}`}
                className={`navbar__link${activeId === id ? ' is-active' : ''}`}
                aria-current={activeId === id ? 'true' : undefined}
                onClick={(e) => handleClick(e, id)}
              >
                <span className="navbar__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="navbar__label">{label}</span>
              </a>
            </li>
          ))}
          <li className="navbar__cta-item" style={{ '--i': NAV_LINKS.length }}>
            <a
              href="#contact"
              className="navbar__cta"
              onClick={(e) => handleClick(e, 'contact')}
            >
              <span>Let&apos;s Talk</span>
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
                <path
                  d="M3 13 13 3M5 3h8v8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </a>
          </li>
        </ul>

        <div className="navbar__controls">
          <ThemeToggle />
          <button
            type="button"
            className={`navbar__toggle${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="navbar-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
