const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Experts', href: '#experts' },
  { label: 'Plans', href: '#plans' },
]

export function Header() {
  return (
    <header className="site-header">
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
