import { useState } from "react"
import { registerVariant } from "../registry"

// faq / accordion: a vertical stack of questions, each a toggle button that
// expands or collapses its answer. One panel is open at a time; the first item
// starts open. Buttons carry aria-expanded and reference their answer panel via
// aria-controls so assistive tech announces state and target.
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

export function Accordion({
  brand = {},
  headline = "Frequently asked questions",
  items = DEFAULT_ITEMS,
}) {
  const [openIndex, setOpenIndex] = useState(0)

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
  const list = { display: "flex", flexDirection: "column", gap: "0.75rem" }
  const itemStyle = {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  }
  const button = (isOpen) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    padding: "1.1rem 1.25rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "var(--font-heading)",
    fontSize: "1.05rem",
    color: "var(--color-text)",
    fontWeight: isOpen ? 700 : 600,
  })
  const icon = (isOpen) => ({
    flex: "0 0 auto",
    fontSize: "1.25rem",
    color: "var(--color-accent)",
    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease",
  })
  const answer = {
    padding: "0 1.25rem 1.25rem",
    color: "var(--color-muted)",
    fontSize: "0.95rem",
    lineHeight: 1.65,
  }

  return (
    <section style={section} data-section-type="faq" data-variant="accordion">
      <div style={inner}>
        <h2 style={heading}>{headline}</h2>
        <div style={list}>
          {items.map((item, i) => {
            const isOpen = openIndex === i
            const panelId = `faq-acc-panel-${i}`
            const buttonId = `faq-acc-button-${i}`
            return (
              <div key={item.question} style={itemStyle}>
                <button
                  type="button"
                  id={buttonId}
                  style={button(isOpen)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true" style={icon(isOpen)}>
                    +
                  </span>
                </button>
                {isOpen ? (
                  <div id={panelId} role="region" aria-labelledby={buttonId} style={answer}>
                    {item.answer}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

registerVariant("faq", "accordion", Accordion)
