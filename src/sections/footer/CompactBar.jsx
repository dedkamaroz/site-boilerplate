import { useState } from "react"
import { registerVariant } from "../registry"

// footer / compact-bar: a single slim bar. Left carries the copyright (© year +
// name); the centre/right carries inline nav links and/or the email; legal bits
// (ABN, licence) are appended only when present. Minimal height, no big grid.
// Every brand field is self-hiding: absent/empty fields render no markup and
// leave no empty labels or stray separators.
export function CompactBar({ brand = {}, nav = [], year }) {
  const [hovered, setHovered] = useState(null)
  const { name, email, abn, licenceNumber } = brand
  const copyrightYear = year || new Date().getFullYear()

  // Left-hand copyright + legal bits, each self-hiding.
  const legalParts = [
    name ? `© ${copyrightYear} ${name}` : `© ${copyrightYear}`,
    abn ? `ABN ${abn}` : null,
    licenceNumber ? licenceNumber : null,
  ].filter(Boolean)

  const footer = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-surface)",
    borderTop: "1px solid var(--color-border)",
    fontFamily: "var(--font-body)",
  }
  const inner = {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  }
  const legal = {
    color: "var(--color-muted)",
    fontSize: "0.75rem",
    letterSpacing: "0.03em",
  }
  const right = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "1.25rem",
  }
  const link = (key) => ({
    color: hovered === key ? "var(--color-text)" : "var(--color-muted)",
    textDecoration: "none",
    fontSize: "0.78rem",
    transition: "color 0.2s ease",
  })

  const hover = (key) => ({
    onMouseEnter: () => setHovered(key),
    onMouseLeave: () => setHovered(null),
  })

  const hasRight = nav.length > 0 || email

  return (
    <footer style={footer}>
      <div style={inner}>
        {/* Left: copyright + legal bits */}
        <span style={legal}>{legalParts.join("  ·  ")}</span>

        {/* Right: inline nav and/or email */}
        {hasRight ? (
          <div style={right}>
            {nav.map((l, i) => (
              <a key={l.href} href={l.href} style={link(`nav-${i}`)} {...hover(`nav-${i}`)}>
                {l.label}
              </a>
            ))}
            {email ? (
              <a href={`mailto:${email}`} style={link("email")} {...hover("email")}>
                {email}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </footer>
  )
}

registerVariant("footer", "compact-bar", CompactBar)
