import { useEffect } from 'react'

const parseRgb = (value: string) => {
  const m = value.match(/rgba?\(([^)]+)\)/)
  if (!m) return null
  const [r, g, b, a = '1'] = m[1].split(/[,\s/]+/).filter(Boolean)
  return { r: +r, g: +g, b: +b, a: +a }
}

// Finds the first opaque-ish background behind the nav and reports whether it is dark.
const isDarkBehind = (nav: HTMLElement) => {
  const y = nav.getBoundingClientRect().bottom - 1
  const stack = document.elementsFromPoint(window.innerWidth / 2, y)
  for (const start of stack) {
    if (nav.contains(start)) continue
    for (let el: Element | null = start; el; el = el.parentElement) {
      const c = parseRgb(getComputedStyle(el).backgroundColor)
      if (c && c.a > 0.5) {
        return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255 < 0.45
      }
    }
  }
  return false
}

// Toggles `nav--dark` on the nav while it sits over a dark section.
export function useNavTheme() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.nav')
    if (!nav) return
    let raf = 0
    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        nav.classList.toggle('nav--dark', isDarkBehind(nav))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
}
