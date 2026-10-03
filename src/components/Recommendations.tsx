import { useRef } from 'react'
import { testimonials } from '../data/testimonials'
import { useReveal } from '../hooks/useReveal'
import { renderRich } from '../utils/richText'

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

// "Their Words, Not Mine." - short pull-quotes from LinkedIn recommendations.
export default function Recommendations() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section className="testimonials" ref={ref}>
      <div className="section-header reveal reveal-up">
        <span className="section-eyebrow">RECOMMENDATIONS</span>
        <h2 className="section-title">Their Words, Not Mine.</h2>
      </div>
      <div className="testimonials-featured">
        {testimonials.filter((t) => t.featured).map((t, i) => (
          <blockquote className={`quote-card quote-card--featured reveal reveal-up delay-${i + 1}`} key={t.name}>
            <p className="quote-text">{renderRich(t.quote)}</p>
            <footer className="quote-author">
              <span className="quote-avatar" aria-hidden="true">
                {t.avatar ? <img src={t.avatar} alt="" /> : initials(t.name)}
              </span>
              <span className="quote-info">
                <strong>{t.name}</strong>
                <span>{[t.role, t.company].filter(Boolean).join(', ')}</span>
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
      <div className="testimonials-grid">
        {testimonials.filter((t) => !t.featured).map((t, i) => (
          <blockquote className={`quote-card reveal reveal-up delay-${i + 1}`} key={t.name}>
            <p className="quote-text">{renderRich(t.quote)}</p>
            <footer className="quote-author">
              <span className="quote-avatar" aria-hidden="true">
                {t.avatar ? <img src={t.avatar} alt="" /> : initials(t.name)}
              </span>
              <span className="quote-info">
                <strong>{t.name}</strong>
                <span>{[t.role, t.company].filter(Boolean).join(', ')}</span>
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
      <a
        className="testimonials-link reveal reveal-up"
        href="https://www.linkedin.com/in/fatimarafiqui/details/recommendations/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read all recommendations on LinkedIn →
      </a>
    </section>
  )
}
