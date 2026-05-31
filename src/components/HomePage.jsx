// Home page assembly reference — DO NOT paste into Framer.
// Framer code components run in isolation and cannot resolve relative imports.
// Use this file to check prop values and stacking order, then assemble the
// home page manually on the Framer canvas using the individually imported components.

import NavBar              from "./NavBar"
import Hero                from "./Hero"
import ClientLogoMarquee   from "./ClientLogoMarquee"
import FeaturedWork        from "./FeaturedWork"
import ServicesSection     from "./ServicesSection"
import TestimonialsStrip   from "./TestimonialsStrip"
import Footer              from "./Footer"

export default function HomePage() {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <NavBar
        logoSrc="/assets/logo/logo.webp"
      />

      <Hero
        videoSrc="/assets/portfolio/showreel.mp4"
        posterSrc="/assets/portfolio/showreel-poster.jpg"
        headline="We Make the Impossible Look Real"
        subline="CGI · Motion Graphics · 3D Visualisation"
        ctaLabel="See Our Work"
        ctaHref="/work"
      />

      <ClientLogoMarquee
        label="Trusted by leading brands"
        speed={40}
      />

      <FeaturedWork
        sectionLabel="Featured Work"
        viewAllHref="/work"
      />

      <ServicesSection
        sectionLabel="What We Do"
        ctaLabel="Let's Talk"
        ctaHref="/contact"
      />

      <TestimonialsStrip
        sectionLabel="What Clients Say"
      />

      <Footer
        logoSrc="/assets/logo/logo.webp"
        email="hello@distro3d.com"
      />
    </div>
  )
}
