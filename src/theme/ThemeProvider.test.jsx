import { describe, it, expect, beforeEach } from "vitest"
import { render, cleanup } from "@testing-library/react"
import { ThemeProvider } from "./ThemeProvider"

describe("ThemeProvider", () => {
  beforeEach(() => {
    cleanup()
    document.documentElement.removeAttribute("style")
    document.head.querySelectorAll("link[data-theme-fonts]").forEach((n) => n.remove())
  })

  it("writes preset tokens as CSS variables on :root", () => {
    render(
      <ThemeProvider theme={{ preset: "tradesman" }}>
        <div>hi</div>
      </ThemeProvider>
    )
    const root = document.documentElement
    expect(root.style.getPropertyValue("--color-bg")).toBe("#FFFFFF")
    expect(root.style.getPropertyValue("--color-accent")).toBe("#0B6CB3")
  })

  it("applies config colour overrides over the preset", () => {
    render(
      <ThemeProvider theme={{ preset: "tradesman", colors: { accent: "#123456" } }}>
        <div>hi</div>
      </ThemeProvider>
    )
    expect(document.documentElement.style.getPropertyValue("--color-accent")).toBe("#123456")
  })

  it("injects a Google Fonts link built from the configured fonts", () => {
    render(
      <ThemeProvider theme={{ preset: "tradesman", fonts: { heading: "Poppins", body: "Inter" } }}>
        <div>hi</div>
      </ThemeProvider>
    )
    const link = document.head.querySelector("link[data-theme-fonts]")
    expect(link).toBeTruthy()
    expect(link.getAttribute("href")).toMatch(/Poppins/)
    expect(link.getAttribute("href")).toMatch(/Inter/)
  })

  it("renders its children", () => {
    const { getByText } = render(
      <ThemeProvider theme={{ preset: "corporate" }}>
        <span>child content</span>
      </ThemeProvider>
    )
    expect(getByText("child content")).toBeInTheDocument()
  })
})
