import { registerVariant } from "../registry"

// steps / vertical-timeline: a stacked timeline with a single line running down
// the left edge. Each step is a numbered node sitting on the line, with its
// title and description offset to the right. Structurally distinct from the
// horizontal numbered-row variant. Industry-neutral demo content included.
const demoSteps = [
  { title: "Get in touch", description: "Tell us what you need and share the brief - no obligation." },
  { title: "Receive a quote", description: "We scope the work and send a clear, fixed price." },
  { title: "We get to work", description: "Your project is scheduled and delivered on time." },
  { title: "Sign off", description: "Review the result and we tidy up every loose end." },
]

export function VerticalTimeline({ brand = {}, headline = "How it works", steps = demoSteps }) {
  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    padding: "6rem 2rem",
    fontFamily: "var(--font-body)",
  }
  const inner = { maxWidth: "var(--max-width)", margin: "0 auto" }
  const heading = {
    color: "var(--color-text)",
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    margin: "0 0 3rem",
    fontFamily: "var(--font-heading)",
  }
  // The list owns the vertical line via a left border offset to the node centre.
  const list = {
    position: "relative",
    listStyle: "none",
    margin: 0,
    padding: 0,
    borderLeft: "1px solid var(--color-border)",
    marginLeft: "1.25rem",
  }
  const item = {
    position: "relative",
    paddingLeft: "2.5rem",
    paddingBottom: "2.5rem",
  }
  const node = {
    position: "absolute",
    left: "-1.25rem",
    top: 0,
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "999px",
    background: "var(--color-accent)",
    color: "var(--color-bg)",
    fontFamily: "var(--font-heading)",
    fontWeight: 700,
    fontSize: "1rem",
    fontVariantNumeric: "tabular-nums",
  }
  const stepTitle = {
    color: "var(--color-text)",
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: "0.25rem 0 0.5rem",
    fontFamily: "var(--font-heading)",
  }
  const stepDesc = {
    color: "var(--color-muted)",
    fontSize: "0.9rem",
    lineHeight: 1.65,
    margin: 0,
    maxWidth: 560,
    fontFamily: "var(--font-body)",
  }

  return (
    <section style={section} data-section-type="steps" data-variant="vertical-timeline">
      <div style={inner}>
        {headline ? <h2 style={heading}>{headline}</h2> : null}

        <ol style={list}>
          {steps.map((step, i) => (
            <li key={step.title} style={item}>
              <span style={node}>{i + 1}</span>
              <h3 style={stepTitle}>{step.title}</h3>
              {step.description ? <p style={stepDesc}>{step.description}</p> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

registerVariant("steps", "vertical-timeline", VerticalTimeline)
