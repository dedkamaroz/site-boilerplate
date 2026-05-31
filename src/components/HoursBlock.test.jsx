import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import HoursBlock from "./HoursBlock"

describe("HoursBlock", () => {
  const hours = {
    regular: [
      { days: "Mon-Fri", time: "7:00am - 5:00pm" },
      { days: "Sat", time: "8:00am - 12:00pm" },
    ],
    emergency: "24/7 emergency call-outs",
  }

  it("renders each regular row", () => {
    const { getByText } = render(<HoursBlock hours={hours} />)
    expect(getByText("Mon-Fri")).toBeInTheDocument()
    expect(getByText("7:00am - 5:00pm")).toBeInTheDocument()
    expect(getByText("Sat")).toBeInTheDocument()
  })

  it("renders an accent-styled emergency line when emergency is set", () => {
    const { getByText } = render(<HoursBlock hours={hours} />)
    const line = getByText("24/7 emergency call-outs")
    expect(line).toBeInTheDocument()
    expect(line).toHaveStyle({ color: "var(--color-accent)" })
  })

  it("renders no emergency line when emergency is absent", () => {
    const { queryByText } = render(
      <HoursBlock hours={{ regular: [{ days: "Mon-Fri", time: "9-5" }] }} />
    )
    expect(queryByText(/emergency/i)).not.toBeInTheDocument()
  })

  it("renders nothing when hours is undefined", () => {
    const { container } = render(<HoursBlock />)
    expect(container).toBeEmptyDOMElement()
  })

  it("renders nothing when hours has no regular rows and no emergency", () => {
    const { container } = render(<HoursBlock hours={{ regular: [] }} />)
    expect(container).toBeEmptyDOMElement()
  })
})
