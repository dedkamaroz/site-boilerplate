import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { PageRenderer } from "./PageRenderer"

const page = {
  path: "/",
  title: "Home",
  sections: [
    { type: "hero", variant: "split-left", props: { headline: "First section" } },
    { type: "services", variant: "card-grid", props: { headline: "Second section" } },
  ],
}

describe("PageRenderer", () => {
  it("renders each section in document order", () => {
    const { container } = render(<PageRenderer page={page} brand={{ name: "Acme" }} />)
    const sections = container.querySelectorAll("[data-section-type]")
    expect(sections).toHaveLength(2)
    expect(sections[0].getAttribute("data-section-type")).toBe("hero")
    expect(sections[1].getAttribute("data-section-type")).toBe("services")
  })

  it("passes each section its own props", () => {
    const { getByText } = render(<PageRenderer page={page} brand={{ name: "Acme" }} />)
    expect(getByText("First section")).toBeInTheDocument()
    expect(getByText("Second section")).toBeInTheDocument()
  })

  it("resolves the default variant when a section omits variant", () => {
    const p = { path: "/x", title: "x", sections: [{ type: "hero", props: {} }] }
    const { container } = render(<PageRenderer page={p} brand={{}} />)
    expect(container.querySelector("[data-variant='centred-over-media']")).toBeTruthy()
  })

  it("renders nothing for an empty page without throwing", () => {
    const { container } = render(<PageRenderer page={{ path: "/x", title: "x", sections: [] }} brand={{}} />)
    expect(container.querySelectorAll("[data-section-type]")).toHaveLength(0)
  })
})
