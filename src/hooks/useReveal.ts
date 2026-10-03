import { useEffect, type RefObject } from 'react'

// Fades in `.reveal` elements inside `ref` as they scroll into view (the home page does the same for its own sections).
export function useReveal(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    root.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ref])
}
