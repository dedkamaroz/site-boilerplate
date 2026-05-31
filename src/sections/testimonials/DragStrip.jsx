import { useRef, useState } from "react"
import { registerVariant } from "../registry"

// Placeholder testimonials so the variant renders standalone in the gallery.
const defaultItems = [
  {
    quote:
      "They delivered renders indistinguishable from real photography and saved us an entire product shoot.",
    author: "Sarah Mitchell",
    role: "Head of Brand, Luxe Co.",
  },
  {
    quote:
      "The content they produced hit two million views in 48 hours. Exactly the impact we wanted.",
    author: "Jordan Reeves",
    role: "Creative Director, Agency X",
  },
  {
    quote:
      "Architectural walkthroughs were shown to investors before a single brick was laid. Invaluable.",
    author: "Marcus Chen",
    role: "Development Director, Stratum Group",
  },
  {
    quote:
      "Their motion work made our rebrand feel alive. Every asset delivered on time, every time.",
    author: "Priya Sharma",
    role: "Marketing Lead, Volta Tech",
  },
]

const GAP = 24 // px between cards
const VISIBLE = 3

function QuoteCard({ item }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background: hovered ? "var(--color-surface)" : "transparent",
        border: `1px solid ${hovered ? "var(--color-muted)" : "var(--color-border)"}`,
        borderRadius: "var(--radius)",
        padding: "2rem",
        // Each card is exactly 1/3 of the track container minus gaps.
        flex: `0 0 calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        transition: "background 0.25s ease, border-color 0.25s ease",
        boxSizing: "border-box",
        scrollSnapAlign: "start",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        aria-hidden="true"
        style={{
          color: "var(--color-border)",
          fontSize: "3rem",
          lineHeight: 1,
          fontFamily: "var(--font-heading)",
          marginBottom: "-0.5rem",
        }}
      >
        &ldquo;
      </div>
      <p
        style={{
          color: "var(--color-text)",
          fontSize: "0.92rem",
          lineHeight: 1.7,
          margin: 0,
          fontFamily: "var(--font-body)",
          flexGrow: 1,
        }}
      >
        {item.quote}
      </p>
      <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}>
        <p
          style={{
            color: "var(--color-text)",
            fontSize: "0.82rem",
            fontWeight: 600,
            margin: "0 0 0.15rem",
            fontFamily: "var(--font-body)",
          }}
        >
          {item.author}
        </p>
        {item.role ? (
          <p
            style={{
              color: "var(--color-muted)",
              fontSize: "0.75rem",
              letterSpacing: "0.04em",
              margin: 0,
              fontFamily: "var(--font-body)",
            }}
          >
            {item.role}
          </p>
        ) : null}
      </div>
    </div>
  )
}

// testimonials / drag-strip: horizontal drag-scrollable quote cards with snap
// points and a dot pager. Adapted from the original TestimonialsStrip component.
export function DragStrip({ brand = {}, headline = "What Clients Say", items = defaultItems }) {
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const dotCount = Math.max(1, items.length - VISIBLE + 1)

  const scrollTo = (i) => {
    const track = trackRef.current
    if (!track) return
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
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    padding: "6rem 0",
    fontFamily: "var(--font-body)",
    overflow: "hidden",
  }

  const header = {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "0 2rem",
    marginBottom: "3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  }

  const heading = {
    color: "var(--color-text)",
    fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
    fontWeight: 400,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin: 0,
    fontFamily: "var(--font-heading)",
  }

  const track = {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    gap: GAP,
    overflowX: "auto",
    scrollbarWidth: "none",
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
    boxSizing: "border-box",
  }

  const dotsRow = {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "2.5rem",
  }

  const dot = (i) => ({
    width: i === current ? "1.5rem" : "0.4rem",
    height: "0.4rem",
    borderRadius: "var(--radius)",
    background: i === current ? "var(--color-text)" : "var(--color-border)",
    border: "none",
    padding: 0,
    cursor: "pointer",
    transition: "width 0.3s ease, background 0.3s ease",
  })

  const label = headline || brand.name || "What Clients Say"

  return (
    <section style={section} data-section-type="testimonials" data-variant="drag-strip">
      <div style={header}>
        <h2 style={heading}>{label}</h2>
      </div>

      <div ref={trackRef} style={track} onScroll={handleScroll} className="bp-testimonials-track">
        {items.map((item, i) => (
          <QuoteCard key={i} item={item} />
        ))}
      </div>

      {dotCount > 1 ? (
        <div style={dotsRow}>
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              style={dot(i)}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      ) : null}

      <style>{`
        .bp-testimonials-track::-webkit-scrollbar { display: none; }
        @media (max-width: 900px) {
          .bp-testimonials-track > * {
            flex: 0 0 calc((100% - ${GAP}px) / 2) !important;
          }
        }
        @media (max-width: 600px) {
          .bp-testimonials-track > * {
            flex: 0 0 85% !important;
          }
        }
      `}</style>
    </section>
  )
}

registerVariant("testimonials", "drag-strip", DragStrip)
