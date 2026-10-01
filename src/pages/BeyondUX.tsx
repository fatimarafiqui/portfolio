import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import BB8 from '../components/BB8'
import '../App.css'
import './BeyondUX.css'

const talks = [
  {
    title: "Designing for a Brand ~ Equal Voice",
    description: "Sharing the story of a product born from empathy — how listening shaped every design decision.",
    url: "#",
    year: "2020",
  },
  {
    title: "App Critique Workshop",
    description: "Helping aspiring designers find their voice through critique — something I'm still learning myself.",
    url: "#",
    year: "2020",
  },
  {
    title: "Inclusive Web Design: CEW&T Annual Summit",
    description: "A conversation about accessibility that started with our own blind spots and grew into something meaningful.",
    url: "#",
    year: "2021",
  },
  {
    title: "Figma Basics Workshop",
    description: "Building a small learning community for women and underrepresented groups — one artboard at a time.",
    url: "#",
    year: "2021",
  },
  {
    title: "ACM Richard Tapia Conference — Panel Discussion",
    description: "Honest reflections on navigating academia and industry as someone who's been on both sides.",
    url: "#",
    year: "2022",
  },
  {
    title: "Design your Brand's Website",
    description: "Teaching what I wish someone had taught me earlier — how to make your work visible.",
    url: "#",
    year: "2022",
  },
]

const writing = [
  {
    title: "Why did I quit a high paying job to pursue a degree in HCI?",
    url: "https://fatimarafiqui.medium.com/why-did-i-quit-a-high-paying-job-to-pursue-a-degree-in-hci-fb162b286748",
    tag: "Leap of Faith",
  },
  {
    title: "Invaluable lessons from my UX internship at Juniper Networks",
    url: "https://medium.com/juniperux/a-design-reflection-invaluable-lessons-from-my-ux-internship-at-juniper-networks-c18585f77f4d",
    tag: "Reflection",
  },
  {
    title: "Design & Healthcare — A conjunction needed to combat Bias in Medicine",
    url: "https://medium.com/iu-cewit/design-and-healthcare-a-conjunction-needed-to-combat-bias-in-medicine-49286a9674b5",
    tag: "Research",
  },
]

const stats = [
  { number: "10+", label: "Talks & Workshops" },
  { number: "3", label: "Published Stories" },
  { number: "5+", label: "Communities Served" },
]

function BeyondUX() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = pageRef.current?.querySelectorAll('.bux-animate')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app" ref={pageRef}>
      <nav className="nav">
        <Link to="/" className="nav-logo">Fatima Rafiqui</Link>
        <div className="nav-links">
          <Link to="/#work">Work</Link>
          <Link to="/#about">About</Link>
          <Link to="/beyond-ux" className="nav-active">Beyond UX</Link>
          <Link to="/#contact">Contact</Link>
        </div>
      </nav>

      {/* Hero — Editorial Split */}
      <section className="bux-hero">
        <div className="bux-hero-content bux-animate">
          <span className="bux-hero-label">Beyond UX</span>
          <h1 className="bux-hero-title">
            There is more to a<br/>
            designer than<br/>
            <span className="bux-hero-accent">the craft</span>
          </h1>
        </div>
        <div className="bux-hero-visual bux-animate">
          <div className="bux-hero-card bux-hero-card--1">
            <span className="bux-hero-emoji">🎤</span>
            <span>Storyteller</span>
          </div>
          <div className="bux-hero-card bux-hero-card--2">
            <span className="bux-hero-emoji">✍️</span>
            <span>Thinker</span>
          </div>
          <div className="bux-hero-card bux-hero-card--3">
            <span className="bux-hero-emoji">⚔️</span>
            <span>Jedi-in-training</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bux-stats bux-animate">
        {stats.map((stat, i) => (
          <div className="bux-stat" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
            <span className="bux-stat-number">{stat.number}</span>
            <span className="bux-stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Speaking — Timeline Layout */}
      <section className="bux-speaking">
        <div className="bux-section-intro bux-animate">
          <span className="bux-section-number">01</span>
          <h2 className="bux-section-heading">Sharing what I've learned</h2>
          <p className="bux-section-body">
            I never set out to be a speaker. I just wanted to share the mistakes, detours, and small wins that shaped my path — hoping someone in the room might feel a little less alone in theirs.
          </p>
        </div>
        <div className="bux-talks-timeline">
          {talks.map((talk, i) => (
            <a
              href={talk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bux-talk bux-animate"
              key={i}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="bux-talk-year">{talk.year}</span>
              <div className="bux-talk-content">
                <h3 className="bux-talk-title">{talk.title}</h3>
                <p className="bux-talk-desc">{talk.description}</p>
              </div>
              <span className="bux-talk-arrow">&#8599;</span>
            </a>
          ))}
        </div>
      </section>

      {/* Pull Quote */}
      <section className="bux-pullquote bux-animate">
        <p>"The best talks I've given weren't the polished ones — they were the honest ones, where I admitted what I <em>didn't know yet.</em>"</p>
      </section>

      {/* Writing — Magazine Cards */}
      <section className="bux-writing">
        <div className="bux-section-intro bux-animate">
          <span className="bux-section-number">02</span>
          <h2 className="bux-section-heading">Thinking out loud</h2>
          <p className="bux-section-body">
            Writing is how I process things. Some of these pieces were written at turning points in my life — moments where I needed to make sense of a decision before I could take the next step.
          </p>
        </div>
        <div className="bux-writing-grid">
          {writing.map((post, i) => (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bux-article bux-animate"
              key={i}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="bux-article-top">
                <span className="bux-article-tag">{post.tag}</span>
                <span className="bux-article-arrow">&#8599;</span>
              </div>
              <h3 className="bux-article-title">{post.title}</h3>
              <span className="bux-article-cta">Read on Medium</span>
            </a>
          ))}
        </div>
      </section>

      {/* Star Wars — Immersive */}
      <section className="bux-starwars bux-animate">
        <div className="bux-starwars-bg" aria-hidden="true">
          <div className="bux-star bux-star--1"></div>
          <div className="bux-star bux-star--2"></div>
          <div className="bux-star bux-star--3"></div>
          <div className="bux-star bux-star--4"></div>
          <div className="bux-star bux-star--5"></div>
        </div>
        <div className="bux-starwars-layout">
          <div className="bux-starwars-content">
            <span className="bux-section-number bux-section-number--light">03</span>
            <h2 className="bux-starwars-title">A Jedi in training</h2>
            <p className="bux-starwars-text">
              This might sound silly, but Star Wars taught me more about resilience than most self-help books. The idea that progress is slow, that you fail before you grow, that patience isn't passive — it stuck with me. I carry a little bit of that hope into everything I do.
            </p>
            <blockquote className="bux-starwars-quote">
              <p>"Never tell me the odds!"</p>
              <cite>— Han Solo (and me, every time I start something new)</cite>
            </blockquote>
          </div>
          <div className="bux-starwars-bb8">
            <BB8 />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="contact">
        <div className="contact-inner">
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

export default BeyondUX
