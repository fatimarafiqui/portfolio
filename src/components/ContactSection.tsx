import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:fatima.rafiqui@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7.5 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/fatimarafiqui/',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/fatimarafiqui',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'Medium',
    href: 'https://fatimarafiqui.medium.com',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
]

// Footer / contact bar shared by the home page and Beyond UX.
export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <footer className="contact" id="contact" ref={ref}>
      <div className="contact-inner">
        <div className="contact-card reveal reveal-up">
          <div className="contact-main">
            <svg className="contact-cup" viewBox="0 0 64 64" aria-hidden="true">
              <path className="contact-steam contact-steam--1" d="M24 22c-3-4 3-6 0-10" />
              <path className="contact-steam contact-steam--2" d="M32 22c-3-4 3-6 0-10" />
              <path className="contact-steam contact-steam--3" d="M40 22c-3-4 3-6 0-10" />
              <path className="contact-mug" d="M16 28h30v10a13 13 0 0 1-13 13h-4A13 13 0 0 1 16 38z" />
              <path className="contact-mug" d="M46 31h3a6 6 0 0 1 0 12h-4" fill="none" />
            </svg>
            <div>
              <p className="contact-eyebrow">Get in touch</p>
              <h2 className="contact-heading">
                Let's talk design, data, or ideas over <em>coffee</em>.
              </h2>
            </div>
          </div>
          <div className="contact-actions">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                className="contact-icon"
                href={link.href}
                aria-label={link.label}
                title={link.label}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="contact-bottom">
          <p className="contact-copy">&copy; 2026 Fatima Rafiqui</p>
          <p className="contact-copy">May the Force be with you.</p>
        </div>
      </div>
    </footer>
  )
}
