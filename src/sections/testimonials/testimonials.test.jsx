import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { DragStrip } from "./DragStrip"
import { StackedQuotes } from "./StackedQuotes"

const items = [
  { quote: "Outstanding turnaround and quality.", author: "Alex Rivera", role: "Founder, Northbound" },
  { quote: "They made our brand feel alive.", author: "Dana Lowe", role: "Marketing Lead, Volta" },
]

describe("testimonials / drag-strip", () => {
  it("renders a quote and an author from items", () => {
    const { getByText } = render(<DragStrip headline="Clients" items={items} />)
    expect(getByText(/Outstanding turnaround and quality/)).toBeInTheDocument()
    expect(getByText("Alex Rivera")).toBeInTheDocument()
  })
})

describe("testimonials / stacked-quotes", () => {
  it("renders a quote and an author from items", () => {
    const { getByText } = render(<StackedQuotes headline="Clients" items={items} />)
    expect(getByText(/They made our brand feel alive/)).toBeInTheDocument()
    expect(getByText("Dana Lowe")).toBeInTheDocument()
  })
})
