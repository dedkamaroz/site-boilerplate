import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import Media from "./Media"

describe("Media", () => {
  it("renders an img when media.kind is image", () => {
    const { getByRole } = render(<Media media={{ kind: "image", src: "/a.jpg", alt: "A" }} />)
    const img = getByRole("img")
    expect(img).toHaveAttribute("src", "/a.jpg")
    expect(img).toHaveAttribute("alt", "A")
  })

  it("renders a video when media.kind is video", () => {
    const { container } = render(
      <Media media={{ kind: "video", src: "/a.mp4", poster: "/p.jpg" }} />
    )
    const video = container.querySelector("video")
    expect(video).toBeTruthy()
    expect(video.getAttribute("poster")).toBe("/p.jpg")
  })

  it("video autoplays muted and loops by default", () => {
    const { container } = render(<Media media={{ kind: "video", src: "/a.mp4" }} />)
    const video = container.querySelector("video")
    expect(video).toHaveAttribute("loop")
    expect(video.muted).toBe(true)
  })

  it("renders nothing when media has no src", () => {
    const { container } = render(<Media media={{ kind: "image" }} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("renders nothing when media is undefined", () => {
    const { container } = render(<Media />)
    expect(container).toBeEmptyDOMElement()
  })

  it("passes through style and className", () => {
    const { getByRole } = render(
      <Media
        media={{ kind: "image", src: "/a.jpg", alt: "x" }}
        className="cover"
        style={{ width: "100%" }}
      />
    )
    const img = getByRole("img")
    expect(img).toHaveClass("cover")
    expect(img).toHaveStyle({ width: "100%" })
  })
})
