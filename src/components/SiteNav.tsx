import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SiteNavProps {
  /** On the home page the section links are plain in-page anchors. */
  home?: boolean
  /** Highlights the matching link. */
  active?: 'beyond-ux'
}

// Shared top nav. Below the tablet breakpoint the links collapse into a hamburger menu.
// The open state lives in a data attribute (not a class) so it can't clobber the `nav--dark`
// class that useNavTheme toggles directly on this element.
export default function SiteNav({ home = false, active }: SiteNavProps) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const section = (hash: string, label: string) =>
    home ? (
      <a href={`#${hash}`} onClick={close}>{label}</a>
    ) : (
      <Link to={`/#${hash}`} onClick={close}>{label}</Link>
    )

  return (
    <nav className="nav" data-open={open}>
      {home ? (
        <a href="#top" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); close() }}>Fatima Rafiqui</a>
      ) : (
        <Link to="/" className="nav-logo">Fatima Rafiqui</Link>
      )}
      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="site-nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true" />
      </button>
      <div className="nav-links" id="site-nav-links">
        {section('work', 'Work')}
        {section('about', 'About')}
        <Link to="/beyond-ux" className={active === 'beyond-ux' ? 'nav-active' : undefined} onClick={close}>
          Beyond UX
        </Link>
        {section('contact', 'Contact')}
      </div>
    </nav>
  )
}
