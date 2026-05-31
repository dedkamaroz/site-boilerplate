import { useState } from "react"
import { registerVariant } from "../registry"
import { resolveCta } from "./ctaDefaults"

// ctaBanner / full-bleed: a full-width strip painted in the accent colour with the
// headline and CTA centred. Text sits on the accent so it uses var(--color-bg)
// for contrast. Renders standalone with sensible defaults for the gallery.
export function FullBleed({
  brand = { phone: "+61 2 8000 0000" },
  headline = "Ready to get started?",
  subline = "Talk to our team and get a quote today.",
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}) {
  const [ctaHover, setCtaHover] = useState(false)
  const [secHover, setSecHover] = useState(false)
  const cta = resolveCta({ ctaHref, ctaLabel: ctaLabel || "Get in touch", brand })

  const outer = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-accent)",
    fontFamily: "var(--font-body)",
  }
  const inner = {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "4rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "1rem",
  }
  const h2 = {
    color: "var(--color-bg)",
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
    margin: 0,
  }
  const sub = {
    color: "color-mix(in srgb, var(--color-bg) 80%, var(--color-accent))",
    fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 560,
  }
  const actions = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "0.75rem",
  }
  const primaryBtn = {
    display: "inline-block",
    background: ctaHover ? "color-mix(in srgb, var(--color-bg) 88%, var(--color-accent))" : "var(--color-bg)",
    color: "var(--color-accent)",
    border: "1px solid var(--color-bg)",
    borderRadius: "var(--radius)",
    padding: "0.85rem 2rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s ease",
  }
  const secondaryBtn = {
    display: "inline-block",
    background: secHover ? "color-mix(in srgb, var(--color-bg) 15%, transparent)" : "transparent",
    color: "var(--color-bg)",
    border: "1px solid var(--color-bg)",
    borderRadius: "var(--radius)",
    padding: "0.85rem 2rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s ease",
  }

  return (
    <section style={outer} data-section-type="ctaBanner" data-variant="full-bleed">
      <div style={inner}>
        <h2 style={h2}>{headline}</h2>
        {subline ? <p style={sub}>{subline}</p> : null}
        <div style={actions}>
          <a
            href={cta.href}
            style={primaryBtn}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            {cta.label}
          </a>
          {secondaryLabel ? (
            <a
              href={secondaryHref || "/contact"}
              style={secondaryBtn}
              onMouseEnter={() => setSecHover(true)}
              onMouseLeave={() => setSecHover(false)}
            >
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

registerVariant("ctaBanner", "full-bleed", FullBleed)
