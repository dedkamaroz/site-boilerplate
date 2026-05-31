// Theme preset personalities.
//
// A preset bundles far more than colour: type scale, spacing density, the
// border-vs-shadow language, text case, motion style and radius. Each one is a
// distinct personality so that two sites built from the same boilerplate diverge
// structurally, not just chromatically. `theme.colors`/`theme.fonts` in a
// site.config.js override on top of the chosen preset (see tokensToCss).
//
// Token contract (every preset must define all of these):
//   colorBg, colorText, colorAccent, colorMuted, colorSurface  - colours
//   fontHeading, fontBody                                       - font families
//   radius        - base corner radius (CSS length)
//   spaceScale    - multiplier on the spacing scale (compact < 1 < airy)
//   typeScale     - multiplier on the type scale
//   case          - "upper" | "sentence"  (heading/label casing)
//   motion        - "sharp" | "smooth" | "none"
//   elevation     - "border" | "shadow"   (how surfaces separate)

export const presets = {
  // The original agency look: sharp, uppercase, dark.
  "editorial-dark": {
    colorBg: "#0D0D0D",
    colorText: "#F0F0F0",
    colorAccent: "#FFFFFF",
    colorMuted: "#888888",
    colorSurface: "#161616",
    colorBorder: "#2A2A2A",
    fontHeading: "Inter",
    fontBody: "Inter",
    radius: "0px",
    spaceScale: 1,
    typeScale: 1.05,
    case: "upper",
    motion: "sharp",
    elevation: "border",
  },

  // Light, rounded, friendly. Blue/green accents for trades.
  tradesman: {
    colorBg: "#FFFFFF",
    colorText: "#1A2A33",
    colorAccent: "#0B6CB3",
    colorMuted: "#5C6F7A",
    colorSurface: "#F2F6F9",
    colorBorder: "#D7E2EA",
    fontHeading: "Poppins",
    fontBody: "Inter",
    radius: "14px",
    spaceScale: 1.1,
    typeScale: 1,
    case: "sentence",
    motion: "smooth",
    elevation: "shadow",
  },

  // Light, restrained, navy with serif headings.
  corporate: {
    colorBg: "#FFFFFF",
    colorText: "#10243E",
    colorAccent: "#1D4E89",
    colorMuted: "#5A6B7B",
    colorSurface: "#F4F6F8",
    colorBorder: "#D6DEE6",
    fontHeading: "Playfair Display",
    fontBody: "Source Sans 3",
    radius: "4px",
    spaceScale: 1,
    typeScale: 1.1,
    case: "sentence",
    motion: "smooth",
    elevation: "border",
  },

  // Light, warm neutrals, approachable.
  "warm-service": {
    colorBg: "#FBF7F2",
    colorText: "#33271E",
    colorAccent: "#C2683A",
    colorMuted: "#7A6A5C",
    colorSurface: "#FFFFFF",
    colorBorder: "#E8DDD0",
    fontHeading: "Fraunces",
    fontBody: "Nunito Sans",
    radius: "20px",
    spaceScale: 1.15,
    typeScale: 1,
    case: "sentence",
    motion: "smooth",
    elevation: "shadow",
  },
}

export const presetNames = Object.keys(presets)
