#!/usr/bin/env node
// Build-time config gate. Runs validateConfig against site.config.js (or a path
// passed as the first arg) and exits non-zero with clear messages on failure, so
// `npm run build` aborts before Vite runs on a broken config.

import { pathToFileURL } from "node:url"
import { resolve } from "node:path"
import { validateConfig } from "../src/config/schema.js"

const configPath = resolve(process.cwd(), process.argv[2] || "site.config.js")

async function main() {
  let config
  try {
    const mod = await import(pathToFileURL(configPath).href)
    config = mod.default
  } catch (err) {
    console.error(`\n✖ Could not load config at ${configPath}\n  ${err.message}\n`)
    process.exit(1)
  }

  const { ok, errors } = validateConfig(config)
  if (ok) {
    console.log(`✓ ${configPath} is valid`)
    process.exit(0)
  }

  console.error(`\n✖ ${errors.length} config error(s) in ${configPath}:\n`)
  for (const e of errors) console.error(`  - ${e}`)
  console.error("")
  process.exit(1)
}

main()
