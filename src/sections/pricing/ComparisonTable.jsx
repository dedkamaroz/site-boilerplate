import { registerVariant } from "../registry"
import { demoTiers } from "./TiersCards"

// Build the ordered union of all feature labels across the tiers, preserving the
// order they first appear in.
function featureUnion(tiers) {
  const seen = new Set()
  const union = []
  for (const tier of tiers) {
    for (const f of tier.features || []) {
      if (!seen.has(f)) {
        seen.add(f)
        union.push(f)
      }
    }
  }
  return union
}

// pricing / comparison-table: rows are the union of all features, columns are the
// tiers. Each cell shows a tick when the tier includes that feature, a dash when
// not. The header row carries the tier name and price.
export function ComparisonTable({ brand = {}, headline = "Compare plans", tiers = demoTiers }) {
  const features = featureUnion(tiers)

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
  const table = {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "var(--font-body)",
  }
  const thFeature = {
    textAlign: "left",
    padding: "1rem",
    color: "var(--color-muted)",
    fontSize: "0.8rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    borderBottom: "1px solid var(--color-border)",
  }
  const thTier = (featured) => ({
    textAlign: "center",
    padding: "1rem",
    borderBottom: "1px solid var(--color-border)",
    background: featured
      ? "color-mix(in srgb, var(--color-accent) 8%, transparent)"
      : "transparent",
  })
  const tierName = {
    color: "var(--color-text)",
    fontSize: "1.05rem",
    fontWeight: 600,
    fontFamily: "var(--font-heading)",
  }
  const tierPrice = { color: "var(--color-muted)", fontSize: "0.85rem", marginTop: "0.25rem" }
  const rowLabel = {
    textAlign: "left",
    padding: "0.85rem 1rem",
    color: "var(--color-text)",
    fontSize: "0.9rem",
    borderBottom: "1px solid var(--color-border)",
  }
  const cell = (featured) => ({
    textAlign: "center",
    padding: "0.85rem 1rem",
    fontSize: "1rem",
    borderBottom: "1px solid var(--color-border)",
    background: featured
      ? "color-mix(in srgb, var(--color-accent) 8%, transparent)"
      : "transparent",
  })

  return (
    <section style={section} data-section-type="pricing" data-variant="comparison-table">
      <div style={inner}>
        <h2 style={heading}>{headline}</h2>
        <table style={table}>
          <thead>
            <tr>
              <th style={thFeature} scope="col">
                Features
              </th>
              {tiers.map((tier) => (
                <th key={tier.name} style={thTier(tier.featured)} scope="col">
                  <div style={tierName}>{tier.name}</div>
                  <div style={tierPrice}>
                    {tier.price}
                    {tier.period || ""}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature}>
                <th style={rowLabel} scope="row">
                  {feature}
                </th>
                {tiers.map((tier) => {
                  const has = (tier.features || []).includes(feature)
                  return (
                    <td key={tier.name} style={cell(tier.featured)}>
                      {has ? (
                        <span style={{ color: "var(--color-accent)" }} aria-label="Included">
                          ✓
                        </span>
                      ) : (
                        <span style={{ color: "var(--color-muted)" }} aria-label="Not included">
                          -
                        </span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

registerVariant("pricing", "comparison-table", ComparisonTable)
