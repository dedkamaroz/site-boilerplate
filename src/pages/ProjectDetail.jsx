import { useParams, Link } from "react-router-dom"
import { useRef, useEffect } from "react"
import { getBySlug, projects } from "../data/projects"
import Footer from "../components/Footer"

const C = {
  bg:      "#0D0D0D",
  surface: "#161616",
  border:  "#2A2A2A",
  text:    "#F0F0F0",
  muted:   "#888888",
}

function isVideo(src) {
  return src && src.endsWith(".mp4")
}

export default function ProjectDetail() {
  const { slug }  = useParams()
  const project   = getBySlug(slug)
  const videoRef  = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [slug])

  if (!project) {
    return (
      <div style={{
        background:     C.bg,
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "1.5rem",
        fontFamily:     '"Inter", sans-serif',
      }}>
        <p style={{ color: C.muted, fontSize: "1rem" }}>Project not found.</p>
        <Link to="/work" style={{ color: C.text, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          ← Back to Work
        </Link>
      </div>
    )
  }

  const heroIsVideo = isVideo(project.heroMedia)

  // Adjacent projects for prev/next nav
  const sorted  = [...projects].sort((a, b) => a.sortOrder - b.sortOrder)
  const idx     = sorted.findIndex(p => p.slug === slug)
  const prev    = sorted[idx - 1] || null
  const next    = sorted[idx + 1] || null

  return (
    <>
      {/* Hero media */}
      <div style={{
        position:   "relative",
        width:      "100%",
        height:     "70vh",
        minHeight:  500,
        overflow:   "hidden",
        background: C.surface,
      }}>
        {heroIsVideo ? (
          <video
            ref={videoRef}
            src={project.heroMedia}
            poster={project.posterSrc || undefined}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            autoPlay muted loop playsInline
          />
        ) : (
          <img
            src={project.heroMedia}
            alt={project.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, transparent 40%, rgba(13,13,13,0.7) 100%)",
        }} />
      </div>

      {/* Content */}
      <div style={{
        background: C.bg,
        padding:    "4rem 2rem 6rem",
        fontFamily: '"Inter", sans-serif',
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          {/* Back link */}
          <Link to="/work" style={{
            color:         C.muted,
            textDecoration: "none",
            fontSize:      "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            display:       "inline-block",
            marginBottom:  "2.5rem",
          }}>
            ← All Work
          </Link>

          {/* Meta row */}
          <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ color: C.muted, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {project.category}
            </span>
            {project.client && (
              <span style={{ color: C.muted, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {project.client}
              </span>
            )}
            <span style={{ color: C.muted, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            color:         C.text,
            fontSize:      "clamp(2.5rem, 5vw, 4rem)",
            fontWeight:    700,
            letterSpacing: "-0.02em",
            lineHeight:    1,
            marginBottom:  "2rem",
          }}>
            {project.title}
          </h1>

          {/* Description */}
          <p style={{
            color:      C.muted,
            fontSize:   "1.1rem",
            lineHeight: 1.8,
            maxWidth:   600,
          }}>
            {project.description}
          </p>

          {/* Prev / Next */}
          <div style={{
            display:        "flex",
            justifyContent: "space-between",
            marginTop:      "5rem",
            paddingTop:     "2rem",
            borderTop:      `1px solid ${C.border}`,
            gap:            "1rem",
          }}>
            {prev ? (
              <Link to={`/work/${prev.slug}`} style={{
                color:          C.muted,
                textDecoration: "none",
                fontSize:       "0.78rem",
                letterSpacing:  "0.1em",
                textTransform:  "uppercase",
              }}>
                ← {prev.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/work/${next.slug}`} style={{
                color:          C.muted,
                textDecoration: "none",
                fontSize:       "0.78rem",
                letterSpacing:  "0.1em",
                textTransform:  "uppercase",
              }}>
                {next.title} →
              </Link>
            ) : <span />}
          </div>

        </div>
      </div>

      <Footer logoSrc="/assets/logo/logo.webp" />
    </>
  )
}
