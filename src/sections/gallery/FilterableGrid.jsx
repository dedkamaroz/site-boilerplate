import { useState } from "react"
import Media from "../shared/Media"
import { registerVariant } from "../registry"

// gallery / filterable-grid: a filter bar (All + each category) over a responsive
// grid. Adapted from the original PortfolioGrid component into the config-driven
// section shape. Each tile renders shared Media plus a title/category caption, so
// an item with an empty media.src still reads as a labelled tile.
const DEFAULT_ITEMS = [
  {
    media: { kind: "image", src: "/assets/portfolio/headphones.webp", alt: "Headphones render" },
    title: "Next Gen",
    category: "Product",
  },
  {
    media: { kind: "image", src: "/assets/portfolio/car.webp", alt: "Vehicle render" },
    title: "Velocity",
    category: "Product",
  },
  {
    media: {
      kind: "video",
      src: "/assets/portfolio/logo.mp4",
      poster: "/assets/portfolio/logo-poster.jpg",
    },
    title: "Brand Motion",
    category: "Branding",
  },
  {
    media: { kind: "image", src: "/assets/portfolio/abstract.webp", alt: "Abstract forms" },
    title: "Abstract Forms",
    category: "Branding",
  },
  {
    media: { kind: "image", src: "", alt: "" },
    title: "Modern Living",
    category: "Spaces",
  },
  {
    media: { kind: "image", src: "/assets/portfolio/flat-poster.jpg", alt: "Interior render" },
    title: "Serenity",
    category: "Spaces",
  },
]

// Derive an ordered, de-duplicated category list from the items when no explicit
// filters array is supplied.
function categoriesFrom(items) {
  const seen = []
  for (const item of items) {
    if (item.category && !seen.includes(item.category)) seen.push(item.category)
  }
  return seen
}

function GalleryTile({ item }) {
  const [hovered, setHovered] = useState(false)

  const card = {
    position: "relative",
    overflow: "hidden",
    background: "var(--color-surface)",
    aspectRatio: "4/3",
    borderRadius: "var(--radius)",
    border: "1px solid var(--color-border)",
  }

  const media = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.5s ease",
  }

  const overlay = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, color-mix(in srgb, var(--color-bg) 85%, transparent) 0%, transparent 60%)",
  }

  const info = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  }

  const catTag = {
    color: "var(--color-muted)",
    fontSize: "0.65rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontFamily: "var(--font-body)",
  }

  const titleStyle = {
    color: "var(--color-text)",
    fontSize: "1rem",
    fontWeight: 600,
    margin: 0,
    fontFamily: "var(--font-heading)",
    letterSpacing: "-0.01em",
  }

  return (
    <div style={card} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Media media={item.media} alt={item.media?.alt ?? item.title} style={media} />
      <div style={overlay} />
      <div style={info}>
        {item.category ? <span style={catTag}>{item.category}</span> : null}
        <h3 style={titleStyle}>{item.title}</h3>
      </div>
    </div>
  )
}

export function FilterableGrid({
  brand = {},
  headline = "Selected Work",
  items = DEFAULT_ITEMS,
  filters,
}) {
  const categories = ["All", ...(filters && filters.length ? filters : categoriesFrom(items))]
  const [active, setActive] = useState("All")

  const filtered = active === "All" ? items : items.filter((i) => i.category === active)

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
    marginBottom: "2.5rem",
    flexWrap: "wrap",
    gap: "0.75rem",
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
  const countStyle = {
    color: "var(--color-muted)",
    fontSize: "0.78rem",
    letterSpacing: "0.04em",
  }
  const filterBar = { display: "flex", gap: "0.25rem", marginBottom: "2.5rem", flexWrap: "wrap" }
  const filterBtn = (cat) => ({
    background: active === cat ? "var(--color-text)" : "transparent",
    color: active === cat ? "var(--color-bg)" : "var(--color-muted)",
    border: `1px solid ${active === cat ? "var(--color-text)" : "var(--color-border)"}`,
    borderRadius: "var(--radius)",
    padding: "0.4rem 1rem",
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    transition: "all 0.2s ease",
  })
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.25rem",
  }

  return (
    <section style={section} data-section-type="gallery" data-variant="filterable-grid">
      <div style={inner}>
        <div style={header}>
          <h2 style={heading}>{headline}</h2>
          <span style={countStyle}>
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div style={filterBar}>
          {categories.map((cat) => (
            <button key={cat} type="button" style={filterBtn(cat)} onClick={() => setActive(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div style={grid} className="bp-gallery-grid">
          {filtered.map((item, i) => (
            <GalleryTile key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .bp-gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

registerVariant("gallery", "filterable-grid", FilterableGrid)
