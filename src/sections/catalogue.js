// The section catalogue: plain data declaring every section type, its default
// variant, and the names of its variants. This is the single source of truth for
// valid {type, variant} pairs.
//
// It lives in its own JSX-free module so it can be imported by:
//  - registry.jsx (to build the runtime component registry), and
//  - the config validator, which runs under plain Node (no JSX transform) at
//    build time.
// Add a variant here and it is recognised by the registry, the gallery and
// validation at once.

export const catalogue = {
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
