import PortfolioGrid from "../components/PortfolioGrid"
import Footer        from "../components/Footer"

const C = { bg: "#0D0D0D", text: "#F0F0F0", muted: "#888888" }

export default function Work() {
  return (
    <>
      <div style={{
        background:  C.bg,
        paddingTop:  "calc(72px + 4rem)",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        maxWidth:    1280,
        margin:      "0 auto",
      }}>
        <h1 style={{
          color:         C.text,
          fontSize:      "clamp(2.5rem, 5vw, 4rem)",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          lineHeight:    1,
          marginBottom:  "0.5rem",
        }}>
          Our Work
        </h1>
        <p style={{
          color:      C.muted,
          fontSize:   "1rem",
          lineHeight: 1.6,
          marginBottom: "1rem",
        }}>
          CGI, motion, and 3D visualisation for brands that demand more.
        </p>
      </div>

      <PortfolioGrid sectionLabel="" />
      <Footer logoSrc="/assets/logo/logo.webp" />
    </>
  )
}
