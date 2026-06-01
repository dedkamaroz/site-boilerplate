import ContactForm from "./ContactForm"
import ContactDetails from "./ContactDetails"
import { registerVariant } from "../registry"

const DEFAULT_BRAND = {
  name: "Acme Plumbing",
  email: "book@acme.test",
  phone: "+61 400 000 000",
  serviceArea: "Greater North Sydney",
  hours: { regular: [{ days: "Mon-Fri", time: "7am - 5pm" }], emergency: "24/7 call-outs" },
  social: { facebook: "https://fb.test/acme", instagram: "https://ig.test/acme" },
}

// contact / form-left-details-right: two columns - the enquiry form on the left,
// the brand contact details on the right. Stacks to a single column on mobile.
// Every detail field self-hides when absent (see ContactDetails / HoursBlock).
export function FormLeftDetailsRight({
  brand = DEFAULT_BRAND,
  headline = "Get in touch",
  intro,
  formEndpoint,
  fields,
  hiddenFields,
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
    margin: "0 0 0.75rem",
  }
  const introStyle = {
    color: "var(--color-muted)",
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: "0 0 2.5rem",
    maxWidth: "48ch",
  }
  const grid = {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr",
    gap: "3rem",
    alignItems: "start",
  }

  return (
    <section style={section} data-section-type="contact" data-variant="form-left-details-right">
      <div style={inner}>
        {headline ? <h2 style={heading}>{headline}</h2> : null}
        {intro ? <p style={introStyle}>{intro}</p> : null}
        <div style={grid} className="bp-contact-grid">
          <div>
            <ContactForm
              brand={brand}
              formEndpoint={formEndpoint}
              fields={fields}
              hiddenFields={hiddenFields}
            />
          </div>
          <div>
            <ContactDetails brand={brand} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bp-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

registerVariant("contact", "form-left-details-right", FormLeftDetailsRight)
