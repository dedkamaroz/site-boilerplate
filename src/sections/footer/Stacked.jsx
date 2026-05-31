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

// footer / stacked: a centred, vertically stacked footer - logo/name, optional
// tagline, a horizontal row of nav links, contact (email/phone), HoursBlock when
// hours are present, a social row, then a centred legal line. Every brand field
// is self-hiding: absent/empty fields render no markup, leaving no empty labels
// or stray separators.
export function Stacked({ brand = {}, nav = [], year }) {
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

  // Legal bits joined with a separator, each self-hiding.
  const legalParts = [
    name ? `© ${copyrightYear} ${name}. All rights reserved.` : null,
    abn ? `ABN ${abn}` : null,
    licenceNumber ? licenceNumber : null,
  ].filter(Boolean)

  const footer = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    borderTop: "1px solid var(--color-border)",
    fontFamily: "var(--font-body)",
  }
  const inner = {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "4rem 2rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "1.25rem",
  }
  const logoStyle = {
    color: "var(--color-text)",
    fontWeight: 700,
    fontSize: "1.1rem",
    letterSpacing: "0.08em",
    textDecoration: "none",
    fontFamily: "var(--font-heading)",
  }
  const muted = { color: "var(--color-muted)", fontSize: "0.82rem", lineHeight: 1.6, margin: 0 }
  const navRow = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  }
  const contactRow = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1.5rem",
  }
  const socialRow = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }
  const link = (key) => ({
    color: hovered === key ? "var(--color-text)" : "var(--color-muted)",
    textDecoration: "none",
    fontSize: "0.82rem",
    transition: "color 0.2s ease",
  })
  const legal = {
    color: "var(--color-muted)",
    fontSize: "0.75rem",
    letterSpacing: "0.03em",
    borderTop: "1px solid var(--color-border)",
    paddingTop: "1.5rem",
    marginTop: "0.5rem",
    width: "100%",
  }

  const hover = (key) => ({
    onMouseEnter: () => setHovered(key),
    onMouseLeave: () => setHovered(null),
  })

  return (
    <footer style={footer}>
      <div style={inner}>
        {/* Brand */}
        <a href="/" style={logoStyle}>
          {logo ? <img src={logo} alt={name} style={{ height: 36, width: "auto" }} /> : name}
        </a>
        {tagline ? <p style={muted}>{tagline}</p> : null}
        {serviceArea ? <p style={muted}>Servicing {serviceArea}</p> : null}

        {/* Nav row */}
        {nav.length > 0 ? (
          <nav style={navRow}>
            {nav.map((l, i) => (
              <a key={l.href} href={l.href} style={link(`nav-${i}`)} {...hover(`nav-${i}`)}>
                {l.label}
              </a>
            ))}
          </nav>
        ) : null}

        {/* Contact */}
        {email || phone ? (
          <div style={contactRow}>
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
          </div>
        ) : null}

        {/* Hours */}
        <HoursBlock hours={hours} />

        {/* Social */}
        {socials.length > 0 ? (
          <div style={socialRow}>
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

        {/* Centred legal line */}
        {legalParts.length > 0 ? (
          <span style={legal}>{legalParts.join("  ·  ")}</span>
        ) : null}
      </div>
    </footer>
  )
}

registerVariant("footer", "stacked", Stacked)
