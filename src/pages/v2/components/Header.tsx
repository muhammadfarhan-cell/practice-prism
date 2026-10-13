import { useEffect, useRef, useState } from 'react'

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Experts', href: '#experts' },
  { label: 'Plans', href: '#plans' },
]

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const currentY = Math.max(0, window.scrollY)
      const difference = currentY - lastY

      const keyboardFocusInHeader = headerRef.current?.contains(document.activeElement)
        && document.activeElement?.matches(':focus-visible')

      if (currentY <= 96 || keyboardFocusInHeader) {
        setHidden(false)
      } else if (Math.abs(difference) >= 8) {
        setHidden(difference > 0)
      }

      if (Math.abs(difference) >= 8 || currentY <= 96) lastY = currentY
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header ref={headerRef} className={`site-header${hidden ? ' site-header--hidden' : ''}`} onFocusCapture={() => setHidden(false)}>
      <div className="site-header__inner">
        <a className="site-header__brand" href="#top" aria-label="Practice Prism home">
          <img src="/practice-prism-logo.png" alt="Practice Prism" />
        </a>
        <nav className="site-header__nav" aria-label="Main navigation">
          {links.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="site-header__actions">
          <a className="site-header__login" href="#login">Log in</a>
          <a className="button button--gold" href="#plans">Get Clarity with Prism</a>
        </div>
      </div>
    </header>
  )
}
