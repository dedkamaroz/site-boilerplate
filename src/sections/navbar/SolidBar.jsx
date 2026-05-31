import { useState, useEffect } from "react"
import { registerVariant } from "../registry"

const NAV_HEIGHT = 72

// navbar / solid-bar: a fixed top bar that is ALWAYS solid - it never goes
// transparent over a hero. Background var(--color-surface) with a bottom border,
// brand on the left, nav links and a CTA on the right, and a mobile hamburger
// overlay. Reads config brand + nav only; no client literals.
export function SolidBar({ brand = {}, nav = [], cta = {} }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [ctaHover, setCtaHover] = useState(false)

  const { name, logo, phone } = brand
  const ctaLabel = cta.label || (phone ? `Call ${phone}` : "Contact")
  const ctaHref = cta.href || (phone ? `tel:${phone.replace(/\s/g, "")}` : "/contact")

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
    background: "var(--color-surface)",
    borderBottom: "1px solid var(--color-border)",
    boxSizing: "border-box",
    fontFamily: "var(--font-body)",
  }

  const logoStyle = {
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
    fontFamily: "var(--font-heading)",
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

  const ctaStyle = {
    background: ctaHover ? "var(--color-accent)" : "transparent",
    color: ctaHover ? "var(--color-bg)" : "var(--color-text)",
    border: "1px solid var(--color-text)",
    borderRadius: "var(--radius)",
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
        {/* Logo / brand */}
        <a href="/" style={logoStyle}>
          {logo ? (
            <img src={logo} alt={name || "Home"} style={{ height: 40, width: "auto" }} />
          ) : (
            <span>{name}</span>
          )}
        </a>

        {/* Desktop links */}
        {nav.length > 0 ? (
          <ul style={desktopLinks} className="bp-solid-nav-desktop">
            {nav.map((l, i) => (
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
        ) : null}

        {/* CTA */}
        <a
          href={ctaHref}
          style={ctaStyle}
          className="bp-solid-nav-cta"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
        >
          {ctaLabel}
        </a>

        {/* Hamburger - shown via media query class below */}
        <button
          style={hamburger}
          className="bp-solid-nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              ...hamburgerLine,
              transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span style={{ ...hamburgerLine, opacity: mobileOpen ? 0 : 1 }} />
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
        {nav.map((l) => (
          <a key={l.href} href={l.href} style={overlayLink} onClick={() => setMobileOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href={ctaHref}
          style={{ ...ctaStyle, fontSize: "1rem", padding: "0.75rem 2rem" }}
          onClick={() => setMobileOpen(false)}
        >
          {ctaLabel}
        </a>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bp-solid-nav-desktop { display: none !important; }
          .bp-solid-nav-cta     { display: none !important; }
          .bp-solid-nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

registerVariant("navbar", "solid-bar", SolidBar)
