import { registerVariant } from "../registry"

// faq / two-column: every question and answer is shown at once, laid out across
// two responsive columns that collapse to a single column on narrow screens.
// Nothing collapses - this is the scannable, print-friendly counterpart to the
// accordion variant.
const DEFAULT_ITEMS = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most jobs are completed within one to three weeks, depending on scope. We give you a firm timeline before any work begins.",
  },
  {
    question: "Do you offer free quotes?",
    answer:
      "Yes. Every quote is free, itemised and obligation-free, so you know exactly what you are paying for before you commit.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "We are fully licensed and carry public liability insurance. Documentation is available on request for your peace of mind.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We cover the greater metropolitan region and surrounding suburbs. Get in touch if you are unsure whether we reach you.",
  },
  {
    question: "How do I get started?",
    answer:
      "Send us a message or give us a call. We will arrange a time to discuss your needs and prepare a tailored quote.",
  },
]

export function TwoColumn({
  brand = {},
  headline = "Frequently asked questions",
  items = DEFAULT_ITEMS,
}) {
  const section = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--color-bg)",
    fontFamily: "var(--font-body)",
    color: "var(--color-text)",
  }
  const inner = { maxWidth: "var(--max-width)", margin: "0 auto", padding: "4rem 2rem" }
  const heading = {
    fontFamily: "var(--font-heading)",
    color: "var(--color-text)",
    fontSize: "2rem",
    marginBottom: "2rem",
  }
  const grid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem 2.5rem",
    alignItems: "start",
  }
  const card = {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "1.25rem 1.5rem",
  }
  const question = {
    fontFamily: "var(--font-heading)",
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "var(--color-text)",
    margin: "0 0 0.5rem",
  }
  const answer = {
    color: "var(--color-muted)",
    fontSize: "0.95rem",
    lineHeight: 1.65,
    margin: 0,
  }

  return (
    <section style={section} data-section-type="faq" data-variant="two-column">
      <div style={inner}>
        <h2 style={heading}>{headline}</h2>
        <div style={grid} className="bp-faq-grid">
          {items.map((item) => (
            <div key={item.question} style={card}>
              <h3 style={question}>{item.question}</h3>
              <p style={answer}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bp-faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

registerVariant("faq", "two-column", TwoColumn)
