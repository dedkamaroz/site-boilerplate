// Section registry: the single source of truth for which {type, variant} pairs
// exist. The router/PageRenderer resolves sections through here, and config
// validation (Phase 6) and the gallery (Phase 5) both derive their allowed lists
// from this object - so adding a variant in one place wires it everywhere.
//
// Variants start as stubs and are replaced by real layout components in Phases
// 3-4. A stub renders an identifiable placeholder so the renderer/router can be
// built and tested before the real layouts land.

function makeStub(type, variant) {
  function SectionStub(props) {
    return (
      <section
        data-section-type={type}
        data-variant={variant}
        style={{ padding: "2rem", fontFamily: "var(--font-body)", color: "var(--color-text)" }}
      >
        {props.headline ? <h2 style={{ fontFamily: "var(--font-heading)" }}>{props.headline}</h2> : null}
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

// Declare the catalogue: type -> { default variant, [variant names] }.
// The full set of variants from the design doc; real components swap in later.
const catalogue = {
  navbar: { default: "transparent-scroll", variants: ["transparent-scroll", "solid-bar"] },
  hero: {
    default: "centred-over-media",
    variants: ["centred-over-media", "split-left", "minimal-card"],
  },
  services: { default: "numbered-list", variants: ["numbered-list", "card-grid", "icon-row"] },
  testimonials: { default: "drag-strip", variants: ["drag-strip", "stacked-quotes"] },
  logoMarquee: { default: "two-row-scroll", variants: ["two-row-scroll", "static-grid"] },
  gallery: { default: "filterable-grid", variants: ["filterable-grid", "masonry"] },
  featured: { default: "alternating-rows", variants: ["alternating-rows", "cards"] },
  footer: { default: "three-column", variants: ["three-column", "stacked", "compact-bar"] },
  pricing: {
    default: "tiers-cards",
    variants: ["tiers-cards", "comparison-table", "simple-list"],
  },
  serviceArea: { default: "suburb-list", variants: ["suburb-list", "map-embed"] },
  faq: { default: "accordion", variants: ["accordion", "two-column"] },
  ctaBanner: { default: "full-bleed", variants: ["full-bleed", "boxed", "split"] },
  contact: {
    default: "form-left-details-right",
    variants: ["form-left-details-right", "stacked", "details-only"],
  },
  steps: { default: "numbered-row", variants: ["numbered-row", "vertical-timeline"] },
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
    throw new Error(
      `unknown variant "${variant}" for section "${type}" (valid variants: ${known})`
    )
  }
  return Component
}
