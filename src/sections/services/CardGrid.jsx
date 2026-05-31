import { useState } from "react"
import { registerVariant } from "../registry"

// services / card-grid: a responsive grid of surface cards. Each card carries a
// title, description, price and tag chips. Cards lift their border on hover.
const demoItems = [
  {
    title: "CGI Production",
    price: "From $1,500",
    description:
      "Photo-real product and environment renders for advertising, e-commerce and editorial.",
    tags: ["Product", "Automotive"],
  },
  {
    title: "Motion Graphics",
    price: "From $1,200",
    description: "Kinetic title sequences, logo animations and brand motion systems.",
    tags: ["Broadcast", "Brand"],
  },
  {
    title: "3D Visualisation",
    price: "From $850",
    description: "Architectural walkthroughs, interior renders and product configurators.",
    tags: ["Architecture", "Interior"],
  },
  {
    title: "Custom Projects",
    price: "Rapid Quote",
    description: "Unusual briefs welcome - we work across all disciplines and formats.",
    tags: ["Bespoke", "Any Format"],
  },
]

function ServiceCard({ item }) {
  const [hovered, setHovered] = useState(false)

  const card = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    background: "var(--color-surface)",
    border: `1px solid ${hovered ? "var(--color-accent)" : "var(--color-border)"}`,
    borderRadius: "var(--radius)",
    padding: "1.75rem",
    transition: "border-color 0.2s ease, transform 0.2s ease",
    transform: hovered ? "translateY(-2px)" : "none",
  }
  const titleRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "1rem",
  }
  const titleStyle = {
    color: "var(--color-text)",
    fontSize: "1.25rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    margin: 0,
    fontFamily: "var(--font-heading)",
  }
  const price = {
    color: "var(--color-accent)",
    fontSize: "0.82rem",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    fontFamily: "var(--font-body)",
  }
  const descStyle = {
    color: "var(--color-muted)",
    fontSize: "0.9rem",
    lineHeight: 1.6,
    margin: 0,
    fontFamily: "var(--font-body)",
  }
  const tagsRow = {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    marginTop: "auto",
    paddingTop: "0.5rem",
  }
  const tag = {
    color: "var(--color-muted)",
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "2px 8px",
    fontFamily: "var(--font-body)",
  }

  return (
    <div style={card} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
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
  )
}

export function CardGrid({ brand = {}, headline = "Our Services", items = demoItems }) {
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
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.5rem",
    alignItems: "stretch",
  }

  return (
    <section style={section} data-section-type="services" data-variant="card-grid">
      <div style={inner}>
        <h2 style={heading}>{headline}</h2>
        <div style={grid}>
          {items.map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

registerVariant("services", "card-grid", CardGrid)
