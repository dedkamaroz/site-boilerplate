import { describe, it, expect } from "vitest"
import "./index" // run all registerVariant side effects
import { registry, sectionTypes } from "./registry"

// Guards the core completeness invariant: once the barrel is imported, every
// declared {type, variant} must resolve to a real component, not a leftover
// stub. A new variant added to the catalogue but never registered fails here.
describe("section registration completeness", () => {
  it("has no unregistered (stub) variants", () => {
    const stubs = []
    for (const type of sectionTypes) {
      for (const [variant, Component] of Object.entries(registry[type].variants)) {
        if (Component.isStub) stubs.push(`${type}/${variant}`)
      }
    }
    expect(stubs, `unregistered variants: ${stubs.join(", ")}`).toEqual([])
  })
})
