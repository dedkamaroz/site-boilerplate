import { useState, useEffect } from "react"

const NAV_HEIGHT = 72

const defaultLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export default function NavBar({
  logoSrc = "",
  logoText = "DISTRO 3D",
  links = defaultLinks,
  ctaLabel = "Let's Talk",
  ctaHref = "/contact",
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [ctaHover, setCtaHover] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const bar = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: NAV_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    transition: "background 0.3s ease, border-color 0.3s ease",
    background: scrolled ? "var(--color-surface)" : "transparent",
    borderBottom: scrolled ? `1px solid var(--color-border)` : "1px solid transparent",
    boxSizing: "border-box",
    fontFamily: "var(--font-body)",
  }

  const logo = {
    color: "var(--color-text)",
    fontWeight: 700,
    fontSize: "1.1rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexShrink: 0,
  }

  const desktopLinks = {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  }

  const linkStyle = (i) => ({
    color: hoveredLink === i ? "var(--color-text)" : "var(--color-muted)",
    textDecoration: "none",
    fontSize: "0.875rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    transition: "color 0.2s ease",
    cursor: "pointer",
  })

  const cta = {
    background: ctaHover ? "var(--color-text)" : "transparent",
    color: ctaHover ? "var(--color-bg)" : "var(--color-text)",
    border: `1px solid var(--color-text)`,
    padding: "0.5rem 1.25rem",
    fontSize: "0.8rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s ease, color 0.2s ease",
    whiteSpace: "nowrap",
  }

  const hamburger = {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    cursor: "pointer",
    padding: "4px",
    background: "none",
    border: "none",
  }

  const hamburgerLine = {
    width: "22px",
    height: "2px",
    background: "var(--color-text)",
    transition: "all 0.2s ease",
  }

  const overlay = {
    position: "fixed",
    inset: 0,
    zIndex: 99,
    background: "var(--color-bg)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    opacity: mobileOpen ? 1 : 0,
    pointerEvents: mobileOpen ? "all" : "none",
    transition: "opacity 0.25s ease",
  }

  const overlayLink = {
    color: "var(--color-text)",
    textDecoration: "none",
    fontSize: "2rem",
    fontWeight: 300,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  }

  return (
    <>
      <nav style={bar}>
        {/* Logo */}
        <a href="/" style={logo}>
          {logoSrc ? (
            <img src={logoSrc} alt={logoText} style={{ height: 40, width: "auto" }} />
          ) : (
            <span>{logoText}</span>
          )}
        </a>

        {/* Desktop links */}
        <ul style={desktopLinks} className="distro-nav-desktop">
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={linkStyle(i)}
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={ctaHref}
          style={cta}
          className="distro-nav-cta"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
        >
          {ctaLabel}
        </a>

        {/* Hamburger — shown via media query class below */}
        <button
          style={hamburger}
          className="distro-nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              ...hamburgerLine,
              transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            style={{
              ...hamburgerLine,
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              ...hamburgerLine,
              transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div style={overlay}>
        {links.map((l) => (
          <a key={l.href} href={l.href} style={overlayLink} onClick={() => setMobileOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href={ctaHref}
          style={{ ...cta, fontSize: "1rem", padding: "0.75rem 2rem" }}
          onClick={() => setMobileOpen(false)}
        >
          {ctaLabel}
        </a>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .distro-nav-desktop { display: none !important; }
          .distro-nav-cta     { display: none !important; }
          .distro-nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
