import HoursBlock from "../../components/HoursBlock"

// Internal, unregistered helper shared by the contact variants. Renders the
// brand contact details - email, phone, opening hours, service area and social
// links - with every field self-hiding when absent, exactly like the footer's
// ThreeColumn. Not a section variant: it is only consumed inside this folder.

// Social platforms we know how to label. Only those with a non-empty url render.
const SOCIAL_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  youtube: "YouTube",
  tiktok: "TikTok",
}

export default function ContactDetails({ brand = {} }) {
  const { email, phone, serviceArea, hours, social = {} } = brand
  const socials = Object.entries(social).filter(([, url]) => url)

  const wrap = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontFamily: "var(--font-body)",
    color: "var(--color-text)",
  }
  const labelStyle = {
    fontFamily: "var(--font-heading)",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--color-muted)",
    marginBottom: "0.25rem",
  }
  const block = { display: "flex", flexDirection: "column" }
  const link = {
    color: "var(--color-text)",
    textDecoration: "none",
    fontSize: "0.95rem",
  }
  const socialRow = { display: "flex", gap: "1rem", flexWrap: "wrap" }
  const socialLink = {
    color: "var(--color-accent)",
    textDecoration: "none",
    fontSize: "0.85rem",
  }
  const areaText = { color: "var(--color-muted)", fontSize: "0.9rem", lineHeight: 1.6 }

  return (
    <div style={wrap}>
      {email ? (
        <div style={block}>
          <span style={labelStyle}>Email</span>
          <a href={`mailto:${email}`} style={link}>
            {email}
          </a>
        </div>
      ) : null}

      {phone ? (
        <div style={block}>
          <span style={labelStyle}>Phone</span>
          <a href={`tel:${phone.replace(/\s/g, "")}`} style={link}>
            {phone}
          </a>
        </div>
      ) : null}

      {hours?.regular?.length || hours?.emergency ? (
        <div style={block}>
          <span style={labelStyle}>Opening Hours</span>
          <HoursBlock hours={hours} />
        </div>
      ) : null}

      {serviceArea ? (
        <div style={block}>
          <span style={labelStyle}>Service Area</span>
          <p style={areaText}>Servicing {serviceArea}</p>
        </div>
      ) : null}

      {socials.length > 0 ? (
        <div style={block}>
          <span style={labelStyle}>Follow</span>
          <div style={socialRow}>
            {socials.map(([key, url]) => (
              <a key={key} href={url} aria-label={SOCIAL_LABELS[key] || key} style={socialLink}>
                {SOCIAL_LABELS[key] || key}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
