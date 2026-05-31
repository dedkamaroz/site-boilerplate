import { useState } from "react"
import { registerVariant } from "../registry"

// services / numbered-list: adapted from the original ServicesSection. Each
// service is a numbered row (01-0N) with title, optional price, description and
// tags. Rows lift their title/number/price colour on hover for a subtle focus.
const demoItems = [
  {
    title: "CGI Production",
    price: "From $1,500",
    description:
      "Photo-real product and environment renders for advertising, e-commerce and editorial - built entirely in CG.",
    tags: ["Product", "Automotive", "Architecture"],
  },
  {
    title: "Motion Graphics",
    price: "From $1,200",
    description:
      "Kinetic title sequences, logo animations and brand motion systems designed for broadcast and digital.",
    tags: ["Broadcast", "Social", "Brand"],
  },
  {
    title: "3D Visualisation",
    price: "From $850",
    description:
      "Architectural walkthroughs, interior renders and product configurators that replace physical shoots.",
    tags: ["Architecture", "Interior", "Product"],
  },
  {
    title: "Custom Projects",
    price: "Rapid Quote",
    description:
      "Something that doesn't fit the mould? We work across all disciplines and welcome unusual briefs.",
    tags: ["Bespoke", "Collaboration", "Any Format"],
  },
]

function NumberedRow({ item, index }) {
  const [hovered, setHovered] = useState(false)

  const row = {
    display: "grid",
    gridTemplateColumns: "72px 1fr auto",
    gap: "0 2rem",
    alignItems: "start",
    padding: "2rem 0",
    borderBottom: "1px solid var(--color-border)",
    cursor: "default",
    transition: "background 0.2s ease",
  }
  const num = {
    color: hovered ? "var(--color-muted)" : "var(--color-border)",
    fontFamily: "var(--font-body)",
    fontSize: "0.8rem",
    letterSpacing: "0.08em",
    paddingTop: "2px",
    transition: "color 0.2s ease",
    fontVariantNumeric: "tabular-nums",
  }
  const body = { display: "flex", flexDirection: "column", gap: "0.5rem" }
  const titleStyle = {
    color: hovered ? "var(--color-text)" : "var(--color-muted)",
    fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    margin: 0,
    transition: "color 0.2s ease",
    fontFamily: "var(--font-heading)",
  }
  const descStyle = {
    color: "var(--color-muted)",
    fontSize: "0.88rem",
    lineHeight: 1.65,
    margin: 0,
    maxWidth: 580,
    fontFamily: "var(--font-body)",
  }
  const tagsRow = { display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.25rem" }
  const tag = {
    color: "var(--color-muted)",
    fontSize: "0.65rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    border: "1px solid var(--color-border)",
    padding: "2px 8px",
    fontFamily: "var(--font-body)",
  }
  const price = {
    color: hovered ? "var(--color-text)" : "var(--color-muted)",
    fontSize: "0.82rem",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    paddingTop: "3px",
    transition: "color 0.2s ease",
    fontFamily: "var(--font-body)",
  }

  return (
    <div
      style={row}
      className="bp-numbered-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={num}>{String(index + 1).padStart(2, "0")}</span>

      <div style={body}>
        <h3 style={titleStyle}>{item.title}</h3>
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

      {item.price ? <span style={price}>{item.price}</span> : <span />}
    </div>
  )
}

export function NumberedList({ brand = {}, headline = "What We Make", items = demoItems }) {
  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    padding: "6rem 2rem",
    fontFamily: "var(--font-body)",
  }
  const inner = { maxWidth: "var(--max-width)", margin: "0 auto" }
  const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "1rem",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid var(--color-border)",
  }
  const heading = {
    color: "var(--color-text)",
    fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
    fontWeight: 400,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin: 0,
    fontFamily: "var(--font-heading)",
  }
  const count = { color: "var(--color-muted)", fontSize: "0.78rem", letterSpacing: "0.06em" }

  return (
    <section style={section} data-section-type="services" data-variant="numbered-list">
      <div style={inner}>
        <div style={header}>
          <h2 style={heading}>{headline}</h2>
          <span style={count}>
            {items.length} {items.length === 1 ? "service" : "services"}
          </span>
        </div>

        {items.map((item, i) => (
          <NumberedRow key={item.title} item={item} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .bp-numbered-row { grid-template-columns: 48px 1fr !important; }
          .bp-numbered-row > :last-child {
            grid-column: 2;
            padding-top: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}

registerVariant("services", "numbered-list", NumberedList)
