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

// contact / details-only: no enquiry form - just nicely laid-out contact details
// (email, phone, hours, service area, social) for clients who only want phone or
// email contact. Every detail field self-hides when absent.
export function DetailsOnly({ brand = DEFAULT_BRAND, headline = "Get in touch", intro }) {
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

  return (
    <section style={section} data-section-type="contact" data-variant="details-only">
      <div style={inner}>
        {headline ? <h2 style={heading}>{headline}</h2> : null}
        {intro ? <p style={introStyle}>{intro}</p> : null}
        <ContactDetails brand={brand} />
      </div>
    </section>
  )
}

registerVariant("contact", "details-only", DetailsOnly)
