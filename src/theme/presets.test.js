import { describe, it, expect } from "vitest"
import { presets } from "./presets"

describe("presets", () => {
  it("every preset defines the full token set", () => {
    const required = [
      "colorBg",
      "colorText",
      "colorAccent",
      "colorMuted",
      "colorSurface",
      "fontHeading",
      "fontBody",
      "radius",
      "spaceScale",
      "typeScale",
      "case",
      "motion",
      "elevation",
    ]
    for (const name of Object.keys(presets)) {
      for (const key of required) {
        expect(presets[name], `${name}.${key}`).toHaveProperty(key)
      }
    }
  })

  it("ships the four named personalities", () => {
    expect(Object.keys(presets).sort()).toEqual([
      "corporate",
      "editorial-dark",
      "tradesman",
      "warm-service",
    ])
  })

  it("constrains enumerated tokens to their allowed values", () => {
    for (const name of Object.keys(presets)) {
      expect(["upper", "sentence"]).toContain(presets[name].case)
      expect(["sharp", "smooth", "none"]).toContain(presets[name].motion)
      expect(["border", "shadow"]).toContain(presets[name].elevation)
    }
  })
})
