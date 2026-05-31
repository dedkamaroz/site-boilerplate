import { catalogue } from "../sections/catalogue.js"
import { presetNames } from "../theme/presets.js"

// Pure config validator. Returns { ok, errors[] } so it can drive both the
// build-time CLI (scripts/validate-config.mjs) and unit tests. Valid section
// type/variant pairs and presets are derived from the catalogue and preset
// definitions, so there is one source of truth.
export function validateConfig(config) {
  const errors = []

  if (!config || typeof config !== "object") {
    return {
      ok: false,
      errors: ["config: expected an object (a default export from site.config.js)"],
    }
  }

  // Brand
  if (!config.brand || typeof config.brand !== "object") {
    errors.push("brand: required object is missing")
  } else if (!config.brand.name || String(config.brand.name).trim() === "") {
    errors.push("brand.name: required and must be a non-empty string")
  }

  // Theme
  if (!config.theme || typeof config.theme !== "object") {
    errors.push("theme: required object is missing")
  } else if (!presetNames.includes(config.theme.preset)) {
    errors.push(
      `theme.preset "${config.theme.preset}" is not a known preset (valid: ${presetNames.join(", ")})`
    )
  }

  // Layout (optional global navbar/footer)
  if (config.layout && typeof config.layout === "object") {
    checkVariant("navbar", config.layout.navbar?.variant, "layout.navbar.variant", errors)
    checkVariant("footer", config.layout.footer?.variant, "layout.footer.variant", errors)
  }

  // Pages
  if (!Array.isArray(config.pages) || config.pages.length === 0) {
    errors.push("pages: required non-empty array")
  } else {
    config.pages.forEach((page, pi) => {
      const where = page?.path ? `page "${page.path}"` : `page #${pi + 1}`
      if (!page || typeof page !== "object") {
        errors.push(`${where}: expected an object`)
        return
      }
      if (!page.path || typeof page.path !== "string") {
        errors.push(`${where}: requires a string "path"`)
      }
      if (!Array.isArray(page.sections)) {
        errors.push(`${where}: requires a "sections" array`)
        return
      }
      page.sections.forEach((section, si) => {
        const sWhere = `${where}, section #${si + 1}`
        if (!section || typeof section !== "object" || !section.type) {
          errors.push(`${sWhere}: requires a "type"`)
          return
        }
        const entry = catalogue[section.type]
        if (!entry) {
          errors.push(
            `${sWhere}: unknown section type "${section.type}" (valid types: ${Object.keys(catalogue).join(", ")})`
          )
          return
        }
        if (section.variant != null && !entry.variants.includes(section.variant)) {
          errors.push(
            `${sWhere} (${section.type}): unknown variant "${section.variant}" (valid variants: ${entry.variants.join(", ")})`
          )
        }
        // media.kind, where present
        const media = section.props?.media
        if (media && media.kind != null && !["image", "video"].includes(media.kind)) {
          errors.push(`${sWhere}: media.kind must be "image" or "video" (got "${media.kind}")`)
        }
      })
    })
  }

  return { ok: errors.length === 0, errors }
}

function checkVariant(type, variant, label, errors) {
  if (variant == null) return
  const entry = catalogue[type]
  if (!entry.variants.includes(variant)) {
    errors.push(
      `${label}: unknown ${type} variant "${variant}" (valid: ${entry.variants.join(", ")})`
    )
  }
}
