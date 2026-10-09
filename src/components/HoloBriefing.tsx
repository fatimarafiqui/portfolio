import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Media } from '../data/missions'
import type { ReactNode } from 'react'
import { SlideContent } from './ArenaCard'
import type { Body } from './ArenaCard'
import { missions } from '../data/missions'
import { play, say, hush } from '../utils/playSound'
import './HoloBriefing.css'

// "Accept the mission": a droid rolls out onto the ground and projects the mission as a transmission, one hologram per
// chapter, over the dimmed map. Step through with the arrows, dots, keys or a swipe; the last step ends the transmission.

const ACCESS_KEY = 'portfolio_access_granted' // the same session flag the project pages use

// Case studies under NDA: locked behind an access code until you have clearance.
function unlockedSlide(b: Body): Body {
  return {
    ...b,
    id: `${b.id}:open`,
    eyebrow: 'Clearance granted',
    name: b.name,
    summary: 'The full case study is still being written up under NDA. This is the briefing for now, and the rest follows soon.',
    code: 'Decrypted',
    project: undefined,
    image: undefined,
    tags: b.tags,
    tagsLabel: 'Skills unlocked',
    links: undefined,
    to: undefined,
  }
}

function Vault({ title, onGranted }: { title: string; onGranted: () => void }) {
  const [code, setCode] = useState('')
  const [denied, setDenied] = useState(false)
  const [shake, setShake] = useState(0)
  const [opening, setOpening] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (code === import.meta.env.VITE_PROJECT_PASSWORD) {
      try { sessionStorage.setItem(ACCESS_KEY, 'true') } catch { /* fine */ }
      play('unlock')
      say('unlock')
      setDenied(false)
      setOpening(true)
      window.setTimeout(onGranted, 900)
    } else {
      setDenied(true)
      play('denied')
      say('denied')
      setShake((n) => n + 1)
      setCode('')
      inputRef.current?.focus()
    }
  }

  return (
    <div className={`vault${opening ? ' is-opening' : ''}`}>
      <div className="vault-seal" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <circle className="vault-ring vault-ring--out" cx="60" cy="60" r="54" />
          <circle className="vault-ring vault-ring--mid" cx="60" cy="60" r="42" />
          <circle className="vault-ring vault-ring--in" cx="60" cy="60" r="30" />
          <path className="vault-ticks" d="M60 4v10M60 106v10M4 60h10M106 60h10M20 20l7 7M93 93l7 7M100 20l-7 7M27 93l-7 7" />
          <g className="vault-lock">
            <path className="vault-shackle" d="M48 56V48a12 12 0 0 1 24 0v8" />
            <rect className="vault-body" x="42" y="56" width="36" height="26" rx="4" />
            <circle className="vault-key" cx="60" cy="67" r="3.4" />
            <rect className="vault-key" x="58.6" y="68" width="2.8" height="8" rx="1" />
          </g>
        </svg>
      </div>

      <span className="vault-tag">Classified · Alliance eyes only</span>
      <h2>{title}</h2>
      <p className="vault-text">
        {opening ? 'Clearance granted. Decrypting the transmission…' : 'This transmission is encrypted. Enter your access code to open it.'}
      </p>

      <form className={`vault-form${denied ? ' is-denied' : ''}`} onSubmit={submit} key={shake}>
        <label className="sr-only" htmlFor="vault-code">Access code</label>
        <input
          id="vault-code"
          ref={inputRef}
          type="password"
          autoComplete="off"
          placeholder="ACCESS CODE"
          value={code}
          onChange={(e) => { setCode(e.target.value); setDenied(false) }}
          disabled={opening}
        />
        <button type="submit" disabled={opening || !code}>Decrypt</button>
      </form>
      <p className="vault-status" role="status">
        {denied ? 'Access denied. The Empire is listening, try again.' : '\u00a0'}
      </p>
    </div>
  )
}

function chaptersFor(b: Body): Body[] {
  const m = missions[b.id]
  if (!m) return [unlockedSlide(b)]
  const n = m.chapters.length
  return m.chapters.map((c, i): Body => ({
    ...b,
    id: `${b.id}:${c.id}`,
    name: c.name,
    label: c.label,
    eyebrow: c.eyebrow,
    summary: c.summary,
    code: `Transmission ${i + 1}/${n}`,
    project: undefined,
    image: c.image,
    facts: c.facts,
    counters: c.counters,
    photos: c.photos,
    tags: c.tags,
    tagsLabel: c.tagsLabel,
    links: c.links,
    media: c.media,
    to: undefined,
    scrollTo: undefined,
  }))
}

export default function HoloBriefing({ body, droid, onClose }: { body: Body; droid: ReactNode; onClose: () => void }) {
  const locked = !missions[body.id]
  const [granted, setGranted] = useState(() => {
    try { return sessionStorage.getItem(ACCESS_KEY) === 'true' } catch { return false }
  })
  const showVault = locked && !granted
  const slides = chaptersFor(body)
  const [i, setI] = useState(0)
  const [seen, setSeen] = useState<number[]>([])
  const s = slides[i]
  const last = i === slides.length - 1
  const swipe = useRef<{ x: number; y: number } | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [zoom, setZoom] = useState<Media | null>(null)
  const finished = last && slides.length > 1

  // sound: the hologram powers up, each new chapter chirps, the last one finishes with a flourish
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; play('holo'); if (!locked) say('holo'); return }
    play(finished ? 'done' : 'chirp')
    if (finished) say('done')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i])

  useEffect(() => hush, [])

  // Esc closes an expanded picture before it closes the transmission
  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      setZoom(null)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [zoom])

  // a chapter earns its star once it has been on screen for a moment
  useEffect(() => {
    const t = window.setTimeout(() => setSeen((v) => (v.includes(i) ? v : [...v, i])), 700)
    return () => window.clearTimeout(t)
  }, [i])

  const go = (d: number) => setI((v) => Math.min(slides.length - 1, Math.max(0, v + d)))

  useEffect(() => {
    if (!showVault) closeRef.current?.focus() // the vault focuses its own code field
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // the map behind listens for drags and the wheel, so the briefing keeps those to itself
  const keep = (e: React.SyntheticEvent) => e.stopPropagation()

  return (
    <div
      className="holo"
      role="dialog"
      aria-label={`${body.name}: transmission`}
      onPointerMove={keep}
      onWheel={keep}
      onPointerDown={(e) => { e.stopPropagation(); swipe.current = { x: e.clientX, y: e.clientY } }}
      onPointerUp={(e) => {
        e.stopPropagation()
        const st = swipe.current
        swipe.current = null
        if (!st) return
        const dx = e.clientX - st.x
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - st.y) * 1.5) go(dx < 0 ? 1 : -1)
      }}
    >
      <div className="holo-scrim" onClick={onClose} aria-hidden="true" />

      <section className={`holo-panel hud hud--${s.theme}`} aria-live="polite">
        <span className="hud-corners" aria-hidden="true" />
        <header className="hud-bar">
          <span className="hud-dot" aria-hidden="true" />
          <span className="hud-code">{showVault ? 'Classified' : s.code}</span>
          <span className={`hud-class${finished ? ' is-complete' : ''}`}>{finished ? 'Transmission complete' : body.name}</span>
          <button className="hud-close" type="button" ref={closeRef} onClick={onClose} aria-label="End transmission">
            &times;
          </button>
        </header>

        {showVault ? (
          <div className="hud-body holo-body">
            <Vault title={body.name} onGranted={() => setGranted(true)} />
          </div>
        ) : (
          <div className="hud-body holo-body" key={s.id}>
            <SlideContent b={s} onZoom={setZoom} />
          </div>
        )}

        {!showVault && (
        <footer className="hud-nav">
          {slides.length > 1 ? (
            <button type="button" className="hud-arrow" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous">&lsaquo;</button>
          ) : <span />}
          <div className="hud-dots" role="tablist" aria-label="Chapters" hidden={slides.length === 1}>
            {slides.map((sl, k) => (
              <button
                key={sl.id}
                type="button"
                role="tab"
                aria-selected={k === i}
                aria-label={sl.label ?? sl.name}
                className={k === i ? 'is-on' : seen.includes(k) ? 'is-seen' : ''}
                onClick={() => setI(k)}
              />
            ))}
          </div>
          {last ? (
            <button type="button" className="holo-end" onClick={onClose}>End</button>
          ) : (
            <button type="button" className="hud-arrow" onClick={() => go(1)} aria-label="Next">&rsaquo;</button>
          )}
        </footer>
        )}
      </section>

      {zoom && (
        <div className="holo-zoom" role="dialog" aria-label={zoom.alt} onClick={() => setZoom(null)}>
          <button type="button" className="holo-zoom-close" aria-label="Close image" onClick={() => setZoom(null)}>&times;</button>
          <div className="holo-zoom-scroll">
            <img src={zoom.src} alt={zoom.alt} onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )}

      <div className="holo-cone" aria-hidden="true">
        <i className="holo-pulse" key={i} />
      </div>
      <div className="holo-droid" aria-hidden="true">
        <div className={`holo-droid-in${finished ? ' is-done' : ''}`} key={`${i}-${finished}`}>{droid}</div>
      </div>
    </div>
  )
}
