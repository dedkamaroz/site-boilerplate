import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { ThemeProvider } from "./theme/ThemeProvider"
import { PageRenderer } from "./PageRenderer"
import { resolveSection } from "./sections/registry"
import "./sections" // side-effect: register real section variants

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Sets document.title for the active page.
function PageTitle({ title }) {
  useEffect(() => {
    if (title) document.title = title
  }, [title])
  return null
}

// Builds the whole site from a single config object:
//  - ThemeProvider injects the theme tokens
//  - a global navbar + footer (resolved from the registry via config.layout)
//    bracket the routed content
//  - one <Route> per configured page renders that page through PageRenderer
//
// App expects a Router ancestor (BrowserRouter in main.jsx, MemoryRouter in
// tests) so it stays router-agnostic and testable.
export default function App({ config }) {
  const { brand = {}, theme, nav = [], pages = [], layout = {} } = config

  const Navbar = resolveSection("navbar", layout.navbar?.variant)
  const Footer = resolveSection("footer", layout.footer?.variant)

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <Navbar brand={brand} nav={nav} {...(layout.navbar?.props || {})} />
      <Routes>
        {pages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={
              <>
                <PageTitle title={page.title} />
                <PageRenderer page={page} brand={brand} />
              </>
            }
          />
        ))}
      </Routes>
      <Footer brand={brand} {...(layout.footer?.props || {})} />
    </ThemeProvider>
  )
}
