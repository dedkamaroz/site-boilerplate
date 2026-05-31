import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Stacked } from "./Stacked"
import { CompactBar } from "./CompactBar"

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

const agencyBrand = { name: "Studio", email: "hi@studio.test" }

const nav = [{ label: "Services", href: "/services" }]

describe("footer / stacked", () => {
  it("renders the brand name and a nav link", () => {
    const { getByText } = render(<Stacked brand={agencyBrand} nav={nav} />)
    expect(getByText("Studio")).toBeInTheDocument()
    expect(getByText("Services")).toBeInTheDocument()
  })

  it("renders ABN and licence text when present", () => {
    const { getByText } = render(<Stacked brand={fullBrand} nav={nav} />)
    expect(getByText(/12 345 678 901/)).toBeInTheDocument()
    expect(getByText(/NSW Lic\. 123456C/)).toBeInTheDocument()
  })

  it("hides ABN and licence entirely for an agency brand", () => {
    const { queryByText } = render(<Stacked brand={agencyBrand} nav={nav} />)
    expect(queryByText(/ABN/i)).not.toBeInTheDocument()
    expect(queryByText(/Lic\./i)).not.toBeInTheDocument()
  })
})

describe("footer / compact-bar", () => {
  it("renders the brand name and a nav link", () => {
    const { getByText } = render(<CompactBar brand={agencyBrand} nav={nav} />)
    expect(getByText(/Studio/)).toBeInTheDocument()
    expect(getByText("Services")).toBeInTheDocument()
  })

  it("renders ABN and licence text when present", () => {
    const { getByText } = render(<CompactBar brand={fullBrand} nav={nav} />)
    expect(getByText(/12 345 678 901/)).toBeInTheDocument()
    expect(getByText(/NSW Lic\. 123456C/)).toBeInTheDocument()
  })

  it("hides ABN and licence entirely for an agency brand", () => {
    const { queryByText } = render(<CompactBar brand={agencyBrand} nav={nav} />)
    expect(queryByText(/ABN/i)).not.toBeInTheDocument()
    expect(queryByText(/Lic\./i)).not.toBeInTheDocument()
  })
})
