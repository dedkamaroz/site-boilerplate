import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ThreeColumn } from "./ThreeColumn"

const fullBrand = {
  name: "Acme Plumbing",
  email: "book@acme.test",
  phone: "+61 400 000 000",
  abn: "12 345 678 901",
  licenceNumber: "NSW Lic. 123456C",
  serviceArea: "Greater North Sydney",
  hours: { regular: [{ days: "Mon-Fri", time: "7-5" }], emergency: "24/7 call-outs" },
  social: { facebook: "https://fb.test/acme", instagram: "" },
}

const nav = [{ label: "Services", href: "/services" }]

describe("footer / three-column", () => {
  it("renders ABN, licence and service area when present", () => {
    const { getByText } = render(<ThreeColumn brand={fullBrand} nav={nav} />)
    expect(getByText(/12 345 678 901/)).toBeInTheDocument()
    expect(getByText(/NSW Lic\. 123456C/)).toBeInTheDocument()
    expect(getByText(/Greater North Sydney/)).toBeInTheDocument()
  })

  it("renders the shared hours block when hours are present", () => {
    const { getByText } = render(<ThreeColumn brand={fullBrand} nav={nav} />)
    expect(getByText("24/7 call-outs")).toBeInTheDocument()
  })

  it("renders only social links that have a non-empty url", () => {
    const { getByLabelText, queryByLabelText } = render(<ThreeColumn brand={fullBrand} nav={nav} />)
    expect(getByLabelText(/facebook/i)).toBeInTheDocument()
    expect(queryByLabelText(/instagram/i)).not.toBeInTheDocument()
  })

  it("hides trade fields entirely when absent (no empty labels)", () => {
    const agencyBrand = { name: "Studio", email: "hi@studio.test" }
    const { queryByText } = render(<ThreeColumn brand={agencyBrand} nav={nav} />)
    expect(queryByText(/ABN/i)).not.toBeInTheDocument()
    expect(queryByText(/Lic\./i)).not.toBeInTheDocument()
    expect(queryByText(/service area/i)).not.toBeInTheDocument()
  })

  it("always renders the brand name", () => {
    const { getByText } = render(<ThreeColumn brand={{ name: "Studio" }} nav={[]} />)
    expect(getByText("Studio")).toBeInTheDocument()
  })
})
