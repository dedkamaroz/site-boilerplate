import { registerVariant } from "../registry"

// serviceArea / map-embed: a heading and intro beside (or above, on narrow
// screens) a responsive 16:9 map. When mapEmbedUrl is supplied it renders an
// iframe; otherwise a styled placeholder box stands in so the layout never
// shows a broken frame. The suburb list sits in the text column alongside.
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

const demoMapEmbedUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=151.18%2C-33.83%2C151.23%2C-33.79&layer=mapnik"

export function MapEmbed({
  brand = {},
  headline = "Areas we cover",
  intro,
  suburbs = demoSuburbs,
  mapEmbedUrl = demoMapEmbedUrl,
}) {
  const region = brand.serviceArea
  const introText =
    intro ?? (region ? `Proudly servicing ${region} and surrounds.` : "Find us across the region.")

  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    padding: "6rem 2rem",
    fontFamily: "var(--font-body)",
  }
  const inner = { maxWidth: "var(--max-width)", margin: "0 auto" }
  const layout = {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "2.5rem",
    alignItems: "start",
  }
  const textCol = { display: "flex", flexDirection: "column", gap: "1rem" }
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
    margin: 0,
    maxWidth: "50ch",
    fontFamily: "var(--font-body)",
  }
  const list = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    listStyle: "none",
    padding: 0,
    margin: "0.5rem 0 0",
  }
  const chip = {
    color: "var(--color-text)",
    fontSize: "0.82rem",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "0.4rem 0.8rem",
    fontFamily: "var(--font-body)",
  }
  // 16:9 responsive frame via aspect-ratio; both iframe and placeholder fill it.
  const frame = {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    border: "1px solid var(--color-border)",
  }
  const fill = { position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }
  const placeholder = {
    ...fill,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "color-mix(in srgb, var(--color-accent) 8%, var(--color-surface))",
    color: "var(--color-muted)",
    fontSize: "0.9rem",
    letterSpacing: "0.04em",
    textAlign: "center",
    fontFamily: "var(--font-body)",
  }

  return (
    <section style={section} data-section-type="serviceArea" data-variant="map-embed">
      <div style={inner}>
        <div style={layout} className="bp-servicearea-map">
          <div style={textCol}>
            <h2 style={heading}>{headline}</h2>
            {introText ? <p style={introStyle}>{introText}</p> : null}
            <ul style={list}>
              {suburbs.map((suburb) => (
                <li key={suburb} style={chip}>
                  {suburb}
                </li>
              ))}
            </ul>
          </div>
          <div style={frame}>
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                title={region ? `Map of ${region}` : "Service area map"}
                loading="lazy"
                style={fill}
              />
            ) : (
              <div style={placeholder}>{region ? `${region} Map` : "Map"}</div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bp-servicearea-map { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

registerVariant("serviceArea", "map-embed", MapEmbed)
