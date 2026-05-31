#!/usr/bin/env node
// new-site CLI generator. Scaffolds a fresh client site from the boilerplate.
//
//   npm run new-site
//
// Prompts for a brand name and a theme preset, then creates a new sibling folder
// containing a full copy of the boilerplate source with a fresh site.config.js
// (name + preset filled in) and an empty public/assets/ directory.
//
// Packaging decision (recorded per the plan): the scaffold makes a FULL COPY of
// the source rather than consuming the boilerplate as an npm dependency. That is
// the simplest, most hackable starting point (YAGNI on a published package); a
// generated site is a standalone repo you can edit freely.

import { fileURLToPath, pathToFileURL } from "node:url"
import { dirname, resolve, join } from "node:path"
import { mkdirSync, cpSync, writeFileSync, readFileSync, existsSync } from "node:fs"
import { createInterface } from "node:readline"
import { presetNames } from "../src/theme/presets.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, "..")

// Items copied into a new site. Everything needed to dev/build/lint/preview,
// minus generated output, VCS, the boilerplate's own examples/docs, and node_modules.
const COPY_ITEMS = [
  "src",
  "public",
  "gallery",
  "scripts",
  "templates",
  "index.html",
  "vite.config.js",
  "vite.gallery.config.js",
  "vitest.config.js",
  "vitest.setup.js",
  ".eslintrc.cjs",
  ".prettierrc",
  ".prettierignore",
  ".gitignore",
  ".gitattributes",
  ".github",
  "package.json",
  "package-lock.json",
]

// Pure scaffolder so it can be unit-tested without prompts.
export function scaffoldSite({ name, preset, targetDir, sourceDir = REPO_ROOT }) {
  if (!name || !name.trim()) throw new Error("a brand name is required")
  const valid = presetNames
  if (!valid.includes(preset)) {
    throw new Error(`unknown preset "${preset}" (valid: ${valid.join(", ")})`)
  }
  if (existsSync(targetDir)) throw new Error(`target directory already exists: ${targetDir}`)

  mkdirSync(targetDir, { recursive: true })

  for (const item of COPY_ITEMS) {
    const from = join(sourceDir, item)
    if (!existsSync(from)) continue
    cpSync(from, join(targetDir, item), { recursive: true })
  }

  // Fresh site.config.js from the template, with name + preset filled in.
  const template = readFileSync(join(sourceDir, "templates/site.config.template.js"), "utf8")
  const config = template.replaceAll("__SITE_NAME__", name).replaceAll("__SITE_PRESET__", preset)
  writeFileSync(join(targetDir, "site.config.js"), config)

  // Empty asset drop + a fresh, empty fingerprint registry.
  mkdirSync(join(targetDir, "public/assets"), { recursive: true })
  writeFileSync(join(targetDir, "public/assets/.gitkeep"), "")
  writeFileSync(join(targetDir, "fingerprints.json"), "[]\n")

  writeFileSync(
    join(targetDir, "README.md"),
    `# ${name}\n\nBuilt from site-boilerplate.\n\n` +
      "1. `npm install`\n" +
      "2. Edit `site.config.js` and drop assets into `public/assets/`\n" +
      "3. `npm run gallery` to browse section variants\n" +
      "4. `npm run build` then deploy `dist/`\n"
  )

  return { targetDir, configPath: join(targetDir, "site.config.js"), preset, name }
}

function ask(rl, question) {
  return new Promise((res) => rl.question(question, (a) => res(a.trim())))
}

async function main() {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  try {
    const valid = presetNames
    const name = await ask(rl, "Brand name: ")
    if (!name) throw new Error("a brand name is required")

    console.log(`\nPresets: ${valid.join(", ")}`)
    let preset = await ask(rl, `Theme preset [${valid[0]}]: `)
    if (!preset) preset = valid[0]
    if (!valid.includes(preset)) throw new Error(`unknown preset "${preset}"`)

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    const defaultDir = resolve(REPO_ROOT, "..", slug)
    const dirAnswer = await ask(rl, `Target directory [${defaultDir}]: `)
    const targetDir = dirAnswer ? resolve(dirAnswer) : defaultDir

    const result = scaffoldSite({ name, preset, targetDir })
    console.log(`\n✓ Created ${result.targetDir}`)
    console.log("\nNext:")
    console.log(`  cd ${result.targetDir}`)
    console.log("  npm install")
    console.log("  npm run dev")
  } finally {
    rl.close()
  }
}

// Only run the interactive flow when invoked directly, not when imported by tests.
const invokedDirectly = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url
if (invokedDirectly) {
  main().catch((err) => {
    console.error(`✖ ${err.message}`)
    process.exit(1)
  })
}
