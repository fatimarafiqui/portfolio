import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/projects'

// The product picture for each project: the laptop with its logos, the monitor with the live network diagram, the phone
// with the AR prototype, and so on. Shared by the home page cards and the Play mode mission briefings.

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
      poster="/images/projects/ar-anchor-cards/phone-poster.webp"
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

export default function ProjectThumb({ project, index, className = '' }: { project: Project; index: number; className?: string }) {
  const i = index
  return (
              <div
                className={`project-card-image${project.imageFit === 'contain' ? ' project-card-image--contain' : ''}${className ? ' ' + className : ''}`}
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
                          <img className="thumb-clover-screen" src="/images/projects/clover-designer/screen.webp" alt="" />
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
  )
}
