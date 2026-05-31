import { useRef, useState } from "react"

const C = {
  bg:      "#0D0D0D",
  surface: "#161616",
  border:  "#2A2A2A",
  text:    "#F0F0F0",
  muted:   "#888888",
}

const defaultTestimonials = [
  {
    quote:   "DISTRO 3D delivered renders indistinguishable from real photography. Saved us an entire product shoot.",
    name:    "Sarah Mitchell",
    company: "Head of Brand, Luxe Co.",
  },
  {
    quote:   "The FOOH content they produced hit 2M views in 48 hours. Exactly the chaos we wanted.",
    name:    "Jordan Reeves",
    company: "Creative Director, Agency X",
  },
  {
    quote:   "Architectural walkthroughs were presented to investors before a single brick was laid. Invaluable.",
    name:    "Marcus Chen",
    company: "Development Director, Stratum Group",
  },
  {
    quote:   "Their motion work made our rebrand feel alive. Every asset delivered on time, every time.",
    name:    "Priya Sharma",
    company: "Marketing Lead, Volta Tech",
  },
  {
    quote:   "We briefed them at 9am and had hero renders in our inbox by end of day. Exceptional turnaround.",
    name:    "Tom Ellison",
    company: "CEO, Capsule Studio",
  },
]

const GAP = 24 // px between cards
const VISIBLE = 3

function QuoteCard({ testimonial }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background:    hovered ? C.surface : "transparent",
        border:        `1px solid ${hovered ? "#3A3A3A" : C.border}`,
        padding:       "2rem",
        // Each card is exactly 1/3 of the track container minus gaps
        flex:          `0 0 calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
        display:       "flex",
        flexDirection: "column",
        gap:           "1.5rem",
        transition:    "background 0.25s ease, border-color 0.25s ease",
        boxSizing:     "border-box",
        scrollSnapAlign: "start",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ color: "#2A2A2A", fontSize: "3rem", lineHeight: 1, fontFamily: "Georgia, serif", marginBottom: "-0.5rem" }}>
        &ldquo;
      </div>
      <p style={{ color: C.text, fontSize: "0.92rem", lineHeight: 1.7, margin: 0, fontFamily: '"Inter", sans-serif', flexGrow: 1 }}>
        {testimonial.quote}
      </p>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem" }}>
        <p style={{ color: C.text, fontSize: "0.82rem", fontWeight: 600, margin: "0 0 0.15rem", fontFamily: '"Inter", sans-serif' }}>
          {testimonial.name}
        </p>
        <p style={{ color: C.muted, fontSize: "0.75rem", letterSpacing: "0.04em", margin: 0, fontFamily: '"Inter", sans-serif' }}>
          {testimonial.company}
        </p>
      </div>
    </div>
  )
}

export default function TestimonialsStrip({
  testimonials = defaultTestimonials,
  sectionLabel = "What Clients Say",
}) {
  const trackRef          = useRef(null)
  const [current, setCurrent] = useState(0)
  const dotCount          = testimonials.length - VISIBLE + 1  // 5 - 3 + 1 = 3

  const scrollTo = (i) => {
    const track = trackRef.current
    if (!track) return
    // offsetLeft of the i-th card relative to the scroll container
    const card = track.children[i]
    if (card) track.scrollTo({ left: card.offsetLeft, behavior: "smooth" })
    setCurrent(i)
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track || !track.children[0]) return
    const cardW = track.children[0].offsetWidth
    const i = Math.round(track.scrollLeft / (cardW + GAP))
    setCurrent(Math.max(0, Math.min(i, dotCount - 1)))
  }

  const section = {
    width:      "100%",
    boxSizing:  "border-box",
    background: C.bg,
    padding:    "6rem 0",
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
    overflow:   "hidden",
  }

  const header = {
    maxWidth:     1280,
    margin:       "0 auto",
    padding:      "0 2rem",
    marginBottom: "3rem",
    display:      "flex",
    justifyContent: "space-between",
    alignItems:   "baseline",
  }

  const heading = {
    color:         C.text,
    fontSize:      "clamp(1rem, 1.5vw, 1.15rem)",
    fontWeight:    400,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin:        0,
  }

  const track = {
    maxWidth:       1280,
    margin:         "0 auto",
    padding:        "0 2rem",
    display:        "flex",
    gap:            GAP,
    overflowX:      "auto",
    scrollbarWidth: "none",
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
    boxSizing:      "border-box",
  }

  const dotsRow = {
    display:        "flex",
    justifyContent: "center",
    gap:            "0.5rem",
    marginTop:      "2.5rem",
  }

  const dot = (i) => ({
    width:        i === current ? "1.5rem" : "0.4rem",
    height:       "0.4rem",
    borderRadius: "2px",
    background:   i === current ? C.text : C.border,
    border:       "none",
    padding:      0,
    cursor:       "pointer",
    transition:   "width 0.3s ease, background 0.3s ease",
  })

  return (
    <section style={section}>
      <div style={header}>
        <h2 style={heading}>{sectionLabel}</h2>
      </div>

      <div
        ref={trackRef}
        style={track}
        onScroll={handleScroll}
        className="distro-testimonials-track"
      >
        {testimonials.map((t, i) => (
          <QuoteCard key={i} testimonial={t} />
        ))}
      </div>

      <div style={dotsRow}>
        {Array.from({ length: dotCount }).map((_, i) => (
          <button key={i} style={dot(i)} onClick={() => scrollTo(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>

      <style>{`
        .distro-testimonials-track::-webkit-scrollbar { display: none; }
        @media (max-width: 900px) {
          .distro-testimonials-track > * {
            flex: 0 0 calc((100% - ${GAP}px) / 2) !important;
          }
        }
        @media (max-width: 600px) {
          .distro-testimonials-track > * {
            flex: 0 0 85% !important;
          }
        }
      `}</style>
    </section>
  )
}
