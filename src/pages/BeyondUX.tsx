import { useEffect, useRef } from 'react'
import BB8 from '../components/BB8'
import { useNavTheme } from '../hooks/useNavTheme'
import SiteNav from '../components/SiteNav'
import Recommendations from '../components/Recommendations'
import ContactSection from '../components/ContactSection'
import '../App.css'
import './BeyondUX.css'

const ytId = (url: string) => new URL(url).searchParams.get('v') ?? ''

const talks = [
  {
    title: "Designing for a Brand ~ Equal Voice",
    description: "A product born from empathy, and how listening shaped every decision.",
    url: "https://www.youtube.com/watch?v=UNDjotU0E_U",
    year: "2020",
  },
  {
    title: "App Critique Workshop",
    description: "Helping aspiring designers find their voice through critique.",
    url: "https://www.youtube.com/watch?v=EXqepUbNay8&t=506s",
    year: "2020",
  },
  {
    title: "Inclusive Web Design: CEW&T Annual Summit",
    description: "Accessibility, starting with our own blind spots.",
    url: "https://www.youtube.com/watch?v=wyLdjxtL6P8",
    year: "2021",
  },
  {
    title: "Figma Basics Workshop",
    description: "A learning community for women and underrepresented groups, one artboard at a time.",
    url: "https://www.youtube.com/watch?v=My4CV7FAi1o",
    year: "2021",
  },
  {
    title: "ACM Richard Tapia Conference - Panel Discussion",
    description: "Honest reflections on academia and industry, from both sides.",
    url: "https://www.youtube.com/watch?v=6mu2hUFqQi0",
    year: "2022",
  },
  {
    title: "Design your Brand's Website",
    description: "What I wish someone had taught me earlier: making your work visible.",
    url: "https://www.youtube.com/watch?v=j3ILieHXWUU",
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
    title: "Design & Healthcare - A conjunction needed to combat Bias in Medicine",
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
  useNavTheme()
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
    <div className="app bux-page" ref={pageRef}>
      <SiteNav active="beyond-ux" />

      {/* Hero: the site's dark green, same pattern as the project pages */}
      <header className="bux-hero">
        <div className="bux-hero-inner">
          <div className="bux-hero-copy bux-animate">
            <span className="bux-eyebrow">Beyond UX</span>
            <h1 className="bux-hero-title">There is more to a designer than the craft.</h1>
            <p className="bux-hero-lede">Talks, writing, and a little Star Wars: the parts of the work that happen off the canvas.</p>
            <dl className="bux-stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.number}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bux-hero-visual bux-animate">
            <img
              className="bux-hero-photo"
              src="/images/beyond-ux/portrait.webp"
              alt="Fatima Rafiqui at the Microsoft Fabric booth"
            />
          </div>
        </div>
      </header>

      {/* Speaking */}
      <section className="bux-section">
        <div className="bux-intro bux-animate">
          <span className="bux-kicker">Speaking</span>
          <h2 className="bux-h2">Sharing what I've learned</h2>
          <p className="bux-lede">I never set out to be a speaker. I just wanted someone in the room to feel a little less alone on their path.</p>
        </div>
        <div className="bux-talks-grid">
          {talks.map((talk, i) => {
            const id = ytId(talk.url)
            return (
              <a
                href={talk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bux-talk bux-animate"
                key={i}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="bux-talk-thumb">
                  <img
                    src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                    onLoad={(e) => {
                      // YouTube serves a tiny grey placeholder when no max-res thumbnail exists
                      const img = e.currentTarget
                      if (img.naturalWidth <= 120) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
                    }}
                    onError={(e) => {
                      e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
                    }}
                    alt={`${talk.title} video thumbnail`}
                    loading="lazy"
                  />
                  <span className="bux-talk-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                  </span>
                </div>
                <div className="bux-talk-content">
                  <span className="bux-talk-year">{talk.year}</span>
                  <h3 className="bux-talk-title">{talk.title}</h3>
                  <p className="bux-talk-desc">{talk.description}</p>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* Writing */}
      <section className="bux-section bux-section--tint">
        <div className="bux-intro bux-animate">
          <span className="bux-kicker">Writing</span>
          <h2 className="bux-h2">Thinking out loud</h2>
          <p className="bux-lede">Writing is how I make sense of a decision before I take the next step.</p>
        </div>
        <div className="bux-writing-grid">
          {writing.map((post, i) => (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bux-article bux-animate"
              key={i}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="bux-article-tag">{post.tag}</span>
              <h3 className="bux-article-title">{post.title}</h3>
              <span className="bux-article-cta">Read on Medium <span aria-hidden="true">&#8599;</span></span>
            </a>
          ))}
        </div>
      </section>

      <Recommendations />

      {/* Star Wars */}
      <section className="bux-starwars">
        <div className="bux-starwars-inner bux-animate">
          <div className="bux-starwars-content">
            <span className="bux-kicker bux-kicker--light">Off duty</span>
            <h2 className="bux-h2 bux-h2--light">A Jedi in training</h2>
            <p className="bux-starwars-text">
              Star Wars taught me more about resilience than most self-help books: progress is slow, you fail before you grow, and patience is not passive.
            </p>
            <blockquote className="bux-starwars-quote">
              <p>"Never tell me the odds!"</p>
              <cite>Han Solo, and me every time I start something new</cite>
            </blockquote>
          </div>
          <div className="bux-starwars-bb8">
            <BB8 />
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}

export default BeyondUX
