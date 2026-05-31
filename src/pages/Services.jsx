import ServicesSection from "../components/ServicesSection"
import Footer          from "../components/Footer"

const C = { bg: "#0D0D0D", text: "#F0F0F0", muted: "#888888", border: "#2A2A2A" }

const detail = [
  {
    name:         "CGI Production",
    from:         "From $1,500",
    body:         "Photo-real product and environment renders built entirely in CG. From e-commerce hero shots to full campaign imagery — we deliver files ready for print, broadcast, and digital at any scale.",
    deliverables: ["High-res stills (up to 8K)", "Turntable renders", "Lifestyle composites", "Layered PSD / EXR files"],
  },
  {
    name:         "Motion Graphics",
    from:         "From $1,200",
    body:         "Kinetic title sequences, logo animations, and brand motion systems. We design motion languages that work across broadcast, social, and OOH — delivered as After Effects project files or pre-rendered masters.",
    deliverables: ["Logo stings & reveals", "Lower-thirds & titles", "Social format cuts", "Brand motion guidelines"],
  },
  {
    name:         "3D Visualisation",
    from:         "From $850",
    body:         "Architectural and interior renders, product configurators, and walkthroughs that replace physical shoots. Presented to clients, investors, or planning authorities before a single real-world object exists.",
    deliverables: ["Photorealistic stills", "360° panoramas", "Animated walkthroughs", "Interactive configurators"],
  },
  {
    name:         "FOOH",
    from:         "From $2,200",
    body:         "Fake out-of-home: AI-assisted composites that plant your product in impossible real-world scenarios. Designed to go viral. Briefed, shot (or sourced), and composited in under two weeks.",
    deliverables: ["Social-ready MP4 (9:16, 1:1, 16:9)", "Raw composite files", "Posting strategy brief", "Rapid turnaround available"],
  },
  {
    name:         "Custom Projects",
    from:         null,
    ctaLink:      "/contact",
    body:         "Something that doesn't fit the mould? We work across all disciplines and welcome unusual briefs — multi-format campaigns, experimental formats, tight deadlines, and everything in between. Tell us what you're trying to achieve.",
    deliverables: ["Scope defined with you", "Rapid written quote", "No obligation", "Any format, any scale"],
  },
]

export default function Services() {
  return (
    <>
      {/* Page header */}
      <div style={{
        background:   C.bg,
        paddingTop:   "calc(72px + 5rem)",
        paddingBottom: "4rem",
        paddingLeft:  "2rem",
        paddingRight: "2rem",
        borderBottom: `1px solid ${C.border}`,
        fontFamily:   '"Inter", sans-serif',
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{
            color:         C.text,
            fontSize:      "clamp(2.5rem, 5vw, 4rem)",
            fontWeight:    700,
            letterSpacing: "-0.02em",
            lineHeight:    1,
            marginBottom:  "1rem",
          }}>
            Services
          </h1>
          <p style={{
            color:      C.muted,
            fontSize:   "1.05rem",
            lineHeight: 1.7,
            maxWidth:   520,
          }}>
            We work across CGI, motion, visualisation, and emerging formats.
            Every project is built to brief — no templates, no stock.
          </p>
        </div>
      </div>

      {/* Detailed service cards */}
      <div style={{
        background: C.bg,
        padding:    "4rem 2rem 2rem",
        fontFamily: '"Inter", sans-serif',
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0" }}>
          {detail.map((s, i) => (
            <div key={s.name} style={{
              display:             "grid",
              gridTemplateColumns: "1fr 1fr",
              gap:                 "4rem",
              padding:             "4rem 0",
              borderBottom:        `1px solid ${C.border}`,
            }}
              className="distro-service-detail-row"
            >
              <div>
                <span style={{ color: C.muted, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  0{i + 1}
                </span>
                <h2 style={{
                  color:         C.text,
                  fontSize:      "clamp(1.5rem, 2.5vw, 2.25rem)",
                  fontWeight:    700,
                  letterSpacing: "-0.02em",
                  margin:        "0.5rem 0 0.75rem",
                }}>
                  {s.name}
                </h2>
                {s.ctaLink
                  ? <a href={s.ctaLink} style={{ color: C.text, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderBottom: `1px solid #2A2A2A`, paddingBottom: "1px" }}>
                      Rapid Quote →
                    </a>
                  : <p style={{ color: C.muted, fontSize: "0.8rem", letterSpacing: "0.04em" }}>{s.from}</p>
                }
              </div>
              <div>
                <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  {s.body}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {s.deliverables.map(d => (
                    <li key={d} style={{
                      color:      C.muted,
                      fontSize:   "0.8rem",
                      letterSpacing: "0.02em",
                      paddingLeft: "1rem",
                      position:   "relative",
                    }}>
                      <span style={{ position: "absolute", left: 0, color: "#3A3A3A" }}>—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div style={{
        background: C.bg,
        padding:    "6rem 2rem",
        textAlign:  "center",
        fontFamily: '"Inter", sans-serif',
      }}>
        <p style={{ color: C.muted, fontSize: "0.8rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Ready to start?
        </p>
        <h2 style={{
          color:         C.text,
          fontSize:      "clamp(2rem, 4vw, 3.5rem)",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          marginBottom:  "2rem",
        }}>
          Let's build something impossible.
        </h2>
        <a href="/contact" style={{
          display:        "inline-block",
          background:     "transparent",
          color:          C.text,
          border:         `1px solid ${C.text}`,
          padding:        "0.85rem 2.5rem",
          fontSize:       "0.82rem",
          letterSpacing:  "0.1em",
          textTransform:  "uppercase",
          textDecoration: "none",
        }}>
          Get in Touch
        </a>
      </div>

      <Footer logoSrc="/assets/logo/logo.webp" />

      <style>{`
        @media (max-width: 767px) {
          .distro-service-detail-row { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </>
  )
}
