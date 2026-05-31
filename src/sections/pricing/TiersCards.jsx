import { useState } from "react"
import { registerVariant } from "../registry"

// Shared demo tiers used by every pricing variant so each one renders standalone
// in the preview gallery. Middle tier is featured. Currency is AUD.
export const demoTiers = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "For sole traders getting a presence online.",
    features: ["1 landing page", "Mobile responsive", "Email support"],
    ctaLabel: "Get started",
    ctaHref: "#starter",
  },
  {
    name: "Growth",
    price: "$129",
    period: "/month",
    description: "For growing businesses that need more.",
    features: [
      "Up to 5 pages",
      "Mobile responsive",
      "Priority email support",
      "SEO optimisation",
      "Monthly analytics report",
    ],
    featured: true,
    ctaLabel: "Start free trial",
    ctaHref: "#growth",
  },
  {
    name: "Scale",
    price: "$299",
    period: "/month",
    description: "For established brands with bigger needs.",
    features: [
      "Unlimited pages",
      "Mobile responsive",
      "Dedicated support",
      "SEO optimisation",
      "Weekly analytics report",
      "Custom integrations",
    ],
    ctaLabel: "Contact sales",
    ctaHref: "#scale",
  },
]

const Tick = () => (
  <span aria-hidden="true" style={{ color: "var(--color-accent)", flexShrink: 0 }}>
    ✓
  </span>
)

function TierCard({ tier }) {
  const [hovered, setHovered] = useState(false)
  const featured = !!tier.featured

  const card = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: featured
      ? "color-mix(in srgb, var(--color-accent) 6%, var(--color-surface))"
      : "var(--color-surface)",
    border: `1px solid ${featured || hovered ? "var(--color-accent)" : "var(--color-border)"}`,
    borderRadius: "var(--radius)",
    padding: "2rem",
    transition: "border-color 0.2s ease, transform 0.2s ease",
    transform: featured ? "translateY(-8px)" : hovered ? "translateY(-2px)" : "none",
    fontFamily: "var(--font-body)",
  }
  const badge = {
    alignSelf: "flex-start",
    color: "var(--color-accent)",
    background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    borderRadius: "var(--radius)",
    padding: "3px 10px",
    fontWeight: 600,
  }
  const nameStyle = {
    color: "var(--color-text)",
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: 0,
    fontFamily: "var(--font-heading)",
  }
  const priceRow = { display: "flex", alignItems: "baseline", gap: "0.25rem" }
  const priceStyle = {
    color: "var(--color-text)",
    fontSize: "2.25rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
  }
  const periodStyle = { color: "var(--color-muted)", fontSize: "0.9rem" }
  const descStyle = {
    color: "var(--color-muted)",
    fontSize: "0.9rem",
    lineHeight: 1.6,
    margin: 0,
  }
  const list = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  }
  const listItem = {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    color: "var(--color-text)",
    fontSize: "0.9rem",
    lineHeight: 1.4,
  }
  const cta = {
    marginTop: "auto",
    textAlign: "center",
    textDecoration: "none",
    borderRadius: "var(--radius)",
    padding: "0.75rem 1rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    fontFamily: "var(--font-body)",
    background: featured ? "var(--color-accent)" : "transparent",
    color: featured ? "var(--color-bg)" : "var(--color-text)",
    border: `1px solid ${featured ? "var(--color-accent)" : "var(--color-border)"}`,
    transition: "background 0.2s ease",
  }

  return (
    <div
      style={card}
      data-featured={featured ? "true" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {featured ? <span style={badge}>Most popular</span> : null}
      <h3 style={nameStyle}>{tier.name}</h3>
      <div style={priceRow}>
        <span style={priceStyle}>{tier.price}</span>
        {tier.period ? <span style={periodStyle}>{tier.period}</span> : null}
      </div>
      {tier.description ? <p style={descStyle}>{tier.description}</p> : null}
      {tier.features && tier.features.length > 0 ? (
        <ul style={list}>
          {tier.features.map((f) => (
            <li key={f} style={listItem}>
              <Tick />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {tier.ctaLabel ? (
        <a href={tier.ctaHref || "#"} style={cta}>
          {tier.ctaLabel}
        </a>
      ) : null}
    </div>
  )
}

// pricing / tiers-cards: side-by-side pricing cards. The featured tier is lifted
// and accented with a "Most popular" badge so it stands out in the row.
export function TiersCards({ brand = {}, headline = "Pricing", tiers = demoTiers }) {
  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    padding: "6rem 2rem",
    fontFamily: "var(--font-body)",
  }
  const inner = { maxWidth: "var(--max-width)", margin: "0 auto" }
  const heading = {
    color: "var(--color-text)",
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    margin: "0 0 2.5rem",
    fontFamily: "var(--font-heading)",
  }
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.5rem",
    alignItems: "stretch",
  }

  return (
    <section style={section} data-section-type="pricing" data-variant="tiers-cards">
      <div style={inner}>
        <h2 style={heading}>{headline}</h2>
        <div style={grid}>
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  )
}

registerVariant("pricing", "tiers-cards", TiersCards)
