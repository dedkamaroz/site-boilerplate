import { useRef, useEffect, useState } from "react"

const C = {
  bg:   "#0D0D0D",
  text: "#F0F0F0",
  muted: "#888888",
}

export default function Hero({
  videoSrc    = "/assets/portfolio/showreel.mp4",
  headline    = "We Make the Impossible Look Real",
  subline     = "CGI · Motion Graphics · 3D Visualisation",
  ctaLabel    = "See Our Work",
  ctaHref     = "/work",
  posterSrc   = "/assets/portfolio/showreel-poster.jpg",
}) {
  const videoRef            = useRef(null)
  const [ctaHover, setCtaHover] = useState(false)
  const [scrollHover, setScrollHover] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [videoSrc])

  const outer = {
    position:   "relative",
    width:      "100%",
    boxSizing:  "border-box",
    height:     "100dvh",
    minHeight:  600,
    overflow:   "hidden",
    display:    "flex",
    alignItems: "center",
    justifyContent: "center",
    background: C.bg,
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
  }

  const videoBg = {
    position:   "absolute",
    inset:      0,
    width:      "100%",
    height:     "100%",
    objectFit:  "cover",
    objectPosition: "center",
  }

  // Gradient overlay — heavier at top (nav legibility) and bottom (text legibility)
  const overlay = {
    position: "absolute",
    inset:    0,
    background: videoSrc
      ? "linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.1) 40%, rgba(13,13,13,0.1) 60%, rgba(13,13,13,0.7) 100%)"
      : "linear-gradient(135deg, #0D0D0D 0%, #161616 50%, #0D0D0D 100%)",
  }

  const content = {
    position:   "relative",
    zIndex:     2,
    textAlign:  "center",
    padding:    "0 1.5rem",
    maxWidth:   900,
  }

  const h1 = {
    color:        C.text,
    fontSize:     "clamp(2.5rem, 6vw, 5rem)",
    fontWeight:   700,
    lineHeight:   1.05,
    letterSpacing: "-0.02em",
    margin:       "0 0 1.25rem",
  }

  const sub = {
    color:        C.muted,
    fontSize:     "clamp(0.9rem, 1.5vw, 1.1rem)",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin:       "0 0 2.5rem",
    fontWeight:   400,
  }

  const ctaBtn = {
    display:        "inline-block",
    background:     ctaHover ? C.text : "transparent",
    color:          ctaHover ? C.bg : C.text,
    border:         `1px solid ${C.text}`,
    padding:        "0.85rem 2.25rem",
    fontSize:       "0.85rem",
    letterSpacing:  "0.1em",
    textTransform:  "uppercase",
    textDecoration: "none",
    cursor:         "pointer",
    transition:     "background 0.25s ease, color 0.25s ease",
  }

  const scrollIndicator = {
    position:   "absolute",
    bottom:     "2rem",
    left:       "50%",
    transform:  "translateX(-50%)",
    zIndex:     2,
    display:    "flex",
    flexDirection: "column",
    alignItems: "center",
    gap:        "0.4rem",
    cursor:     "pointer",
    color:      scrollHover ? C.text : C.muted,
    transition: "color 0.2s ease",
    textDecoration: "none",
  }

  const scrollText = {
    fontSize:     "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color:        "inherit",
  }

  return (
    <section style={outer}>
      {/* Video background */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc || undefined}
          style={videoBg}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Overlay */}
      <div style={overlay} />

      {/* Content */}
      <div style={content}>
        <h1 style={h1}>{headline}</h1>
        <p style={sub}>{subline}</p>
        <a
          href={ctaHref}
          style={ctaBtn}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
        >
          {ctaLabel}
        </a>
      </div>

      {/* Scroll indicator */}
      <a
        href={ctaHref}
        style={scrollIndicator}
        onMouseEnter={() => setScrollHover(true)}
        onMouseLeave={() => setScrollHover(false)}
        aria-label="Scroll down"
      >
        <span style={scrollText}>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="6" y="0" width="4" height="14" rx="2" fill="currentColor" opacity="0.4" />
          <style>{`
            @keyframes distro-scroll-dot {
              0%   { transform: translateY(0); opacity: 0.8; }
              80%  { transform: translateY(8px); opacity: 0.1; }
              100% { transform: translateY(8px); opacity: 0; }
            }
          `}</style>
          <rect
            x="6" y="2" width="4" height="5" rx="2" fill="currentColor"
            style={{ animation: "distro-scroll-dot 1.6s ease-in-out infinite" }}
          />
          <path d="M4 18L8 23L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </a>
    </section>
  )
}
