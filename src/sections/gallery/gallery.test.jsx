import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { FilterableGrid } from "./FilterableGrid"
import { Masonry } from "./Masonry"

const items = [
  {
    media: { kind: "image", src: "/assets/sample-a.webp", alt: "Sample A" },
    title: "Sample One",
    category: "Product",
  },
  {
    media: { kind: "image", src: "", alt: "" },
    title: "Sample Two",
    category: "Branding",
  },
]

describe("gallery / filterable-grid", () => {
  it("renders an All filter button and a button per category", () => {
    const { getByRole } = render(<FilterableGrid items={items} filters={["Product", "Branding"]} />)
    expect(getByRole("button", { name: "All" })).toBeInTheDocument()
    expect(getByRole("button", { name: "Product" })).toBeInTheDocument()
    expect(getByRole("button", { name: "Branding" })).toBeInTheDocument()
  })

  it("renders the item titles", () => {
    const { getByText } = render(<FilterableGrid items={items} />)
    expect(getByText("Sample One")).toBeInTheDocument()
    expect(getByText("Sample Two")).toBeInTheDocument()
  })

  it("renders an <img> for an image item with a src", () => {
    const { container } = render(<FilterableGrid items={items} />)
    expect(container.querySelector('img[src="/assets/sample-a.webp"]')).toBeInTheDocument()
  })

  it("renders standalone with default props", () => {
    const { getByRole } = render(<FilterableGrid />)
    expect(getByRole("button", { name: "All" })).toBeInTheDocument()
  })
})

describe("gallery / masonry", () => {
  it("renders the item titles", () => {
    const { getByText } = render(<Masonry items={items} />)
    expect(getByText("Sample One")).toBeInTheDocument()
    expect(getByText("Sample Two")).toBeInTheDocument()
  })

  it("renders standalone with default props", () => {
    const { getAllByRole } = render(<Masonry />)
    expect(getAllByRole("heading").length).toBeGreaterThan(0)
  })
})
