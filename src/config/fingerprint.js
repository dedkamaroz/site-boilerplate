import { catalogue } from "../sections/catalogue.js"

// Disguise fingerprint. A site's fingerprint is its theme preset plus the
// ordered list of {type, variant} across all pages (and the global navbar/footer
// from layout). Two sites with the same fingerprint - or a very similar one -
// risk reading as siblings, which the boilerplate exists to avoid. The build
// records fingerprints and warns on collision so the disguise stays honest.

export const NEAR_THRESHOLD = 0.8

// Resolve a section's variant, falling back to the type's declared default.
function resolveVariant(type, variant) {
  const entry = catalogue[type]
  const chosen = variant ?? entry?.default
  return `${type}/${chosen}`
}

export function fingerprintOf(config) {
  const preset = config?.theme?.preset ?? "(none)"
  const variants = []

  if (config?.layout?.navbar) variants.push(resolveVariant("navbar", config.layout.navbar.variant))
  for (const page of config?.pages ?? []) {
    for (const section of page.sections ?? []) {
      if (section?.type) variants.push(resolveVariant(section.type, section.variant))
    }
  }
  if (config?.layout?.footer) variants.push(resolveVariant("footer", config.layout.footer.variant))

  const signature = `${preset}|${variants.join(",")}`
  return { preset, variants, signature }
}

// Similarity of two fingerprints: share of variant tokens in common, as a
// fraction of the larger set (so reordering/length differences still count as
// similar when the same building blocks are reused). Same preset is required for
// a "near" collision, since the preset is the strongest divergence lever.
function similarity(a, b) {
  const setA = new Set(a.variants)
  const setB = new Set(b.variants)
  if (setA.size === 0 && setB.size === 0) return 1
  let shared = 0
  for (const v of setA) if (setB.has(v)) shared++
  return shared / Math.max(setA.size, setB.size)
}

// Compare a fingerprint against a list of existing ones. Returns the strongest
// collision found: exact signature match, else a near match above NEAR_THRESHOLD
// with the same preset.
export function checkCollision(fp, existing = []) {
  for (const other of existing) {
    if (other.signature === fp.signature) {
      return { collision: true, kind: "exact", similarity: 1, against: other }
    }
  }

  let best = null
  for (const other of existing) {
    if (other.preset !== fp.preset) continue
    const sim = similarity(fp, other)
    if (sim > NEAR_THRESHOLD && (!best || sim > best.similarity)) {
      best = { collision: true, kind: "near", similarity: sim, against: other }
    }
  }

  return best ?? { collision: false, kind: null, similarity: 0, against: null }
}
