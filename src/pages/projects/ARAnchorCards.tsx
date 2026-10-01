import { Link } from 'react-router-dom'
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
  { img: 'idea-micro-navigation.png', title: 'Micro navigation', sub: 'Public transport navigation' },
  { img: 'idea-ar-anchors.png', title: 'AR Anchors', sub: 'Navigational breadcrumbs' },
  { img: 'idea-polaroids.png', title: 'Polaroids', sub: 'AR image sharing' },
]

const reflections = [
  {
    title: 'Discoverability Dilemma',
    body: 'Ensuring feature discoverability was a challenge. Knowing that Google Maps is complex and has many moving parts, we had to map the entry point for our features to that of the underlying feature supporting it.',
  },
  {
    title: 'Feature Evolution',
    body: 'While exploring micro navigation, we were able to expand the concept to build on features Google Maps already offers. Micro navigation, for instance, could be merged with personal location sharing and Local Guides.',
  },
  {
    title: 'Design Pivot',
    body: 'We reached a point where everything we thought fell apart. This project taught me that you can never predict your solution until you do the groundwork well. Only then do you see the true requirements, and trusting the research process goes a long way.',
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

export default function ARAnchorCards() {
  return (
    <div className="ar-page">
      <nav className="ar-nav">
        <Link to="/" className="ar-back">&larr; Back</Link>
      </nav>

      {/* Hero */}
      <header className="ar-hero">
        <span className="ar-eyebrow">Passion Project</span>
        <img className="ar-maps-logo" src={`${IMG}/maps-logo.png`} alt="Google Maps logo" />
        <h1 className="ar-title">AR Anchor Cards</h1>
        <p className="ar-lede">
          Navigation for new settlers and tourists has always been challenging, but Google Maps has been the one-stop
          application for all. This project builds on Google Maps' existing Live View feature to simplify the
          onboarding experience of newcomers in a city.
        </p>
        <a className="ar-button" href={DECK} target="_blank" rel="noopener noreferrer">View Process Deck</a>
        <Img file="hero.webp" alt="AR Anchor Cards hero" className="ar-hero-img" />
      </header>

      {/* Overview */}
      <section className="ar-section ar-overview">
        <div>
          <h2 className="ar-h3">Project Vision</h2>
          <p>
            We kicked off this project by trying to simplify the subway experience in New York City, but ended up
            designing an onboarding transportation experience for new settlers in Google Maps. The revised goal was
            to design public transport navigation for travellers on a short visit.
          </p>
        </div>
        <div>
          <h2 className="ar-h3">My Role</h2>
          <p>UX Research &bull; UX Design &bull; Interaction Design &bull; Usability Testing</p>
          <h2 className="ar-h3 ar-mt">Timeline</h2>
          <p>June - August 2020</p>
        </div>
      </section>

      {/* Solution */}
      <section className="ar-section">
        <span className="ar-kicker">The Solution</span>
        <h2 className="ar-h2">Final Prototype</h2>

        <div className="ar-split">
          <div>
            <h3 className="ar-h3">Micronavigation through AR Cards</h3>
            <p>
              Lines, numbers, and colors mean different things to people used to a different transport system. With
              subway micro navigation, a user only needs to worry about their next steps. You can now onboard faster
              without being delayed by deciphering signboards.
            </p>
            <p>
              The filter chips add delight to the user's journey. In AR mode, users can set filters to see relevant
              content. For example, travelers can discover and learn about the culture through the AR culture filter.
            </p>
          </div>
          <div className="ar-videos">
            <Video file="ar3.mp4" />
            <Video file="ar2.mp4" />
            <Video file="ar1.mp4" />
          </div>
        </div>

        <div className="ar-split ar-split--flip">
          <div>
            <h3 className="ar-h3">Breadcrumbs will guide you home: AR Anchor Cards</h3>
            <p>
              New settlers can navigate to a common meeting place by requesting AR-anchor-powered directions from a
              friend or an acquaintance.
            </p>
            <p>
              A friend can help someone with the location by providing user-generated anchor points. This feature is
              based on the user behavior of navigating by landmarks or places of significance.
            </p>
            <h3 className="ar-h3 ar-mt">Polaroids in the Air: AR Memories</h3>
            <p>
              Taking the concept further, an AR polaroid could also be used as a private photo map feature. Bilal
              could record his experiences of visiting a new place on the map. When he visits again, he can relive
              the experience by comparing old photos with the real location.
            </p>
            <p>
              This gives Bilal a chance to reminisce, share experiences that feel lived in, and form a stronger tie
              with Google products.
            </p>
          </div>
          <div className="ar-videos">
            <Video file="ar4.mp4" />
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="ar-section ar-band">
        <span className="ar-kicker">The Background</span>
        <h2 className="ar-h2">But how did we get to the final product?</h2>
        <div className="ar-split">
          <div>
            <h3 className="ar-h3">It all started with a friend having problems</h3>
            <p>
              A friend who is a new settler in New York had recently come to start his journey as a graduate student.
              In casual conversations, he often expressed his frustration at getting confused while figuring out
              public transportation in New York. We saw this as an interesting design opportunity and started to dig
              deeper into the issue.
            </p>
          </div>
          <Img file="bg-ar.webp" alt="A new settler navigating the New York subway" />
        </div>
      </section>

      {/* Research */}
      <section className="ar-section">
        <span className="ar-kicker">The Process</span>
        <h2 className="ar-h2">But wait, my friend is tech savvy. Why is he having problems?</h2>
        <p className="ar-narrow">
          To understand the problem, we conducted desk research, collected survey results, interviewed New Yorkers
          and evaluated navigation applications used in New York. We uncovered that many factors make navigation
          difficult for a new settler.
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

        <span className="ar-kicker ar-mt">Key Takeaways</span>
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
        <h2 className="ar-h2">We wanted to design for a watch, but it was time to trust the data.</h2>
        <p className="ar-narrow">
          We started by designing Maps for smart watches, but through research we realized we were not focusing on
          the right problem. We were trying to solve for route delays.
        </p>
        <Img file="affinity-ar.webp" alt="Affinity map from research synthesis" />
        <div className="ar-grid ar-grid--3 ar-mt">
          {dead.map((d) => (
            <div key={d.title} className="ar-dead">
              <img src={`${IMG}/cross.png`} alt="" width={20} height={20} />
              <strong>{d.title}</strong>
              <p>{d.body}</p>
            </div>
          ))}
        </div>
        <p className="ar-narrow ar-mt">
          After research, we realized we were focusing on the lesser issues: making delay communication better,
          advocating for aggregation of services, and making cultural information available as a travel guide. These
          solutions were either already implemented or would not be impactful. After affinity mapping and concept
          generation, we revisited the problem and revised our design goals.
        </p>

        <span className="ar-kicker ar-mt">How might we</span>
        <h2 className="ar-h2">Revised Design Opportunity</h2>
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
        <h2 className="ar-h2">Making navigation simpler, easier and contextual.</h2>
        <p className="ar-narrow">
          We settled on contextual navigation with just-in-time information, which was only possible through
          augmented reality and location anchors. Using AR-based cards also opened up possibilities to improve
          navigation and normalize culture through personalized directions and photo sharing.
        </p>

        <span className="ar-kicker ar-mt">Persona</span>
        <h2 className="ar-h2">Meet the user.</h2>
        <div className="ar-split">
          <Img file="bilal.webp" alt="Persona: Bilal Kareem" />
          <div>
            <h3 className="ar-h3">Bilal Kareem</h3>
            <p><em>Inexperienced, cautious, excited, overwhelmed</em></p>
            <p>
              Bilal recently moved to NYC from a small town in Europe. He needs to figure out his way around the city
              while adjusting to his new life.
            </p>
            <h4 className="ar-h4">Goals &amp; motivation</h4>
            <p>Build a new mental model. Balance work and settling in. Balance safety with exploring the city.</p>
            <h4 className="ar-h4">Frustrations</h4>
            <p>No social connection, adapting to a new culture, language barrier, need for belonging, danger to self and belongings.</p>
          </div>
        </div>

        <span className="ar-kicker ar-mt">User Journey</span>
        <h2 className="ar-h2">A look at his daily commute</h2>
        <Img file="userjourney.webp" alt="Bilal's daily commute user journey" />
      </section>

      {/* Principles */}
      <section className="ar-section ar-band">
        <span className="ar-kicker">Design Principles</span>
        <h2 className="ar-h2">Cementing our principles to guide the design process</h2>
        <p className="ar-narrow">
          To form our guiding principles, we used idea mash-up, where we came up with wild solutions to very real
          problems. Although those solutions were far from implementable, they gave us solid principles for our final
          solution.
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
        <span className="ar-kicker">Moving towards the solution</span>
        <h2 className="ar-h2">Adding navigation to the AR world</h2>
        <p className="ar-narrow">
          Out of all our ideas, it was clear we could not solve for every physical problem in public transport. We
          needed to add a digital layer to simplify the experience for our users. We needed a digital duct tape to
          hide real-world blemishes.
        </p>
        <div className="ar-grid ar-grid--3">
          {ideas.map((p) => (
            <figure key={p.title} className="ar-card">
              <Img file={p.img} alt={p.title} />
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
        <h2 className="ar-h2">Hi-fidelity Prototypes</h2>

        <h3 className="ar-h3 ar-mt">Concept 1: Subway Micro-navigation</h3>
        <Img file="subway-cards.webp" alt="Subway navigation cards" />
        <div className="ar-split">
          <div>
            <h4 className="ar-h4">Subway Navigation Cards</h4>
            <p>
              The subway navigation cards provide contextual information to new settlers like Bilal. Each card holds
              the information a user might need to make a decision at that point in the journey.
            </p>
          </div>
          <Img file="subway-cards-detail.webp" alt="Subway navigation card detail" />
        </div>
        <div className="ar-split ar-split--flip">
          <div>
            <h4 className="ar-h4">Design Decision</h4>
            <p>
              The initial card design lacked visual hierarchy, and the information was not grouped to be understood at
              a glance. The revised cards have better hierarchy, are easy to follow, and also suggest a subway car
              based on crowdsourced data.
            </p>
          </div>
          <Img file="subway-design-decision.webp" alt="Subway card design decision" />
        </div>

        <h3 className="ar-h3 ar-mt">Concept 2: Personalized AR Anchors</h3>
        <Img file="anchors-concept.webp" alt="Personalized AR anchors" />
        <div className="ar-split">
          <div>
            <h4 className="ar-h4">Design Decisions</h4>
            <p>
              The initial card design did not give enough information about system status. The revised card lets
              users view a snapshot of the sender's location. With this interaction, the user is assured they are
              travelling to the right place.
            </p>
          </div>
          <Img file="anchors-design-decision.webp" alt="Anchor card design decision" />
        </div>
        <div className="ar-split ar-split--flip">
          <div>
            <p>
              To give a sense of anchor points, "steps and more" listed them. However, nothing on the map showed the
              personal anchor points. The revised design added flags on the map as a visual indicator for the anchor
              points left behind by the creator.
            </p>
          </div>
          <Img file="anchors-map.webp" alt="Anchor flags on the map" />
        </div>

        <h3 className="ar-h3 ar-mt">Concept 3: AR Memories</h3>
        <div className="ar-split">
          <p>
            Taking the concept further, an AR polaroid could also be used as a private photo map feature. Bilal could
            record his experiences of visiting a new place on the map. When he visits again, he can relive the
            experience by comparing old photos with the real location.
          </p>
          <Img file="memories-concept.webp" alt="AR memories concept" />
        </div>
      </section>

      {/* Retrospective */}
      <section className="ar-section">
        <span className="ar-kicker">Retrospective</span>
        <h2 className="ar-h2">Reflecting on the experience</h2>
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

      <footer className="ar-footer">
        <h2 className="ar-h2">Interested in more projects?</h2>
        <Link to="/#work" className="ar-button">Back to all work</Link>
      </footer>
    </div>
  )
}
