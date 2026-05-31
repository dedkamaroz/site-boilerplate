import { describe, it, expect } from "vitest"
import { fingerprintOf, checkCollision } from "./fingerprint"

function configWith(preset, sections) {
  return {
    theme: { preset },
    pages: [{ path: "/", sections }],
  }
}

const sections6 = [
  { type: "hero", variant: "split-left" },
  { type: "services", variant: "card-grid" },
  { type: "testimonials", variant: "stacked-quotes" },
  { type: "pricing", variant: "tiers-cards" },
  { type: "faq", variant: "accordion" },
  { type: "contact", variant: "stacked" },
]

describe("fingerprintOf", () => {
  it("produces a stable signature from preset + ordered type/variant", () => {
    const a = fingerprintOf(configWith("tradesman", sections6))
    const b = fingerprintOf(configWith("tradesman", sections6))
    expect(a.signature).toBe(b.signature)
    expect(a.preset).toBe("tradesman")
    expect(a.variants).toContain("hero/split-left")
  })

  it("resolves an omitted variant to the type default", () => {
    const explicit = fingerprintOf(
      configWith("tradesman", [{ type: "hero", variant: "centred-over-media" }])
    )
    const omitted = fingerprintOf(configWith("tradesman", [{ type: "hero" }]))
    expect(omitted.signature).toBe(explicit.signature)
  })

  it("changes when order changes", () => {
    const a = fingerprintOf(configWith("tradesman", sections6))
    const reordered = fingerprintOf(configWith("tradesman", [...sections6].reverse()))
    expect(a.signature).not.toBe(reordered.signature)
  })

  it("changes when the preset changes", () => {
    const a = fingerprintOf(configWith("tradesman", sections6))
    const b = fingerprintOf(configWith("corporate", sections6))
    expect(a.signature).not.toBe(b.signature)
  })
})

describe("checkCollision", () => {
  it("flags an exact signature match", () => {
    const fp = fingerprintOf(configWith("tradesman", sections6))
    const result = checkCollision(fp, [fp])
    expect(result.collision).toBe(true)
    expect(result.kind).toBe("exact")
  })

  it("flags a near match above the similarity threshold", () => {
    const a = fingerprintOf(configWith("tradesman", sections6))
    // change a single variant out of six -> 5/6 shared ~= 0.83 > 0.8
    const nearSections = sections6.map((s, i) =>
      i === 0 ? { type: "hero", variant: "minimal-card" } : s
    )
    const b = fingerprintOf(configWith("tradesman", nearSections))
    const result = checkCollision(b, [a])
    expect(result.collision).toBe(true)
    expect(result.kind).toBe("near")
    expect(result.similarity).toBeGreaterThan(0.8)
  })

  it("does not flag a clearly different config", () => {
    const a = fingerprintOf(configWith("tradesman", sections6))
    const b = fingerprintOf(
      configWith("corporate", [
        { type: "hero", variant: "minimal-card" },
        { type: "steps", variant: "vertical-timeline" },
        { type: "gallery", variant: "masonry" },
      ])
    )
    const result = checkCollision(b, [a])
    expect(result.collision).toBe(false)
    expect(result.kind).toBe(null)
  })

  it("returns no collision against an empty registry", () => {
    const fp = fingerprintOf(configWith("tradesman", sections6))
    expect(checkCollision(fp, []).collision).toBe(false)
  })
})
