import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { TwoRowScroll } from "./TwoRowScroll"
import { StaticGrid } from "./StaticGrid"

const logos = [
  { src: "", alt: "Acme Corp" },
  { src: "", alt: "Globex" },
  { src: "/logos/initech.svg", alt: "Initech" },
]

describe("logoMarquee / two-row-scroll", () => {
  it("renders wordmark labels for logos without a src", () => {
    const { getAllByText } = render(<TwoRowScroll logos={logos} headline="Our partners" />)
    // Items are triplicated per row across two rows, so each label appears many times.
    expect(getAllByText("Acme Corp").length).toBeGreaterThan(0)
  })

  it("renders an img with alt for logos that have a src", () => {
    const { getAllByAltText } = render(<TwoRowScroll logos={logos} />)
    expect(getAllByAltText("Initech").length).toBeGreaterThan(0)
  })

  it("renders default placeholder logos when none are passed", () => {
    const { getAllByText } = render(<TwoRowScroll />)
    expect(getAllByText("Samsung").length).toBeGreaterThan(0)
  })
})

describe("logoMarquee / static-grid", () => {
  it("renders wordmark labels for logos without a src", () => {
    const { getByText } = render(<StaticGrid logos={logos} headline="Our partners" />)
    expect(getByText("Acme Corp")).toBeInTheDocument()
    expect(getByText("Globex")).toBeInTheDocument()
  })

  it("renders an img with alt for logos that have a src", () => {
    const { getByAltText } = render(<StaticGrid logos={logos} />)
    expect(getByAltText("Initech")).toBeInTheDocument()
  })

  it("renders default placeholder logos when none are passed", () => {
    const { getByText } = render(<StaticGrid />)
    expect(getByText("Samsung")).toBeInTheDocument()
  })
})
