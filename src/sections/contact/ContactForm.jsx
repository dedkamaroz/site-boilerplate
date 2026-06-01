import { useState } from "react"

/**
 * ContactForm - internal, unregistered helper shared by the contact variants.
 *
 * Wiring a real backend (no backend ships with this boilerplate):
 *   Set `formEndpoint` in the section's props in site.config.js to a
 *   form-handling URL and the form will POST to it. Examples:
 *     - Web3Forms:      formEndpoint: "https://api.web3forms.com/submit"
 *                       hiddenFields: { access_key: "...", subject: "..." }
 *     - Formspree:      formEndpoint: "https://formspree.io/f/abcdwxyz"
 *     - Own PHP/Node:   formEndpoint: "https://example.com/contact-handler.php"
 *
 *   `hiddenFields` is a generic map of name -> value rendered as hidden inputs
 *   and sent with the submission (e.g. a Web3Forms access_key, a subject line).
 *   It keeps provider-specific values in config, never in this component.
 *
 *   When `formEndpoint` is set, the form submits over fetch (AJAX) and shows an
 *   inline success/error message without leaving the page. The `action`
 *   attribute is kept as a no-JS fallback. When `formEndpoint` is omitted, the
 *   form falls back to a mailto: action built from `brand.email`, so the layout
 *   still previews in the gallery with no backend.
 */

const DEFAULT_FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: false },
  { name: "message", label: "Message", type: "textarea", required: true },
]

export default function ContactForm({
  brand = {},
  formEndpoint,
  fields = DEFAULT_FIELDS,
  hiddenFields = {},
}) {
  // Resolve the action: explicit endpoint, else mailto from the brand email,
  // else undefined - the form renders without an action.
  const action = formEndpoint || (brand.email ? `mailto:${brand.email}` : undefined)

  // "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle")

  async function handleSubmit(e) {
    // Only intercept when there is a real endpoint to fetch; otherwise let the
    // native form action (mailto or no-JS fallback) proceed unchanged.
    if (!formEndpoint) return
    e.preventDefault()
    const formEl = e.target
    setStatus("submitting")
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(formEl),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success !== false) {
        setStatus("success")
        formEl.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

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
    cursor: status === "submitting" ? "default" : "pointer",
    opacity: status === "submitting" ? 0.7 : 1,
    alignSelf: "flex-start",
  }
  const note = (ok) => ({
    fontSize: "0.9rem",
    lineHeight: 1.5,
    color: ok ? "var(--color-accent)" : "var(--color-text)",
    fontFamily: "var(--font-body)",
  })

  return (
    <form action={action} method="post" style={form} onSubmit={handleSubmit}>
      {/* Provider-specific hidden values (e.g. Web3Forms access_key, subject). */}
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      {/* Honeypot - hidden from people, often filled by bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

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

      <button type="submit" style={button} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {status === "success" ? (
        <p role="status" aria-live="polite" style={note(true)}>
          Thanks - your message has been sent. We&rsquo;ll be in touch shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p role="status" aria-live="polite" style={note(false)}>
          Sorry, something went wrong sending your message. Please try again, or email us directly.
        </p>
      ) : null}
    </form>
  )
}
