import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import SiteNav from '../../components/SiteNav'
import ContactSection from '../../components/ContactSection'
import { useNavTheme } from '../../hooks/useNavTheme'
import '../../App.css'
import './ARAnchorCards.css'

const IMG = '/images/projects/ar-anchor-cards'
const ASSETS = 'https://github.com/fatimarafiqui/Portfolio-Assets/raw/main/AR-Anchor'
const DECK =
  'https://docs.google.com/viewer?url=https://github.com/fatimarafiqui/Portfolio-Assets/raw/main/AR-Anchor/AR%20Anchor%20Cards-compressed.pdf'

const methods = [
  { img: 'method-product-evaluation.webp', title: 'Product Evaluation', note: '4 applications' },
  { img: 'method-interviews.webp', title: 'User Interviews', note: '6 sessions' },
  { img: 'method-survey.webp', title: 'Survey', note: '52 responses' },
  { img: 'method-desk-research.webp', title: 'Desk Research', note: 'Multiple sources' },
]

const insights = [
  {
    text: 'Contextual information reduces cognitive overload.',
    quote: 'When I first came here, it was very overwhelming. Once I was right at the location, but took 30 minutes to reach my destination.',
  },
  {
    text: 'Experiences in a new city might lead to culture shock.',
    quote: 'Homelessness, street and subway performances are part of the New York lifestyle, but when I first came here, it was very terrifying for me.',
  },
  {
    text: 'Google Maps needs to strike a balance between standard and personalized features.',
    quote: 'Color coding means something else in the New Delhi metro, while it is completely different for the New York subway.',
  },
  {
    text: 'Maps needs to break down the user journey to make it more digestible.',
    quote: 'I only care about what my next step should be. Sometimes it becomes a lot to take.',
  },
]

const dead = [
  { title: 'Things that apps cannot solve', body: 'Recommendations, service aggregation, and offline use.' },
  { title: 'Already supported by Google', body: 'Support for cultural learning as a pre-travel step.' },
  { title: 'People would rarely use it', body: 'Delay communication was the lesser issue.' },
]

const hmw = [
  'How might we provide onboarding support for people with limited knowledge about the city?',
  'How might we improve the navigation by drawing more from user behavior?',
  'How might we normalize cultural differences for tourists and new settlers on a short visit?',
]

const principles = [
  { img: 'principle-preparedness.webp', title: 'Preparedness' },
  { img: 'principle-reliability.webp', title: 'Reliability' },
  { img: 'principle-familiarity.webp', title: 'Familiarity' },
  { img: 'principle-delightful.webp', title: 'Delightful' },
]

const ideas = [
  { img: 'idea-micro-navigation.webp', title: 'Micro navigation', sub: 'Public transport navigation' },
  { img: 'idea-ar-anchors.webp', title: 'AR Anchors', sub: 'Navigational breadcrumbs' },
  { img: 'idea-polaroids.webp', title: 'Polaroids', sub: 'AR image sharing' },
]

const reflections = [
  {
    title: 'Discoverability Dilemma',
    body: 'Making new features discoverable was hard. Google Maps is complex, with many moving parts, so we tied each of our entry points to the existing feature that supports it.',
  },
  {
    title: 'Feature Evolution',
    body: 'While exploring micro-navigation we realized the idea could grow out of what Maps already offers. It could, for instance, merge with personal location sharing and Local Guides.',
  },
  {
    title: 'Design Pivot',
    body: 'At one point everything we believed fell apart. This project taught me that you cannot predict the solution until the groundwork is done. Only then do the true requirements show up, and trusting the research process goes a long way.',
  },
]

function Video({ file }: { file: string }) {
  return (
    <video className="ar-video" src={`${ASSETS}/${file}`} autoPlay loop muted playsInline preload="metadata" />
  )
}

function Img({ file, alt, className = '' }: { file: string; alt: string; className?: string }) {
  return <img className={`ar-img ${className}`} src={`${IMG}/${file}`} alt={alt} loading="lazy" />
}

// Full-screen view of an image, on the same page. Close with the X, Escape, or a click outside the image.
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return createPortal(
    <div className="ar-lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button type="button" className="ar-lightbox-close" aria-label="Close image" onClick={onClose} autoFocus>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      <div className="ar-lightbox-scroll">
        <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
      </div>
    </div>,
    document.body,
  )
}

// A piece of media with a caption. `wide` = dense diagram on a white card (scrolls sideways on small screens),
// `phone` = annotated phone mockup, `photo` = a real photograph. `open` lets the image expand in place.
function Figure({
  file, alt, caption, kind, max, open = false,
}: { file: string; alt: string; caption?: string; kind: 'wide' | 'phone' | 'photo'; max?: number; open?: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const img = <Img file={file} alt={alt} />
  return (
    <figure className={`ar-fig ar-fig--${kind}`} style={max ? { maxWidth: max } : undefined}>
      <div className="ar-fig-media">
        <div className="ar-fig-scroll">
          {open ? (
            <button type="button" className="ar-zoom" onClick={() => setExpanded(true)} aria-label={`Expand image: ${alt}`}>
              {img}
            </button>
          ) : img}
        </div>
      </div>
      {caption && <figcaption className="ar-cap">{caption}</figcaption>}
      {expanded && <Lightbox src={`${IMG}/${file}`} alt={alt} onClose={() => setExpanded(false)} />}
    </figure>
  )
}

// A short titled write-up that always sits directly above the media it explains
function Block({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="ar-block">
      {title && <h4 className="ar-h4">{title}</h4>}
      {children}
    </div>
  )
}

export default function ARAnchorCards() {
  useNavTheme()
  return (
    <div className="ar-page app">
      <SiteNav />

      {/* Hero */}
      <header className="ar-hero">
        <div className="ar-hero-inner">
          <div className="ar-hero-copy">
            <span className="ar-eyebrow">Passion Project</span>
            <img className="ar-maps-logo" src={`${IMG}/maps-logo.png`} alt="Google Maps" />
            <h1 className="ar-title">AR Anchor Cards</h1>
            <p className="ar-lede">
              Google Maps is the one-stop app for getting around, yet new settlers and tourists still get lost in the first few weeks. This passion project builds on Live View to make a new city feel familiar, one next step at a time.
            </p>
            <dl className="ar-meta">
              <div>
                <dt>My role</dt>
                <dd>UX Research &bull; UX Design &bull; Interaction Design &bull; Usability Testing</dd>
              </div>
              <div>
                <dt>Timeline</dt>
                <dd>June - August 2020</dd>
              </div>
            </dl>
            <div className="ar-hero-actions">
              <a className="ar-button" href={DECK} target="_blank" rel="noopener noreferrer">View Process Deck</a>
              <a className="ar-button ar-button--ghost" href="#solution">See the prototype</a>
            </div>
          </div>
          <div className="ar-hero-visual">
            <Img file="hero.webp" alt="AR Anchor Cards on two phones: a subway card and an AR memory polaroid" className="ar-hero-img" />
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="ar-section ar-overview">
        <span className="ar-kicker">Project Vision</span>
        <p className="ar-vision">
          We set out to simplify the New York subway. We ended up designing something bigger: an onboarding experience inside Google Maps for new settlers, and public transport navigation for travelers on a short visit.
        </p>
      </section>

      {/* Solution */}
      <section className="ar-section" id="solution">
        <span className="ar-kicker">The Solution</span>
        <h2 className="ar-h2">Two ideas, one goal: make the next step obvious.</h2>

        <div className="ar-feature">
          <div className="ar-feature-text">
            <h3 className="ar-h3">Micro-navigation through AR cards</h3>
            <p>
              Lines, numbers and colors mean different things to people raised on a different transit system. With micro-navigation, a rider only has to think about the very next step, so they can onboard faster instead of decoding signboards.
            </p>
            <p>
              Filter chips add a little delight. In AR mode, travelers choose what they want to see. Switch on the culture filter, for example, and the city starts explaining itself.
            </p>
          </div>
          <div className="ar-stage ar-videos ar-videos--3">
            <Video file="ar3.mp4" />
            <Video file="ar2.mp4" />
            <Video file="ar1.mp4" />
          </div>
        </div>

        <div className="ar-feature ar-feature--side">
          <div className="ar-feature-text">
            <h3 className="ar-h3">Breadcrumbs that guide you home: AR Anchor Cards</h3>
            <p>
              A new settler can ask a friend for directions to a shared meeting place, and get them as AR anchors placed along the way.
            </p>
            <p>
              Those user-generated anchor points mirror how people really navigate: by landmarks and places that mean something, not by street names.
            </p>
            <h3 className="ar-h3 ar-mt-sm">Polaroids in the air: AR Memories</h3>
            <p>
              Taking the idea further, an AR polaroid becomes a private photo map. Meet Bilal, a new settler in NYC: he records a first visit to a new place, and when he returns, he can hold his old photos up against the real location and relive it.
            </p>
            <p>
              It gives Bilal room to reminisce, share moments that feel lived in, and form a stronger tie with Google products.
            </p>
          </div>
          <div className="ar-stage ar-videos ar-videos--1">
            <Video file="ar4.mp4" />
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="ar-section ar-band">
        <span className="ar-kicker">The Background</span>
        <h2 className="ar-h2">So how did we get here?</h2>
        <div className="ar-split ar-split--photo-right">
          <div>
            <h3 className="ar-h3">It started with a friend who kept getting lost</h3>
            <p>
              A friend had just moved to New York to start grad school. In casual conversation he kept returning to one frustration: figuring out public transit. He was confused, and we were curious. It looked like a real design opportunity, so we started digging.
            </p>
          </div>
          <Figure kind="photo" file="bg-ar.webp" alt="A new settler checking directions on a phone" />
        </div>
      </section>

      {/* Research */}
      <section className="ar-section">
        <span className="ar-kicker">The Process</span>
        <h2 className="ar-h2">But he is tech savvy. So why is he struggling?</h2>
        <p className="ar-narrow">
          To find out, we ran desk research and a survey, interviewed New Yorkers, and evaluated the navigation apps people use in the city. The answer was not one thing. Many small factors stack up to make navigation hard for a newcomer.
        </p>
        <div className="ar-grid ar-grid--4">
          {methods.map((m) => (
            <figure key={m.title} className="ar-card">
              <Img file={m.img} alt={m.title} />
              <figcaption>
                <strong>{m.title}</strong>
                <span>{m.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <span className="ar-kicker ar-mt">What we heard</span>
        <h2 className="ar-h2">Research Insights</h2>
        <div className="ar-grid ar-grid--2">
          {insights.map((x, i) => (
            <div key={i} className="ar-insight">
              <span className="ar-num">0{i + 1}</span>
              <p className="ar-insight-text">{x.text}</p>
              <blockquote>&ldquo;{x.quote}&rdquo;</blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* Synthesis */}
      <section className="ar-section ar-band">
        <span className="ar-kicker">Research Synthesis</span>
        <h2 className="ar-h2">We wanted to design for a watch. The data said otherwise.</h2>
        <p className="ar-narrow">
          We began by designing Maps for smartwatches, aiming to solve route delays. Research showed we were solving the wrong problem.
        </p>
        <Figure kind="photo" file="affinity-ar.webp" alt="The team affinity mapping research notes on a table" caption="Affinity mapping the research" max={820} />
        <p className="ar-narrow ar-mt-sm"><strong>Three directions we ruled out:</strong></p>
        <div className="ar-grid ar-grid--3">
          {dead.map((d) => (
            <div key={d.title} className="ar-dead">
              <img src={`${IMG}/cross.png`} alt="" width={20} height={20} />
              <strong>{d.title}</strong>
              <p>{d.body}</p>
            </div>
          ))}
        </div>
        <p className="ar-narrow ar-mt-sm">
          The issues we had been chasing were the lesser ones: better delay communication, aggregating services, and cultural information as a travel guide. Each was either already solved or would not move the needle. So after affinity mapping and concept generation, we went back to the problem and reset our goals.
        </p>

        <span className="ar-kicker ar-mt">How might we</span>
        <h2 className="ar-h2">A sharper problem to solve</h2>
        <div className="ar-grid ar-grid--3">
          {hmw.map((h, i) => (
            <div key={i} className="ar-insight">
              <span className="ar-num">0{i + 1}</span>
              <p className="ar-insight-text">{h}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Goal + persona */}
      <section className="ar-section">
        <span className="ar-kicker">Design Goal</span>
        <h2 className="ar-h2">Make navigation simpler, easier and contextual.</h2>
        <p className="ar-narrow">
          The answer was just-in-time information, delivered in context. That is only possible with augmented reality and location anchors. AR cards also opened the door to personalized directions and photo sharing: ways to improve navigation and make a new culture feel normal.
        </p>

        <span className="ar-kicker ar-mt">Persona</span>
        <h2 className="ar-h2">Meet Bilal.</h2>
        <div className="ar-persona">
          <Img file="bilal.webp" alt="Persona: Bilal Kareem, checking his phone with a backpack on" className="ar-persona-img" />
          <div className="ar-persona-body">
            <h3 className="ar-h3">Bilal Kareem</h3>
            <p className="ar-persona-tags"><em>Inexperienced, cautious, excited, overwhelmed</em></p>
            <p>
              Bilal just moved to NYC from a small town in Europe. He has to find his way around a huge city while building a whole new life in it.
            </p>
            <h4 className="ar-h4">Goals &amp; motivation</h4>
            <p>Build a new mental model. Balance work and settling in. Balance safety with exploring the city.</p>
            <h4 className="ar-h4">Frustrations</h4>
            <p>No social connection, adapting to a new culture, language barrier, need for belonging, danger to self and belongings.</p>
          </div>
        </div>

        <span className="ar-kicker ar-mt">User Journey</span>
        <h2 className="ar-h2">A day in his commute</h2>
        <Figure kind="wide" file="userjourney.webp" alt="Bilal's daily commute: decide, plan, experience, board, anticipate, arrive, with painpoints and opportunities" caption="Click to expand the full journey map" open />
      </section>

      {/* Principles */}
      <section className="ar-section ar-band">
        <span className="ar-kicker">Design Principles</span>
        <h2 className="ar-h2">Wild ideas, solid principles</h2>
        <p className="ar-narrow">
          To find our guiding principles, we ran an idea mash-up: wild solutions to very real problems. None of them were buildable, but they left us with four principles to design by.
        </p>
        <div className="ar-grid ar-grid--4">
          {principles.map((p) => (
            <figure key={p.title} className="ar-card">
              <Img file={p.img} alt={p.title} />
              <figcaption><strong>{p.title}</strong></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Ideas */}
      <section className="ar-section">
        <span className="ar-kicker">Toward the solution</span>
        <h2 className="ar-h2">Adding a digital layer to the real world</h2>
        <p className="ar-narrow">
          We could not fix every physical problem in public transport. What we could do was lay a digital layer over it that simplifies the experience: digital duct tape for real-world blemishes.
        </p>
        <div className="ar-grid ar-grid--3">
          {ideas.map((p) => (
            <figure key={p.title} className="ar-card ar-card--icon">
              <div className="ar-tile"><Img file={p.img} alt={p.title} /></div>
              <figcaption>
                <strong>{p.title}</strong>
                <span>{p.sub}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Hi-fi */}
      <section className="ar-section ar-band">
        <span className="ar-kicker">Solution</span>
        <h2 className="ar-h2">Hi-fidelity prototypes</h2>

        <h3 className="ar-h3 ar-concept">Concept 1: Subway Micro-navigation</h3>
        <Figure kind="phone" file="subway-cards.webp" alt="Subway AR card on a phone with callouts for AR cards, journey information and AR filters" max={760} />
        <Block title="Subway Navigation Cards">
          <p>
            These cards give new settlers like Bilal the right information at the right moment. Each one is built around the decision he faces at that point in the journey.
          </p>
        </Block>
        <Figure kind="wide" file="subway-cards-detail.webp" alt="Subway cards at the entrance, concourse and platform levels" open />
        <Block title="Design Decision">
          <p>
            Our first cards had weak hierarchy and loosely grouped information, so they could not be read at a glance. The revised cards are clearer and easier to follow, and they even suggest the best subway car using crowdsourced data.
          </p>
        </Block>
        <Figure kind="wide" file="subway-design-decision.webp" alt="Initial and revised subway card designs" open />

        <h3 className="ar-h3 ar-concept">Concept 2: Personalized AR Anchors</h3>
        <Figure kind="phone" file="anchors-concept.webp" alt="Anchor card on a phone with callouts for personal AR cards, entry field and post button" max={760} />
        <Block title="Design Decisions">
          <p>
            The first card did not communicate system status. The revised card shows a snapshot of the sender's location, so the user knows they are heading to the right place.
          </p>
        </Block>
        <Figure kind="wide" file="anchors-design-decision.webp" alt="Initial and revised anchor card designs" open />
        <Block>
          <p>
            Anchor points were listed under "steps and more", but nothing on the map showed them. We added flags to the map as a visual marker for the points the creator left behind.
          </p>
        </Block>
        <Figure kind="wide" file="anchors-map.webp" alt="Anchor flags shown on the map" open />

        <h3 className="ar-h3 ar-concept">Concept 3: AR Memories</h3>
        <Figure kind="phone" file="memories-concept.webp" alt="AR memory flow: select a location, then post a polaroid card" caption="Pin a polaroid to a place and relive it when you return" max={900} />
      </section>

      {/* Retrospective */}
      <section className="ar-section">
        <span className="ar-kicker">Retrospective</span>
        <h2 className="ar-h2">What I took away</h2>
        <div className="ar-grid ar-grid--3">
          {reflections.map((r) => (
            <div key={r.title} className="ar-insight">
              <h3 className="ar-h4">{r.title}</h3>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
        <a className="ar-button ar-mt" href={DECK} target="_blank" rel="noopener noreferrer">View Process Deck</a>
      </section>

      <ContactSection />
    </div>
  )
}
