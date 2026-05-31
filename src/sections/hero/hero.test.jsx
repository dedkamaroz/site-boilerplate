import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CentredOverMedia } from "./CentredOverMedia"
import { SplitLeft } from "./SplitLeft"
import { MinimalCard } from "./MinimalCard"

describe("hero variants", () => {
  it("SplitLeft renders an <img> when media.kind is image", () => {
    const src = "/assets/hero.jpg"
    const { container } = render(
      <SplitLeft media={{ kind: "image", src, alt: "Hero" }} />
    )
    const img = container.querySelector(`img[src="${src}"]`)
    expect(img).toBeTruthy()
  })

  it("CentredOverMedia renders a <video> when media.kind is video", () => {
    const { container } = render(
      <CentredOverMedia media={{ kind: "video", src: "/assets/reel.mp4" }} />
    )
    expect(container.querySelector("video")).toBeTruthy()
  })

  it("CentredOverMedia renders its headline", () => {
    render(<CentredOverMedia headline="Centred Headline" />)
    expect(screen.getByText("Centred Headline")).toBeTruthy()
  })

  it("SplitLeft renders its headline", () => {
    render(<SplitLeft headline="Split Headline" />)
    expect(screen.getByText("Split Headline")).toBeTruthy()
  })

  it("MinimalCard renders its headline", () => {
    render(<MinimalCard headline="Minimal Headline" />)
    expect(screen.getByText("Minimal Headline")).toBeTruthy()
  })
})
