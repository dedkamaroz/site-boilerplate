import { useState } from "react"
import Media from "../shared/Media"
import { registerVariant } from "../registry"

// hero / centred-over-media: full-bleed Media background (image or video) with a
// theme-tracking gradient overlay, content centred over it. Adapted from the
// original DISTRO 3D hero. Renders standalone with no props for the gallery.
export function CentredOverMedia({
  brand,
  headline = "We Make the Impossible Look Real",
  subline = "CGI · Motion Graphics · 3D Visualisation",
  ctaLabel = "See Our Work",
  ctaHref = "/work",
  media = undefined,
}) {
  const [ctaHover, setCtaHover] = useState(false)
  const [scrollHover, setScrollHover] = useState(false)

  const outer = {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    height: "100dvh",
    minHeight: 600,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--color-bg)",
    fontFamily: "var(--font-body)",
  }

  const mediaBg = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  }

  // Gradient overlay - heavier at top (nav legibility) and bottom (text legibility),
  // tracking the active theme via color-mix on var(--color-bg).
  const overlay = {
    position: "absolute",
    inset: 0,
    background: media?.src
      ? "linear-gradient(to bottom, color-mix(in srgb, var(--color-bg) 55%, transparent) 0%, color-mix(in srgb, var(--color-bg) 10%, transparent) 40%, color-mix(in srgb, var(--color-bg) 10%, transparent) 60%, color-mix(in srgb, var(--color-bg) 70%, transparent) 100%)"
      : "linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 50%, var(--color-bg) 100%)",
  }

  const content = {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "0 1.5rem",
    maxWidth: 900,
  }

  const h1 = {
    color: "var(--color-text)",
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    margin: "0 0 1.25rem",
    fontFamily: "var(--font-heading)",
  }

  const sub = {
    color: "var(--color-muted)",
    fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin: "0 0 2.5rem",
    fontWeight: 400,
  }

  const ctaBtn = {
    display: "inline-block",
    background: ctaHover ? "var(--color-text)" : "transparent",
    color: ctaHover ? "var(--color-bg)" : "var(--color-text)",
    border: "1px solid var(--color-text)",
    borderRadius: "var(--radius)",
    padding: "0.85rem 2.25rem",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.25s ease, color 0.25s ease",
  }

  const scrollIndicator = {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
    cursor: "pointer",
    color: scrollHover ? "var(--color-text)" : "var(--color-muted)",
    transition: "color 0.2s ease",
    textDecoration: "none",
  }

  const scrollText = {
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "inherit",
  }

  return (
    <section
      style={outer}
      data-section-type="hero"
      data-variant="centred-over-media"
      aria-label={brand?.name}
    >
      {/* Media background */}
      <Media media={media} style={mediaBg} alt={media?.alt ?? ""} />

      {/* Overlay */}
      <div style={overlay} />

      {/* Content */}
      <div style={content}>
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

      {/* Scroll indicator */}
      <a
        href={ctaHref}
        style={scrollIndicator}
        onMouseEnter={() => setScrollHover(true)}
        onMouseLeave={() => setScrollHover(false)}
        aria-label="Scroll down"
      >
        <span style={scrollText}>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="6" y="0" width="4" height="14" rx="2" fill="currentColor" opacity="0.4" />
          <style>{`
            @keyframes bp-hero-scroll-dot {
              0%   { transform: translateY(0); opacity: 0.8; }
              80%  { transform: translateY(8px); opacity: 0.1; }
              100% { transform: translateY(8px); opacity: 0; }
            }
          `}</style>
          <rect
            x="6"
            y="2"
            width="4"
            height="5"
            rx="2"
            fill="currentColor"
            style={{ animation: "bp-hero-scroll-dot 1.6s ease-in-out infinite" }}
          />
          <path
            d="M4 18L8 23L12 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </a>
    </section>
  )
}

registerVariant("hero", "centred-over-media", CentredOverMedia)
