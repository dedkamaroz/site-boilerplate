// Shared presentational block for opening hours. Reused by footer and contact
// sections. Renders regular day/time rows and, when set, an accent-styled
// emergency line. Renders nothing at all when there are no hours to show, so a
// site without hours (e.g. an agency) carries no empty markup.
export default function HoursBlock({ hours }) {
  const regular = hours?.regular ?? []
  const emergency = hours?.emergency

  if (regular.length === 0 && !emergency) return null

  const wrap = {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    fontFamily: "var(--font-body)",
  }
  const row = {
    display: "flex",
    justifyContent: "space-between",
    gap: "1.5rem",
    fontSize: "0.85rem",
    color: "var(--color-muted)",
  }
  const days = { color: "var(--color-text)" }
  const emergencyStyle = {
    color: "var(--color-accent)",
    fontSize: "0.85rem",
    fontWeight: 600,
    marginTop: "0.2rem",
  }

  return (
    <div style={wrap}>
      {regular.map((r, i) => (
        <div key={i} style={row}>
          <span style={days}>{r.days}</span>
          <span>{r.time}</span>
        </div>
      ))}
      {emergency ? <span style={emergencyStyle}>{emergency}</span> : null}
    </div>
  )
}
