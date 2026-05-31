import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { NumberedList } from "./NumberedList"
import { CardGrid } from "./CardGrid"
import { IconRow } from "./IconRow"

const items = [
  { title: "Roof Repairs", price: "From $300", description: "Leak detection and patching.", tags: ["Urgent"] },
  { title: "Gutter Cleaning", price: "From $150", description: "Full clear and flush.", tags: ["Seasonal"] },
]

describe("services / numbered-list", () => {
  it("renders a heading and an item title", () => {
    const { getByText } = render(<NumberedList headline="Our Trades" items={items} />)
    expect(getByText("Our Trades")).toBeInTheDocument()
    expect(getByText("Roof Repairs")).toBeInTheDocument()
  })

  it("shows a zero-padded number like 01", () => {
    const { getByText } = render(<NumberedList items={items} />)
    expect(getByText("01")).toBeInTheDocument()
  })

  it("renders standalone with demo items when none passed", () => {
    const { getByText } = render(<NumberedList />)
    expect(getByText("What We Make")).toBeInTheDocument()
  })
})

describe("services / card-grid", () => {
  it("renders a heading and an item title", () => {
    const { getByText } = render(<CardGrid headline="Services" items={items} />)
    expect(getByText("Services")).toBeInTheDocument()
    expect(getByText("Gutter Cleaning")).toBeInTheDocument()
  })

  it("renders standalone with demo items when none passed", () => {
    const { getByText } = render(<CardGrid />)
    expect(getByText("Our Services")).toBeInTheDocument()
  })
})

describe("services / icon-row", () => {
  it("renders a heading and an item title", () => {
    const { getByText } = render(<IconRow headline="What We Do" items={items} />)
    expect(getByText("What We Do")).toBeInTheDocument()
    expect(getByText("Roof Repairs")).toBeInTheDocument()
  })

  it("renders a circular badge with the first initial", () => {
    const { getByText } = render(<IconRow items={items} />)
    expect(getByText("R")).toBeInTheDocument()
  })

  it("renders standalone with demo items when none passed", () => {
    const { getAllByText } = render(<IconRow />)
    expect(getAllByText(/Production|Graphics|Visualisation|Projects/).length).toBeGreaterThan(0)
  })
})
