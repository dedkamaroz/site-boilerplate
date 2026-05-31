import { describe, it, expect } from "vitest"
import { resolveSection, registry, sectionTypes, variantsFor } from "./registry"

describe("section registry", () => {
  it("resolves a known type+variant to a component", () => {
    const Comp = resolveSection("hero", "split-left")
    expect(typeof Comp).toBe("function")
  })

  it("falls back to the type's default variant when variant omitted", () => {
    expect(resolveSection("hero")).toBe(resolveSection("hero", undefined))
  })

  it("the omitted-variant fallback equals the declared default", () => {
    const def = registry.hero.default
    expect(resolveSection("hero")).toBe(registry.hero.variants[def])
  })

  it("throws a clear error on unknown type", () => {
    expect(() => resolveSection("nope")).toThrow(/unknown section type "nope"/i)
  })

  it("throws a clear error on unknown variant", () => {
    expect(() => resolveSection("hero", "nope")).toThrow(/unknown variant/i)
  })

  it("exposes the list of section types", () => {
    expect(sectionTypes).toContain("hero")
    expect(sectionTypes).toContain("footer")
    expect(sectionTypes).toContain("contact")
  })

  it("every type declares a default that exists among its variants", () => {
    for (const type of sectionTypes) {
      const { default: def, variants } = registry[type]
      expect(Object.keys(variants), `${type} has variants`).not.toHaveLength(0)
      expect(variants, `${type}.default "${def}" is a real variant`).toHaveProperty(def)
    }
  })

  it("variantsFor lists a type's variant names", () => {
    expect(variantsFor("hero").sort()).toEqual(
      ["centred-over-media", "minimal-card", "split-left"].sort()
    )
  })
})
