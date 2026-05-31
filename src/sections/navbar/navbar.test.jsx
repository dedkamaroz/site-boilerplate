import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { SolidBar } from "./SolidBar"

const brand = { name: "Acme Plumbing", phone: "+61 400 000 000" }
const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
]

describe("navbar / solid-bar", () => {
  it("renders nav link labels", () => {
    const { getAllByText } = render(<SolidBar brand={brand} nav={nav} cta={{}} />)
    // Rendered in both the desktop bar and the mobile overlay.
    expect(getAllByText("Services").length).toBeGreaterThan(0)
    expect(getAllByText("About").length).toBeGreaterThan(0)
  })

  it("renders the brand name when no logo is given", () => {
    const { getAllByText } = render(<SolidBar brand={brand} nav={nav} cta={{}} />)
    expect(getAllByText("Acme Plumbing").length).toBeGreaterThan(0)
  })

  it("uses the logo alt text when a logo is given", () => {
    const withLogo = { name: "Acme Plumbing", logo: "/logo.png" }
    const { getByAltText } = render(<SolidBar brand={withLogo} nav={nav} cta={{}} />)
    expect(getByAltText("Acme Plumbing")).toBeInTheDocument()
  })
})
