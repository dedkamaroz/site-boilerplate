import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { NumberedRow } from "./NumberedRow"
import { VerticalTimeline } from "./VerticalTimeline"

const steps = [
  { title: "Send a brief", description: "Tell us the goal." },
  { title: "Get a quote", description: "Fixed price, no surprises." },
  { title: "We deliver", description: "On time, every time." },
]

describe("steps / numbered-row", () => {
  it("renders the heading and each step title", () => {
    const { getByText } = render(<NumberedRow headline="How it works" steps={steps} />)
    expect(getByText("How it works")).toBeInTheDocument()
    for (const s of steps) {
      expect(getByText(s.title)).toBeInTheDocument()
    }
  })

  it("renders a numbered badge for each step (1..N)", () => {
    const { getByText } = render(<NumberedRow steps={steps} />)
    for (let i = 1; i <= steps.length; i++) {
      expect(getByText(String(i))).toBeInTheDocument()
    }
  })

  it("renders standalone with default heading and demo steps", () => {
    const { getByText } = render(<NumberedRow />)
    expect(getByText("How it works")).toBeInTheDocument()
    expect(getByText("Get in touch")).toBeInTheDocument()
  })
})

describe("steps / vertical-timeline", () => {
  it("renders the heading and each step title", () => {
    const { getByText } = render(<VerticalTimeline headline="How it works" steps={steps} />)
    expect(getByText("How it works")).toBeInTheDocument()
    for (const s of steps) {
      expect(getByText(s.title)).toBeInTheDocument()
    }
  })

  it("renders a numbered node for each step (1..N)", () => {
    const { getByText } = render(<VerticalTimeline steps={steps} />)
    for (let i = 1; i <= steps.length; i++) {
      expect(getByText(String(i))).toBeInTheDocument()
    }
  })

  it("renders standalone with default heading and demo steps", () => {
    const { getByText } = render(<VerticalTimeline />)
    expect(getByText("How it works")).toBeInTheDocument()
    expect(getByText("Sign off")).toBeInTheDocument()
  })
})
