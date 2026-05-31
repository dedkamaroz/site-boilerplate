import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import NavBar          from "./components/NavBar"
import Home            from "./pages/Home"
import Work            from "./pages/Work"
import ProjectDetail   from "./pages/ProjectDetail"
import Services        from "./pages/Services"
import About           from "./pages/About"
import Contact         from "./pages/Contact"
import PrivacyPolicy   from "./pages/PrivacyPolicy"
import TermsConditions from "./pages/TermsConditions"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar logoSrc="/assets/logo/logo.webp" />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/work"        element={<Work />} />
        <Route path="/work/:slug"  element={<ProjectDetail />} />
        <Route path="/services"    element={<Services />} />
        <Route path="/about"       element={<About />} />
        <Route path="/contact"        element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms"          element={<TermsConditions />} />
      </Routes>
    </BrowserRouter>
  )
}
