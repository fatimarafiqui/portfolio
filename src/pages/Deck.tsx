import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Deck.css'

type Slide = {
  chapter: number
  label: string
  content: React.ReactNode
}

const slides: Slide[] = [
  {
    chapter: 1,
    label: 'Introduction',
    content: (
      <div className="deck-intro">
        <div className="deck-intro-copy">
          <p className="deck-kicker">Selected work · 2025–2026</p>
          <h1>Designing clarity<br />into <em>complexity.</em></h1>
          <p className="deck-lede">I’m Fatima Rafiqui, a product designer shaping intelligent tools for people who build with data.</p>
          <div className="deck-signature">Fatima Rafiqui <span>Senior Product Designer</span></div>
        </div>
        <div className="deck-portrait-wrap">
          <span className="deck-portrait-index">01</span>
          <img src="/images/hero/fatima-hero.png" alt="Fatima Rafiqui" className="deck-portrait" />
        </div>
      </div>
    ),
  },
  {
    chapter: 1,
    label: 'Contents',
    content: (
      <div className="deck-contents">
        <p className="deck-kicker">Three chapters · Two case studies</p>
        <h2>A short tour of how I think, make, and lead.</h2>
        <div className="deck-chapter-list">
          <div><span>01</span><strong>Introduction</strong><small>Practice &amp; principles</small></div>
          <div><span>02</span><strong>Data Factory Agent</strong><small>Shipped product</small></div>
          <div><span>03</span><strong>Unified Fabric Copilot</strong><small>Hackathon vision</small></div>
        </div>
      </div>
    ),
  },
  {
    chapter: 2,
    label: 'Data Factory Agent',
    content: (
      <div className="deck-case-cover deck-case-one">
        <div>
          <p className="deck-kicker">Chapter 02 · Shipped product</p>
          <h2>Data Factory<br />Agent</h2>
          <p className="deck-lede">An intelligent agent that helps teams diagnose pipeline failures and improve configurations.</p>
          <div className="deck-meta"><span>Role · Product Designer</span><span>2025–2026</span></div>
        </div>
        <div className="agent-visual" aria-label="Diagram of an agent diagnosing a data pipeline">
          <div className="agent-orbit orbit-one"></div>
          <div className="agent-orbit orbit-two"></div>
          <div className="agent-core"><span>DF</span><small>AGENT</small></div>
          <div className="agent-node node-source">Source</div>
          <div className="agent-node node-pipeline">Pipeline</div>
          <div className="agent-node node-insight">Insight</div>
        </div>
      </div>
    ),
  },
  {
    chapter: 2,
    label: 'From failure to next step',
    content: (
      <div className="deck-story">
        <div className="deck-story-heading">
          <p className="deck-kicker">The design move</p>
          <h2>Turn a dead end into a clear next step.</h2>
          <p>Pipeline failures expose dense logs and scattered settings. The agent reframes diagnosis as a guided conversation grounded in the user’s actual configuration.</p>
        </div>
        <div className="diagnosis-flow">
          <div className="flow-step"><span>01</span><strong>Detect</strong><small>Read the failed run in context</small></div>
          <div className="flow-connector"></div>
          <div className="flow-step active"><span>02</span><strong>Explain</strong><small>Translate the issue into plain language</small></div>
          <div className="flow-connector"></div>
          <div className="flow-step"><span>03</span><strong>Resolve</strong><small>Offer a grounded, actionable fix</small></div>
        </div>
        <blockquote>Complex systems should reveal the path forward, not ask people to decode the machinery.</blockquote>
      </div>
    ),
  },
  {
    chapter: 3,
    label: 'Unified Fabric Copilot',
    content: (
      <div className="deck-case-cover deck-case-two">
        <div>
          <p className="deck-kicker">Chapter 03 · Hackathon 2025</p>
          <h2>Unified Fabric<br />Copilot</h2>
          <p className="deck-lede">A context-aware intelligence layer that helps developers build and operate end-to-end Fabric solutions.</p>
          <div className="deck-meta"><span>Role · Senior Product Designer</span><span>Cross-org team</span></div>
        </div>
        <div className="fabric-visual" aria-label="Diagram showing a unified copilot across Fabric tools">
          <div className="fabric-center"><span>Unified</span><strong>Copilot</strong></div>
          <div className="fabric-item item-one">Data</div>
          <div className="fabric-item item-two">Build</div>
          <div className="fabric-item item-three">Monitor</div>
          <div className="fabric-item item-four">Model</div>
        </div>
      </div>
    ),
  },
  {
    chapter: 3,
    label: 'One context, every surface',
    content: (
      <div className="deck-story fabric-story">
        <div className="deck-story-heading">
          <p className="deck-kicker">The opportunity</p>
          <h2>From isolated assistant to system-level partner.</h2>
          <p>Developers move across workloads, but today’s help loses context at every boundary. We designed one Copilot that understands the whole solution.</p>
        </div>
        <div className="shift-grid">
          <div><small>FROM</small><strong>Single surface</strong><span>Fragmented support</span></div>
          <div className="shift-arrow">→</div>
          <div><small>TO</small><strong>Whole solution</strong><span>Persistent context</span></div>
          <div><small>FROM</small><strong>Task automation</strong><span>Reactive assistance</span></div>
          <div className="shift-arrow">→</div>
          <div><small>TO</small><strong>Guided building</strong><span>Agent orchestration</span></div>
        </div>
      </div>
    ),
  },
  {
    chapter: 3,
    label: 'Impact',
    content: (
      <div className="deck-impact">
        <p className="deck-kicker">What the team made possible</p>
        <h2>One ambitious vision.<br /><em>Built together.</em></h2>
        <div className="impact-numbers">
          <div><strong>3</strong><span>end-to-end prototypes</span></div>
          <div><strong>9</strong><span>user interviews</span></div>
          <div><strong>~9</strong><span>agents &amp; MCPs integrated</span></div>
          <div><strong>36</strong><span>cross-discipline collaborators</span></div>
        </div>
        <div className="deck-closing"><span>Thank you</span><a href="mailto:fatima.rafiqui@gmail.com">fatima.rafiqui@gmail.com</a></div>
      </div>
    ),
  },
]

export default function Deck() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'next' | 'previous'>('next')

  const goTo = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index))
    setCurrent(previous => {
      setDirection(nextIndex >= previous ? 'next' : 'previous')
      return nextIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        goTo(current + 1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        goTo(current - 1)
      }
      if (event.key === 'Home') goTo(0)
      if (event.key === 'End') goTo(slides.length - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [current, goTo])

  const slide = slides[current]

  return (
    <main className="deck-shell">
      <header className="deck-nav">
        <Link to="/" className="deck-brand">Fatima Rafiqui<span>Portfolio presentation</span></Link>
        <nav className="deck-chapters" aria-label="Presentation chapters">
          {[1, 2, 3].map(chapter => (
            <button
              key={chapter}
              className={slide.chapter === chapter ? 'active' : ''}
              onClick={() => goTo(slides.findIndex(item => item.chapter === chapter))}
            >
              <span>0{chapter}</span> {chapter === 1 ? 'Intro' : `Case study ${chapter - 1}`}
            </button>
          ))}
        </nav>
        <span className="deck-counter">{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
      </header>

      <div className="deck-stage">
        <article key={current} className={`deck-slide flip-${direction}`} aria-label={`Slide ${current + 1}: ${slide.label}`}>
          {slide.content}
          <span className="deck-page-corner" aria-hidden="true"></span>
        </article>
      </div>

      <footer className="deck-controls">
        <div className="deck-progress" aria-hidden="true"><span style={{ width: `${((current + 1) / slides.length) * 100}%` }}></span></div>
        <span className="deck-slide-label">Ch. 0{slide.chapter} · {slide.label}</span>
        <div className="deck-buttons">
          <button onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous slide">←</button>
          <button onClick={() => goTo(current + 1)} disabled={current === slides.length - 1} aria-label="Next slide">→</button>
        </div>
      </footer>
    </main>
  )
}