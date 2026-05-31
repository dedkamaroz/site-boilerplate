import { describe, it, expect } from "vitest"
import { validateConfig } from "./schema"
import sampleConfig from "../../site.config"

function baseConfig() {
  return {
    brand: { name: "Acme" },
    theme: { preset: "tradesman" },
    nav: [],
    pages: [
      {
        path: "/",
        title: "Home",
        sections: [{ type: "hero", variant: "split-left", props: {} }],
      },
    ],
  }
}

describe("validateConfig", () => {
  it("accepts the shipped sample site.config.js", () => {
    const result = validateConfig(sampleConfig)
    expect(result.errors).toEqual([])
    expect(result.ok).toBe(true)
  })

  it("accepts a minimal valid config", () => {
    expect(validateConfig(baseConfig()).ok).toBe(true)
  })

  it("fails when a section type is unknown, naming the type and the page", () => {
    const config = baseConfig()
    config.pages[0].sections[0].type = "nope"
    const { ok, errors } = validateConfig(config)
    expect(ok).toBe(false)
    expect(errors.join("\n")).toMatch(/unknown section type "nope"/i)
    expect(errors.join("\n")).toMatch(/\//) // references the page path
  })

  it("fails on an unknown variant for a known type, listing valid variants", () => {
    const config = baseConfig()
    config.pages[0].sections[0].variant = "nope"
    const { ok, errors } = validateConfig(config)
    expect(ok).toBe(false)
    const msg = errors.join("\n")
    expect(msg).toMatch(/unknown variant "nope"/i)
    expect(msg).toMatch(/centred-over-media/) // lists the valid variants
  })

  it("fails when the required brand name is missing", () => {
    const config = baseConfig()
    delete config.brand.name
    const { ok, errors } = validateConfig(config)
    expect(ok).toBe(false)
    expect(errors.join("\n")).toMatch(/brand\.name/i)
  })

  it("fails on an unknown theme preset", () => {
    const config = baseConfig()
    config.theme.preset = "nope"
    const { ok, errors } = validateConfig(config)
    expect(ok).toBe(false)
    expect(errors.join("\n")).toMatch(/preset "nope"/i)
  })

  it("fails when media.kind is not image or video", () => {
    const config = baseConfig()
    config.pages[0].sections[0].props = { media: { kind: "gif", src: "/a.gif" } }
    const { ok, errors } = validateConfig(config)
    expect(ok).toBe(false)
    expect(errors.join("\n")).toMatch(/media\.kind/i)
  })

  it("validates layout navbar/footer variants too", () => {
    const config = baseConfig()
    config.layout = { footer: { variant: "nope" } }
    const { ok, errors } = validateConfig(config)
    expect(ok).toBe(false)
    expect(errors.join("\n")).toMatch(/footer/i)
  })
})
