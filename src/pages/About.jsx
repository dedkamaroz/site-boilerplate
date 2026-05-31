import Footer from "../components/Footer"

const C = { bg: "#0D0D0D", surface: "#161616", border: "#2A2A2A", text: "#F0F0F0", muted: "#888888" }

const tools = [
  "Cinema 4D", "Houdini", "Octane Render", "Redshift",
  "After Effects", "DaVinci Resolve", "Blender", "Nuke",
  "Substance Painter", "Marvelous Designer", "ZBrush", "Unreal Engine",
]

const stats = [
  { value: "8+",   label: "Years in production" },
  { value: "200+", label: "Projects delivered" },
  { value: "3",    label: "Continents worked across" },
  { value: "24h",  label: "Fastest turnaround" },
]

export default function About() {
  return (
    <>
      {/* Hero statement */}
      <div style={{
        background:   C.bg,
        paddingTop:   "calc(72px + 5rem)",
        paddingBottom: "6rem",
        paddingLeft:  "2rem",
        paddingRight: "2rem",
        fontFamily:   '"Inter", sans-serif',
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p style={{
            color:         C.muted,
            fontSize:      "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom:  "2rem",
          }}>
            About the Studio
          </p>
          <h1 style={{
            color:         C.text,
            fontSize:      "clamp(2.5rem, 5vw, 5rem)",
            fontWeight:    700,
            letterSpacing: "-0.03em",
            lineHeight:    1.0,
            maxWidth:      900,
          }}>
            We make the impossible look real.
          </h1>
        </div>
      </div>

      {/* Story */}
      <div style={{
        background:   C.bg,
        borderTop:    `1px solid ${C.border}`,
        padding:      "5rem 2rem",
        fontFamily:   '"Inter", sans-serif',
      }}>
        <div style={{
          maxWidth:            1280,
          margin:              "0 auto",
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "6rem",
          alignItems:          "start",
        }}
          className="distro-about-grid"
        >
          <div>
            <h2 style={{
              color:         C.text,
              fontSize:      "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight:    700,
              letterSpacing: "-0.02em",
              marginBottom:  "1.5rem",
            }}>
              The Studio
            </h2>
            <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              DISTRO 3D is a specialist CGI and motion studio. We exist to give brands visual assets
              that are physically impossible to capture on set — and to make them look like they were.
            </p>
            <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              We work directly with brands, agencies, and production companies on projects that demand
              precision: product launches, architectural pre-sales, broadcast packages, and social content
              designed to stop the scroll.
            </p>
            <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.85 }}>
              Every frame is built from scratch. No stock. No shortcuts.
            </p>
          </div>
          <div>
            <h2 style={{
              color:         C.text,
              fontSize:      "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight:    700,
              letterSpacing: "-0.02em",
              marginBottom:  "1.5rem",
            }}>
              How We Work
            </h2>
            <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              We keep the team lean and the quality high. Every project has a dedicated lead who owns
              it from brief to delivery — no handoffs, no account managers sitting in between.
            </p>
            <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.85 }}>
              Most projects are turned around in one to three weeks. Rush deliveries are available —
              ask us about same-day and 48-hour tracks.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        background:   C.surface,
        borderTop:    `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding:      "4rem 2rem",
        fontFamily:   '"Inter", sans-serif',
      }}>
        <div style={{
          maxWidth:            1280,
          margin:              "0 auto",
          display:             "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap:                 "2rem",
        }}
          className="distro-stats-grid"
        >
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{
                color:         C.text,
                fontSize:      "clamp(2rem, 4vw, 3rem)",
                fontWeight:    700,
                letterSpacing: "-0.03em",
                marginBottom:  "0.4rem",
              }}>
                {s.value}
              </p>
              <p style={{ color: C.muted, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div style={{
        background: C.bg,
        padding:    "5rem 2rem",
        fontFamily: '"Inter", sans-serif',
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{
            color:         C.muted,
            fontSize:      "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom:  "2.5rem",
          }}>
            Tools & Software
          </h2>
          <div style={{
            display:   "flex",
            flexWrap:  "wrap",
            gap:       "0.75rem",
          }}>
            {tools.map(t => (
              <span key={t} style={{
                color:         C.muted,
                fontSize:      "0.8rem",
                letterSpacing: "0.06em",
                border:        `1px solid ${C.border}`,
                padding:       "0.4rem 0.9rem",
                fontFamily:    '"Inter", sans-serif',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer logoSrc="/assets/logo/logo.webp" />

      <style>{`
        @media (max-width: 767px) {
          .distro-about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .distro-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  )
}
