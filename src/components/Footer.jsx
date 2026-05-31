import { useState } from "react"

const navLinks = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
]

export default function Footer({
  logoSrc  = "",
  logoText = "DISTRO 3D",
  tagline  = "CGI · Motion Graphics · 3D Visualisation",
  email    = "hello@distro3d.com",
  phone    = "02 8030 4133",
}) {
  const [hovered, setHovered] = useState(null)

  const footer = {
    width:      "100%",
    boxSizing:  "border-box",
    background: "var(--color-bg)",
    borderTop:  `1px solid var(--color-border)`,
    fontFamily: "var(--font-body)",
  }

  const inner = {
    maxWidth:       1280,
    margin:         "0 auto",
    padding:        "4rem 2rem 2rem",
  }

  const grid = {
    display:             "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap:                 "2rem",
    alignItems:          "start",
    marginBottom:        "3rem",
  }

  const logoCol = {
    display:       "flex",
    flexDirection: "column",
    gap:           "0.75rem",
  }

  const logoStyle = {
    color:          "var(--color-text)",
    fontWeight:     700,
    fontSize:       "1rem",
    letterSpacing:  "0.12em",
    textTransform:  "uppercase",
    textDecoration: "none",
  }

  const taglineStyle = {
    color:      "var(--color-muted)",
    fontSize:   "0.8rem",
    letterSpacing: "0.06em",
    lineHeight: 1.6,
  }

  const navCol = {
    display:       "flex",
    flexDirection: "column",
    gap:           "0.75rem",
    alignItems:    "center",
  }

  const navLinkStyle = (i) => ({
    color:          hovered === `nav-${i}` ? "var(--color-text)" : "var(--color-muted)",
    textDecoration: "none",
    fontSize:       "0.8rem",
    letterSpacing:  "0.08em",
    textTransform:  "uppercase",
    transition:     "color 0.2s ease",
  })

  const socialCol = {
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "flex-end",
    gap:            "1rem",
  }

  const socialRow = {
    display: "flex",
    gap:     "1rem",
  }

  const socialIcon = (key) => ({
    color:      hovered === `soc-${key}` ? "var(--color-text)" : "var(--color-muted)",
    transition: "color 0.2s ease",
    cursor:     "pointer",
    textDecoration: "none",
    display:    "flex",
  })

  const emailStyle = {
    color:          hovered === "email" ? "var(--color-text)" : "var(--color-muted)",
    textDecoration: "none",
    fontSize:       "0.8rem",
    letterSpacing:  "0.04em",
    transition:     "color 0.2s ease",
  }

  const bar = {
    borderTop:      `1px solid var(--color-border)`,
    paddingTop:     "1.5rem",
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "center",
    flexWrap:       "wrap",
    gap:            "0.5rem",
  }

  const barText = {
    color:      "var(--color-muted)",
    fontSize:   "0.75rem",
    letterSpacing: "0.04em",
  }

  return (
    <footer style={footer}>
      <div style={inner}>
        <div style={grid}>
          {/* Logo + tagline */}
          <div style={logoCol}>
            <a href="/" style={logoStyle}>
              {logoSrc
                ? <img src={logoSrc} alt={logoText} style={{ height: 32, width: "auto" }} />
                : logoText
              }
            </a>
            <p style={taglineStyle}>{tagline}</p>
          </div>

          {/* Nav links */}
          <nav style={navCol}>
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                style={navLinkStyle(i)}
                onMouseEnter={() => setHovered(`nav-${i}`)}
                onMouseLeave={() => setHovered(null)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Email + Phone */}
          <div style={socialCol}>
            <a
              href={`mailto:${email}`}
              style={emailStyle}
              onMouseEnter={() => setHovered("email")}
              onMouseLeave={() => setHovered(null)}
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              style={{
                ...emailStyle,
                color: hovered === "phone" ? "var(--color-text)" : "var(--color-muted)",
              }}
              onMouseEnter={() => setHovered("phone")}
              onMouseLeave={() => setHovered(null)}
            >
              {phone}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={bar}>
          <span style={barText}>© {new Date().getFullYear()} DISTRO 3D. All rights reserved.</span>
          <span style={barText}>ABN 49 838 083 890</span>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <a href="/privacy-policy" style={{ ...barText, textDecoration: "none" }}>Privacy Policy</a>
            <a href="/terms" style={{ ...barText, textDecoration: "none" }}>Terms & Conditions</a>
            <span style={barText}>distro3d.com</span>
          </div>
        </div>
      </div>

      {/* Responsive grid collapse */}
      <style>{`
        @media (max-width: 767px) {
          .distro-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
