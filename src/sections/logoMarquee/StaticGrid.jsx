import { registerVariant } from "../registry"

// logoMarquee / static-grid: a calm, responsive grid of logos with no animation.
// Each cell is a bordered tile; logos with a src render as images, those without
// render their alt as a muted wordmark. Structurally distinct from the scrolling
// marquee - a settled gallery rather than a moving band.

const defaultLogos = [
  { src: "", alt: "Samsung" },
  { src: "", alt: "Audi" },
  { src: "", alt: "L'Oreal" },
  { src: "", alt: "Dior" },
  { src: "", alt: "Telstra" },
  { src: "", alt: "AusPost" },
  { src: "", alt: "OzSale" },
  { src: "", alt: "Qantas" },
]

function LogoCell({ src, alt }) {
  const cell = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "5rem",
    padding: "1.5rem 1rem",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    background: "color-mix(in srgb, var(--color-surface) 60%, transparent)",
  }

  if (src) {
    return (
      <div style={cell}>
        <img src={src} alt={alt} style={{ maxHeight: 32, maxWidth: "100%", width: "auto" }} />
      </div>
    )
  }

  return (
    <div style={cell}>
      <span
        style={{
          color: "var(--color-muted)",
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {alt}
      </span>
    </div>
  )
}

export function StaticGrid({ brand = {}, headline = "Trusted by", logos = defaultLogos }) {
  const heading = headline || brand.name

  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    padding: "4rem 2rem",
    fontFamily: "var(--font-body)",
  }

  const inner = { maxWidth: "var(--max-width)", margin: "0 auto" }

  const labelStyle = {
    textAlign: "center",
    color: "var(--color-muted)",
    fontFamily: "var(--font-heading)",
    fontSize: "0.72rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    marginBottom: "2rem",
  }

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
  }

  return (
    <section style={section} data-section-type="logoMarquee" data-variant="static-grid">
      <div style={inner}>
        {heading ? <p style={labelStyle}>{heading}</p> : null}
        <div style={grid}>
          {logos.map((logo, i) => (
            <LogoCell key={`${logo.alt}-${i}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </section>
  )
}

registerVariant("logoMarquee", "static-grid", StaticGrid)
