import { useEffect } from "react"
import { tokensToCss } from "./tokensToCss"

// Translate the config-shaped `theme` block into flat token overrides that
// tokensToCss understands. config uses friendly nested keys
// (colors.accent, fonts.heading); tokens use camelCase (colorAccent, fontHeading).
function themeToOverrides(theme = {}) {
  const overrides = {}
  const { colors = {}, fonts = {}, ...rest } = theme

  for (const [k, v] of Object.entries(colors)) {
    overrides["color" + k[0].toUpperCase() + k.slice(1)] = v
  }
  if (fonts.heading) overrides.fontHeading = fonts.heading
  if (fonts.body) overrides.fontBody = fonts.body

  // Allow direct token overrides too (radius, spaceScale, ...), skipping the
  // structural keys handled above.
  for (const [k, v] of Object.entries(rest)) {
    if (k !== "preset") overrides[k] = v
  }
  return overrides
}

// Build a Google Fonts stylesheet URL for the two configured families.
function googleFontsHref(theme = {}) {
  const families = [theme.fonts?.heading, theme.fonts?.body].filter(Boolean)
  if (families.length === 0) return null
  const unique = [...new Set(families)]
  const params = unique
    .map((f) => "family=" + encodeURIComponent(f).replace(/%20/g, "+") + ":wght@300;400;600;700")
    .join("&")
  return `https://fonts.googleapis.com/css2?${params}&display=swap`
}

// Reads config.theme, writes its tokens as CSS custom properties on :root, and
// injects a Google Fonts <link> for the configured families. This is the single
// place colours/fonts enter the DOM - components only ever read var(--*).
export function ThemeProvider({ theme, children }) {
  useEffect(() => {
    const css = tokensToCss(theme.preset, themeToOverrides(theme))
    const root = document.documentElement
    for (const [name, value] of Object.entries(css)) {
      root.style.setProperty(name, value)
    }

    const href = googleFontsHref(theme)
    let link
    if (href) {
      link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = href
      link.setAttribute("data-theme-fonts", "")
      document.head.appendChild(link)
    }

    return () => {
      if (link) link.remove()
    }
  }, [theme])

  return children
}
