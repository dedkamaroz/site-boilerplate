import Hero              from "../components/Hero"
import ClientLogoMarquee from "../components/ClientLogoMarquee"
import FeaturedWork      from "../components/FeaturedWork"
import ServicesSection   from "../components/ServicesSection"
import TestimonialsStrip from "../components/TestimonialsStrip"
import Footer            from "../components/Footer"

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogoMarquee />
      <FeaturedWork />
      <ServicesSection />
      <TestimonialsStrip />
      <Footer logoSrc="/assets/logo/logo.webp" />
    </>
  )
}
