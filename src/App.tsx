import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { projects } from './data/projects'
import { testimonials } from './data/testimonials'
import { bio } from './data/about'
import './App.css'

function App() {
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

      {/* Hero — Dark cinematic section */}
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
              <div className="project-card-image">
                <span className="project-card-number">0{i + 1}</span>
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
          <div className="about-content">
            <p className="about-text reveal reveal-up delay-1">{bio.extended}</p>
            <p className="about-text reveal reveal-up delay-2">{bio.background}</p>
            <p className="about-text reveal reveal-up delay-3">{bio.personal}</p>
          </div>
          <div className="about-image-wrapper reveal reveal-scale delay-2">
            <img
              src="/images/about/about.jpg"
              alt="Fatima speaking at a conference"
              className="about-image"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-header reveal reveal-up">
          <span className="section-eyebrow">RECOMMENDATIONS</span>
          <h2 className="section-title">Their Words, Not Mine.</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <blockquote className={`testimonial-card reveal reveal-up delay-${i + 1}`} key={t.name}>
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <footer className="testimonial-author">
                <div className="testimonial-avatar"></div>
                <div className="testimonial-info">
                  <strong>{t.name}</strong>
                  <span>{t.role}, {t.company}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
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
