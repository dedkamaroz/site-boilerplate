import { useState, useRef, useEffect } from "react"
import { projects as allProjects } from "../data/projects"

const C = {
  bg:      "#0D0D0D",
  surface: "#161616",
  border:  "#2A2A2A",
  text:    "#F0F0F0",
  muted:   "#888888",
}

const CATEGORIES = ["All", "CGI", "Motion Graphics", "3D Viz", "FOOH"]

const defaultItems = [
  {
    slug:       "next-gen",
    title:      "Next Gen",
    category:   "CGI",
    client:     "Tech Client",
    year:       2025,
    coverImage: "/assets/portfolio/headphones.webp",
    coverVideo: "/assets/portfolio/phone.mp4",
    posterSrc:  "/assets/portfolio/phone-poster.jpg",
    featured:   true,
    sortOrder:  1,
  },
  {
    slug:       "elixir",
    title:      "Elixir",
    category:   "3D Viz",
    client:     "Fragrance Brand",
    year:       2025,
    coverImage: "/assets/portfolio/perfume-poster.jpg",
    coverVideo: "/assets/portfolio/perfume.mp4",
    posterSrc:  "/assets/portfolio/perfume-poster.jpg",
    featured:   true,
    sortOrder:  2,
  },
  {
    slug:       "brand-motion",
    title:      "Brand Motion",
    category:   "Motion Graphics",
    client:     "Studio Project",
    year:       2025,
    coverImage: "/assets/portfolio/logo-poster.jpg",
    coverVideo: "/assets/portfolio/logo.mp4",
    posterSrc:  "/assets/portfolio/logo-poster.jpg",
    featured:   true,
    sortOrder:  3,
  },
  {
    slug:       "velocity",
    title:      "Velocity",
    category:   "CGI",
    client:     "Automotive",
    year:       2024,
    coverImage: "/assets/portfolio/car.webp",
    coverVideo: "",
    posterSrc:  "",
    featured:   true,
    sortOrder:  4,
  },
  {
    slug:       "serenity",
    title:      "Serenity",
    category:   "3D Viz",
    client:     "Hospitality",
    year:       2024,
    coverImage: "/assets/portfolio/bath-poster.jpg",
    coverVideo: "/assets/portfolio/bath.mp4",
    posterSrc:  "/assets/portfolio/bath-poster.jpg",
    featured:   false,
    sortOrder:  5,
  },
  {
    slug:       "abstract-forms",
    title:      "Abstract Forms",
    category:   "CGI",
    client:     "Studio Project",
    year:       2024,
    coverImage: "/assets/portfolio/abstract.webp",
    coverVideo: "",
    posterSrc:  "",
    featured:   false,
    sortOrder:  6,
  },
  {
    slug:       "modern-living",
    title:      "Modern Living",
    category:   "3D Viz",
    client:     "Property Developer",
    year:       2024,
    coverImage: "/assets/portfolio/flat-poster.jpg",
    coverVideo: "/assets/portfolio/flat.mp4",
    posterSrc:  "/assets/portfolio/flat-poster.jpg",
    featured:   false,
    sortOrder:  7,
  },
  {
    slug:       "precision",
    title:      "Precision",
    category:   "3D Viz",
    client:     "Luxury Brand",
    year:       2024,
    coverImage: "/assets/portfolio/watch-poster.jpg",
    coverVideo: "/assets/portfolio/watch.mp4",
    posterSrc:  "/assets/portfolio/watch-poster.jpg",
    featured:   false,
    sortOrder:  8,
  },
]

function PortfolioCard({ item }) {
  const videoRef          = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const cardRef           = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleEnter = () => {
    setHovered(true)
    if (videoRef.current && item.coverVideo) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }
  const handleLeave = () => {
    setHovered(false)
    if (videoRef.current) videoRef.current.pause()
  }

  const card = {
    position:   "relative",
    overflow:   "hidden",
    background: C.surface,
    aspectRatio: "4/3",
    cursor:     "pointer",
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  }

  const media = {
    position:   "absolute",
    inset:      0,
    width:      "100%",
    height:     "100%",
    objectFit:  "cover",
    transform:  hovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.5s ease",
  }

  const overlay = {
    position:   "absolute",
    inset:      0,
    background: hovered
      ? "linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.2) 60%, transparent 100%)"
      : "linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 60%)",
    transition: "background 0.35s ease",
  }

  const info = {
    position:      "absolute",
    bottom:        0,
    left:          0,
    right:         0,
    padding:       "1.25rem",
    display:       "flex",
    flexDirection: "column",
    gap:           "0.3rem",
  }

  const catTag = {
    color:         C.muted,
    fontSize:      "0.65rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontFamily:    '"Inter", sans-serif',
  }

  const titleStyle = {
    color:        C.text,
    fontSize:     "1rem",
    fontWeight:   600,
    margin:       0,
    fontFamily:   '"Inter", sans-serif',
    letterSpacing: "-0.01em",
  }

  const yearStyle = {
    color:      C.muted,
    fontSize:   "0.7rem",
    fontFamily: '"Inter", sans-serif',
    opacity:    hovered ? 1 : 0,
    transform:  hovered ? "translateY(0)" : "translateY(4px)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  }

  return (
    <a
      ref={cardRef}
      href={`/work/${item.slug}`}
      style={{ ...card, textDecoration: "none" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
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
      <div style={overlay} />
      <div style={info}>
        <span style={catTag}>{item.category}</span>
        <h3 style={titleStyle}>{item.title}</h3>
        <span style={yearStyle}>{item.client} · {item.year}</span>
      </div>
    </a>
  )
}

export default function PortfolioGrid({
  items        = allProjects,
  sectionLabel = "Our Work",
  showFilter   = true,
}) {
  const [active, setActive] = useState("All")

  const filtered = active === "All"
    ? [...items].sort((a, b) => a.sortOrder - b.sortOrder)
    : items.filter(i => i.category === active).sort((a, b) => a.sortOrder - b.sortOrder)

  const section = {
    width:      "100%",
    boxSizing:  "border-box",
    background: C.bg,
    padding:    "6rem 2rem",
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
    minHeight:  "70vh",
  }

  const inner = {
    maxWidth: 1280,
    margin:   "0 auto",
  }

  const header = {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "baseline",
    marginBottom:   "2.5rem",
  }

  const heading = {
    color:         C.text,
    fontSize:      "clamp(1rem, 1.5vw, 1.15rem)",
    fontWeight:    400,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin:        0,
  }

  const countStyle = {
    color:      C.muted,
    fontSize:   "0.78rem",
    letterSpacing: "0.04em",
  }

  const filterBar = {
    display:        "flex",
    gap:            "0.25rem",
    marginBottom:   "2.5rem",
    flexWrap:       "wrap",
  }

  const filterBtn = (cat) => ({
    background:    active === cat ? C.text : "transparent",
    color:         active === cat ? C.bg : C.muted,
    border:        `1px solid ${active === cat ? C.text : C.border}`,
    padding:       "0.4rem 1rem",
    fontSize:      "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor:        "pointer",
    fontFamily:    '"Inter", sans-serif',
    transition:    "all 0.2s ease",
  })

  const grid = {
    display:             "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap:                 "1px",
    background:          C.border,
  }

  return (
    <section style={section}>
      <div style={inner}>
        <div style={header}>
          <h2 style={heading}>{sectionLabel}</h2>
          <span style={countStyle}>{filtered.length} project{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {showFilter && (
          <div style={filterBar}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                style={filterBtn(cat)}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div style={grid} className="distro-portfolio-grid">
          {filtered.map(item => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .distro-portfolio-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
