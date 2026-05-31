// Pure CSS infinite scroll — no JS animation dependency.
// Two rows: top scrolls left, bottom scrolls right.
// Pass logos as [{src, alt}] or leave default for text placeholders.

const defaultLogos = [
  { src: "", alt: "Samsung"  },
  { src: "", alt: "Audi"     },
  { src: "", alt: "L'Oréal"  },
  { src: "", alt: "Dior"     },
  { src: "", alt: "Telstra"  },
  { src: "", alt: "AusPost"  },
  { src: "", alt: "OzSale"   },
]

function LogoItem({ src, alt }) {
  const wrap = {
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    padding:        "0 3rem",
    flexShrink:     0,
    opacity:        0.45,
    transition:     "opacity 0.2s ease",
  }

  if (src) {
    return (
      <div style={wrap}>
        <img
          src={src}
          alt={alt}
          style={{ height: 28, width: "auto", filter: "brightness(0) invert(1)" }}
        />
      </div>
    )
  }

  return (
    <div style={wrap}>
      <span style={{
        color:         "var(--color-muted)",
        fontFamily:    "var(--font-body)",
        fontSize:      "0.75rem",
        fontWeight:    600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        whiteSpace:    "nowrap",
      }}>
        {alt}
      </span>
    </div>
  )
}

function MarqueeRow({ logos, direction = "left", speed = 40 }) {
  // Duplicate logos for seamless loop
  const items = [...logos, ...logos, ...logos]

  const row = {
    display:   "flex",
    width:     "max-content",
    animation: `distro-marquee-${direction} ${logos.length * speed}s linear infinite`,
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

export default function ClientLogoMarquee({
  logos   = defaultLogos,
  label   = "Trusted by leading brands",
  speed   = 40,
}) {
  const section = {
    width:       "100%",
    boxSizing:   "border-box",
    background:  "var(--color-bg)",
    borderTop:   `1px solid var(--color-border)`,
    borderBottom: `1px solid var(--color-border)`,
    padding:     "2.5rem 0",
    overflow:    "hidden",
    fontFamily:  "var(--font-body)",
  }

  const labelStyle = {
    textAlign:     "center",
    color:         "var(--color-muted)",
    fontSize:      "0.7rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    marginBottom:  "1.75rem",
  }

  const rows = {
    display:       "flex",
    flexDirection: "column",
    gap:           "1.25rem",
  }

  return (
    <section style={section}>
      {label && <p style={labelStyle}>{label}</p>}
      <div style={rows}>
        <MarqueeRow logos={logos} direction="left"  speed={speed} />
        <MarqueeRow logos={logos} direction="right" speed={speed} />
      </div>

      <style>{`
        @keyframes distro-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes distro-marquee-right {
          from { transform: translateX(calc(-100% / 3)); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
