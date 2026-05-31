import { useState } from "react"
import { registerVariant } from "../registry"
import { resolveCta } from "./ctaDefaults"

// ctaBanner / split: headline + subline on the left, CTA button(s) on the right,
// vertically aligned. Structurally a two-column row that collapses to a single
// stacked column on narrow screens via the media-query <style> block below.
export function Split({
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
    background: "var(--color-surface)",
    borderTop: "1px solid var(--color-border)",
    borderBottom: "1px solid var(--color-border)",
    fontFamily: "var(--font-body)",
  }
  const inner = {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "3rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
  }
  const textCol = { display: "flex", flexDirection: "column", gap: "0.5rem" }
  const h2 = {
    color: "var(--color-text)",
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
    margin: 0,
  }
  const sub = {
    color: "var(--color-muted)",
    fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
    lineHeight: 1.6,
    margin: 0,
  }
  const actions = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    flexShrink: 0,
  }
  const primaryBtn = {
    display: "inline-block",
    background: ctaHover ? "color-mix(in srgb, var(--color-accent) 85%, var(--color-text))" : "var(--color-accent)",
    color: "var(--color-bg)",
    border: "1px solid var(--color-accent)",
    borderRadius: "var(--radius)",
    padding: "0.85rem 2rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s ease",
    whiteSpace: "nowrap",
  }
  const secondaryBtn = {
    display: "inline-block",
    background: secHover ? "color-mix(in srgb, var(--color-text) 8%, transparent)" : "transparent",
    color: "var(--color-text)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "0.85rem 2rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s ease",
    whiteSpace: "nowrap",
  }

  return (
    <section style={outer} data-section-type="ctaBanner" data-variant="split">
      <div style={inner} className="bp-cta-split-inner">
        <div style={textCol}>
          <h2 style={h2}>{headline}</h2>
          {subline ? <p style={sub}>{subline}</p> : null}
        </div>
        <div style={actions} className="bp-cta-split-actions">
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

      <style>{`
        @media (max-width: 767px) {
          .bp-cta-split-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .bp-cta-split-actions {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}

registerVariant("ctaBanner", "split", Split)
