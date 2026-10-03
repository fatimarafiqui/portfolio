import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const jump = (top: number) => window.scrollTo({ top, left: 0, behavior: 'instant' as ScrollBehavior })

// Fixes scroll position on route changes: new pages open at the top (or at the #section from a link like /#work),
// and Back/Forward return to where you were. `scroll-behavior: smooth` is on globally, so every jump here is instant,
// otherwise a new page would visibly glide up from wherever the last one was scrolled.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navType = useNavigationType()
  const positions = useRef<Record<string, number>>({})
  const prev = useRef({ key, pathname })

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  useLayoutEffect(() => {
    const last = prev.current
    positions.current[last.key] = window.scrollY
    prev.current = { key, pathname }

    // Same page, new hash: the browser's own anchor scroll (smooth) already handled it
    if (last.pathname === pathname && hash && last.key !== key) return

    if (hash) {
      let tries = 0
      const go = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
        else if (tries++ < 30) requestAnimationFrame(go)
      }
      go()
    } else if (navType === 'POP' && positions.current[key] !== undefined) {
      jump(positions.current[key])
    } else {
      jump(0)
    }
  }, [pathname, hash, key, navType])

  return null
}
