import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectThumb from './ProjectThumb'
import type { Project } from '../data/projects'

// The card that opens when you tap something in Play mode. Each kind of stop gets its own Star Wars dressing: a mission
// briefing for projects, a pilot file for About, a holonet log for Beyond UX and a comlink for Contact.

export type Body = {
  id: string
  name: string
  eyebrow: string
  summary: string
  x: number
  size: number
  theme: string
  code: string // the HUD header, e.g. "MISSION 01"
  classification: string // the small tag beside it
  image?: { src: string; fit?: 'cover' | 'contain'; bg?: string; position?: string }
  project?: Project // projects show their product picture (laptop, monitor, phone) instead of a plain image
  projectIndex?: number
  reward?: string // the toast shown the first time you open this stop
  facts?: { label: string; value: string }[]
  counters?: { value: string; label: string }[]
  photos?: { src: string; alt: string }[]
  tags?: string[]
  tagsLabel?: string
  to?: string
  cta?: string
  links?: { label: string; href: string; channel: string }[]
  scrollTo?: string
}

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Types the text out like an incoming transmission. Screen readers get the full text straight away.
function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(() => (reduced() ? text.length : 0))

  useEffect(() => {
    if (reduced()) return
    setN(0)
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          window.clearInterval(id)
          return v
        }
        return v + 2
      })
    }, 16)
    return () => window.clearInterval(id)
  }, [text])

  return (
    <p className="hud-text">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, n)}
        {n < text.length && <i className="hud-caret" />}
      </span>
    </p>
  )
}

// "30+" counts up from zero; anything non-numeric is shown as is.
function Counter({ value }: { value: string }) {
  const target = parseInt(value, 10)
  const suffix = value.replace(/^\d+/, '')
  const [n, setN] = useState(() => (reduced() || Number.isNaN(target) ? target : 0))

  useEffect(() => {
    if (reduced() || Number.isNaN(target)) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900)
      setN(Math.round(target * (1 - (1 - t) ** 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])

  return Number.isNaN(target) ? <>{value}</> : <>{n}{suffix}</>
}

export default function ArenaCard({ body, onClose, onScroll }: { body: Body; onClose: () => void; onScroll: (id: string) => void }) {
  const b = body
  return (
    <aside className={`arena-card hud hud--${b.theme}`} aria-live="polite" key={b.id}>
      <span className="hud-corners" aria-hidden="true" />
      <header className="hud-bar">
        <span className="hud-dot" aria-hidden="true" />
        <span className="hud-code">{b.code}</span>
        <span className="hud-class">{b.classification}</span>
        <button className="hud-close" type="button" onClick={onClose} aria-label="Close">
          &times;
        </button>
      </header>

      <div className="hud-body">
        {b.project && (
          <figure className="hud-figure hud-figure--product">
            <ProjectThumb project={b.project} index={b.projectIndex ?? 0} className="hud-thumb" />
            <i className="hud-sweep" aria-hidden="true" />
          </figure>
        )}

        {b.image && (
          <figure className={`hud-figure hud-figure--${b.image.fit ?? 'cover'}`} style={b.image.bg ? { background: b.image.bg } : undefined}>
            <img src={b.image.src} alt="" style={b.image.position ? { objectPosition: b.image.position } : undefined} />
            <i className="hud-sweep" aria-hidden="true" />
          </figure>
        )}

        <span className="hud-eyebrow">{b.eyebrow}</span>
        <h2>{b.name}</h2>
        <Typewriter text={b.summary} />

        {b.facts && (
          <dl className="hud-facts">
            {b.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {b.counters && (
          <ul className="hud-counters">
            {b.counters.map((c) => (
              <li key={c.label}>
                <strong><Counter value={c.value} /></strong>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
        )}

        {b.photos && (
          <div className="hud-photos">
            {b.photos.map((p, i) => (
              <img key={p.src} src={p.src} alt={p.alt} style={{ transform: `rotate(${[-3, 2, -2][i % 3]}deg)` }} />
            ))}
          </div>
        )}

        {b.tags && (
          <div className="hud-tags">
            <span>{b.tagsLabel ?? 'Skills unlocked'}</span>
            <ul>
              {b.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {b.links && (
          <div className="hud-comlink">
            <div className="hud-signal" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="hud-channels">
              {b.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <small>{l.channel}</small>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {b.to && (
          <Link className="arena-card-cta hud-cta" to={b.to}>
            {b.cta} <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
        {b.scrollTo && (
          <button className="arena-card-cta hud-cta" type="button" onClick={() => onScroll(b.scrollTo!)}>
            {b.cta} <span aria-hidden="true">&rarr;</span>
          </button>
        )}
      </div>
    </aside>
  )
}
