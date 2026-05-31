import { registerVariant } from "../registry"

// services / icon-row: compact horizontal items, each led by a circular badge
// carrying the service's first initial, then a title and short description.
// Structurally flatter than the card/list variants - no borders or chips, just
// a clean badge + text rhythm that suits feature/capability rows.
const demoItems = [
  {
    title: "CGI Production",
    description: "Photo-real product and environment renders, built entirely in CG.",
  },
  {
    title: "Motion Graphics",
    description: "Kinetic titles, logo animation and brand motion for screen.",
  },
  {
    title: "3D Visualisation",
    description: "Architectural walkthroughs and configurators that replace shoots.",
  },
  {
    title: "Custom Projects",
    description: "Unusual briefs welcome across every discipline and format.",
  },
]

function initialOf(title) {
  const trimmed = (title || "").trim()
  return trimmed ? trimmed[0].toUpperCase() : "?"
}

function IconItem({ item }) {
  const wrap = { display: "flex", alignItems: "flex-start", gap: "1rem" }
  const badge = {
    flex: "0 0 auto",
    width: 44,
    height: 44,
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "color-mix(in srgb, var(--color-accent) 14%, transparent)",
    color: "var(--color-accent)",
    fontFamily: "var(--font-heading)",
    fontWeight: 700,
    fontSize: "1.1rem",
    lineHeight: 1,
  }
  const body = { display: "flex", flexDirection: "column", gap: "0.35rem" }
  const titleRow = { display: "flex", alignItems: "baseline", gap: "0.6rem", flexWrap: "wrap" }
  const titleStyle = {
    color: "var(--color-text)",
    fontSize: "1.05rem",
    fontWeight: 600,
    margin: 0,
    fontFamily: "var(--font-heading)",
  }
  const price = {
    color: "var(--color-muted)",
    fontSize: "0.75rem",
    letterSpacing: "0.04em",
    fontFamily: "var(--font-body)",
  }
  const descStyle = {
    color: "var(--color-muted)",
    fontSize: "0.85rem",
    lineHeight: 1.55,
    margin: 0,
    fontFamily: "var(--font-body)",
  }
  const tagsRow = { display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.15rem" }
  const tag = {
    color: "var(--color-muted)",
    fontSize: "0.62rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: "var(--font-body)",
  }

  return (
    <div style={wrap}>
      <span style={badge} aria-hidden="true">
        {initialOf(item.title)}
      </span>
      <div style={body}>
        <div style={titleRow}>
          <h3 style={titleStyle}>{item.title}</h3>
          {item.price ? <span style={price}>{item.price}</span> : null}
        </div>
        {item.description ? <p style={descStyle}>{item.description}</p> : null}
        {item.tags && item.tags.length > 0 ? (
          <div style={tagsRow}>
            {item.tags.map((t) => (
              <span key={t} style={tag}>
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function IconRow({ brand = {}, headline = "What We Do", items = demoItems }) {
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem 2.5rem",
  }

  return (
    <section style={section} data-section-type="services" data-variant="icon-row">
      <div style={inner}>
        <h2 style={heading}>{headline}</h2>
        <div style={grid}>
          {items.map((item) => (
            <IconItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

registerVariant("services", "icon-row", IconRow)
