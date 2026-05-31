import { useState } from "react"
import { registerVariant } from "../registry"
import { resolveCta } from "./ctaDefaults"

// ctaBanner / boxed: a contained rounded card sitting on the page background,
// with headline + subline + CTA centred inside. Uses the surface colour and a
// border so it reads as a panel rather than a full-width strip.
export function Boxed({
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
    background: "var(--color-bg)",
    fontFamily: "var(--font-body)",
  }
  const inner = { maxWidth: "var(--max-width)", margin: "0 auto", padding: "3rem 2rem" }
  const card = {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "3rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "1rem",
  }
  const h2 = {
    color: "var(--color-text)",
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
    margin: 0,
  }
  const sub = {
    color: "var(--color-muted)",
    fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 540,
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
    background: ctaHover
      ? "color-mix(in srgb, var(--color-accent) 85%, var(--color-text))"
      : "var(--color-accent)",
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
  }

  return (
    <section style={outer} data-section-type="ctaBanner" data-variant="boxed">
      <div style={inner}>
        <div style={card}>
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
      </div>
    </section>
  )
}

registerVariant("ctaBanner", "boxed", Boxed)
