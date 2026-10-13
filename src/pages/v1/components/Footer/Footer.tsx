import './Footer.css'

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Experts', href: '#experts' },
  { label: 'Plans', href: '#plans' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <a className="site-footer__logo" href="#top" aria-label="Practice Prism home">
            <img src="/practice-prism-logo.png" alt="Practice Prism" />
          </a>
          <nav className="site-footer__links" aria-label="Footer navigation">
            {links.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
            <span>Privacy</span>
            <span>Terms</span>
          </nav>
        </div>
        <div className="site-footer__divider" />
        <div className="site-footer__bottom">
          <span>© 2026 Practice Prism</span>
          <span>Built for chiropractic clinics in the US and Canada.</span>
        </div>
      </div>
    </footer>
  )
}
