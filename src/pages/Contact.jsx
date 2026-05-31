import { useState } from "react"
import Footer from "../components/Footer"

const C = { bg: "#0D0D0D", surface: "#161616", border: "#2A2A2A", text: "#F0F0F0", muted: "#888888" }

const SERVICES = ["CGI Production", "Motion Graphics", "3D Visualisation", "FOOH", "Other"]

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", service: "", message: "" })
  const [status, setStatus]   = useState("idle") // idle | sending | sent | error
  const [focused, setFocused] = useState(null)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/contact.php", {
        method:  "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    new URLSearchParams(form).toString(),
      })
      const data = await res.json().catch(() => ({}))
      setStatus(data.ok ? "sent" : "error")
    } catch {
      setStatus("error")
    }
  }

  const inputStyle = (field) => ({
    width:           "100%",
    background:      focused === field ? C.surface : "transparent",
    border:          "none",
    borderBottom:    `1px solid ${focused === field ? C.text : C.border}`,
    color:           C.text,
    fontSize:        "0.95rem",
    padding:         "0.75rem 0",
    fontFamily:      '"Inter", sans-serif',
    outline:         "none",
    transition:      "border-color 0.2s ease, background 0.2s ease",
    boxSizing:       "border-box",
  })

  const labelStyle = {
    color:         C.muted,
    fontSize:      "0.7rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    display:       "block",
    marginBottom:  "0.4rem",
    fontFamily:    '"Inter", sans-serif',
  }

  const field = (label, field, type = "text", extra = {}) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={set(field)}
        onFocus={() => setFocused(field)}
        onBlur={() => setFocused(null)}
        style={inputStyle(field)}
        required
        {...extra}
      />
    </div>
  )

  return (
    <>
      <div style={{
        background:  C.bg,
        minHeight:   "100vh",
        fontFamily:  '"Inter", sans-serif',
      }}>
        <div style={{
          maxWidth:            1280,
          margin:              "0 auto",
          padding:             "calc(72px + 5rem) 2rem 6rem",
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "6rem",
          alignItems:          "start",
        }}
          className="distro-contact-grid"
        >
          {/* Left — intro */}
          <div>
            <h1 style={{
              color:         C.text,
              fontSize:      "clamp(2.5rem, 5vw, 4rem)",
              fontWeight:    700,
              letterSpacing: "-0.02em",
              lineHeight:    1,
              marginBottom:  "1.5rem",
            }}>
              Let's Talk
            </h1>
            <p style={{ color: C.muted, fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "3rem", maxWidth: 400 }}>
              Tell us about your project. We'll come back to you within one business day.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a href="mailto:hello@distro3d.com" style={{
                color:          C.text,
                textDecoration: "none",
                fontSize:       "0.9rem",
                letterSpacing:  "0.02em",
              }}>
                hello@distro3d.com
              </a>
              <span style={{ color: C.muted, fontSize: "0.78rem", letterSpacing: "0.04em" }}>
                ABN 49 838 083 890
              </span>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === "sent" ? (
              <div style={{ paddingTop: "2rem" }}>
                <p style={{ color: C.text, fontSize: "1.1rem", marginBottom: "0.75rem" }}>Message received.</p>
                <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.7 }}>
                  We'll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
              >
                {/* Honeypot — hidden from real users, catches bots */}
                <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                {field("Your Name", "name")}
                {field("Email Address", "email", "email")}

                <div>
                  <label style={labelStyle}>Service</label>
                  <select
                    value={form.service}
                    onChange={set("service")}
                    onFocus={() => setFocused("service")}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("service"), cursor: "pointer" }}
                  >
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    style={{
                      ...inputStyle("message"),
                      resize:    "vertical",
                      minHeight: 120,
                    }}
                    required
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#FF6B6B", fontSize: "0.82rem" }}>
                    Something went wrong — please email us directly at hello@distro3d.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    background:    C.text,
                    color:         C.bg,
                    border:        "none",
                    padding:       "0.9rem 2rem",
                    fontSize:      "0.82rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor:        status === "sending" ? "not-allowed" : "pointer",
                    opacity:       status === "sending" ? 0.6 : 1,
                    fontFamily:    '"Inter", sans-serif',
                    alignSelf:     "flex-start",
                    transition:    "opacity 0.2s ease",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer logoSrc="/assets/logo/logo.webp" />

      <style>{`
        @media (max-width: 767px) {
          .distro-contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        select option { background: #161616; color: #F0F0F0; }
      `}</style>
    </>
  )
}
