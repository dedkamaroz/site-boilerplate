import { useState } from "react"
import Media from "../shared/Media"
import { registerVariant } from "../registry"

// featured / cards: a responsive grid of feature cards, media on top with
// title and description below. Visually distinct from alternating-rows - this
// is a compact, scannable grid rather than full-width showcase rows. Renders
// standalone with default placeholder items for the gallery; items with empty
// media.src still render the card frame with no image markup.
const defaultItems = [
  {
    media: { kind: "image", src: "", alt: "" },
    title: "Next Gen",
    description: "Hyper-real product visualisation for a flagship device launch.",
    tag: "CGI",
    href: "/work/next-gen",
  },
  {
    media: { kind: "image", src: "", alt: "" },
    title: "Elixir",
    description: "Cinematic liquid and glass simulation for a luxury campaign.",
    tag: "3D Viz",
    href: "/work/elixir",
  },
  {
    media: { kind: "image", src: "", alt: "" },
    title: "Brand Motion",
    description: "Kinetic logo reveal system built for a multi-platform rebrand.",
    tag: "Motion",
    href: "/work/brand-motion",
  },
  {
    media: { kind: "image", src: "", alt: "" },
    title: "Velocity",
    description: "Full-CG render series - zero physical shoot required.",
    tag: "CGI",
    href: "/work/velocity",
  },
]

function FeatureCard({ item }) {
  const [hovered, setHovered] = useState(false)

  const card = {
    display: "flex",
    flexDirection: "column",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    textDecoration: "none",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    transition: "transform 0.3s ease, border-color 0.3s ease",
    borderColor: hovered
      ? "color-mix(in srgb, var(--color-accent) 55%, var(--color-border))"
      : "var(--color-border)",
  }

  const mediaBox = {
    position: "relative",
    width: "100%",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    background: "color-mix(in srgb, var(--color-text) 6%, var(--color-surface))",
  }

  const mediaStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.5s ease",
  }

  const body = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1.5rem",
  }

  const tagStyle = {
    color: "var(--color-accent)",
    fontSize: "0.68rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontFamily: "var(--font-body)",
  }

  const titleStyle = {
    color: "var(--color-text)",
    fontSize: "1.3rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    margin: 0,
    fontFamily: "var(--font-heading)",
  }

  const descStyle = {
    color: "var(--color-muted)",
    fontSize: "0.9rem",
    lineHeight: 1.6,
    margin: 0,
    fontFamily: "var(--font-body)",
  }

  const Wrap = item.href ? "a" : "div"
  const wrapProps = item.href ? { href: item.href } : {}

  return (
    <Wrap
      style={card}
      {...wrapProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={mediaBox}>
        <Media media={item.media} style={mediaStyle} alt={item.media?.alt ?? item.title} />
      </div>
      <div style={body}>
        {item.tag ? <span style={tagStyle}>{item.tag}</span> : null}
        <h3 style={titleStyle}>{item.title}</h3>
        {item.description ? <p style={descStyle}>{item.description}</p> : null}
      </div>
    </Wrap>
  )
}

export function Cards({ brand, headline = "Featured Work", items = defaultItems }) {
  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    padding: "6rem 2rem",
    fontFamily: "var(--font-body)",
  }

  const inner = { maxWidth: "var(--max-width)", margin: "0 auto" }

  const header = { marginBottom: "3rem" }

  const heading = {
    color: "var(--color-text)",
    fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
    fontWeight: 400,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin: 0,
    fontFamily: "var(--font-heading)",
  }

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.75rem",
  }

  return (
    <section
      style={section}
      data-section-type="featured"
      data-variant="cards"
      aria-label={brand?.name}
    >
      <div style={inner}>
        <div style={header}>
          <h2 style={heading}>{headline}</h2>
        </div>

        <div style={grid}>
          {items.map((item, i) => (
            <FeatureCard key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

registerVariant("featured", "cards", Cards)
