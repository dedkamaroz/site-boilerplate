import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import { Accordion } from "./Accordion"
import { TwoColumn } from "./TwoColumn"

const items = [
  { question: "What are your hours?", answer: "We trade nine to five, Monday to Friday." },
  { question: "Do you take card?", answer: "Yes, all major cards are accepted." },
  { question: "Is parking available?", answer: "Free on-site parking for all visitors." },
]

describe("faq / two-column", () => {
  it("renders every question and every answer", () => {
    const { getByText } = render(<TwoColumn headline="FAQ" items={items} />)
    for (const item of items) {
      expect(getByText(item.question)).toBeInTheDocument()
      expect(getByText(item.answer)).toBeInTheDocument()
    }
  })

  it("renders standalone with default heading and demo items", () => {
    const { getByText } = render(<TwoColumn />)
    expect(getByText("Frequently asked questions")).toBeInTheDocument()
    expect(getByText("Do you offer free quotes?")).toBeInTheDocument()
  })
})

describe("faq / accordion", () => {
  it("renders every question", () => {
    const { getByText } = render(<Accordion headline="FAQ" items={items} />)
    for (const item of items) {
      expect(getByText(item.question)).toBeInTheDocument()
    }
  })

  it("reveals an answer after clicking its collapsed question", () => {
    const { getByText, queryByText } = render(<Accordion headline="FAQ" items={items} />)
    // Second item starts collapsed (first item starts open).
    expect(queryByText(items[1].answer)).not.toBeInTheDocument()
    fireEvent.click(getByText(items[1].question))
    expect(getByText(items[1].answer)).toBeInTheDocument()
  })

  it("renders standalone with default heading", () => {
    const { getByText } = render(<Accordion />)
    expect(getByText("Frequently asked questions")).toBeInTheDocument()
  })
})
