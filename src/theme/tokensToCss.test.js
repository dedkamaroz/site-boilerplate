import { describe, it, expect } from "vitest"
import { tokensToCss } from "./tokensToCss"

describe("tokensToCss", () => {
  it("merges preset with overrides and emits CSS vars", () => {
    const css = tokensToCss("tradesman", { colorAccent: "#0B6CB3" })
    expect(css["--color-accent"]).toBe("#0B6CB3") // override wins
    expect(css["--color-bg"]).toBeDefined() // preset fills the rest
    expect(css["--font-heading"]).toBeDefined()
  })

  it("maps camelCase tokens to kebab-case CSS variables", () => {
    const css = tokensToCss("tradesman", {})
    expect(css["--color-surface"]).toBe("#F2F6F9")
    expect(css["--type-scale"]).toBeDefined()
    expect(css["--font-body"]).toBeDefined()
  })

  it("throws on unknown preset", () => {
    expect(() => tokensToCss("nope", {})).toThrow(/unknown preset/i)
  })

  it("ignores override keys that are not real tokens", () => {
    const css = tokensToCss("tradesman", { bogusKey: "x" })
    expect(css["--bogus-key"]).toBeUndefined()
  })
})
