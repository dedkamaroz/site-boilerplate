import { registerVariant } from "../registry"

// steps / numbered-row: a horizontal row of steps that stacks on mobile. Each
// step carries a round numbered badge (1, 2, 3...), a title and an optional
// description. A connector line bridges adjacent steps on wide screens, hidden
// once the row stacks. Industry-neutral demo content lets it render standalone.
const demoSteps = [
  { title: "Get in touch", description: "Tell us what you need and share the brief - no obligation." },
  { title: "Receive a quote", description: "We scope the work and send a clear, fixed price." },
  { title: "We get to work", description: "Your project is scheduled and delivered on time." },
  { title: "Sign off", description: "Review the result and we tidy up every loose end." },
]

export function NumberedRow({ brand = {}, headline = "How it works", steps = demoSteps }) {
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
  const row = {
    display: "grid",
    gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
    gap: "1.5rem",
    alignItems: "start",
  }
  const cell = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.75rem",
  }
  const badge = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.75rem",
    height: "2.75rem",
    borderRadius: "999px",
    background: "var(--color-accent)",
    color: "var(--color-bg)",
    fontFamily: "var(--font-heading)",
    fontWeight: 700,
    fontSize: "1.1rem",
    fontVariantNumeric: "tabular-nums",
    flexShrink: 0,
    zIndex: 1,
  }
  // Connector sits to the right of each badge, vertically centred on it.
  const connector = {
    position: "absolute",
    top: "1.375rem",
    left: "2.75rem",
    right: "-1.5rem",
    height: "1px",
    background: "var(--color-border)",
    transform: "translateY(-50%)",
  }
  const stepTitle = {
    color: "var(--color-text)",
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: 0,
    fontFamily: "var(--font-heading)",
  }
  const stepDesc = {
    color: "var(--color-muted)",
    fontSize: "0.9rem",
    lineHeight: 1.65,
    margin: 0,
    fontFamily: "var(--font-body)",
  }

  return (
    <section style={section} data-section-type="steps" data-variant="numbered-row">
      <div style={inner}>
        {headline ? <h2 style={heading}>{headline}</h2> : null}

        <div style={row} className="bp-steps-row">
          {steps.map((step, i) => (
            <div key={step.title} style={cell} className="bp-steps-cell">
              {i < steps.length - 1 ? (
                <span style={connector} className="bp-steps-connector" aria-hidden="true" />
              ) : null}
              <span style={badge}>{i + 1}</span>
              <h3 style={stepTitle}>{step.title}</h3>
              {step.description ? <p style={stepDesc}>{step.description}</p> : null}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bp-steps-row { grid-template-columns: 1fr !important; }
          .bp-steps-connector { display: none !important; }
        }
      `}</style>
    </section>
  )
}

registerVariant("steps", "numbered-row", NumberedRow)
