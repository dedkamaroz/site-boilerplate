import { useRef, useState, useEffect } from "react"
import Media from "../shared/Media"
import { registerVariant } from "../registry"

// featured / alternating-rows: full-width showcase rows that alternate
// media-left / media-right, each with a title, optional description, tag and
// link. Adapted from the original FeaturedWork component into the config-driven
// section shape ({ brand, headline, items }). Renders standalone with default
// placeholder items for the gallery; items with empty media.src leave no markup.
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

function FeaturedRow({ item, index }) {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isEven = index % 2 === 0

  const row = {
    display: "flex",
    flexDirection: isEven ? "row" : "row-reverse",
    alignItems: "center",
    gap: "5%",
    marginBottom: "6rem",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
    transitionDelay: `${index * 0.1}s`,
  }

  const mediaBox = {
    position: "relative",
    width: "55%",
    aspectRatio: "16 / 10",
    overflow: "hidden",
    borderRadius: "var(--radius)",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    flexShrink: 0,
    textDecoration: "none",
  }

  const mediaStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: hovered ? "scale(1.04)" : "scale(1)",
    transition: "transform 0.5s ease",
  }

  const indexBadge = {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    color: "var(--color-muted)",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    fontFamily: "var(--font-body)",
    opacity: 0.6,
  }

  const textCol = { width: "40%", flexShrink: 0 }

  const tagStyle = {
    display: "inline-block",
    color: "var(--color-muted)",
    fontSize: "0.7rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: "0.75rem",
    fontFamily: "var(--font-body)",
  }

  const titleStyle = {
    color: "var(--color-text)",
    fontSize: "clamp(1.8rem, 3vw, 2.75rem)",
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    margin: "0 0 1rem",
    fontFamily: "var(--font-heading)",
  }

  const descStyle = {
    color: "var(--color-muted)",
    fontSize: "0.95rem",
    lineHeight: 1.7,
    margin: "0 0 1.75rem",
    fontFamily: "var(--font-body)",
  }

  const linkStyle = {
    color: "var(--color-text)",
    textDecoration: "none",
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderBottom: "1px solid var(--color-border)",
    paddingBottom: "2px",
    fontFamily: "var(--font-body)",
  }

  const MediaWrap = item.href ? "a" : "div"
  const mediaWrapProps = item.href ? { href: item.href } : {}

  return (
    <div ref={cardRef} style={row} className="bp-featured-row">
      <MediaWrap
        style={mediaBox}
        {...mediaWrapProps}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Media media={item.media} style={mediaStyle} alt={item.media?.alt ?? item.title} />
        <span style={indexBadge}>0{index + 1}</span>
      </MediaWrap>

      <div style={textCol}>
        {item.tag ? <span style={tagStyle}>{item.tag}</span> : null}
        <h3 style={titleStyle}>{item.title}</h3>
        {item.description ? <p style={descStyle}>{item.description}</p> : null}
        {item.href ? (
          <a href={item.href} style={linkStyle}>
            View Project
          </a>
        ) : null}
      </div>
    </div>
  )
}

export function AlternatingRows({ brand, headline = "Featured Work", items = defaultItems }) {
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
    marginBottom: "4rem",
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

  return (
    <section
      style={section}
      data-section-type="featured"
      data-variant="alternating-rows"
      aria-label={brand?.name}
    >
      <div style={inner}>
        <div style={header}>
          <h2 style={heading}>{headline}</h2>
        </div>

        {items.map((item, i) => (
          <FeaturedRow key={`${item.title}-${i}`} item={item} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bp-featured-row { flex-direction: column !important; }
          .bp-featured-row > * { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}

registerVariant("featured", "alternating-rows", AlternatingRows)
