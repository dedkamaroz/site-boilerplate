import Media from "../shared/Media"
import { registerVariant } from "../registry"

// gallery / masonry: a CSS multi-column masonry layout with no filter bar.
// Visually distinct from filterable-grid - tiles keep their natural aspect ratio
// and flow into balanced columns. Each tile renders shared Media plus a caption,
// so an item with an empty media.src still reads as a labelled card.
// Neutral placeholders: tiles render labelled even with an empty media.src, so
// the boilerplate ships no sample media. Supply `items` in config to populate.
const DEFAULT_ITEMS = [
  { media: { kind: "image", src: "", alt: "" }, title: "Project one", category: "Category A" },
  { media: { kind: "image", src: "", alt: "" }, title: "Project two", category: "Category B" },
  { media: { kind: "image", src: "", alt: "" }, title: "Project three", category: "Category A" },
  { media: { kind: "image", src: "", alt: "" }, title: "Project four", category: "Category C" },
  { media: { kind: "image", src: "", alt: "" }, title: "Project five", category: "Category B" },
  { media: { kind: "image", src: "", alt: "" }, title: "Project six", category: "Category C" },
]

function MasonryTile({ item }) {
  const tile = {
    breakInside: "avoid",
    marginBottom: "1.25rem",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  }
  const mediaStyle = { width: "100%", height: "auto", display: "block" }
  const info = { padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.3rem" }
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
    <div style={tile}>
      <Media media={item.media} alt={item.media?.alt ?? item.title} style={mediaStyle} />
      <div style={info}>
        {item.category ? <span style={catTag}>{item.category}</span> : null}
        <h3 style={titleStyle}>{item.title}</h3>
      </div>
    </div>
  )
}

export function Masonry({ brand = {}, headline = "Gallery", items = DEFAULT_ITEMS, filters }) {
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
    fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
    fontWeight: 400,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin: "0 0 2.5rem",
    fontFamily: "var(--font-heading)",
  }
  const columns = {
    columnCount: 3,
    columnGap: "1.25rem",
  }

  return (
    <section style={section} data-section-type="gallery" data-variant="masonry">
      <div style={inner}>
        <h2 style={heading}>{headline}</h2>
        <div style={columns} className="bp-gallery-masonry">
          {items.map((item, i) => (
            <MasonryTile key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bp-gallery-masonry { column-count: 2 !important; }
        }
        @media (max-width: 600px) {
          .bp-gallery-masonry { column-count: 1 !important; }
        }
      `}</style>
    </section>
  )
}

registerVariant("gallery", "masonry", Masonry)
