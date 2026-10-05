import { useCallback, useEffect, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import { projects } from '../data/projects'
import AtAtScene from './AtAtScene'
import ArenaCard from './ArenaCard'
import type { Body } from './ArenaCard'
import './GalaxyArena.css'

// Play mode: an AT-AT crosses a moonlit ridge, and along the ground in front of it sits a row of small props you drag
// sideways: one per project, plus Beyond UX, About and Contact. Tapping one opens a themed card (see ArenaCard).

const WORLD = { w: 1850, h: 182 }
const BASELINE = 150 // props stand on this line; labels hang below it

const projectBodies: Body[] = projects.map((p, i) => ({
  id: p.id,
  name: p.title,
  eyebrow: p.category,
  summary: p.summary,
  tags: p.tags,
  tagsLabel: 'Skills unlocked',
  x: [400, 660, 930, 1190][i] ?? 600,
  size: [100, 88, 100, 100][i] ?? 100,
  theme: ['dbt', 'copilot', 'clover', 'maps'][i] ?? 'dbt',
  code: `Mission 0${i + 1}`,
  classification: 'Briefing',
  project: p,
  projectIndex: i,
  reward: 'Mission accepted',
  facts: [
    { label: 'Pilot', value: 'Fatima Rafiqui' },
    { label: 'Role', value: p.role },
    ...(p.timeline ? [{ label: 'Stardate', value: p.timeline }] : []),
  ],
  to: p.href,
  cta: 'Accept the mission',
}))

const bodies: Body[] = [
  ...projectBodies,
  {
    id: 'beyond',
    name: 'Beyond UX',
    eyebrow: 'Talks, writing, Star Wars',
    summary: 'The parts of the work that happen off the canvas: speaking on stages, writing it down, and a little more Star Wars.',
    x: 1450,
    size: 104,
    theme: 'beyond',
    reward: 'Holonet signal found',
    code: 'Holonet',
    classification: 'Transmission log',
    image: { src: '/images/beyond-ux/portrait.webp', fit: 'cover', position: '50% 20%' },
    counters: [
      { value: '30+', label: 'Talks & workshops' },
      { value: '2', label: 'Published patents' },
      { value: '8+', label: 'Communities' },
    ],
    photos: [
      { src: '/images/beyond-ux/collage-talk.webp', alt: 'Fatima giving a talk' },
      { src: '/images/beyond-ux/collage-panel.webp', alt: 'Fatima on a panel' },
      { src: '/images/beyond-ux/collage-gdg.webp', alt: 'Fatima at a community event' },
    ],
    to: '/beyond-ux',
    cta: 'Open the archives',
  },
  {
    id: 'about',
    name: 'Fatima Rafiqui',
    eyebrow: 'Callsign: Human in the loop',
    summary: 'Product designer, systems thinker and builder at heart. Engineering roots, now designing AI-powered data workflows at Microsoft.',
    x: 150,
    size: 92,
    theme: 'about',
    reward: 'Pilot file unlocked',
    code: 'Pilot file',
    classification: 'Clearance: Rebel Alliance',
    image: { src: '/images/about/about.webp', fit: 'cover', position: '28% 30%' },
    facts: [
      { label: 'Rank', value: 'Senior Product Designer' },
      { label: 'Fleet', value: 'Microsoft Fabric, Data Factory' },
      { label: 'Origin', value: 'Engineering, then design' },
      { label: 'Fuel', value: 'Good coffee and coastal drives' },
    ],
    photos: [
      { src: '/images/about/hackathon.webp', alt: 'Fatima at a hackathon' },
      { src: '/images/about/garage.webp', alt: 'Fatima at the Makerspace' },
      { src: '/images/about/speaking.webp', alt: 'Fatima speaking' },
    ],
    scrollTo: 'about',
    cta: 'Read the full story',
  },
  {
    id: 'contact',
    name: 'Open a channel',
    eyebrow: 'Always listening',
    summary: 'Always up for a good conversation about design, data, or ideas over coffee. Pick a frequency and say hello.',
    x: 1700,
    size: 98,
    theme: 'station',
    reward: 'Channel opened',
    code: 'Comlink',
    classification: 'Channel open',
    links: [
      { label: 'Email', channel: 'Channel 01', href: 'mailto:fatima.rafiqui@gmail.com' },
      { label: 'LinkedIn', channel: 'Channel 02', href: 'https://www.linkedin.com/in/fatimarafiqui/' },
      { label: 'GitHub', channel: 'Channel 03', href: 'https://github.com/fatimarafiqui' },
      { label: 'Resume', channel: 'Archive', href: '/resume/Fatima-Rafiqui-Resume.pdf' },
    ],
  },
]

// Flat, cut-paper props that stand on the ground, drawn to sit on y = 100 of their box. Each one nods to its project.
function Prop({ theme }: { theme: string }) {
  const shadow = <ellipse className="pr-shadow" cx="50" cy="98" rx="34" ry="4" />
  switch (theme) {
    case 'dbt': // a moisture vaporator: data in, something useful out
      return (
        <svg className="prop" viewBox="0 0 100 100" aria-hidden="true">
          {shadow}
          <path className="pr-dk" d="M34 98l4-16h24l4 16z" />
          <rect className="pr-lt" x="44" y="22" width="12" height="62" />
          <rect className="pr-dk" x="50" y="22" width="6" height="62" />
          <rect className="pr-md" x="30" y="34" width="40" height="4" />
          <rect className="pr-md" x="34" y="48" width="32" height="4" />
          <rect className="pr-md" x="30" y="62" width="40" height="4" />
          <rect className="pr-acc" x="40" y="12" width="20" height="12" rx="2" />
          <circle className="pr-light pr-blink" cx="50" cy="8" r="3.5" />
        </svg>
      )
    case 'copilot': // R2-D2, the original copilot
      return (
        <svg className="prop" viewBox="0 0 100 100" aria-hidden="true">
          {shadow}
          <rect className="pr-md" x="30" y="76" width="8" height="20" />
          <rect className="pr-md" x="62" y="76" width="8" height="20" />
          <rect className="pr-dk" x="26" y="92" width="16" height="6" rx="2" />
          <rect className="pr-dk" x="58" y="92" width="16" height="6" rx="2" />
          <rect className="pr-lt" x="34" y="42" width="32" height="42" rx="4" />
          <rect className="pr-md" x="52" y="42" width="14" height="42" rx="4" />
          <rect className="pr-acc" x="39" y="52" width="12" height="8" rx="1" />
          <rect className="pr-acc2" x="39" y="64" width="22" height="4" rx="1" />
          <path className="pr-lt" d="M34 42a16 16 0 0 1 32 0z" />
          <rect className="pr-acc" x="34" y="36" width="32" height="4" />
          <circle className="pr-eye pr-blink" cx="50" cy="28" r="3.6" />
        </svg>
      )
    case 'clover': // a comm dish: the network
      return (
        <svg className="prop" viewBox="0 0 100 100" aria-hidden="true">
          {shadow}
          <rect className="pr-dk" x="36" y="90" width="28" height="8" rx="2" />
          <rect className="pr-md" x="47" y="46" width="6" height="46" />
          <ellipse className="pr-lt" cx="50" cy="38" rx="32" ry="15" transform="rotate(-25 50 38)" />
          <ellipse className="pr-acc" cx="50" cy="38" rx="20" ry="8" transform="rotate(-25 50 38)" />
          <path className="pr-line" d="M50 38L70 14" />
          <circle className="pr-light pr-blink" cx="71" cy="12" r="4" />
        </svg>
      )
    case 'maps': // a beacon tower sweeping a scan cone: AR anchors
      return (
        <svg className="prop" viewBox="0 0 100 100" aria-hidden="true">
          {shadow}
          <path className="pr-cone" d="M50 22L18 94h64z" />
          <path className="pr-md" d="M38 98l8-72h8l8 72z" />
          <path className="pr-line" d="M42 78h16M44 62h12M46 46h8M40 92l20-26M60 92L40 66" />
          <circle className="pr-acc" cx="50" cy="20" r="9" />
          <circle className="pr-light pr-blink" cx="50" cy="20" r="4" />
        </svg>
      )
    case 'beyond': // a hologram projector with a speech bubble in its beam: talks, writing, the holonet
      return (
        <svg className="prop" viewBox="0 0 100 100" aria-hidden="true">
          {shadow}
          <path className="pr-cone pr-blink" d="M38 78L20 16h60L62 78z" />
          <g className="pr-hover">
            <rect className="pr-acc" x="30" y="28" width="40" height="26" rx="7" />
            <path className="pr-acc" d="M42 53l5 11 7-11z" />
            <rect className="pr-acc2" x="37" y="35" width="26" height="3.5" rx="1.7" />
            <rect className="pr-acc2" x="37" y="42" width="19" height="3.5" rx="1.7" />
            <path className="pr-light" d="M50 6l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
          </g>
          <path className="pr-dk" d="M26 98l8-18h32l8 18z" />
          <ellipse className="pr-md" cx="50" cy="79" rx="21" ry="5" />
          <ellipse className="pr-light" cx="50" cy="78" rx="11" ry="2.6" />
        </svg>
      )
    case 'about': // a home dome
      return (
        <svg className="prop" viewBox="0 0 100 100" aria-hidden="true">
          {shadow}
          <path className="pr-lt" d="M10 98a40 40 0 0 1 80 0z" />
          <path className="pr-md" d="M50 58a40 40 0 0 1 40 40H50z" />
          <path className="pr-dk" d="M41 98V84a9 9 0 0 1 18 0v14z" />
          <circle className="pr-dk" cx="30" cy="80" r="3.5" />
          <circle className="pr-light pr-blink" cx="50" cy="52" r="2.6" />
        </svg>
      )
    default: // contact: a signal mast sending out rings
      return (
        <svg className="prop" viewBox="0 0 100 100" aria-hidden="true">
          {shadow}
          <circle className="pr-ring pr-ring--1" cx="50" cy="24" r="10" />
          <circle className="pr-ring pr-ring--2" cx="50" cy="24" r="10" />
          <rect className="pr-dk" x="38" y="90" width="24" height="8" rx="2" />
          <rect className="pr-md" x="48" y="28" width="4" height="64" />
          <rect className="pr-lt" x="38" y="44" width="24" height="3" />
          <rect className="pr-lt" x="42" y="60" width="16" height="3" />
          <circle className="pr-light pr-blink" cx="50" cy="22" r="5.5" />
        </svg>
      )
  }
}

// ---- the little game: every stop you open the first time earns XP and a rank-up along the way ----
const XP_PER_STOP = 100
const STORE_KEY = 'portfolio-play-visited'
const ranks = [
  { at: 0, name: 'Youngling' },
  { at: 1, name: 'Padawan' },
  { at: 3, name: 'Jedi Knight' },
  { at: 5, name: 'Jedi Master' },
  { at: 7, name: 'Grand Master' },
]
const rankFor = (n: number) => [...ranks].reverse().find((r) => n >= r.at) ?? ranks[0]

function loadVisited(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(STORE_KEY) ?? '[]')
    return Array.isArray(v) ? v.filter((id): id is string => bodies.some((b) => b.id === id)) : []
  } catch {
    return []
  }
}

type Toast = { id: number; title: string; sub?: string; tone: 'xp' | 'rank' }

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const coarsePointer = () => window.matchMedia('(pointer: coarse)').matches

type Pan = { x: number; y: number; scale: number }

// Three layers of stars that drift against the pan at different depths; the first second is a hyperspace jump.
function Starfield({ pan }: { pan: MutableRefObject<Pan> }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const still = reducedMotion()
    const layers = [
      { count: 120, depth: 0.04, size: 0.9 },
      { count: 70, depth: 0.1, size: 1.3 },
      { count: 36, depth: 0.22, size: 1.9 },
    ]
    let w = 0
    let h = 0
    let stars: { x: number; y: number; l: number; ph: number; tint: string }[] = []
    const tints = ['255,255,255', '200,219,201', '232,213,176', '184,230,190']

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = layers.flatMap((layer, l) =>
        Array.from({ length: Math.round((layer.count * (w * h)) / 900000) + 20 }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          l,
          ph: Math.random() * Math.PI * 2,
          tint: tints[Math.floor(Math.random() * tints.length)],
        }))
      )
    }

    let raf = 0
    const start = performance.now()
    const draw = (now: number) => {
      const t = now - start
      const warp = still ? 0 : Math.max(0, 1 - t / 1100) ** 2
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      for (const s of stars) {
        const layer = layers[s.l]
        const px = (((s.x - pan.current.x * layer.depth) % w) + w) % w
        const py = (((s.y - pan.current.y * layer.depth) % h) + h) % h
        const alpha = still ? 0.7 : 0.45 + 0.4 * Math.sin(t / 900 + s.ph)
        ctx.strokeStyle = `rgba(${s.tint},${alpha})`
        ctx.fillStyle = ctx.strokeStyle
        if (warp > 0.02) {
          const dx = px - cx
          const dy = py - cy
          ctx.lineWidth = layer.size
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(px + dx * warp * 0.9, py + dy * warp * 0.9)
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(px, py, layer.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (!still) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [pan])

  return <canvas className="arena-stars" ref={ref} aria-hidden="true" />
}

// A tiny A-wing that trails the pointer (mouse only).
function Ship() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (coarsePointer() || reducedMotion()) return
    const el = ref.current
    if (!el) return
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }
    let angle = 0
    let raf = 0
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      el.style.opacity = '1'
    }
    const tick = () => {
      const dx = target.x - pos.x
      const dy = target.y - pos.y
      pos.x += dx * 0.12
      pos.y += dy * 0.12
      if (Math.hypot(dx, dy) > 4) angle = Math.atan2(dy, dx)
      el.style.transform = `translate(${pos.x - 20}px, ${pos.y - 12}px) rotate(${angle}rad)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="arena-ship" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 44 24" width="40" height="22">
        <path d="M44 12L22 9H6v5.5h16z" fill="#dbe7dc" />
        <path d="M22 9L8 1.5 6 3l6 6.5zM22 15l-14 7.5L6 21l6-6.5z" fill="#b8d3bd" />
        <rect x="1" y="7" width="12" height="2.6" rx="1.2" fill="#9db7a2" />
        <rect x="1" y="14.4" width="12" height="2.6" rx="1.2" fill="#9db7a2" />
        <ellipse cx="29" cy="12" rx="4.5" ry="1.7" fill="#2c3e2d" />
        <circle cx="1.4" cy="8.3" r="1.6" fill="#ff9a4d" />
        <circle cx="1.4" cy="15.7" r="1.6" fill="#ff9a4d" />
      </svg>
    </div>
  )
}

export default function GalaxyArena({ onExit }: { onExit: () => void }) {
  const worldRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const pan = useRef<Pan>({ x: 0, y: 0, scale: 1 })
  const drag = useRef({ active: false, moved: false, sx: 0, sy: 0, px: 0, py: 0, id: -1 })
  const exitRef = useRef<HTMLButtonElement>(null)
  const [selected, setSelected] = useState<Body | null>(null)
  const [visited, setVisited] = useState<string[]>(loadVisited)
  const [toast, setToast] = useState<Toast | null>(null)
  const toastId = useRef(0)
  const toastTimer = useRef(0)
  const [hint, setHint] = useState(true)

  const apply = useCallback(() => {
    const { x, y, scale } = pan.current
    if (worldRef.current) worldRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  }, [])

  const clampPan = useCallback(() => {
    const vw = window.innerWidth
    const vh = skyRef.current?.clientHeight ?? 0
    const { scale } = pan.current
    const ww = WORLD.w * scale
    pan.current.x = ww <= vw ? (vw - ww) / 2 : Math.min(0, Math.max(vw - ww, pan.current.x))
    pan.current.y = (vh - WORLD.h * scale) / 2
  }, [])

  // fit the galaxy to the screen, then keep it clamped on resize
  useEffect(() => {
    const fit = (reset: boolean) => {
      const vw = window.innerWidth
      const vh = skyRef.current?.clientHeight ?? 0
      pan.current.scale = Math.min(1.15, Math.max(0.55, vh / WORLD.h))
      if (reset) pan.current.x = (vw - WORLD.w * pan.current.scale) / 2
      clampPan()
      apply()
    }
    fit(true)
    const onResize = () => fit(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [apply, clampPan])

  // lock page scroll, take focus, handle Escape
  useEffect(() => {
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    exitRef.current?.focus()
    return () => {
      root.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (selected) setSelected(null)
      else onExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, onExit])

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 7000)
    return () => window.clearTimeout(t)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.arena-card, .arena-exit')) return
    drag.current = { active: true, moved: false, sx: e.clientX, sy: e.clientY, px: pan.current.x, py: pan.current.y, id: e.pointerId }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.sx
    const dy = e.clientY - d.sy
    if (!d.moved && Math.hypot(dx, dy) > 6) {
      d.moved = true
      setHint(false)
    }
    if (d.moved) {
      pan.current.x = d.px + dx
      clampPan()
      apply()
    }
  }
  const endDrag = () => {
    drag.current.active = false
    // let the click that follows a drag be ignored
    window.setTimeout(() => {
      drag.current.moved = false
    }, 0)
  }
  const onWheel = (e: React.WheelEvent) => {
    pan.current.x -= e.deltaX + e.deltaY
    clampPan()
    apply()
  }

  useEffect(() => {
    return () => window.clearTimeout(toastTimer.current)
  }, [])

  // one small toast at a time: a new one replaces the old, and it leaves quickly
  const showToast = (title: string, sub: string | undefined, tone: Toast['tone']) => {
    window.clearTimeout(toastTimer.current)
    setToast({ id: ++toastId.current, title, sub, tone })
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }

  const pick = (b: Body) => {
    if (drag.current.moved) return
    setSelected(b)
    if (visited.includes(b.id)) return
    const next = [...visited, b.id]
    setVisited(next)
    try { localStorage.setItem(STORE_KEY, JSON.stringify(next)) } catch { /* private mode: progress just won't stick */ }
    const rankUp = rankFor(next.length).name !== rankFor(visited.length).name
    const done = next.length === bodies.length
    // rewards, rank-ups and the final stop all fold into this one line
    showToast(`${b.reward ?? 'Found it'} · +${XP_PER_STOP} XP`, done ? 'Every stop found. Grand Master!' : rankUp ? `Rank up: ${rankFor(next.length).name}` : undefined, rankUp || done ? 'rank' : 'xp')
  }

  const resetProgress = () => {
    setVisited([])
    try { localStorage.removeItem(STORE_KEY) } catch { /* nothing to clear */ }
  }

  const rank = rankFor(visited.length)
  const xp = visited.length * XP_PER_STOP

  const goScroll = (id: string) => {
    onExit()
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  return (
    <div
      className="arena"
      role="dialog"
      aria-modal="true"
      aria-label="Play mode: explore Fatima's work as a galaxy"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
    >
      <Starfield pan={pan} />
      <AtAtScene />

      <div className="arena-sky" ref={skyRef}>
      <div className="arena-world" ref={worldRef} style={{ width: WORLD.w, height: WORLD.h }}>
        <svg className="arena-routes" viewBox={`0 0 ${WORLD.w} ${WORLD.h}`} aria-hidden="true">
          <line x1="0" y1={BASELINE} x2={WORLD.w} y2={BASELINE} />
        </svg>
        {bodies.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`planet planet--${b.theme}${selected?.id === b.id ? ' is-selected' : ''}${visited.includes(b.id) ? ' is-visited' : ''}`}
            style={{ left: b.x - b.size / 2, top: BASELINE - b.size, width: b.size, height: b.size }}
            aria-label={`${b.name}: ${b.eyebrow}`}
            onClick={() => pick(b)}
          >
            <span className="planet-orb"><Prop theme={b.theme} /></span>
            <span className="planet-label">{b.name}</span>
          </button>
        ))}
      </div>
      </div>

      <button className="arena-exit" type="button" ref={exitRef} onClick={onExit}>
        <span aria-hidden="true">&larr;</span> Return to the light side
        <small className="arena-exit-sub">normal site</small>
      </button>

      <div className="arena-xp" role="status" aria-label={`${rank.name}, ${xp} of ${bodies.length * XP_PER_STOP} XP`}>
        <div className="arena-xp-top">
          <strong>{rank.name}</strong>
          <span>{visited.length}/{bodies.length} stops</span>
        </div>
        <div className="arena-xp-bar"><i style={{ width: `${(visited.length / bodies.length) * 100}%` }} /></div>
        <div className="arena-xp-foot">
          <span>{xp} XP</span>
          {visited.length > 0 && (
            <button type="button" onClick={resetProgress}>Reset</button>
          )}
        </div>
      </div>

      <div className="arena-toasts" aria-live="polite">
        {toast && (
          <div className={`arena-toast arena-toast--${toast.tone}`} key={toast.id}>
            <strong>{toast.title}</strong>
            {toast.sub && <small>{toast.sub}</small>}
          </div>
        )}
      </div>

      <p className={`arena-hint${hint ? '' : ' is-hidden'}`}>Drag to explore. Tap a planet to land.</p>

      {selected && <ArenaCard body={selected} onClose={() => setSelected(null)} onScroll={goScroll} />}

      <Ship />
    </div>
  )
}
