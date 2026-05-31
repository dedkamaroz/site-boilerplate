import { useRef, useState, useEffect } from "react"
import { getFeatured } from "../data/projects"

const C = {
  bg:      "#0D0D0D",
  surface: "#161616",
  border:  "#2A2A2A",
  text:    "#F0F0F0",
  muted:   "#888888",
}

const defaultItems = [
  {
    slug:        "next-gen",
    title:       "Next Gen",
    category:    "CGI",
    client:      "Tech Client",
    coverImage:  "/assets/portfolio/headphones.webp",
    coverVideo:  "/assets/portfolio/phone.mp4",
    posterSrc:   "/assets/portfolio/phone-poster.jpg",
    description: "Hyper-real product CGI for a flagship device launch.",
  },
  {
    slug:        "elixir",
    title:       "Elixir",
    category:    "3D Viz",
    client:      "Fragrance Brand",
    coverImage:  "/assets/portfolio/perfume-poster.jpg",
    coverVideo:  "/assets/portfolio/perfume.mp4",
    posterSrc:   "/assets/portfolio/perfume-poster.jpg",
    description: "Cinematic liquid and glass simulation for a luxury fragrance campaign.",
  },
  {
    slug:        "brand-motion",
    title:       "Brand Motion",
    category:    "Motion Graphics",
    client:      "Studio Project",
    coverImage:  "/assets/portfolio/logo-poster.jpg",
    coverVideo:  "/assets/portfolio/logo.mp4",
    posterSrc:   "/assets/portfolio/logo-poster.jpg",
    description: "Kinetic logo reveal system built for a multi-platform rebrand.",
  },
  {
    slug:        "velocity",
    title:       "Velocity",
    category:    "CGI",
    client:      "Automotive",
    coverImage:  "/assets/portfolio/car.webp",
    coverVideo:  "",
    posterSrc:   "",
    description: "Full-CG automotive render series — zero physical shoot required.",
  },
]

function FeaturedCard({ item, index, href = "#" }) {
  const videoRef       = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const cardRef        = useRef(null)

  // Scroll reveal
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Video hover
  const handleMouseEnter = () => {
    setHovered(true)
    if (videoRef.current && item.coverVideo) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }
  const handleMouseLeave = () => {
    setHovered(false)
    if (videoRef.current) videoRef.current.pause()
  }

  const isEven  = index % 2 === 0
  const mediaW  = "55%"
  const textW   = "40%"

  const row = {
    display:       "flex",
    flexDirection: isEven ? "row" : "row-reverse",
    alignItems:    "center",
    gap:           "5%",
    marginBottom:  "6rem",
    opacity:       visible ? 1 : 0,
    transform:     visible ? "translateY(0)" : "translateY(40px)",
    transition:    "opacity 0.7s ease, transform 0.7s ease",
    transitionDelay: `${index * 0.1}s`,
  }

  const mediaBox = {
    position:     "relative",
    width:        mediaW,
    aspectRatio:  "16/10",
    overflow:     "hidden",
    background:   C.surface,
    flexShrink:   0,
  }

  const media = {
    position:   "absolute",
    inset:      0,
    width:      "100%",
    height:     "100%",
    objectFit:  "cover",
    transform:  hovered ? "scale(1.04)" : "scale(1)",
    transition: "transform 0.5s ease",
  }

  const categoryTag = {
    display:       "inline-block",
    color:         C.muted,
    fontSize:      "0.7rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom:  "0.75rem",
    fontFamily:    '"Inter", "Helvetica Neue", sans-serif',
  }

  const titleStyle = {
    color:        C.text,
    fontSize:     "clamp(1.8rem, 3vw, 2.75rem)",
    fontWeight:   700,
    lineHeight:   1.05,
    letterSpacing: "-0.02em",
    margin:       "0 0 1rem",
    fontFamily:   '"Inter", "Helvetica Neue", sans-serif',
  }

  const descStyle = {
    color:      C.muted,
    fontSize:   "0.95rem",
    lineHeight: 1.7,
    margin:     "0 0 1.75rem",
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
  }

  const linkStyle = {
    color:          C.text,
    textDecoration: "none",
    fontSize:       "0.8rem",
    letterSpacing:  "0.1em",
    textTransform:  "uppercase",
    borderBottom:   `1px solid ${C.border}`,
    paddingBottom:  "2px",
    transition:     "border-color 0.2s ease",
    fontFamily:     '"Inter", "Helvetica Neue", sans-serif',
  }

  const textCol = {
    width:   textW,
    flexShrink: 0,
  }

  const clientStyle = {
    color:         C.muted,
    fontSize:      "0.75rem",
    letterSpacing: "0.1em",
    fontFamily:    '"Inter", "Helvetica Neue", sans-serif',
    marginTop:     "0.5rem",
  }

  return (
    <div ref={cardRef} style={row} className="distro-featured-row">
      {/* Media */}
      <a
        href={`/work/${item.slug}`}
        style={{ ...mediaBox, textDecoration: "none" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {item.coverImage && (
          <img
            src={item.coverImage}
            alt={item.title}
            style={{ ...media, opacity: (item.coverVideo && hovered) ? 0 : 1 }}
          />
        )}
        {item.coverVideo && (
          <video
            ref={videoRef}
            src={item.coverVideo}
            style={{ ...media, opacity: hovered ? 1 : (item.coverImage ? 0 : 1) }}
            muted
            loop
            playsInline
          />
        )}
        {/* Index number overlay */}
        <span style={{
          position:      "absolute",
          bottom:        "1rem",
          right:         "1rem",
          color:         C.muted,
          fontSize:      "0.7rem",
          letterSpacing: "0.1em",
          fontFamily:    '"Inter", sans-serif',
          opacity:       0.6,
        }}>
          0{index + 1}
        </span>
      </a>

      {/* Text */}
      <div style={textCol}>
        <span style={categoryTag}>{item.category}</span>
        <h3 style={titleStyle}>{item.title}</h3>
        <p style={descStyle}>{item.description}</p>
        <a href={`/work/${item.slug}`} style={linkStyle}>View Project</a>
        {item.client && <p style={clientStyle}>{item.client}</p>}
      </div>
    </div>
  )
}

export default function FeaturedWork({
  items      = getFeatured(),
  sectionLabel = "Featured Work",
  viewAllHref  = "/work",
}) {
  const section = {
    width:      "100%",
    boxSizing:  "border-box",
    background: C.bg,
    padding:    "6rem 2rem",
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
  }

  const inner = {
    maxWidth: 1280,
    margin:   "0 auto",
  }

  const header = {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "baseline",
    marginBottom:   "4rem",
  }

  const heading = {
    color:         C.text,
    fontSize:      "clamp(1rem, 1.5vw, 1.15rem)",
    fontWeight:    400,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin:        0,
  }

  const viewAll = {
    color:          C.muted,
    textDecoration: "none",
    fontSize:       "0.78rem",
    letterSpacing:  "0.1em",
    textTransform:  "uppercase",
    borderBottom:   `1px solid ${C.border}`,
    paddingBottom:  "2px",
  }

  return (
    <section style={section}>
      <div style={inner}>
        <div style={header}>
          <h2 style={heading}>{sectionLabel}</h2>
          <a href={viewAllHref} style={viewAll}>View All</a>
        </div>

        {items.map((item, i) => (
          <FeaturedCard key={item.slug} item={item} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .distro-featured-row {
            flex-direction: column !important;
          }
          .distro-featured-row > * {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
