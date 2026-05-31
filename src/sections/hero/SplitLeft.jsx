import { useState } from "react"
import Media from "../shared/Media"
import { registerVariant } from "../registry"

// hero / split-left: two-column layout - text and CTA on the left, Media on the
// right. Stacks to a single column on mobile via a media-query class. Renders
// standalone with no props for the gallery.
export function SplitLeft({
  brand,
  headline = "Built to Make Your Brand Impossible to Ignore",
  subline = "Strategy, design and production under one roof.",
  ctaLabel = "Start a Project",
  ctaHref = "/contact",
  media = undefined,
}) {
  const [ctaHover, setCtaHover] = useState(false)

  const outer = {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    minHeight: "100dvh",
    background: "var(--color-bg)",
    fontFamily: "var(--font-body)",
    display: "flex",
    alignItems: "center",
  }

  const grid = {
    width: "100%",
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "4rem 2rem",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    alignItems: "center",
  }

  const textCol = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1.25rem",
  }

  const h1 = {
    color: "var(--color-text)",
    fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    margin: 0,
    fontFamily: "var(--font-heading)",
  }

  const sub = {
    color: "var(--color-muted)",
    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
    lineHeight: 1.6,
    margin: 0,
  }

  const ctaBtn = {
    display: "inline-block",
    marginTop: "0.75rem",
    background: ctaHover ? "var(--color-text)" : "var(--color-accent)",
    color: "var(--color-bg)",
    border: "1px solid var(--color-accent)",
    borderRadius: "var(--radius)",
    padding: "0.85rem 2.25rem",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.25s ease",
  }

  const mediaWrap = {
    position: "relative",
    width: "100%",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    borderRadius: "var(--radius)",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
  }

  const mediaStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  }

  return (
    <section
      style={outer}
      data-section-type="hero"
      data-variant="split-left"
      aria-label={brand?.name}
    >
      <div style={grid} className="bp-hero-split">
        <div style={textCol}>
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
        <div style={mediaWrap} className="bp-hero-split-media">
          <Media media={media} style={mediaStyle} alt={media?.alt ?? ""} />
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bp-hero-split { grid-template-columns: 1fr !important; }
          .bp-hero-split-media { order: -1; }
        }
      `}</style>
    </section>
  )
}

registerVariant("hero", "split-left", SplitLeft)
