import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import App from "./App"

const sampleConfig = {
  brand: { name: "Acme Studio", logo: "", email: "hi@acme.test" },
  theme: { preset: "editorial-dark" },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
  pages: [
    {
      path: "/",
      title: "Acme - Home",
      sections: [{ type: "hero", variant: "split-left", props: { headline: "Home hero" } }],
    },
    {
      path: "/contact",
      title: "Acme - Contact",
      sections: [{ type: "contact", variant: "stacked", props: { headline: "Get in touch" } }],
    },
  ],
}

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App config={sampleConfig} />
    </MemoryRouter>
  )
}

describe("App", () => {
  it("renders the routed page's sections for the current path", () => {
    renderAt("/contact")
    expect(screen.getByText("Get in touch")).toBeInTheDocument()
    expect(screen.queryByText("Home hero")).not.toBeInTheDocument()
  })

  it("renders the home page at /", () => {
    renderAt("/")
    expect(screen.getByText("Home hero")).toBeInTheDocument()
  })

  it("renders the nav links from config.nav", () => {
    renderAt("/")
    // NavBar renders each link twice (desktop bar + mobile overlay).
    expect(screen.getAllByText("Work").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Contact").length).toBeGreaterThan(0)
  })

  it("sets document.title from the active page", () => {
    renderAt("/contact")
    expect(document.title).toBe("Acme - Contact")
  })
})
