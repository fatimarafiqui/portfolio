# Fatima Rafiqui — Portfolio (Redesign)

A redesigned personal portfolio with a new design language and visuals.

## Site Structure

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, Work showcase, About intro, Testimonials, Contact |
| Project: Clover Designer | `/projects/clover-designer` | Shipped product — Web UX, Interaction Design |
| Project: AR Anchor Cards | `/projects/ar-anchor-cards` | Passion project — AR, Concept, Mobile UX |
| Project: ViLearn | `/projects/vilearn` | Startup incubator — Web UX, Visual Design, Branding |
| Project: Equal Voice | `/projects/equal-voice` | Academic project — Voice UX, Concept |
| About | `/about` | Speaking, Writing, Personal interests |

### Folder Structure

```
portfolio/
├── public/                     # Static assets served as-is
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/             # Header, Footer, Navigation, Page wrappers
│   │   ├── ui/                 # Buttons, Cards, Tags, Badges, Section headers
│   │   └── sections/           # Reusable page sections (Hero, Testimonials, Contact CTA)
│   ├── pages/
│   │   ├── Home.tsx            # Landing page
│   │   ├── projects/           # Individual case study pages
│   │   │   ├── CloverDesigner.tsx
│   │   │   ├── ARAnchorCards.tsx
│   │   │   ├── ViLearn.tsx
│   │   │   └── EqualVoice.tsx
│   │   └── about/              # About / More page
│   │       └── About.tsx
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/           # Hero section visuals
│   │   │   ├── projects/       # Case study imagery & mockups
│   │   │   ├── testimonials/   # Testimonial headshots
│   │   │   └── about/          # Speaking, writing, personal photos
│   │   ├── icons/              # Custom SVG icons
│   │   └── fonts/              # Custom typefaces
│   ├── styles/                 # Global styles, design tokens, theme
│   ├── data/                   # Content data (projects, testimonials, bio)
│   └── utils/                  # Helpers, animations, scroll utilities
├── package.json
└── README.md
```

## Content Sections (from existing site)

### Home Page Sections
1. **Hero** — Intro headline, subtitle, CTA
2. **Work** — Project cards grid (4 projects)
3. **About Intro** — Short bio with link to full About
4. **Testimonials** — Carousel/grid of quotes
5. **Contact** — Email CTA, footer

### Case Study Template
Each project page follows this structure:
1. Project header (title, role, timeline, tags)
2. Solution showcase (final prototypes/visuals)
3. Background / Problem statement
4. Process (research, insights, personas)
5. Design iterations (lo-fi → hi-fi)
6. Retrospective / Learnings
7. Related projects CTA

### About Page Sections
1. Intro
2. Public Speaking (talks & workshops)
3. Writing (blog posts)
4. Personal (interests, Star Wars fandom)
5. Contact CTA
