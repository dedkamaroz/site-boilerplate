import { registerVariant } from "../registry"

// logoMarquee / two-row-scroll: a pure-CSS infinite marquee adapted from the
// original ClientLogoMarquee. Two rows scroll in opposite directions (top left,
// bottom right) for a calm, continuous "trusted by" band. Logos with a src
// render as images; those without render their alt as a styled wordmark, so the
// gallery stays populated even before real assets land.

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

function LogoItem({ src, alt }) {
  const wrap = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 3rem",
    flexShrink: 0,
    opacity: 0.55,
  }

  if (src) {
    return (
      <div style={wrap}>
        <img src={src} alt={alt} style={{ height: 28, width: "auto" }} />
      </div>
    )
  }

  return (
    <div style={wrap}>
      <span
        style={{
          color: "var(--color-muted)",
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {alt}
      </span>
    </div>
  )
}

function MarqueeRow({ logos, direction = "left", speed = 40 }) {
  // Triple the items so the loop is seamless as it translates by one-third.
  const items = [...logos, ...logos, ...logos]

  const row = {
    display: "flex",
    width: "max-content",
    animation: `bp-logo-marquee-${direction} ${logos.length * speed}s linear infinite`,
  }

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div style={row}>
        {items.map((logo, i) => (
          <LogoItem key={`${logo.alt}-${i}`} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </div>
  )
}

export function TwoRowScroll({
  brand = {},
  headline = "Trusted by",
  logos = defaultLogos,
  speed = 40,
}) {
  const heading = headline || brand.name

  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    borderTop: "1px solid var(--color-border)",
    borderBottom: "1px solid var(--color-border)",
    padding: "2.5rem 0",
    overflow: "hidden",
    fontFamily: "var(--font-body)",
  }

  const labelStyle = {
    textAlign: "center",
    color: "var(--color-muted)",
    fontFamily: "var(--font-heading)",
    fontSize: "0.72rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    marginBottom: "1.75rem",
  }

  const rows = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  }

  return (
    <section style={section} data-section-type="logoMarquee" data-variant="two-row-scroll">
      {heading ? <p style={labelStyle}>{heading}</p> : null}
      <div style={rows}>
        <MarqueeRow logos={logos} direction="left" speed={speed} />
        <MarqueeRow logos={logos} direction="right" speed={speed} />
      </div>

      <style>{`
        @keyframes bp-logo-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes bp-logo-marquee-right {
          from { transform: translateX(calc(-100% / 3)); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-variant="two-row-scroll"] [style*="bp-logo-marquee"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

registerVariant("logoMarquee", "two-row-scroll", TwoRowScroll)
