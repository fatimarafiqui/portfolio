import { useEffect, useRef, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from './data/projects'
import { aboutSummary, aboutPhotos, bio } from './data/about'
import { useNavTheme } from './hooks/useNavTheme'
import SiteNav from './components/SiteNav'
import ContactSection from './components/ContactSection'
import { renderRich } from './utils/richText'
import './App.css'

// Data flowing through the real Fabric Designer diagram on the monitor: a soft pulse runs along each link from the
// plane switches down to the two PoDs, with a faint ripple where it lands. Coordinates are in screenshot pixels
// (the overlay is stretched exactly over the screenshot).
const CLOVER_VIEW = { w: 1666, h: 996 }
const cloverPlanes = [{ x: 466, y: 415 }, { x: 709, y: 415 }, { x: 976, y: 418 }, { x: 1232, y: 418 }]
const cloverPods = [{ x: 427, y: 543 }, { x: 1141, y: 541 }]

function CloverFlow() {
  const links = cloverPlanes.flatMap((plane, pi) =>
    cloverPods.map((pod, ki) => {
      const drop = pod.y - plane.y
      return {
        id: `${pi}-${ki}`,
        d: `M${plane.x} ${plane.y} C${plane.x} ${plane.y + drop * 0.55} ${pod.x} ${plane.y + drop * 0.45} ${pod.x} ${pod.y}`,
        delay: (pi * 2 + ki) * 0.4,
      }
    })
  )
  return (
    <svg className="clover-flow" viewBox={`0 0 ${CLOVER_VIEW.w} ${CLOVER_VIEW.h}`} preserveAspectRatio="none" aria-hidden="true">
      {links.map((l) => (
        <path key={l.id} d={l.d} pathLength={100} className="clover-flow-path" style={{ animationDelay: `${l.delay}s` }} />
      ))}
      {cloverPods.map((pod, ki) => (
        <circle key={ki} cx={pod.x} cy={pod.y} r="14" className="clover-flow-ripple" style={{ animationDelay: `${ki * 0.4}s` }} />
      ))}
    </svg>
  )
}

// The phone on the AR Anchor Cards thumbnail is the real AR prototype video from the case study (hosted in the
// Portfolio-Assets repo, like on the project page). The recording already includes its own phone frame on a white
// background, so the white is blended away in CSS. It only loads and plays while the card is on screen, and not at
// all for visitors who prefer reduced motion; until then (or if it can't load) the still image below shows instead.
const AR_PROTOTYPE_VIDEO = 'https://github.com/fatimarafiqui/Portfolio-Assets/raw/main/AR-Anchor/ar2.mp4'

function MapsPhone() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = AR_PROTOTYPE_VIDEO
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      className="thumb-maps-video"
      poster="/images/projects/ar-anchor-cards/phone-poster.jpg"
      muted
      loop
      playsInline
      preload="none"
    />
  )
}

const mapsDistances = ['200 ft', '150 ft', '100 ft', '50 ft', 'Now']

// Google Maps-style turn banner on the AR Anchor Cards thumbnail: the distance ticks down toward the right turn.
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
          <path d="M15 5l5 5-5 5M20 10h-9a5 5 0 0 0-5 5v4" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="thumb-maps-text">
        <strong>Turn right</strong>
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
      <SiteNav home />

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
              <h1 className="hero-name">
                <span className="hero-line reveal reveal-up delay-1">Hello,</span>
                <span className="hero-line reveal reveal-up delay-2">I'm <span className="hero-name-gradient">Fatima</span>.</span>
              </h1>
              <p className="hero-subtitle reveal reveal-up delay-3">
                {bio.intro}
                <span className="hero-punch">{bio.punch}</span>
              </p>
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
          <p className="section-subtitle">Selected projects across different domains.</p>
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
                {project.custom === 'clover' && (
                  <div className="thumb-dbt thumb-clover-card" aria-hidden="true">
                    <div className="thumb-clover-monitor">
                      <div className="thumb-clover-bezel">
                        <div className="thumb-clover-screenwrap">
                          <img className="thumb-clover-screen" src="/images/projects/clover-designer/screen.jpg" alt="" />
                          <CloverFlow />
                        </div>
                      </div>
                      <div className="thumb-clover-neck" />
                      <div className="thumb-clover-foot" />
                    </div>
                    <img className="thumb-clover-logo" src="/images/projects/clover-designer/juniper-logo.png" alt="" />
                  </div>
                )}
                {project.custom === 'maps' && (
                  <div className="thumb-dbt thumb-maps-card" aria-hidden="true">
                    <MapsPhone />
                    <MapsNav />
                  </div>
                )}
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
            <Link to="/beyond-ux" className="about-cta reveal reveal-up delay-3">
              <svg className="about-cta-bb8" viewBox="0 0 40 40" aria-hidden="true">
                <defs>
                  <radialGradient id="bb8-body" cx="35%" cy="30%" r="75%">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#d6dbe2" />
                  </radialGradient>
                </defs>
                <circle cx="20" cy="26" r="12.5" fill="url(#bb8-body)" stroke="#b4bbc6" strokeWidth="0.6" />
                <g className="bb8-marks">
                  <circle cx="20" cy="26" r="8.2" fill="none" stroke="#e8793a" strokeWidth="1.6" />
                  <circle cx="20" cy="26" r="3.8" fill="#e8793a" />
                  <circle cx="20" cy="26" r="1.5" fill="#ffffff" />
                  <path d="M20 15.5v2.6M20 33.9v2.6M9.5 26h2.6M27.9 26h2.6" stroke="#aab1bc" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="12.4" cy="20.6" r="1.3" fill="#e8793a" />
                  <circle cx="27.6" cy="31.4" r="1.3" fill="#e8793a" />
                </g>
                <g className="bb8-head">
                  <path d="M12.5 14.2a7.5 7.5 0 0 1 15 0z" fill="#ffffff" stroke="#b4bbc6" strokeWidth="0.6" />
                  <path d="M13.2 11.7h13.6" stroke="#e8793a" strokeWidth="1.3" />
                  <circle cx="21.6" cy="9.4" r="2.4" fill="#1d2330" stroke="#8a919c" strokeWidth="0.6" />
                  <circle cx="22.3" cy="8.7" r="0.75" fill="#7fd1ff" />
                  <path d="M16.8 7 16 3.2" stroke="#6b7280" strokeWidth="0.9" strokeLinecap="round" />
                </g>
              </svg>
              <span>Psst, there's a Jedi-in-training in here</span>
              <span className="about-cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}

export default App
