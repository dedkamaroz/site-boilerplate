import { useState } from "react"
import { registerVariant } from "../registry"

// hero / minimal-card: no background media. A restrained, contained centred
// layout - big headline, subline and a single CTA on a plain var(--color-bg)
// background with generous spacing. Renders standalone with no props.
export function MinimalCard({
  brand,
  headline = "Less Noise. More Signal.",
  subline = "A focused studio for teams who want one thing done exceptionally well.",
  ctaLabel = "Get in Touch",
  ctaHref = "/contact",
  // media intentionally unused - this variant carries no background imagery.
  media = undefined,
}) {
  const [ctaHover, setCtaHover] = useState(false)

  const outer = {
    width: "100%",
    boxSizing: "border-box",
    minHeight: "100dvh",
    background: "var(--color-bg)",
    fontFamily: "var(--font-body)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6rem 1.5rem",
  }

  const card = {
    maxWidth: 720,
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.75rem",
  }

  const eyebrow = {
    color: "var(--color-accent)",
    fontSize: "0.75rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    margin: 0,
    fontFamily: "var(--font-heading)",
  }

  const h1 = {
    color: "var(--color-text)",
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    margin: 0,
    fontFamily: "var(--font-heading)",
  }

  const sub = {
    color: "var(--color-muted)",
    fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 540,
  }

  const ctaBtn = {
    display: "inline-block",
    marginTop: "0.5rem",
    background: ctaHover ? "var(--color-text)" : "transparent",
    color: ctaHover ? "var(--color-bg)" : "var(--color-text)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "0.9rem 2.5rem",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.25s ease, color 0.25s ease",
  }

  return (
    <section style={outer} data-section-type="hero" data-variant="minimal-card">
      <div style={card}>
        {brand?.name ? <p style={eyebrow}>{brand.name}</p> : null}
        <h1 style={h1}>{headline}</h1>
        {subline ? <p style={sub}>{subline}</p> : null}
        {ctaLabel ? (
          <a
            href={ctaHref}
            style={ctaBtn}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>
    </section>
  )
}

registerVariant("hero", "minimal-card", MinimalCard)
