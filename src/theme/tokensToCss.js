import { presets } from "./presets"

// camelCase -> --kebab-case, e.g. "colorAccent" -> "--color-accent".
function toCssVar(token) {
  const kebab = token.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())
  return "--" + kebab
}

// Resolve a preset name plus optional overrides into a flat map of CSS custom
// properties ({ "--color-bg": "#0D0D0D", ... }). Overrides are shallow-merged on
// top of the preset and only apply to keys the preset actually defines, so a typo
// in config cannot inject a stray variable. Throws on an unknown preset.
export function tokensToCss(presetName, overrides = {}) {
  const preset = presets[presetName]
  if (!preset) {
    const known = Object.keys(presets).join(", ")
    throw new Error(`unknown preset "${presetName}" (known presets: ${known})`)
  }

  const merged = { ...preset }
  for (const [key, value] of Object.entries(overrides)) {
    if (key in preset && value != null) merged[key] = value
  }

  const css = {}
  for (const [token, value] of Object.entries(merged)) {
    css[toCssVar(token)] = String(value)
  }
  return css
}
