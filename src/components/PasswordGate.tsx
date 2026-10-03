import { useState } from 'react'
import SiteNav from './SiteNav'
import { useNavTheme } from '../hooks/useNavTheme'
import './PasswordGate.css'

interface PasswordGateProps {
  projectTitle: string
  projectCategory: string
  children: React.ReactNode
}

const STORED_KEY = 'portfolio_access_granted'


// A little green, big-eared sage waving hello, with a few small rocks hovering in the air (an original drawing).
function Sage({ oops }: { oops: boolean }) {
  return (
    <svg className={`gate-monster${oops ? ' gate-oops' : ''}`} viewBox="0 0 320 340" aria-hidden="true">
      <defs>
        <linearGradient id="gate-robe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c19a8f" />
          <stop offset="1" stopColor="#8f6c65" />
        </linearGradient>
        <linearGradient id="gate-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8e69a" />
          <stop offset="1" stopColor="#a9d27f" />
        </linearGradient>
      </defs>
      <ellipse className="gate-shadow" cx="160" cy="328" rx="88" ry="9" fill="#2c3e2d" opacity="0.12" />
      <g className="gate-monster-float">
        <circle className="gate-force gate-force--1" cx="160" cy="170" r="122" fill="none" stroke="#7a9e7e" strokeWidth="3" />
        <circle className="gate-force gate-force--2" cx="160" cy="170" r="122" fill="none" stroke="#7a9e7e" strokeWidth="3" />
        {/* the round hover-pod behind him */}
        <circle cx="160" cy="160" r="112" fill="#d3e4d4" />
        <path className="gate-spokes" d="M160 48v112M92 76l68 84M228 76l-68 84M60 130l100 30M260 130l-100 30" fill="none" stroke="#bfd6c2" strokeWidth="3" strokeLinecap="round" />
        <g className="gate-monster-body">
          {/* robe */}
          <path d="M84 310c-6-76 8-140 76-150s82 80 76 150z" fill="url(#gate-robe)" />
          <path d="M102 162c16 8 36 14 58 14s42-6 58-14c8 32-20 60-58 60s-66-28-58-60z" fill="#a47d74" />
          <path d="M116 262c24 14 64 14 88 0M130 292c18 6 42 6 60 0" fill="none" stroke="#7d5b55" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
          {/* waving arm and hand */}
          <path d="M96 244C72 224 54 194 58 162l30-4c0 20 14 34 42 42l8 40z" fill="#b08880" />
          <path d="M104 222c10 8 24 14 40 18" fill="none" stroke="#8f6c65" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
          <path d="M56 164c10 6 24 6 34-2l-2-12c-9 5-21 5-30 0z" fill="#8f6c65" />
          {/* big ears: one perked up, one drooping out */}
          <g className="gate-ear gate-ear--l">
            <path d="M108 116C80 80 42 66 14 74c22 38 62 58 96 60z" fill="url(#gate-skin)" />
            <path d="M100 116C82 94 58 84 38 86c14 20 38 34 62 38z" fill="#f2d4b6" />
          </g>
          <g className="gate-ear gate-ear--r">
            <path d="M214 120c32-8 70 4 94 30-30 12-70 2-98-14z" fill="url(#gate-skin)" />
            <path d="M222 126c22-2 46 6 64 20-24 4-48-2-68-12z" fill="#f2d4b6" />
          </g>
          {/* the waving hand, in front of the raised ear */}
          <g className="gate-wave">
            <g fill="url(#gate-skin)" stroke="#8fbf68" strokeWidth="1.6">
              <ellipse cx="57" cy="128" rx="5" ry="10.5" transform="rotate(-28 57 128)" />
              <ellipse cx="72" cy="121" rx="5.2" ry="11.5" />
              <ellipse cx="87" cy="128" rx="5" ry="10.5" transform="rotate(28 87 128)" />
              <ellipse cx="72" cy="146" rx="14.5" ry="13" />
            </g>
          </g>
          {/* head, tilting a little as he breathes */}
          <g className="gate-head">
          <ellipse cx="160" cy="128" rx="60" ry="53" fill="url(#gate-skin)" />
          <path d="M144 80q6-9 12-2M158 76q6-8 12-1M172 80q5-7 10 0" fill="none" stroke="#86b46c" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M122 102q12-7 24-1M174 101q12-6 24 1" fill="none" stroke="#86b46c" strokeWidth="3" strokeLinecap="round" />
          {/* big shiny eyes, which blink now and then */}
          <g className="gate-eyes">
          <ellipse cx="134" cy="128" rx="17" ry="19" fill="#201a26" />
          <ellipse cx="186" cy="128" rx="17" ry="19" fill="#201a26" />
          <circle cx="128" cy="121" r="6" fill="#fff" />
          <circle cx="180" cy="121" r="6" fill="#fff" />
          <circle cx="141" cy="138" r="2.6" fill="#fff" opacity="0.8" />
          <circle cx="193" cy="138" r="2.6" fill="#fff" opacity="0.8" />
          </g>
          {/* nose and a happy little smile */}
          <ellipse cx="160" cy="150" rx="4.5" ry="3.2" fill="#8fbb74" />
          <path d="M149 165q12 10 24-1" fill="none" stroke="#5f8c52" strokeWidth="2.6" strokeLinecap="round" />
          </g>
        </g>
        {/* little twinkles */}
        <path className="gate-star gate-star--1" d="M0-7L2-2 7 0 2 2 0 7-2 2-7 0-2-2z" transform="translate(262 70)" fill="#d9b86a" />
        <path className="gate-star gate-star--2" d="M0-5L1.5-1.5 5 0 1.5 1.5 0 5-1.5 1.5-5 0-1.5-1.5z" transform="translate(48 120)" fill="#d9b86a" />
        <path className="gate-star gate-star--3" d="M0-5L1.5-1.5 5 0 1.5 1.5 0 5-1.5 1.5-5 0-1.5-1.5z" transform="translate(278 200)" fill="#d9b86a" />
        {/* rocks hovering in the air */}
        <path className="gate-rock gate-rock--1" d="M40 208l14-7 11 9-4 13-17 3z" fill="#a98f82" />
        <path className="gate-rock gate-rock--2" d="M262 232l13-6 9 9-6 11-15 0z" fill="#9c8478" />
        <path className="gate-rock gate-rock--3" d="M250 96l9-3 7 7-5 8-11 0z" fill="#b59d90" />
      </g>
    </svg>
  )
}

export default function PasswordGate({ projectTitle, projectCategory, children }: PasswordGateProps) {
  useNavTheme()
  const [granted, setGranted] = useState(() => sessionStorage.getItem(STORED_KEY) === 'true')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // SHA-256 would be better but for a portfolio gate, simple comparison to env var is fine
    // The password is checked client-side - this is a deterrent, not true security
    if (password === import.meta.env.VITE_PROJECT_PASSWORD) {
      sessionStorage.setItem(STORED_KEY, 'true')
      setGranted(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (granted) {
    return <>{children}</>
  }

  return (
    <div className="gate">
      <div className="gate-bg" aria-hidden="true">
        <span className="gate-sparkle gate-sparkle--1" />
        <span className="gate-sparkle gate-sparkle--2" />
        <span className="gate-sparkle gate-sparkle--3" />
        <span className="gate-leaf gate-leaf--1" />
        <span className="gate-leaf gate-leaf--2" />
        <span className="gate-leaf gate-leaf--3" />
      </div>
      <SiteNav />
      <div className="gate-main">
        <Sage oops={error} />

        <div className="gate-lock">
          <span className="gate-category">{projectCategory}</span>
          <h1 className="gate-title">{projectTitle}</h1>
          <p className="gate-message">
            <span>Under NDA, this one is. Master told me so.</span>
            <span>Breathe, then enter the password.</span>
          </p>
          <form className="gate-form" onSubmit={handleSubmit}>
            <input
              type="password"
              className={`gate-input ${error ? 'gate-input-error' : ''}`}
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              autoFocus
            />
            <button type="submit" className="gate-submit">Unlock</button>
          </form>
          {error && <p className="gate-error">Hmm, not quite. Breathe in, breathe out, try again you must.</p>}
        </div>
      </div>
    </div>
  )
}
