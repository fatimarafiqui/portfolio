// Play mode "mission routes": accepting a mission steps into a short level, with one waypoint per chapter. The text here
// is a tighter telling of the full case study pages, written to fit a small holo card.

// Pictures and prototype videos shown whole (never cropped): `span` is how many of six columns it takes.
export type Media = { src: string; alt: string; caption?: string; span?: 2 | 3 | 4 | 6; card?: boolean } // card: a diagram drawn for a white background

export type Chapter = {
  id: string
  label: string // hangs under the waypoint on the ground
  eyebrow: string
  name: string
  summary: string
  image?: { src: string; fit?: 'cover' | 'contain'; position?: string }
  facts?: { label: string; value: string }[]
  counters?: { value: string; label: string }[]
  photos?: { src: string; alt: string }[]
  tags?: string[]
  tagsLabel?: string
  links?: { label: string; href: string; channel: string }[]
  media?: Media[]
}

export type Mission = { title: string; chapters: Chapter[] }

const AR = '/images/projects/ar-anchor-cards'
const BX = '/images/beyond-ux'
const VID = 'https://github.com/fatimarafiqui/Portfolio-Assets/raw/main/AR-Anchor'
const DECK =
  'https://docs.google.com/viewer?url=https://github.com/fatimarafiqui/Portfolio-Assets/raw/main/AR-Anchor/AR%20Anchor%20Cards-compressed.pdf'

export const missions: Record<string, Mission> = {
  'ar-anchor-cards': {
    title: 'AR Anchor Cards',
    chapters: [
      {
        id: 'spark',
        label: 'The spark',
        eyebrow: 'The background',
        name: 'A friend who kept getting lost',
        summary:
          'A friend had just moved to New York for grad school and kept returning to one frustration: public transit. He was confused, we were curious, so we started digging.',
        media: [{ src: `${AR}/bg-ar.webp`, alt: 'A new settler checking directions on a phone', span: 4 }],
        facts: [
          { label: 'Role', value: 'UX research, design, usability testing' },
          { label: 'Stardate', value: 'June to August 2020' },
        ],
      },
      {
        id: 'research',
        label: 'Research',
        eyebrow: 'The process',
        name: 'He is tech savvy. So why is he struggling?',
        summary:
          'Many small factors stack up to make navigation hard for a newcomer. We ran desk research and a survey, interviewed New Yorkers and tested the apps people already use.',
        media: [
          { src: `${AR}/method-product-evaluation.webp`, alt: 'Product evaluation', caption: 'Product evaluation · 4 apps', span: 3 },
          { src: `${AR}/method-interviews.webp`, alt: 'User interviews', caption: 'User interviews · 6 sessions', span: 3 },
          { src: `${AR}/method-survey.webp`, alt: 'Survey', caption: 'Survey · 52 responses', span: 3 },
          { src: `${AR}/method-desk-research.webp`, alt: 'Desk research', caption: 'Desk research', span: 3 },
        ],
        facts: [
          { label: 'Heard', value: 'Context cuts cognitive overload' },
          { label: 'Heard', value: 'A new city can mean culture shock' },
          { label: 'Heard', value: '"I only care about my next step."' },
        ],
      },
      {
        id: 'pivot',
        label: 'The pivot',
        eyebrow: 'Research synthesis',
        name: 'We wanted a watch. The data said otherwise.',
        summary:
          'We began by designing Maps for smartwatches to solve route delays. Research showed we were solving the wrong problem, so we reset our goals.',
        media: [{ src: `${AR}/affinity-ar.webp`, alt: 'The team affinity mapping research notes on a table', caption: 'Affinity mapping the research', span: 6 }],
        tags: ['Apps cannot solve it', 'Google already does it', 'Rarely used'],
        tagsLabel: 'Ruled out',
      },
      {
        id: 'problem',
        label: 'Sharper problem',
        eyebrow: 'How might we',
        name: 'Simpler, easier and contextual',
        summary:
          'The answer was just-in-time information, delivered in context. That is only possible with augmented reality and location anchors.',
        facts: [
          { label: 'HMW 01', value: 'Onboard people who barely know the city' },
          { label: 'HMW 02', value: 'Draw more from how people really behave' },
          { label: 'HMW 03', value: 'Normalise cultural differences on a short visit' },
        ],
      },
      {
        id: 'bilal',
        label: 'Meet Bilal',
        eyebrow: 'Persona',
        name: 'Bilal Kareem',
        summary:
          'Bilal just moved to NYC from a small town in Europe. He has to find his way around a huge city while building a whole new life in it.',
        media: [{ src: `${AR}/bilal.webp`, alt: 'Persona: Bilal Kareem, checking his phone with a backpack on', span: 3 }],
        facts: [
          { label: 'Mood', value: 'Cautious, excited, overwhelmed' },
          { label: 'Goals', value: 'A new mental model of the city' },
          { label: 'Friction', value: 'No social ties, new culture, safety' },
        ],
      },
      {
        id: 'journey',
        label: 'His commute',
        eyebrow: 'User journey',
        name: 'A day in his commute',
        summary: 'Decide, plan, experience, board, anticipate, arrive. Every step has its own pain points and opportunities.',
        media: [{ src: `${AR}/userjourney.webp`, card: true, alt: "Bilal's daily commute with painpoints and opportunities", caption: 'Tap to expand the full journey map', span: 6 }],
      },
      {
        id: 'principles',
        label: 'Principles',
        eyebrow: 'Toward the solution',
        name: 'Wild ideas, solid principles',
        summary:
          'An idea mash-up of wild solutions left us with four principles, and one plan: a digital layer over the real world, like digital duct tape for real-world blemishes.',
        media: [
          { src: `${AR}/principle-preparedness.webp`, alt: 'Preparedness', caption: 'Preparedness', span: 3 },
          { src: `${AR}/principle-reliability.webp`, alt: 'Reliability', caption: 'Reliability', span: 3 },
          { src: `${AR}/principle-familiarity.webp`, alt: 'Familiarity', caption: 'Familiarity', span: 3 },
          { src: `${AR}/principle-delightful.webp`, alt: 'Delightful', caption: 'Delightful', span: 3 },
          { src: `${AR}/idea-micro-navigation.webp`, alt: 'Micro navigation', caption: 'Micro navigation', span: 2 },
          { src: `${AR}/idea-ar-anchors.webp`, alt: 'AR Anchors', caption: 'AR anchors', span: 2 },
          { src: `${AR}/idea-polaroids.webp`, alt: 'Polaroids', caption: 'Polaroids', span: 2 },
        ],
      },
      {
        id: 'micronav',
        label: 'Micro-navigation',
        eyebrow: 'Concept 1 · Prototype',
        name: 'Micro-navigation through AR cards',
        summary:
          'A rider only has to think about the very next step, so they can onboard faster instead of decoding signboards. Filter chips add a little delight: switch on the culture filter and the city starts explaining itself.',
        media: [
          { src: `${VID}/ar3.mp4`, alt: 'Prototype: AR navigation card, step one', span: 2 },
          { src: `${VID}/ar2.mp4`, alt: 'Prototype: AR navigation card, step two', span: 2 },
          { src: `${VID}/ar1.mp4`, alt: 'Prototype: AR navigation card, step three', span: 2 },
        ],
      },
      {
        id: 'subway',
        label: 'Subway cards',
        eyebrow: 'Concept 1 · Hi-fi',
        name: 'Subway navigation cards',
        summary:
          'The right information at the right moment, built around the decision a rider faces there. Our first cards had weak hierarchy; the revised ones read at a glance and even suggest the best subway car.',
        media: [
          { src: `${AR}/subway-cards.webp`, card: true, alt: 'Subway AR card with callouts for AR cards, journey information and AR filters', caption: 'Cards, journey info and AR filters', span: 6 },
          { src: `${AR}/subway-cards-detail.webp`, card: true, alt: 'Subway cards at the entrance, concourse and platform', caption: 'Entrance, concourse, platform', span: 6 },
          { src: `${AR}/subway-design-decision.webp`, card: true, alt: 'Initial and revised subway card designs', caption: 'Design decision: initial vs revised', span: 6 },
        ],
      },
      {
        id: 'anchors',
        label: 'AR anchors',
        eyebrow: 'Concept 2 · Hi-fi',
        name: 'Breadcrumbs that guide you home',
        summary:
          'A new settler asks a friend for directions to a shared meeting place and gets them as AR anchors along the way, the way people really navigate: by landmarks, not street names.',
        media: [
          { src: `${VID}/ar4.mp4`, alt: 'Prototype: AR anchors and memories', span: 2 },
          { src: `${AR}/anchors-concept.webp`, card: true, alt: 'Anchor card with callouts for personal AR cards, entry field and post button', caption: 'Personal AR cards', span: 4 },
          { src: `${AR}/anchors-design-decision.webp`, card: true, alt: 'Initial and revised anchor card designs', caption: 'Design decision: show the sender’s location', span: 6 },
          { src: `${AR}/anchors-map.webp`, card: true, alt: 'Anchor flags shown on the map', caption: 'Flags on the map mark each anchor', span: 6 },
        ],
      },
      {
        id: 'memories',
        label: 'AR memories',
        eyebrow: 'Concept 3 · Hi-fi',
        name: 'Polaroids in the air',
        summary:
          'Bilal records a first visit to a new place and, when he returns, holds his old photos up against the real location and relives it. It gives him room to reminisce and a stronger tie with the product.',
        media: [{ src: `${AR}/memories-concept.webp`, card: true, alt: 'AR memory flow: select a location, then post a polaroid card', caption: 'Pin a polaroid to a place and relive it when you return', span: 6 }],
      },
      {
        id: 'takeaways',
        label: 'Takeaways',
        eyebrow: 'Retrospective',
        name: 'What I took away',
        summary:
          'At one point everything we believed fell apart. You cannot predict the solution until the groundwork is done, and trusting the research process goes a long way.',
        facts: [
          { label: 'Lesson 1', value: 'Discoverability is its own design problem' },
          { label: 'Lesson 2', value: 'Features can grow out of what Maps already has' },
          { label: 'Lesson 3', value: 'Trust the research, even when it hurts' },
        ],
        links: [{ label: 'Process deck', href: DECK, channel: 'Archive' }],
      },
    ],
  },

  beyond: {
    title: 'Beyond UX',
    chapters: [
      {
        id: 'community',
        label: 'Community',
        eyebrow: 'Showing up for other builders',
        name: 'Hackathons, panels and booths',
        summary:
          'I say yes to rooms full of people building something new: to judge their ideas, answer their questions, and learn right alongside them.',
        counters: [
          { value: '30+', label: 'Talks & workshops' },
          { value: '8+', label: 'Communities' },
        ],
        photos: [
          { src: `${BX}/collage-group.webp`, alt: 'Hackathon participants and organizers' },
          { src: `${BX}/collage-gdg.webp`, alt: 'Fatima at the GDG hackathon' },
          { src: `${BX}/collage-judge.webp`, alt: 'Fatima judging a hackathon' },
        ],
      },
      {
        id: 'speaking',
        label: 'Speaking',
        eyebrow: 'Sharing what I have learned',
        name: 'Talks and workshops',
        summary: 'I never set out to be a speaker. I just wanted someone in the room to feel a little less alone on their path.',
        links: [
          { label: 'Designing for a Brand: Equal Voice', channel: '2020', href: 'https://www.youtube.com/watch?v=UNDjotU0E_U' },
          { label: 'App Critique Workshop', channel: '2020', href: 'https://www.youtube.com/watch?v=EXqepUbNay8&t=506s' },
          { label: 'Inclusive Web Design', channel: '2021', href: 'https://www.youtube.com/watch?v=wyLdjxtL6P8' },
          { label: 'Figma Basics Workshop', channel: '2021', href: 'https://www.youtube.com/watch?v=My4CV7FAi1o' },
          { label: 'ACM Tapia Conference panel', channel: '2022', href: 'https://www.youtube.com/watch?v=6mu2hUFqQi0' },
          { label: "Design your Brand's Website", channel: '2022', href: 'https://www.youtube.com/watch?v=j3ILieHXWUU' },
        ],
      },
      {
        id: 'writing',
        label: 'Writing',
        eyebrow: 'Thinking out loud',
        name: 'Words on the holonet',
        summary: 'Writing is how I make sense of a decision before I take the next step.',
        links: [
          {
            label: 'Why I quit a high paying job for HCI',
            channel: 'Leap of faith',
            href: 'https://fatimarafiqui.medium.com/why-did-i-quit-a-high-paying-job-to-pursue-a-degree-in-hci-fb162b286748',
          },
          {
            label: 'Lessons from my UX internship at Juniper',
            channel: 'Reflection',
            href: 'https://medium.com/juniperux/a-design-reflection-invaluable-lessons-from-my-ux-internship-at-juniper-networks-c18585f77f4d',
          },
          {
            label: 'Design & healthcare: combating bias in medicine',
            channel: 'Research',
            href: 'https://medium.com/iu-cewit/design-and-healthcare-a-conjunction-needed-to-combat-bias-in-medicine-49286a9674b5',
          },
          { label: 'More on Medium', channel: 'Archive', href: 'https://fatimarafiqui.medium.com' },
        ],
      },
      {
        id: 'jedi',
        label: 'Jedi in training',
        eyebrow: 'Off duty',
        name: 'A Jedi in training',
        summary:
          'Star Wars taught me more about resilience than most self-help books: progress is slow, you fail before you grow, and patience is not passive. "Never tell me the odds!" Han Solo, and me every time I start something new.',
        image: { src: `${BX}/portrait.webp`, fit: 'cover', position: '50% 20%' },
      },
    ],
  },

  about: {
    title: 'Pilot file',
    chapters: [
      {
        id: 'origin',
        label: 'Origin',
        eyebrow: 'Engineering, then design',
        name: 'Builder at heart',
        summary:
          "I'm a product designer, systems thinker, and builder at heart. I started in engineering and found my home in design, where I could turn technical depth into clarity, trust, and usable experiences.",
        image: { src: '/images/about/garage.webp', fit: 'cover', position: '45% 20%' },
      },
      {
        id: 'today',
        label: 'Today',
        eyebrow: 'Microsoft Fabric, Data Factory',
        name: 'AI-powered data workflows',
        summary:
          "Today I design for Microsoft Fabric's Data Factory team, shaping AI-powered workflows on one of the most technical platforms in data. Along the way I've led high-impact product work, contributed to patent-backed innovations, published research, and spoken at global conferences.",
        image: { src: '/images/about/hackathon.webp', fit: 'cover', position: '50% 22%' },
        counters: [{ value: '2', label: 'Published patents' }],
      },
      {
        id: 'offduty',
        label: 'Off duty',
        eyebrow: 'Fuel',
        name: 'Good coffee, coastal drives',
        summary: "Off duty, you'll find me chasing good coffee and coastal drives.",
        image: { src: '/images/about/speaking.webp', fit: 'cover' },
      },
    ],
  },
}

export const hasLevel = (id: string) => id in missions
