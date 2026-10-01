import { useState } from 'react'
import { Link } from 'react-router-dom'
import './PasswordGate.css'

interface PasswordGateProps {
  projectTitle: string
  projectCategory: string
  children: React.ReactNode
}

const STORED_KEY = 'portfolio_access_granted'

export default function PasswordGate({ projectTitle, projectCategory, children }: PasswordGateProps) {
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
      <div className="gate-bg"></div>
      <nav className="nav">
        <Link to="/" className="nav-logo">Fatima Rafiqui</Link>
        <div className="nav-links">
          <Link to="/#work">Work</Link>
          <Link to="/#about">About</Link>
          <Link to="/beyond-ux">Beyond UX</Link>
          <Link to="/#contact">Contact</Link>
        </div>
      </nav>
      <div className="gate-container">
        <div className="gate-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            <circle cx="12" cy="16" r="1"/>
          </svg>
        </div>
        <span className="gate-category">{projectCategory}</span>
        <h1 className="gate-title">{projectTitle}</h1>
        <p className="gate-message">
          This case study is under lock &amp; key.<br/>
          Enter the password to continue.
        </p>
        <form className="gate-form" onSubmit={handleSubmit}>
          <input
            type="password"
            className={`gate-input ${error ? 'gate-input-error' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            autoFocus
          />
          <button type="submit" className="gate-submit">Unlock &rarr;</button>
        </form>
        {error && <p className="gate-error">Hmm, that's not it. Try again.</p>}
      </div>
    </div>
  )
}
