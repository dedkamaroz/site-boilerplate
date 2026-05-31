#!/usr/bin/env node
// Disguise fingerprint-collision check. Computes the current site's fingerprint
// (preset + ordered section variants) and compares it against the committed
// registry in fingerprints.json, warning if it collides with - or closely
// resembles - a previously generated site.
//
// Usage:
//   node scripts/fingerprint.mjs [configPath]            # check, warn-only
//   node scripts/fingerprint.mjs [configPath] --record   # check, then record
//
// Warn-only by default (exit 0) so it does not block builds; pass --strict to
// exit non-zero on collision.

import { pathToFileURL } from "node:url"
import { resolve } from "node:path"
import { readFileSync, writeFileSync } from "node:fs"
import { fingerprintOf, checkCollision } from "../src/config/fingerprint.js"

const args = process.argv.slice(2)
const record = args.includes("--record")
const strict = args.includes("--strict")
const configArg = args.find((a) => !a.startsWith("--"))
const configPath = resolve(process.cwd(), configArg || "site.config.js")
const registryPath = resolve(process.cwd(), "fingerprints.json")

function loadRegistry() {
  try {
    return JSON.parse(readFileSync(registryPath, "utf8"))
  } catch {
    return []
  }
}

async function main() {
  const mod = await import(pathToFileURL(configPath).href)
  const config = mod.default
  const name = config?.brand?.name || configArg || "site.config.js"

  const fp = { name, ...fingerprintOf(config) }
  const registry = loadRegistry()
  // Compare against everything except a previous record of this same site.
  const others = registry.filter((e) => e.name !== name)
  const result = checkCollision(fp, others)

  if (result.collision) {
    const pct = Math.round(result.similarity * 100)
    console.warn(
      `\n⚠ Disguise collision: "${name}" is a ${result.kind} match (${pct}%) with "${result.against.name}".`
    )
    console.warn(
      "  Two sites should not read as siblings - vary the preset and section variants.\n"
    )
  } else {
    console.log(
      `✓ "${name}" has a distinct fingerprint (checked against ${others.length} site(s)).`
    )
  }

  if (record) {
    const next = registry.filter((e) => e.name !== name)
    next.push(fp)
    writeFileSync(registryPath, JSON.stringify(next, null, 2) + "\n")
    console.log(`✓ Recorded fingerprint for "${name}" in fingerprints.json.`)
  }

  if (result.collision && strict) process.exit(1)
  process.exit(0)
}

main().catch((err) => {
  console.error(`✖ fingerprint check failed: ${err.message}`)
  process.exit(1)
})
