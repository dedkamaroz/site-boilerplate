import { useState } from "react"

const defaultServices = [
  {
    name:        "CGI Production",
    description: "Photo-real product and environment renders for advertising, e-commerce, and editorial — built entirely in CG.",
    from:        "From $1,500",
    tags:        ["Product", "Automotive", "Architecture"],
  },
  {
    name:        "Motion Graphics",
    description: "Kinetic title sequences, logo animations, and brand motion systems designed for broadcast and digital.",
    from:        "From $1,200",
    tags:        ["Broadcast", "Social", "Brand"],
  },
  {
    name:        "3D Visualisation",
    description: "Architectural walkthroughs, interior renders, and product configurators that replace physical shoots.",
    from:        "From $850",
    tags:        ["Architecture", "Interior", "Product"],
  },
  {
    name:        "FOOH",
    description: "Fake-out-of-home: AI-assisted composites that place your product in impossible real-world scenarios for viral social content.",
    from:        "From $2,200",
    tags:        ["Social", "Viral", "OOH"],
  },
  {
    name:        "Custom Projects",
    description: "Something that doesn't fit the mould? We work across all disciplines and welcome unusual briefs. Tell us what you're trying to achieve.",
    from:        "Rapid Quote",
    ctaLink:     "/contact",
    tags:        ["Bespoke", "Collaboration", "Any Format"],
  },
]

function ServiceItem({ service, index, ctaHref }) {
  const [hovered, setHovered] = useState(false)

  const item = {
    display:             "grid",
    gridTemplateColumns: "72px 1fr auto",
    gap:                 "0 2rem",
    alignItems:          "start",
    padding:             "2rem 0",
    borderBottom:        `1px solid var(--color-border)`,
    cursor:              "default",
    transition:          "background 0.2s ease",
  }

  const num = {
    color:              hovered ? "var(--color-muted)" : "var(--color-border)",
    fontFamily:         "var(--font-body)",
    fontSize:           "0.8rem",
    letterSpacing:      "0.08em",
    paddingTop:         "2px",
    transition:         "color 0.2s ease",
    fontVariantNumeric: "tabular-nums",
  }

  const body = {
    display:       "flex",
    flexDirection: "column",
    gap:           "0.5rem",
  }

  const nameStyle = {
    color:         hovered ? "var(--color-text)" : "var(--color-muted)",
    fontSize:      "clamp(1.15rem, 2vw, 1.5rem)",
    fontWeight:    600,
    letterSpacing: "-0.01em",
    margin:        0,
    transition:    "color 0.2s ease",
    fontFamily:    "var(--font-heading)",
  }

  const descStyle = {
    color:      "var(--color-muted)",
    fontSize:   "0.88rem",
    lineHeight: 1.65,
    margin:     0,
    maxWidth:   580,
    fontFamily: "var(--font-body)",
  }

  const tagsRow = {
    display:   "flex",
    gap:       "0.5rem",
    flexWrap:  "wrap",
    marginTop: "0.25rem",
  }

  const tag = {
    color:         "var(--color-muted)",
    fontSize:      "0.65rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    border:        `1px solid var(--color-border)`,
    padding:       "2px 8px",
    fontFamily:    "var(--font-body)",
  }

  const pricing = {
    color:         hovered ? "var(--color-text)" : "var(--color-muted)",
    fontSize:      "0.82rem",
    letterSpacing: "0.04em",
    whiteSpace:    "nowrap",
    paddingTop:    "3px",
    transition:    "color 0.2s ease",
    fontFamily:    "var(--font-body)",
    textDecoration: "none",
  }

  const rightCol = service.ctaLink
    ? <a href={service.ctaLink} style={{ ...pricing, borderBottom: `1px solid ${hovered ? "var(--color-text)" : "var(--color-border)"}` }}>
        {service.from} →
      </a>
    : <span style={pricing}>{service.from}</span>

  return (
    <div
      style={item}
      className="distro-service-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={num}>0{index + 1}</span>

      <div style={body}>
        <h3 style={nameStyle}>{service.name}</h3>
        <p style={descStyle}>{service.description}</p>
        {service.tags && (
          <div style={tagsRow}>
            {service.tags.map(t => (
              <span key={t} style={tag}>{t}</span>
            ))}
          </div>
        )}
      </div>

      {rightCol}
    </div>
  )
}

export default function ServicesSection({
  services     = defaultServices,
  sectionLabel = "What We Make",
  ctaLabel     = "Let's Talk",
  ctaHref      = "/contact",
}) {
  const [ctaHover, setCtaHover] = useState(false)

  const section = {
    width:      "100%",
    boxSizing:  "border-box",
    background: "var(--color-bg)",
    padding:    "6rem 2rem",
    fontFamily: "var(--font-body)",
  }

  const inner = {
    maxWidth: 1280,
    margin:   "0 auto",
  }

  const header = {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "baseline",
    marginBottom:   "1rem",
    paddingBottom:  "1.5rem",
    borderBottom:   `1px solid var(--color-border)`,
  }

  const heading = {
    color:         "var(--color-text)",
    fontSize:      "clamp(1rem, 1.5vw, 1.15rem)",
    fontWeight:    400,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin:        0,
  }

  const count = {
    color:         "var(--color-muted)",
    fontSize:      "0.78rem",
    letterSpacing: "0.06em",
  }

  const footerRow = {
    marginTop:       "3rem",
    display:         "flex",
    justifyContent:  "center",
  }

  const cta = {
    background:     ctaHover ? "var(--color-text)" : "transparent",
    color:          ctaHover ? "var(--color-bg)" : "var(--color-text)",
    border:         `1px solid var(--color-text)`,
    padding:        "0.85rem 2.5rem",
    fontSize:       "0.82rem",
    letterSpacing:  "0.1em",
    textTransform:  "uppercase",
    textDecoration: "none",
    cursor:         "pointer",
    transition:     "background 0.2s ease, color 0.2s ease",
  }

  return (
    <section style={section}>
      <div style={inner}>
        <div style={header}>
          <h2 style={heading}>{sectionLabel}</h2>
          <span style={count}>{services.length} disciplines</span>
        </div>

        {services.map((s, i) => (
          <ServiceItem key={s.name} service={s} index={i} ctaHref={ctaHref} />
        ))}

        <div style={footerRow}>
          <a
            href={ctaHref}
            style={cta}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .distro-service-item {
            grid-template-columns: 48px 1fr !important;
          }
          .distro-service-item > :last-child {
            grid-column: 2;
            padding-top: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
