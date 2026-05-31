// Section registry: resolves which {type, variant} pairs map to which component.
// The valid pairs are declared as plain data in catalogue.js (so validation can
// read them under plain Node); this module turns that into a runtime registry of
// components, starting as stubs that real layout components replace via
// registerVariant. The router/PageRenderer and the gallery resolve through here.

import { catalogue } from "./catalogue"

function makeStub(type, variant) {
  function SectionStub(props) {
    return (
      <section
        data-section-type={type}
        data-variant={variant}
        style={{ padding: "2rem", fontFamily: "var(--font-body)", color: "var(--color-text)" }}
      >
        {props.headline ? (
          <h2 style={{ fontFamily: "var(--font-heading)" }}>{props.headline}</h2>
        ) : null}
        <p style={{ color: "var(--color-muted)" }}>
          [{type} / {variant}]
        </p>
      </section>
    )
  }
  SectionStub.displayName = `Stub(${type}/${variant})`
  SectionStub.isStub = true
  return SectionStub
}

// Build the runtime registry: { type: { default, variants: { name: Component } } }.
// Real components register themselves by overriding entries here (registerVariant).
export const registry = {}
for (const [type, { default: def, variants }] of Object.entries(catalogue)) {
  registry[type] = { default: def, variants: {} }
  for (const variant of variants) {
    registry[type].variants[variant] = makeStub(type, variant)
  }
}

// Replace a stub with a real layout component. Called by section modules as they
// are implemented in Phases 3-4. Throws if the type/variant was never declared,
// so a typo in a section file is caught immediately.
export function registerVariant(type, variant, Component) {
  if (!registry[type]) throw new Error(`cannot register unknown section type "${type}"`)
  if (!(variant in registry[type].variants)) {
    throw new Error(`cannot register undeclared variant "${variant}" for section "${type}"`)
  }
  registry[type].variants[variant] = Component
  return Component
}

export const sectionTypes = Object.keys(registry)

export function variantsFor(type) {
  if (!registry[type]) throw new Error(`unknown section type "${type}"`)
  return Object.keys(registry[type].variants)
}

// Resolve a {type, variant} pair to its component, falling back to the type's
// default variant when none is given. Throws clear, actionable errors.
export function resolveSection(type, variant) {
  const entry = registry[type]
  if (!entry) {
    const known = sectionTypes.join(", ")
    throw new Error(`unknown section type "${type}" (known types: ${known})`)
  }
  const chosen = variant ?? entry.default
  const Component = entry.variants[chosen]
  if (!Component) {
    const known = Object.keys(entry.variants).join(", ")
    throw new Error(`unknown variant "${variant}" for section "${type}" (valid variants: ${known})`)
  }
  return Component
}
