import { useState } from "react"
import { registerVariant } from "../registry"
import { demoTiers } from "./TiersCards"

function TierRow({ tier, isLast }) {
  const [hovered, setHovered] = useState(false)

  const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "1.5rem",
    padding: "1.25rem 0.5rem",
    borderBottom: isLast ? "none" : "1px solid var(--color-border)",
    background: hovered
      ? "color-mix(in srgb, var(--color-accent) 5%, transparent)"
      : "transparent",
    transition: "background 0.2s ease",
    fontFamily: "var(--font-body)",
  }
  const left = { display: "flex", flexDirection: "column", gap: "0.2rem", minWidth: 0 }
  const nameStyle = {
    color: "var(--color-text)",
    fontSize: "1.05rem",
    fontWeight: 600,
    fontFamily: "var(--font-heading)",
  }
  const descStyle = {
    color: "var(--color-muted)",
    fontSize: "0.85rem",
    lineHeight: 1.4,
  }
  const priceWrap = { display: "flex", alignItems: "baseline", gap: "0.2rem", whiteSpace: "nowrap" }
  const priceStyle = {
    color: "var(--color-text)",
    fontSize: "1.25rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
  }
  const periodStyle = { color: "var(--color-muted)", fontSize: "0.8rem" }

  return (
    <div
      style={row}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={left}>
        <span style={nameStyle}>{tier.name}</span>
        {tier.description ? <span style={descStyle}>{tier.description}</span> : null}
      </div>
      <div style={priceWrap}>
        <span style={priceStyle}>{tier.price}</span>
        {tier.period ? <span style={periodStyle}>{tier.period}</span> : null}
      </div>
    </div>
  )
}

// pricing / simple-list: a compact stacked list of tiers, each a single row with
// name + one-line description on the left and price on the right. No large cards.
export function SimpleList({ brand = {}, headline = "Plans", tiers = demoTiers }) {
  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    padding: "6rem 2rem",
    fontFamily: "var(--font-body)",
  }
  const inner = { maxWidth: "720px", margin: "0 auto" }
  const heading = {
    color: "var(--color-text)",
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    margin: "0 0 1.5rem",
    fontFamily: "var(--font-heading)",
  }
  const listWrap = {
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "0.5rem 1.25rem",
    background: "var(--color-surface)",
  }

  return (
    <section style={section} data-section-type="pricing" data-variant="simple-list">
      <div style={inner}>
        <h2 style={heading}>{headline}</h2>
        <div style={listWrap}>
          {tiers.map((tier, i) => (
            <TierRow key={tier.name} tier={tier} isLast={i === tiers.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

registerVariant("pricing", "simple-list", SimpleList)
