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

// testimonials / stacked-quotes: vertically stacked large pull-quotes, each with
// author and optional role. No horizontal scroll - quotes alternate alignment
// down the page so the section reads as an editorial column of statements.
export function StackedQuotes({ brand = {}, headline = "What Clients Say", items = defaultItems }) {
  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    padding: "6rem 0",
    fontFamily: "var(--font-body)",
  }

  const inner = {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "4rem",
  }

  const heading = {
    color: "var(--color-text)",
    fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
    fontWeight: 400,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin: "0 0 1rem",
    fontFamily: "var(--font-heading)",
  }

  const quoteBlock = (alignEnd) => ({
    maxWidth: "48rem",
    width: "100%",
    marginLeft: alignEnd ? "auto" : 0,
    marginRight: alignEnd ? 0 : "auto",
    borderLeft: alignEnd ? "none" : "2px solid var(--color-accent)",
    borderRight: alignEnd ? "2px solid var(--color-accent)" : "none",
    paddingLeft: alignEnd ? 0 : "2rem",
    paddingRight: alignEnd ? "2rem" : 0,
    textAlign: alignEnd ? "right" : "left",
    boxSizing: "border-box",
  })

  const quoteText = {
    color: "var(--color-text)",
    fontSize: "clamp(1.35rem, 3vw, 2rem)",
    lineHeight: 1.4,
    fontWeight: 500,
    margin: "0 0 1.5rem",
    fontFamily: "var(--font-heading)",
  }

  const authorName = {
    color: "var(--color-text)",
    fontSize: "0.95rem",
    fontWeight: 600,
    margin: "0 0 0.15rem",
    fontFamily: "var(--font-body)",
  }

  const roleText = {
    color: "var(--color-muted)",
    fontSize: "0.8rem",
    letterSpacing: "0.04em",
    margin: 0,
    fontFamily: "var(--font-body)",
  }

  const label = headline || brand.name || "What Clients Say"

  return (
    <section style={section} data-section-type="testimonials" data-variant="stacked-quotes">
      <div style={inner}>
        <h2 style={heading}>{label}</h2>

        {items.map((item, i) => {
          const alignEnd = i % 2 === 1
          return (
            <figure key={i} style={quoteBlock(alignEnd)}>
              <blockquote style={quoteText}>
                <span
                  aria-hidden="true"
                  style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)" }}
                >
                  &ldquo;
                </span>
                {item.quote}
              </blockquote>
              <figcaption>
                <p style={authorName}>{item.author}</p>
                {item.role ? <p style={roleText}>{item.role}</p> : null}
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}

registerVariant("testimonials", "stacked-quotes", StackedQuotes)
