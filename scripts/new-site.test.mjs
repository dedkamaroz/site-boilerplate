import { describe, it, expect, afterEach } from "vitest"
import { mkdtempSync, rmSync, existsSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { scaffoldSite } from "./new-site.mjs"

const made = []
function tmpTarget() {
  const base = mkdtempSync(join(tmpdir(), "newsite-"))
  const target = join(base, "generated")
  made.push(base)
  return target
}

afterEach(() => {
  while (made.length) rmSync(made.pop(), { recursive: true, force: true })
})

describe("scaffoldSite", () => {
  it("writes a site.config.js with the name and preset filled in", () => {
    const target = tmpTarget()
    scaffoldSite({ name: "Acme Plumbing", preset: "tradesman", targetDir: target })
    const config = readFileSync(join(target, "site.config.js"), "utf8")
    expect(config).toMatch(/Acme Plumbing/)
    expect(config).toMatch(/preset: "tradesman"/)
    expect(config).not.toMatch(/__SITE_NAME__|__SITE_PRESET__/)
  })

  it("creates an empty public/assets directory", () => {
    const target = tmpTarget()
    scaffoldSite({ name: "Acme", preset: "tradesman", targetDir: target })
    expect(existsSync(join(target, "public/assets"))).toBe(true)
  })

  it("copies the boilerplate source but not node_modules", () => {
    const target = tmpTarget()
    scaffoldSite({ name: "Acme", preset: "corporate", targetDir: target })
    expect(existsSync(join(target, "src/App.jsx"))).toBe(true)
    expect(existsSync(join(target, "src/sections/registry.jsx"))).toBe(true)
    expect(existsSync(join(target, "package.json"))).toBe(true)
    expect(existsSync(join(target, "node_modules"))).toBe(false)
  })

  it("starts the new site with an empty fingerprint registry", () => {
    const target = tmpTarget()
    scaffoldSite({ name: "Acme", preset: "tradesman", targetDir: target })
    expect(readFileSync(join(target, "fingerprints.json"), "utf8").trim()).toBe("[]")
  })

  it("rejects an unknown preset", () => {
    const target = tmpTarget()
    expect(() => scaffoldSite({ name: "Acme", preset: "nope", targetDir: target })).toThrow(
      /unknown preset/i
    )
  })

  it("refuses to overwrite an existing target directory", () => {
    const target = tmpTarget()
    scaffoldSite({ name: "Acme", preset: "tradesman", targetDir: target })
    expect(() => scaffoldSite({ name: "Acme", preset: "tradesman", targetDir: target })).toThrow(
      /already exists/i
    )
  })
})
