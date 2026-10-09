import { useEffect } from 'react'

// Safety net: any link that leaves the site (or opens a PDF) opens in a new tab, even if it was written without
// target="_blank". mailto: and tel: links, in-page anchors and routes within the site are left alone.
export default function ExternalLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.target || a.hasAttribute('download')) return
      let url: URL
      try { url = new URL(a.href, window.location.href) } catch { return }
      if (!/^https?:$/.test(url.protocol)) return
      const leaves = url.origin !== window.location.origin || /\.pdf$/i.test(url.pathname)
      if (!leaves) return
      e.preventDefault()
      window.open(url.href, '_blank', 'noopener,noreferrer')
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
