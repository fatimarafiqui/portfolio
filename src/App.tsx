import { useEffect, useRef, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from './data/projects'
import { testimonials } from './data/testimonials'
import { aboutSummary, aboutPhotos, bio } from './data/about'
import { useNavTheme } from './hooks/useNavTheme'
import './App.css'

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

const renderRich = (text: string) =>
  text.split(/(==[^=]+==|\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('==')) return <mark key={i} className="about-mark">{part.slice(2, -2)}</mark>
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    return part
  })

// Leaf-spine network: two spine switches linked to four leaf switches (the fabric Clover Designer lays out).
const cloverSpines = [{ x: 85, y: 18 }, { x: 175, y: 18 }]
const cloverLeaves = [{ x: 34, y: 94 }, { x: 110, y: 94 }, { x: 150, y: 94 }, { x: 226, y: 94 }]

function CloverNodes() {
  return (
    <svg className="thumb-clover" viewBox="0 0 260 116" aria-hidden="true">
      {cloverSpines.map((spine, si) =>
        cloverLeaves.map((leaf, li) => (
          <line
            key={`${si}-${li}`}
            className="clover-link"
            style={{ animationDelay: `${((si * 4 + li) * 0.35).toFixed(2)}s` }}
            x1={spine.x}
            y1={spine.y}
            x2={leaf.x}
            y2={leaf.y}
          />
        ))
      )}
      {[...cloverSpines, ...cloverLeaves].map((node, i) => (
        <g key={i} className="clover-node" style={{ animationDelay: `${(i * 0.45).toFixed(2)}s` }}>
          <circle className="clover-pulse" cx={node.x} cy={node.y} r="9" style={{ animationDelay: `${(i * 0.45).toFixed(2)}s` }} />
          <rect className="clover-switch" x={node.x - 13} y={node.y - 7} width="26" height="14" rx="3.5" />
          <circle className="clover-led" cx={node.x - 6} cy={node.y} r="1.8" />
          <circle className="clover-led" cx={node.x} cy={node.y} r="1.8" />
          <circle className="clover-led" cx={node.x + 6} cy={node.y} r="1.8" />
        </g>
      ))}
    </svg>
  )
}

const mapsDistances = ['200 ft', '150 ft', '100 ft', '50 ft', 'Now']

// Google Maps-style turn banner on the AR Anchor Cards thumbnail: the distance ticks down toward the turn.
function MapsNav() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % mapsDistances.length), 1100)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="thumb-maps" aria-hidden="true">
      <span className="thumb-maps-badge">
        <svg viewBox="0 0 24 24" className="thumb-maps-arrow">
          <path d="M9 5 4 10l5 5M4 10h9a5 5 0 0 1 5 5v4" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="thumb-maps-text">
        <strong>Turn left</strong>
        <span className={step === mapsDistances.length - 1 ? 'is-now' : ''}>{mapsDistances[step]}</span>
      </span>
      <span className="thumb-maps-dots">
        <i /><i /><i />
      </span>
    </div>
  )
}

const dbtCommands = ['dbt run', 'dbt build', 'dbt test']

// Terminal chip on the dbt Job thumbnail: types each command in turn, then loops.
function DbtTerminal() {
  const [index, setIndex] = useState(0)
  const command = dbtCommands[index]
  return (
    <div className="thumb-dbt-term">
      <span className="thumb-dbt-prompt">$</span>
      <span
        className="thumb-dbt-typed"
        data-chars={command.length}
        style={{ '--chars': command.length } as React.CSSProperties}
        onAnimationIteration={() => setIndex((i) => (i + 1) % dbtCommands.length)}
      >
        {command}
      </span>
      <i className="thumb-dbt-caret" />
      <span className="thumb-dbt-ok">✓</span>
    </div>
  )
}

function App() {
  useNavTheme()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const blobSecRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current || !blobRef.current || !blobSecRef.current) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = heroRef.current!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      blobRef.current!.style.left = `${x}px`
      blobRef.current!.style.top = `${y}px`
      blobRef.current!.classList.add('active')
      // Secondary blob follows with slight offset for depth
      blobSecRef.current!.style.left = `${x + 80}px`
      blobSecRef.current!.style.top = `${y - 60}px`
      blobSecRef.current!.classList.add('active')
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    blobRef.current?.classList.remove('active')
    blobSecRef.current?.classList.remove('active')
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el)
    })

    const heroEl = heroRef.current
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove)
      heroEl.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      observerRef.current?.disconnect()
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove)
        heroEl.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <span className="nav-logo">Fatima Rafiqui</span>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <Link to="/beyond-ux">Beyond UX</Link>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero - Dark cinematic section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-topo"></div>
        <div className="hero-aurora">
          <div className="hero-aurora-blob" ref={blobRef}></div>
          <div className="hero-aurora-blob-secondary" ref={blobSecRef}></div>
        </div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-eyebrow reveal reveal-up">PRODUCT DESIGNER</p>
              <h1 className="hero-name">
                <span className="hero-line reveal reveal-up delay-1">Hello,</span>
                <span className="hero-line reveal reveal-up delay-2">I'm <span className="hero-name-gradient">Fatima</span>.</span>
              </h1>
              <p className="hero-subtitle reveal reveal-up delay-3">{bio.intro}</p>
            </div>
            <div className="hero-image-wrapper reveal reveal-scale delay-2">
              <img
                src="/images/hero/fatima-hero.png"
                alt="Fatima Rafiqui"
                className="hero-image"
              />
            </div>
          </div>
          <div className="hero-scroll-indicator reveal reveal-up delay-4">
            <span>Scroll to explore</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="work" id="work">
        <div className="section-header reveal reveal-up">
          <span className="section-eyebrow">WORK</span>
          <h2 className="section-title">See What I've Built</h2>
          <p className="section-subtitle">Selected projects across product design, research, and interaction design.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <Link to={project.href} className={`project-card reveal reveal-up delay-${i + 1}`} key={project.id}>
              <div
                className={`project-card-image${project.imageFit === 'contain' ? ' project-card-image--contain' : ''}`}
                style={project.imageBg ? { background: project.imageBg } : undefined}
              >
                {project.custom === 'copilot' && (
                  <div className="thumb-copilot" aria-hidden="true">
                    <span className="thumb-bubble thumb-bubble--q">
                      <i className="skel skel--long" />
                      <i className="skel skel--short" />
                    </span>
                    <img className="thumb-copilot-logo" src="/images/projects/copilot-in-data-factory/logo.webp" alt="" />
                    <span className="thumb-bubble thumb-bubble--a">
                      <i className="skel skel--long" />
                      <i className="skel skel--med" />
                      <i className="skel skel--short" />
                    </span>
                  </div>
                )}
                {project.custom === 'dbt' && (
                  <div className="thumb-dbt" aria-hidden="true">
                    <div className="thumb-dbt-laptop">
                      <div className="thumb-dbt-lid">
                        <img className="thumb-dbt-screen" src="/images/projects/dbt-job/screen.webp" alt="" />
                      </div>
                      <div className="thumb-dbt-base" />
                    </div>
                    <div className="thumb-dbt-logos">
                      <img src="/images/projects/dbt-job/dbt.webp" alt="" />
                      <span>+</span>
                      <img src="/images/projects/dbt-job/fabric.webp" alt="" />
                    </div>
                    <DbtTerminal />
                  </div>
                )}
                {project.custom === 'clover' && <CloverNodes />}
                {project.custom === 'maps' && <MapsNav />}
                {project.image && (
                  <img
                    className="project-card-media"
                    src={project.image}
                    alt={`${project.title} preview`}
                    style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                    loading="lazy"
                  />
                )}
                {project.logo && <img className="project-card-logo" src={project.logo} alt="" />}
                {!project.image && !project.custom && <span className="project-card-number">0{i + 1}</span>}
              </div>
              <div className="project-card-content">
                <span className="project-card-category">{project.category}</span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-summary">{project.summary}</p>
                <div className="project-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pull quote divider */}
      <section className="divider-quote">
        <div className="divider-content reveal reveal-up delay-1">
          <span className="divider-accent" aria-hidden="true"></span>
          <blockquote>
            <p>I help really complex concepts feel a little more <em>human</em> to the people using them.</p>
          </blockquote>
          <span className="divider-rule" aria-hidden="true"></span>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="section-header reveal reveal-up">
          <span className="section-eyebrow">ABOUT</span>
          <h2 className="section-title">The human behind pixels</h2>
        </div>
        <div className="about-layout">
          <div className="about-stack reveal reveal-scale delay-1">
            {aboutPhotos.map((photo, i) => (
              <figure key={photo.src} className={`about-polaroid about-polaroid--${i + 1}`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{ objectPosition: photo.position }}
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="about-content">
            {aboutSummary.paragraphs.map((text, i) => (
              <p key={i} className={`about-line reveal reveal-up delay-${i + 1}`}>{renderRich(text)}</p>
            ))}
            <p className="about-line reveal reveal-up delay-3">{aboutSummary.personal}</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
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

      {/* Contact Section */}
      <footer className="contact" id="contact">
        <div className="contact-inner reveal reveal-up">
          <div className="contact-top">
            <p className="contact-eyebrow">Get in touch</p>
            <h2 className="contact-heading">Let's talk design, data,<br/>or ideas over coffee.</h2>
            <a href="mailto:fatima.rafiqui@gmail.com" className="contact-email">
              Say hello &rarr;
            </a>
          </div>
          <div className="contact-bottom">
            <p className="contact-copy">&copy; 2026 Fatima Rafiqui</p>
            <p className="contact-copy">Designed with heart, built with vibecode</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
