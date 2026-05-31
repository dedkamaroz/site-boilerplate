import Footer from "../components/Footer"

const C = { bg: "#0D0D0D", surface: "#161616", border: "#2A2A2A", text: "#F0F0F0", muted: "#888888" }

const s = {
  h1: {
    color: C.text, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
    letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.5rem",
  },
  meta: { color: C.muted, fontSize: "0.78rem", letterSpacing: "0.04em", marginBottom: "3rem" },
  h2: {
    color: C.text, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.06em",
    textTransform: "uppercase", margin: "2.5rem 0 0.75rem",
  },
  p:  { color: C.muted, fontSize: "0.92rem", lineHeight: 1.8, margin: "0 0 0.75rem" },
  li: { color: C.muted, fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "0.35rem" },
  a:  { color: C.text, textDecoration: "underline" },
  hr: { border: "none", borderTop: `1px solid ${C.border}`, margin: "2rem 0" },
}

export default function PrivacyPolicy() {
  return (
    <>
      <div style={{ background: C.bg, fontFamily: '"Inter", sans-serif' }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "calc(72px + 4rem) 2rem 6rem" }}>

          <h1 style={s.h1}>Privacy Policy</h1>
          <p style={s.meta}>Distro 3D &nbsp;·&nbsp; Last updated: May 2025 &nbsp;·&nbsp; Applies to distro3d.com.au</p>

          <hr style={s.hr} />

          <h2 style={s.h2}>1. Who We Are</h2>
          <p style={s.p}>
            Distro 3D is an Australian business operating under the Privacy Act 1988 (Cth) and the Australian
            Privacy Principles (APPs). This policy explains how we handle any personal information you provide
            when you contact us through our website.
          </p>

          <h2 style={s.h2}>2. What Information We Collect</h2>
          <p style={s.p}>
            We only collect personal information that you voluntarily provide via the contact form on our website.
            This is limited to:
          </p>
          <ul style={{ paddingLeft: "1.25rem", marginBottom: "0.75rem" }}>
            <li style={s.li}><strong style={{ color: C.text }}>Name</strong> — your first and/or last name</li>
            <li style={s.li}><strong style={{ color: C.text }}>Email address</strong> — so we can respond to your enquiry</li>
            <li style={s.li}><strong style={{ color: C.text }}>Message</strong> — the contents of your enquiry</li>
          </ul>
          <p style={s.p}>
            We do not collect payment information, government identifiers, or any sensitive personal information
            as defined under the Privacy Act 1988 (Cth).
          </p>

          <h2 style={s.h2}>3. Why We Collect It</h2>
          <p style={s.p}>
            We collect this information solely to respond to your enquiry and provide customer support.
            We will not use it for any unrelated purpose without your consent.
          </p>

          <h2 style={s.h2}>4. How We Store and Protect Your Information</h2>
          <p style={s.p}>
            Contact form submissions are received via email and retained only as long as necessary to resolve
            your enquiry. We take reasonable steps to protect personal information from misuse, interference,
            loss, and unauthorised access, in accordance with APP 11.
          </p>

          <h2 style={s.h2}>5. Disclosure to Third Parties</h2>
          <p style={s.p}>
            We do not sell, trade, or share your personal information with third parties, except where required
            by Australian law or where necessary to provide our services (for example, our email hosting
            provider). Any such providers are required to handle information in accordance with applicable
            privacy laws.
          </p>

          <h2 style={s.h2}>6. Cookies and Analytics</h2>
          <p style={s.p}>
            Our website may use standard browser cookies for basic site functionality. We do not currently
            use third-party analytics or advertising cookies that track personal information.
          </p>

          <h2 style={s.h2}>7. Your Rights</h2>
          <p style={s.p}>Under the Australian Privacy Principles, you have the right to:</p>
          <ul style={{ paddingLeft: "1.25rem", marginBottom: "0.75rem" }}>
            <li style={s.li}>Request access to any personal information we hold about you</li>
            <li style={s.li}>Request correction of inaccurate or incomplete information</li>
            <li style={s.li}>Request deletion of your information where we no longer need it</li>
            <li style={s.li}>Make a complaint if you believe your privacy has been breached</li>
          </ul>
          <p style={s.p}>We will respond to any access or correction request within 30 days.</p>

          <h2 style={s.h2}>8. Complaints</h2>
          <p style={s.p}>
            If you have a privacy concern that we cannot resolve to your satisfaction, you may contact the
            Office of the Australian Information Commissioner (OAIC) at{" "}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" style={s.a}>oaic.gov.au</a>
            {" "}or by calling 1300 363 992.
          </p>

          <h2 style={s.h2}>9. Changes to This Policy</h2>
          <p style={s.p}>
            We may update this policy from time to time. The current version will always be available on
            this page with the date it was last updated. Continued use of our website after any changes
            constitutes acceptance of the updated policy.
          </p>

          <hr style={s.hr} />

          <h2 style={s.h2}>Contact Us About Privacy</h2>
          <p style={s.p}>
            For any questions about this policy or how we handle your personal information, email us at{" "}
            <a href="mailto:hello@distro3d.com" style={s.a}>hello@distro3d.com</a>.
          </p>

          <p style={{ ...s.p, marginTop: "2rem", fontSize: "0.8rem" }}>
            This policy applies to Distro 3D — New South Wales, Australia. Governed by the Privacy Act 1988
            (Cth) and the Australian Privacy Principles.
          </p>

        </div>
      </div>
      <Footer logoSrc="/assets/logo/logo.webp" />
    </>
  )
}
