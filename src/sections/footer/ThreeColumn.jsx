import { useState } from "react"
import HoursBlock from "../../components/HoursBlock"
import { registerVariant } from "../registry"

// Social platforms we know how to label. Only those with a non-empty url render.
const SOCIAL_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  youtube: "YouTube",
  tiktok: "TikTok",
}

// footer / three-column: brand + tagline, nav links, and a contact column, with
// a bottom bar carrying copyright, ABN, licence and service area. Every brand
// field is self-hiding: absent/empty fields render no markup and leave no empty
// labels or stray separators, so one footer serves a trade (ABN, licence, hours)
// and an agency (social only) alike.
export function ThreeColumn({ brand = {}, nav = [], year }) {
  const [hovered, setHovered] = useState(null)
  const {
    name,
    logo,
    tagline,
    email,
    phone,
    abn,
    licenceNumber,
    serviceArea,
    hours,
    social = {},
  } = brand

  const socials = Object.entries(social).filter(([, url]) => url)
  const copyrightYear = year || new Date().getFullYear()

  const footer = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    borderTop: "1px solid var(--color-border)",
    fontFamily: "var(--font-body)",
  }
  const inner = { maxWidth: "var(--max-width)", margin: "0 auto", padding: "4rem 2rem 2rem" }
  const grid = {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1.2fr",
    gap: "2rem",
    alignItems: "start",
    marginBottom: "3rem",
  }
  const col = { display: "flex", flexDirection: "column", gap: "0.75rem" }
  const logoStyle = {
    color: "var(--color-text)",
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: "0.08em",
    textDecoration: "none",
    fontFamily: "var(--font-heading)",
  }
  const muted = { color: "var(--color-muted)", fontSize: "0.82rem", lineHeight: 1.6 }
  const link = (key) => ({
    color: hovered === key ? "var(--color-text)" : "var(--color-muted)",
    textDecoration: "none",
    fontSize: "0.82rem",
    transition: "color 0.2s ease",
  })
  const bar = {
    borderTop: "1px solid var(--color-border)",
    paddingTop: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
  }
  const barText = { color: "var(--color-muted)", fontSize: "0.75rem", letterSpacing: "0.03em" }

  const hover = (key) => ({
    onMouseEnter: () => setHovered(key),
    onMouseLeave: () => setHovered(null),
  })

  return (
    <footer style={footer}>
      <div style={inner}>
        <div style={grid} className="bp-footer-grid">
          {/* Brand */}
          <div style={col}>
            <a href="/" style={logoStyle}>
              {logo ? <img src={logo} alt={name} style={{ height: 32, width: "auto" }} /> : name}
            </a>
            {tagline ? <p style={muted}>{tagline}</p> : null}
            {serviceArea ? <p style={muted}>Servicing {serviceArea}</p> : null}
          </div>

          {/* Nav */}
          {nav.length > 0 ? (
            <nav style={col}>
              {nav.map((l, i) => (
                <a key={l.href} href={l.href} style={link(`nav-${i}`)} {...hover(`nav-${i}`)}>
                  {l.label}
                </a>
              ))}
            </nav>
          ) : (
            <div />
          )}

          {/* Contact */}
          <div style={col}>
            {email ? (
              <a href={`mailto:${email}`} style={link("email")} {...hover("email")}>
                {email}
              </a>
            ) : null}
            {phone ? (
              <a href={`tel:${phone.replace(/\s/g, "")}`} style={link("phone")} {...hover("phone")}>
                {phone}
              </a>
            ) : null}
            <HoursBlock hours={hours} />
            {socials.length > 0 ? (
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.25rem" }}>
                {socials.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    aria-label={SOCIAL_LABELS[key] || key}
                    style={link(`soc-${key}`)}
                    {...hover(`soc-${key}`)}
                  >
                    {SOCIAL_LABELS[key] || key}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Bottom bar - each legal field self-hides */}
        <div style={bar}>
          <span style={barText}>
            © {copyrightYear} {name}. All rights reserved.
          </span>
          {abn ? <span style={barText}>ABN {abn}</span> : null}
          {licenceNumber ? <span style={barText}>{licenceNumber}</span> : null}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bp-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

registerVariant("footer", "three-column", ThreeColumn)
