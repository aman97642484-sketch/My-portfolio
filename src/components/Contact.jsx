import { useEffect, useRef } from 'react'
import './Contact.css'

const CONTACT = {
  name: 'Aman Dubey',
  email: 'aman97642484@gmail.com',
  phone: '+91-7772885110',
  location: 'Madhya Pradesh, India',
  linkedin: 'https://linkedin.com/in/amandubey1',
  github: 'https://github.com/aman97642484-sketch',
}

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
]

function Contact() {
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

  // No backend is configured: the form opens the visitor's email app instead.
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = data.get('subject')
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`
    window.location.href =
      `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__grid" aria-hidden="true" />
      <div className="contact__orb" aria-hidden="true" />
      <span className="contact__numeral" aria-hidden="true">06</span>

      <div className="contact__inner">
        <header className="contact__header">
          <p className="contact__eyebrow" data-reveal>
            <span className="contact__eyebrow-line" />
            Contact
          </p>
          <h2 className="contact__title">
            <span className="contact__title-line" data-reveal>Let&apos;s build</span>
            <span
              className="contact__title-line contact__title-line--indent"
              data-reveal
              style={{ '--delay': '0.1s' }}
            >
              something
            </span>
            <span className="contact__title-line" data-reveal style={{ '--delay': '0.2s' }}>
              <em>great</em><b>.</b>
            </span>
          </h2>
        </header>

        <div className="contact__details" data-reveal>
          <a className="contact__email" href={`mailto:${CONTACT.email}`}>
            <span className="contact__email-label">Email me</span>
            <span className="contact__email-address">{CONTACT.email}</span>
          </a>

          <dl className="contact__meta">
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${CONTACT.phone.replace(/-/g, '')}`}>{CONTACT.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{CONTACT.location}</dd>
            </div>
          </dl>

          <ul className="contact__socials">
            <li>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                GitHub
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <form
          className="contact__form"
          onSubmit={handleSubmit}
          data-reveal
          style={{ '--delay': '0.1s' }}
        >
          <h3 className="contact__form-title">Send a message</h3>

          {FIELDS.map(({ name, label, type, autoComplete }) => (
            <div key={name} className="contact__field">
              <label htmlFor={`contact-${name}`}>{label}</label>
              <input
                id={`contact-${name}`}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required
              />
            </div>
          ))}

          <div className="contact__field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="5" required />
          </div>

          <button type="submit" className="contact__submit">
            <span>Send message</span>
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
              <path
                d="M3 13 13 3M5 3h8v8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <p className="contact__note">
            Backend integration isn&apos;t configured yet. Sending opens your
            email app with this message ready to send to {CONTACT.email}.
          </p>
        </form>

        <p className="contact__closing" data-reveal>
          Have an idea, an opportunity or a project in mind? I&apos;d love to
          hear about it &mdash; <mark>let&apos;s make it real.</mark>
        </p>
      </div>

      <footer className="contact__footer">
        <p>&copy; 2026 {CONTACT.name}. All rights reserved.</p>
        <p>Designed &amp; built with React.</p>
      </footer>
    </section>
  )
}

export default Contact
