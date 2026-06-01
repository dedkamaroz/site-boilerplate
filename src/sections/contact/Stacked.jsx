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

// contact / stacked: heading and contact details across the top, then the
// enquiry form full-width beneath. Structurally distinct from the two-column
// variant - a single column flow. Detail fields self-hide when absent.
export function Stacked({
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
    margin: "0 0 2rem",
    maxWidth: "48ch",
  }
  const detailsBar = {
    display: "flex",
    flexWrap: "wrap",
    gap: "2.5rem",
    paddingBottom: "2.5rem",
    marginBottom: "2.5rem",
    borderBottom: "1px solid var(--color-border)",
  }

  return (
    <section style={section} data-section-type="contact" data-variant="stacked">
      <div style={inner}>
        {headline ? <h2 style={heading}>{headline}</h2> : null}
        {intro ? <p style={introStyle}>{intro}</p> : null}
        <div style={detailsBar}>
          <ContactDetails brand={brand} />
        </div>
        <ContactForm
          brand={brand}
          formEndpoint={formEndpoint}
          fields={fields}
          hiddenFields={hiddenFields}
        />
      </div>
    </section>
  )
}

registerVariant("contact", "stacked", Stacked)
