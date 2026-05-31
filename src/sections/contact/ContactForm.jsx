/**
 * ContactForm - internal, unregistered helper shared by the contact variants.
 *
 * Wiring a real backend (no backend ships with this boilerplate):
 *   Set `formEndpoint` in the section's props in site.config.js to a
 *   form-handling URL and the form will POST to it. Examples:
 *     - Formspree:      formEndpoint: "https://formspree.io/f/abcdwxyz"
 *     - Netlify Forms:  formEndpoint: "/" plus add data-netlify="true" on deploy
 *     - Own PHP/Node:   formEndpoint: "https://example.com/contact-handler.php"
 *   When `formEndpoint` is omitted, the form falls back to a mailto: action
 *   built from `brand.email`. When neither is available the form still renders
 *   (see the TODO below) so the layout can be previewed; it just has no action.
 */

const DEFAULT_FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: false },
  { name: "message", label: "Message", type: "textarea", required: true },
]

export default function ContactForm({ brand = {}, formEndpoint, fields = DEFAULT_FIELDS }) {
  // Resolve the action: explicit endpoint, else mailto from the brand email,
  // else undefined - the form renders without an action (see TODO).
  const action = formEndpoint || (brand.email ? `mailto:${brand.email}` : undefined)

  const form = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    fontFamily: "var(--font-body)",
  }
  const field = { display: "flex", flexDirection: "column", gap: "0.4rem" }
  const labelStyle = {
    fontFamily: "var(--font-heading)",
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--color-muted)",
  }
  const inputStyle = {
    background: "var(--color-surface)",
    color: "var(--color-text)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "0.7rem 0.9rem",
    fontSize: "0.95rem",
    fontFamily: "var(--font-body)",
    width: "100%",
    boxSizing: "border-box",
  }
  const button = {
    background: "var(--color-accent)",
    color: "var(--color-bg)",
    border: "none",
    borderRadius: "var(--radius)",
    padding: "0.8rem 1.5rem",
    fontSize: "0.9rem",
    fontFamily: "var(--font-heading)",
    letterSpacing: "0.05em",
    cursor: "pointer",
    alignSelf: "flex-start",
  }

  return (
    // TODO: when no formEndpoint and no brand.email are set, `action` is
    // undefined and submissions go nowhere. Set `formEndpoint` in site.config.js
    // (see the JSDoc above) to wire a real handler.
    <form action={action} method="post" style={form}>
      {fields.map((f) => {
        const id = `contact-${f.name}`
        return (
          <div key={f.name} style={field}>
            <label htmlFor={id} style={labelStyle}>
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={id}
                name={f.name}
                required={f.required}
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            ) : (
              <input id={id} name={f.name} type={f.type} required={f.required} style={inputStyle} />
            )}
          </div>
        )
      })}
      <button type="submit" style={button}>
        Send message
      </button>
    </form>
  )
}
