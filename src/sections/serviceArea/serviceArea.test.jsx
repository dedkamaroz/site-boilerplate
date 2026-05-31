import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { SuburbList } from "./SuburbList"
import { MapEmbed } from "./MapEmbed"

const suburbs = ["Chatswood", "Mosman", "Neutral Bay"]

describe("serviceArea / suburb-list", () => {
  it("renders the heading and at least two suburb names", () => {
    const { getByText } = render(
      <SuburbList headline="Where we work" suburbs={suburbs} />
    )
    expect(getByText("Where we work")).toBeInTheDocument()
    expect(getByText("Chatswood")).toBeInTheDocument()
    expect(getByText("Mosman")).toBeInTheDocument()
  })

  it("renders standalone with demo suburbs when none passed", () => {
    const { getByText } = render(<SuburbList />)
    expect(getByText("Areas we cover")).toBeInTheDocument()
  })
})

describe("serviceArea / map-embed", () => {
  it("renders the heading and at least two suburb names", () => {
    const { getByText } = render(
      <MapEmbed headline="Where we work" suburbs={suburbs} />
    )
    expect(getByText("Where we work")).toBeInTheDocument()
    expect(getByText("Chatswood")).toBeInTheDocument()
    expect(getByText("Mosman")).toBeInTheDocument()
  })

  it("renders an iframe when mapEmbedUrl is provided", () => {
    const { container } = render(
      <MapEmbed suburbs={suburbs} mapEmbedUrl="https://example.com/map" />
    )
    const iframe = container.querySelector("iframe")
    expect(iframe).not.toBeNull()
    expect(iframe.getAttribute("src")).toBe("https://example.com/map")
  })

  it("renders a placeholder and no iframe when mapEmbedUrl is absent", () => {
    const { container, getByText } = render(
      <MapEmbed brand={{ serviceArea: "Lower North Shore" }} suburbs={suburbs} mapEmbedUrl="" />
    )
    expect(container.querySelector("iframe")).toBeNull()
    expect(getByText("Lower North Shore Map")).toBeInTheDocument()
  })
})
