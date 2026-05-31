import { useState } from "react"
import "../src/sections" // register every variant
import { registry, sectionTypes } from "../src/sections/registry"
import { tokensToCss } from "../src/theme/tokensToCss"
import { presetNames } from "../src/theme/presets"
import { fixtureProps } from "./fixtures"

// Apply a preset's tokens to a scoped element via inline CSS custom properties,
// so each preview frame can show a different preset without a global ThemeProvider.
function presetVars(preset) {
  return tokensToCss(preset, {})
}

function VariantFrame({ type, variant, preset }) {
  const Component = registry[type].variants[variant]
  const props = fixtureProps(type)
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "baseline",
          padding: "0.4rem 0.75rem",
          fontFamily: "monospace",
          fontSize: "0.8rem",
          color: "#111",
          background: "#f1f1f1",
          borderBottom: "1px solid #ddd",
          position: "sticky",
          top: 0,
          zIndex: 5,
        }}
      >
        <strong>{type}</strong>
        <span style={{ color: "#666" }}>/ {variant}</span>
        {variant === registry[type].default ? (
          <span style={{ color: "#999" }}>(default)</span>
        ) : null}
      </div>
      {/* The preview surface carries the preset tokens and the theme background. */}
      <div
        style={{ ...presetVars(preset), background: "var(--color-bg)", color: "var(--color-text)" }}
      >
        <Component {...props} />
      </div>
    </div>
  )
}

export default function Gallery() {
  const [preset, setPreset] = useState(presetNames[0])
  const [typeFilter, setTypeFilter] = useState("all")

  const types = typeFilter === "all" ? sectionTypes : [typeFilter]

  const controlStyle = {
    padding: "0.4rem 0.6rem",
    fontSize: "0.9rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <header
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "1rem 1.5rem",
          background: "#fff",
          borderBottom: "1px solid #e2e2e2",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <strong style={{ fontSize: "1rem" }}>Section gallery</strong>
        <label
          style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.85rem" }}
        >
          Preset
          <select style={controlStyle} value={preset} onChange={(e) => setPreset(e.target.value)}>
            {presetNames.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label
          style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.85rem" }}
        >
          Type
          <select
            style={controlStyle}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">all</option>
            {sectionTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <span style={{ color: "#888", fontSize: "0.8rem" }}>
          {sectionTypes.reduce((n, t) => n + Object.keys(registry[t].variants).length, 0)} variants
        </span>
      </header>

      <main>
        {types.map((type) =>
          Object.keys(registry[type].variants).map((variant) => (
            <VariantFrame
              key={`${type}/${variant}`}
              type={type}
              variant={variant}
              preset={preset}
            />
          ))
        )}
      </main>
    </div>
  )
}
