import { registerVariant } from "../registry"

// serviceArea / suburb-list: a heading, optional intro line, and a responsive
// multi-column set of suburb chips. The chip grid reflows from several columns
// down to a single column on narrow screens via auto-fill minmax tracks.
const demoSuburbs = [
  "Chatswood",
  "Mosman",
  "Neutral Bay",
  "Lane Cove",
  "Crows Nest",
  "North Sydney",
  "Willoughby",
  "Artarmon",
  "St Leonards",
  "Cremorne",
]

export function SuburbList({
  brand = {},
  headline = "Areas we cover",
  intro,
  suburbs = demoSuburbs,
}) {
  const region = brand.serviceArea
  const introText = intro ?? (region ? `Proudly servicing ${region} and surrounds.` : undefined)

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
    margin: 0,
    fontFamily: "var(--font-heading)",
  }
  const introStyle = {
    color: "var(--color-muted)",
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: "1rem 0 0",
    maxWidth: "60ch",
    fontFamily: "var(--font-body)",
  }
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "0.75rem",
    listStyle: "none",
    padding: 0,
    margin: "2.5rem 0 0",
  }
  const chip = {
    color: "var(--color-text)",
    fontSize: "0.9rem",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "0.6rem 1rem",
    textAlign: "center",
    fontFamily: "var(--font-body)",
  }

  return (
    <section style={section} data-section-type="serviceArea" data-variant="suburb-list">
      <div style={inner}>
        <h2 style={heading}>{headline}</h2>
        {introText ? <p style={introStyle}>{introText}</p> : null}
        <ul style={grid}>
          {suburbs.map((suburb) => (
            <li key={suburb} style={chip}>
              {suburb}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

registerVariant("serviceArea", "suburb-list", SuburbList)
