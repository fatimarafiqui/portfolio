import { Link, useLocation } from 'react-router-dom'
import './ReturnChip.css'

// If Play mode is on and you end up on a regular page (a deep link, the Back button), this is the way back to the galaxy.
// Play mode is remembered in sessionStorage by App, and the home page opens the arena when it is on.
export default function ReturnChip() {
  const { pathname } = useLocation()
  let playing = false
  try { playing = sessionStorage.getItem('portfolio-play') === '1' } catch { /* private mode: no chip */ }
  if (pathname === '/' || !playing) return null
  return (
    <Link className="return-chip" to="/">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 12 9 9.5 11 4l1 5.5L22 11v2l-10 1.5L11 20l-2-5.5z" fill="currentColor" />
      </svg>
      Return to the galaxy
    </Link>
  )
}
