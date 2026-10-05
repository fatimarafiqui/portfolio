import { useEffect, useRef, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from './data/projects'
import { aboutSummary, aboutPhotos, bio } from './data/about'
import { useNavTheme } from './hooks/useNavTheme'
import SiteNav from './components/SiteNav'
import ContactSection from './components/ContactSection'
import GalaxyArena from './components/GalaxyArena'
import ProjectThumb from './components/ProjectThumb'
import { renderRich } from './utils/richText'
import './App.css'

function App() {
  useNavTheme()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const blobSecRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  // Play mode: off by default so the site stays a normal site. It is remembered for the tab, so coming back from a
  // case study drops you back into the galaxy.
  const [play, setPlay] = useState(() => {
    try { return sessionStorage.getItem('portfolio-play') === '1' } catch { return false }
  })
  const playToggleRef = useRef<HTMLButtonElement>(null)
  const wasPlaying = useRef(play)
  useEffect(() => {
    try { sessionStorage.setItem('portfolio-play', play ? '1' : '0') } catch { /* private mode: fine */ }
    if (wasPlaying.current && !play) playToggleRef.current?.focus()
    wasPlaying.current = play
  }, [play])
  const exitPlay = useCallback(() => setPlay(false), [])

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
        <div className="hero-sky" aria-hidden="true">
          <span className="hero-streak hero-streak--1"></span>
          <span className="hero-streak hero-streak--2"></span>
        </div>
        <div className="hero-aurora">
          <div className="hero-aurora-blob" ref={blobRef}></div>
          <div className="hero-aurora-blob-secondary" ref={blobSecRef}></div>
        </div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-crawl reveal reveal-up">A long time ago, in a design studio far, far away…</p>
              <h1 className="hero-name">
                <span className="hero-line hero-line--lead reveal reveal-up delay-1">There lived</span>
                <span className="hero-line hero-line--name reveal reveal-up delay-2"><span className="hero-name-gradient">Fatima</span>.</span>
              </h1>
              <p className="hero-subtitle reveal reveal-up delay-3">
                {bio.intro}
                <span className="hero-punch">{bio.punch}</span>
              </p>
              <button
                type="button"
                role="switch"
                aria-checked={play}
                className="hero-play reveal reveal-up delay-4"
                ref={playToggleRef}
                onClick={() => setPlay((v) => !v)}
              >
                <span className="hero-play-track" aria-hidden="true"><span className="hero-play-thumb" /></span>
                <span className="hero-play-text">
                  <strong>Play mode</strong>
                  <span>Explore my work as a galaxy</span>
                </span>
              </button>
            </div>
            <div className="hero-image-wrapper reveal reveal-scale delay-2">
              <img
                src="/images/hero/fatima-hero.webp"
                alt="Fatima Rafiqui"
                className="hero-image"
              />
            </div>
          </div>
          <div className="hero-scroll-indicator reveal reveal-up delay-4">
            <span>This is the way</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="work" id="work">
        <svg className="work-falcon" viewBox="0 0 400 400" aria-hidden="true">
          <g fill="currentColor">
            {/* round hull with a forward wedge that runs up into the mandibles */}
            <circle cx="200" cy="250" r="122" />
            <path d="M78 250L146 96h108l68 154z" />
            {/* the two long mandibles */}
            <path d="M158 47h28v57h-36zM214 47h28l8 57h-36z" />
            <path d="M196 62h8v46h-8z" />
            {/* cockpit tube and canopy on the right */}
            <path d="M292 206l46-48 14 14-44 52z" />
            <rect x="330" y="116" width="36" height="42" rx="6" transform="rotate(38 348 137)" />
            {/* rear engine strip */}
            <rect x="128" y="364" width="144" height="20" rx="6" />
          </g>
          <g fill="none" stroke="var(--color-surface)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            {/* mouth between the mandibles and the panel lines on the wedge */}
            <path d="M186 104v30M214 104v30M186 134h28" />
            <path d="M152 104L100 214M248 104l52 110" />
            {/* dish rings and plating */}
            <circle cx="200" cy="250" r="40" />
            <circle cx="200" cy="250" r="78" strokeWidth="2" />
            <circle cx="200" cy="250" r="110" strokeWidth="2.4" strokeDasharray="3 9" />
            <path d="M238 262L307 285M224 282L266 341M200 290L200 362M176 282L134 341M162 262L93 285M162 238L93 215M176 218L134 159M200 210L200 138M224 218L266 159M238 238L307 215" strokeWidth="1.8" />
            {/* engine slots and cockpit window */}
            <path d="M152 372v4M172 372v4M192 372v4M212 372v4M232 372v4M252 372v4" strokeWidth="2.4" />
            <path d="M334 128l16 14" strokeWidth="2" />
          </g>
          <g fill="var(--color-surface)">
            <circle cx="200" cy="250" r="24" />
            <circle cx="168" cy="296" r="6.5" /><circle cx="194" cy="310" r="6.5" /><circle cx="220" cy="296" r="6.5" /><circle cx="180" cy="330" r="6.5" /><circle cx="208" cy="336" r="6.5" />
            <circle cx="148" cy="180" r="8" />
            <circle cx="252" cy="180" r="8" />
          </g>
          <circle cx="200" cy="250" r="9" fill="currentColor" />
        </svg>
        <div className="section-header reveal reveal-up">
          <span className="section-eyebrow">WORK</span>
          <h2 className="section-title">The Jedi Archives</h2>
          <p className="section-subtitle">Selected projects across different domains.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <Link to={project.href} className={`project-card reveal reveal-up delay-${i + 1}`} key={project.id}>
              <ProjectThumb project={project} index={i} />
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
          <svg className="divider-tie" viewBox="0 0 72 52" aria-hidden="true">
            <g>
              <polygon points="14,2 24,13 24,39 14,50 4,39 4,13" />
              <polygon points="58,2 48,13 48,39 58,50 68,39 68,13" />
              <rect x="24" y="24" width="4" height="4" />
              <rect x="44" y="24" width="4" height="4" />
              <circle cx="36" cy="26" r="11" />
            </g>
            <g className="divider-tie-lines">
              <path d="M14 26L14 2M14 26L24 13M14 26L24 39M14 26L14 50M14 26L4 39M14 26L4 13M58 26L58 2M58 26L48 13M58 26L48 39M58 26L58 50M58 26L68 39M58 26L68 13" />
              <circle cx="36" cy="26" r="6.5" />
              <path d="M36 19.5v13M29.5 26h13" />
            </g>
            <circle className="divider-tie-glow" cx="36" cy="26" r="2.6" />
          </svg>
          <blockquote>
            <p>I believe good design is like the Force: quiet, everywhere,<br className="divider-br" /> and you only feel it when it&rsquo;s missing.</p>
          </blockquote>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="section-header reveal reveal-up">
          <span className="section-eyebrow">ABOUT</span>
          <h2 className="section-title">Meet the Rebel</h2>
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
      {play && <GalaxyArena onExit={exitPlay} />}
    </div>
  )
}

export default App
