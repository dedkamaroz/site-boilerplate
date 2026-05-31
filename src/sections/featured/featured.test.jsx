import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { AlternatingRows } from "./AlternatingRows"
import { Cards } from "./Cards"

const items = [
  {
    media: { kind: "image", src: "/assets/one.jpg", alt: "One" },
    title: "Alpha Project",
    description: "First showcase item.",
    tag: "CGI",
    href: "/work/alpha",
  },
  {
    media: { kind: "image", src: "", alt: "" },
    title: "Beta Project",
    description: "Second item with empty media.",
  },
]

describe("featured / alternating-rows", () => {
  it("renders each item title", () => {
    const { getByText } = render(<AlternatingRows items={items} />)
    expect(getByText("Alpha Project")).toBeInTheDocument()
    expect(getByText("Beta Project")).toBeInTheDocument()
  })

  it("renders an <img> for an image media item (query by src)", () => {
    const { container } = render(<AlternatingRows items={items} />)
    expect(container.querySelector('img[src="/assets/one.jpg"]')).toBeInTheDocument()
  })

  it("renders standalone with default placeholder items", () => {
    const { getByText } = render(<AlternatingRows />)
    expect(getByText("Velocity")).toBeInTheDocument()
  })
})

describe("featured / cards", () => {
  it("renders each item title", () => {
    const { getByText } = render(<Cards items={items} />)
    expect(getByText("Alpha Project")).toBeInTheDocument()
    expect(getByText("Beta Project")).toBeInTheDocument()
  })

  it("renders standalone with default placeholder items", () => {
    const { getByText } = render(<Cards />)
    expect(getByText("Brand Motion")).toBeInTheDocument()
  })
})
