# Multi-Industry Website Boilerplate - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the DISTRO 3D Vite + React site into a config-driven, multi-industry website boilerplate where a new site is produced by editing one `site.config.js`, with strong visual divergence between generated sites and full project tooling (CLI generator, preview gallery, config validation, CI, GitHub repo).

**Architecture:** A single `site.config.js` drives a `ThemeProvider` (CSS custom properties from theme presets), a `<PageRenderer>` (resolves `{type, variant}` against a section registry), and a React Router (one route per configured page). Components read only from config and theme tokens - never client-specific literals. Strong disguise comes from preset personalities x per-section layout variants, guarded by a fingerprint-collision check.

**Tech Stack:** Vite, React 18, React Router, plain CSS custom properties (no CSS framework), Vitest + React Testing Library, ESLint + Prettier, a Storybook-style in-repo preview page (custom, no Storybook dependency), Node scripts for CLI/validation/fingerprint, GitHub Actions for CI.

---

## Companion design doc

Read first: `docs/plans/2026-06-01-boilerplate-design.md`. It holds the full schema, section catalogue, preset list, and acceptance test. This plan implements that design.

## Conventions for the executor

- Repo root paths are relative to the boilerplate repo (the user will move this
  out of the current `distro3d` folder into its own repo before/early in the
  build). Treat `./` as that repo root.
- Australian English in all user-facing strings and docs (colour, organise,
  licence). Never use the "-" em dash character; use a plain hyphen.
- Commit after every task (frequent commits). Branch off `main`; do not commit
  to `main` directly once the repo is online.
- TDD where a task lists a test. Run the test, watch it fail, implement, watch
  it pass, then commit.

---

## Phase 0: Repo setup

### Task 0.1: Initialise the boilerplate repo

**Files:**

- Create: `./package.json` (start from the existing distro3d one)
- Create: `./.gitignore`
- Create: `./README.md` (stub)

**Step 1:** Copy the existing Vite + React project (src/, public/, index.html,
vite.config.js, package.json) into the new repo root.

**Step 2:** Rename the project in `package.json` to `site-boilerplate`, bump
version to `0.1.0`, and remove distro3d-specific metadata.

**Step 3:** Add dev dependencies: `vitest`, `@testing-library/react`,
`@testing-library/jest-dom`, `jsdom`, `eslint`, `prettier`, `react-router-dom`.

Run: `npm install`
Expected: clean install, no peer-dependency errors.

**Step 4:** Add scripts to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "node scripts/validate-config.mjs && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "lint": "eslint . && prettier --check .",
  "gallery": "vite --config vite.gallery.config.js",
  "new-site": "node scripts/new-site.mjs",
  "fingerprint": "node scripts/fingerprint.mjs"
}
```

**Step 5:** Configure Vitest (`vitest.config.js` with jsdom environment, setup
file importing `@testing-library/jest-dom`).

**Step 6:** `git init`, first commit.

```bash
git add -A
git commit -m "chore: initialise site-boilerplate from distro3d"
```

### Task 0.2: Create the online GitHub repo

**Step 1:** Confirm the dedka@Dragon SSH key is the active GitHub key
(`ssh -T git@github.com` using that key).

**Step 2:** Create a private repo `site-boilerplate` via `gh repo create`
(or the web UI), add the remote, push `main`.

**Step 3:** Protect `main` (require PR + passing CI) once CI exists (Phase 7).

Commit: n/a (repo operation).

---

## Phase 1: Theme token foundation

This phase proves the disguise mechanism before scaling. No section work yet.

### Task 1.1: Theme preset definitions

**Files:**

- Create: `src/theme/presets.js`
- Test: `src/theme/presets.test.js`

**Step 1: Write the failing test**

```js
import { describe, it, expect } from "vitest"
import { presets } from "./presets"

describe("presets", () => {
  it("every preset defines the full token set", () => {
    const required = [
      "colorBg",
      "colorText",
      "colorAccent",
      "colorMuted",
      "colorSurface",
      "fontHeading",
      "fontBody",
      "radius",
      "spaceScale",
      "typeScale",
      "case",
      "motion",
      "elevation",
    ]
    for (const name of Object.keys(presets)) {
      for (const key of required) {
        expect(presets[name], `${name}.${key}`).toHaveProperty(key)
      }
    }
  })

  it("ships the four named personalities", () => {
    expect(Object.keys(presets).sort()).toEqual([
      "corporate",
      "editorial-dark",
      "tradesman",
      "warm-service",
    ])
  })
})
```

**Step 2:** Run `npx vitest run src/theme/presets.test.js` - expect FAIL
(module not found).

**Step 3:** Implement `presets.js` with the four presets from the design doc,
each defining all required tokens. `case` is `"upper"|"sentence"`, `motion` is
`"sharp"|"smooth"|"none"`, `elevation` is `"border"|"shadow"`.

**Step 4:** Run the test - expect PASS.

**Step 5:** Commit `feat: add theme presets`.

### Task 1.2: Token-to-CSS-variable mapping

**Files:**

- Create: `src/theme/tokensToCss.js`
- Test: `src/theme/tokensToCss.test.js`

**Step 1: Failing test**

```js
import { tokensToCss } from "./tokensToCss"

it("merges preset with overrides and emits CSS vars", () => {
  const css = tokensToCss("tradesman", { colorAccent: "#0B6CB3" })
  expect(css["--color-accent"]).toBe("#0B6CB3") // override wins
  expect(css["--color-bg"]).toBeDefined() // preset fills rest
  expect(css["--font-heading"]).toBeDefined()
})

it("throws on unknown preset", () => {
  expect(() => tokensToCss("nope", {})).toThrow(/unknown preset/i)
})
```

**Step 2:** Run - expect FAIL.

**Step 3:** Implement: look up preset, shallow-merge overrides, map camelCase
token names to `--kebab-case` CSS variables.

**Step 4:** Run - expect PASS.

**Step 5:** Commit `feat: map theme tokens to CSS variables`.

### Task 1.3: ThemeProvider

**Files:**

- Create: `src/theme/ThemeProvider.jsx`
- Test: `src/theme/ThemeProvider.test.jsx`

**Step 1: Failing test** - render `<ThemeProvider theme={{preset:"tradesman"}}>`
and assert `document.documentElement.style.getPropertyValue("--color-bg")` is
set, and that a Google Fonts `<link>` for the configured fonts is injected.

**Step 2:** Run - FAIL.

**Step 3:** Implement: on mount, write `tokensToCss(...)` entries to
`document.documentElement.style`; inject a `<link>` built from
`theme.fonts.heading` and `theme.fonts.body`.

**Step 4:** Run - PASS.

**Step 5:** Commit `feat: add ThemeProvider`.

### Task 1.4: Migrate existing components off `const C`

**Files (modify):**

- `src/components/Hero.jsx`, `ServicesSection.jsx`, `NavBar.jsx`,
  `Footer.jsx`, `FeaturedWork.jsx`, `TestimonialsStrip.jsx`,
  `PortfolioGrid.jsx`, `ClientLogoMarquee.jsx`

**Step 1:** For each file, replace the local `const C = {...}` palette and any
raw hex with `var(--color-*)`, `var(--font-*)`, `var(--radius)` etc. Replace
hardcoded uppercase/letter-spacing with values that respond to the `--case`
and `--type-scale` tokens where the design calls for it.

**Step 2:** Add an ESLint rule (custom or `no-restricted-syntax`) that flags
hex colour literals in `src/components/**` so the "no raw colours" rule is
enforced. (Implemented fully in Task 7.2; add a TODO marker here.)

**Step 3:** Run `npm run dev`, load the existing home assembly, confirm it
still renders (now reading tokens). Capture a screenshot for the record.

**Step 4:** Commit `refactor: components read theme tokens instead of const C`.

---

## Phase 2: Config, registry, router core

### Task 2.1: Section registry

**Files:**

- Create: `src/sections/registry.js`
- Test: `src/sections/registry.test.js`

**Step 1: Failing test**

```js
import { resolveSection } from "./registry"

it("resolves a known type+variant to a component", () => {
  const Comp = resolveSection("hero", "split-left")
  expect(typeof Comp).toBe("function")
})

it("falls back to the type's default variant when variant omitted", () => {
  expect(resolveSection("hero")).toBe(resolveSection("hero", undefined))
})

it("throws a clear error on unknown type", () => {
  expect(() => resolveSection("nope")).toThrow(/unknown section type "nope"/i)
})

it("throws a clear error on unknown variant", () => {
  expect(() => resolveSection("hero", "nope")).toThrow(/unknown variant/i)
})
```

**Step 2:** Run - FAIL.

**Step 3:** Implement a registry object:
`{ hero: { default: "centred-over-media", variants: { "centred-over-media": Comp, ... } }, ... }`
and a `resolveSection(type, variant)` that throws clear errors. Start with a
stub component per type; real variants land in Phases 3-4.

**Step 4:** Run - PASS.

**Step 5:** Commit `feat: add section registry with variant resolution`.

### Task 2.2: PageRenderer

**Files:**

- Create: `src/PageRenderer.jsx`
- Test: `src/PageRenderer.test.jsx`

**Step 1: Failing test** - given a page object with two sections, render and
assert both stub components appear in document order, each receiving its
`props`.

**Step 2:** Run - FAIL.

**Step 3:** Implement: map `page.sections` through `resolveSection` and render
each with `{...section.props}` plus a `brand` prop passed down from config.

**Step 4:** Run - PASS.

**Step 5:** Commit `feat: add PageRenderer`.

### Task 2.3: Router + App from config

**Files:**

- Modify: `src/App.jsx`
- Create: `site.config.js` (a working sample: the agency config)
- Test: `src/App.test.jsx`

**Step 1: Failing test** - render `<App config={sampleConfig}/>` in a
MemoryRouter at `/contact`, assert the contact page title/section renders, and
that nav links from `config.nav` are present.

**Step 2:** Run - FAIL.

**Step 3:** Implement `App` to wrap children in `ThemeProvider`, build a
`<Routes>` from `config.pages` (each `path` -> `<PageRenderer page=...>`),
render `navbar`/`footer` around the routed content, and set
`document.title` per page.

**Step 4:** Run - PASS.

**Step 5:** Commit `feat: build app routes from site.config`.

### Task 2.4: Self-hiding brand fields

**Files:**

- Modify: `src/components/Footer.jsx`
- Create: `src/components/HoursBlock.jsx`
- Test: `src/components/Footer.test.jsx`, `src/components/HoursBlock.test.jsx`

**Step 1: Failing tests**

- Footer renders ABN/licence/service-area when present; renders none of them
  when absent (no empty labels, no stray separators).
- `HoursBlock` renders regular rows and, when `emergency` is set, an
  accent-styled emergency line; renders nothing when `hours` is undefined.

**Step 2:** Run - FAIL.

**Step 3:** Implement conditional rendering keyed on presence/non-empty.
Footer and contact reuse `HoursBlock`.

**Step 4:** Run - PASS.

**Step 5:** Commit `feat: self-hiding brand fields and shared HoursBlock`.

---

## Phase 3: Adapt existing sections to tokens + media + variants

For each adapted section: add `media.kind` handling where relevant, register
its variants, verify in the gallery (Phase 5 builds the gallery; until then,
verify on a scratch route). Worked example below is the pattern for the rest.

### Task 3.1 (worked example): Hero variants

**Files:**

- Modify: `src/components/Hero.jsx` (becomes variant-aware or split into files)
- Create: `src/sections/hero/CentredOverMedia.jsx`,
  `src/sections/hero/SplitLeft.jsx`, `src/sections/hero/MinimalCard.jsx`
- Modify: `src/sections/registry.js` (register the three)
- Test: `src/sections/hero/hero.test.jsx`

**Step 1: Failing test**

```js
it("hero renders an image when media.kind is image", () => {
  render(<SplitLeft headline="Hi" media={{ kind: "image", src: "/a.jpg" }} />)
  expect(screen.getByRole("img")).toHaveAttribute("src", "/a.jpg")
})
it("hero renders a video when media.kind is video", () => {
  const { container } = render(
    <CentredOverMedia headline="Hi" media={{ kind: "video", src: "/a.mp4" }} />
  )
  expect(container.querySelector("video")).toBeTruthy()
})
```

**Step 2:** Run - FAIL.

**Step 3:** Implement the three layouts. Extract a shared `<Media>` component
(`src/sections/shared/Media.jsx`) that switches on `media.kind` - reuse it
across hero/gallery/featured (DRY). All colours via tokens.

**Step 4:** Run - PASS. Then `npm run dev` on a scratch route, eyeball each
variant under two presets; screenshot.

**Step 5:** Commit `feat: hero variants with media abstraction`.

### Tasks 3.2 - 3.7: Remaining adapted sections

Repeat the 3.1 pattern for each. Each task = build variants, register, test
media/conditional logic, eyeball, commit.

- **3.2 services**: variants `numbered-list` (existing), `card-grid`, `icon-row`.
- **3.3 testimonials**: variants `drag-strip` (existing), `stacked-quotes`.
- **3.4 logoMarquee**: variants `two-row-scroll` (existing), `static-grid`.
- **3.5 gallery** (from PortfolioGrid): variants `filterable-grid` (existing),
  `masonry`; uses shared `<Media>`.
- **3.6 featured** (from FeaturedWork): variants `alternating-rows` (existing),
  `cards`.
- **3.7 navbar/footer**: variants navbar `transparent-scroll` (existing),
  `solid-bar`; footer `three-column` (existing), `stacked`, `compact-bar`.

Commit after each.

---

## Phase 4: New industry-neutral sections

Same build-test-eyeball-commit rhythm. Each ships 2-3 variants.

- **4.1 pricing**: `tiers-cards`, `comparison-table`, `simple-list`.
- **4.2 serviceArea**: `suburb-list`, `map-embed`.
- **4.3 faq**: `accordion`, `two-column`.
- **4.4 ctaBanner**: `full-bleed`, `boxed`, `split`.
- **4.5 contact**: `form-left-details-right`, `stacked`, `details-only`.
  Form posts to a configurable endpoint (`config.brand` or a `contact` prop);
  no backend built here - document the integration point.
- **4.6 steps**: `numbered-row`, `vertical-timeline`.

Register every variant. Commit after each.

---

## Phase 5: Component preview gallery

### Task 5.1: Gallery harness

**Files:**

- Create: `gallery/index.html`, `gallery/main.jsx`, `vite.gallery.config.js`
- Create: `gallery/Gallery.jsx`

**Step 1:** Build a Vite entry (`npm run gallery`) that renders every registry
entry: for each `type`, each `variant`, under a preset switcher (the four
presets) and a light/dark background. Pull sample props from a
`gallery/fixtures.js` file.

**Step 2:** Add a preset dropdown and a "type" filter so a configurator can
browse quickly.

**Step 3:** Run `npm run gallery`, confirm every section x variant renders
without errors. Screenshot the index.

**Step 4:** Commit `feat: component preview gallery`.

---

## Phase 6: Config validation

### Task 6.1: Schema validator

**Files:**

- Create: `scripts/validate-config.mjs`
- Create: `src/config/schema.js` (the allowed types, variants, required fields)
- Test: `src/config/schema.test.js`

**Step 1: Failing tests**

- Valid sample config passes.
- Unknown section `type` fails with message naming the type and the page.
- Unknown `variant` for a known type fails with the valid-variant list.
- Missing required brand field (`name`) fails.
- `media.kind` other than `image|video` fails.

**Step 2:** Run - FAIL.

**Step 3:** Implement a pure `validateConfig(config)` returning
`{ ok, errors[] }`, derived from the registry (single source of truth for
valid type/variant pairs - DRY with Task 2.1). `scripts/validate-config.mjs`
imports it, runs against `site.config.js`, prints errors, exits non-zero on
failure. This is already wired into `npm run build` (Task 0.1 Step 4).

**Step 4:** Run tests - PASS. Run `npm run build` against a deliberately broken
config and confirm it aborts with a clear message.

**Step 5:** Commit `feat: config schema validation on build`.

---

## Phase 7: Disguise fingerprint check + CI

### Task 7.1: Fingerprint check

**Files:**

- Create: `scripts/fingerprint.mjs`
- Create: `fingerprints.json` (committed registry of generated sites)
- Test: `src/config/fingerprint.test.js`

**Step 1: Failing tests**

- `fingerprintOf(config)` returns a stable signature from preset + the ordered
  list of `{type, variant}` across all pages.
- `checkCollision(fp, existing[])` flags an exact match and flags a
  near-match above a similarity threshold (e.g. > 0.8 shared variants).

**Step 2:** Run - FAIL.

**Step 3:** Implement `fingerprintOf` and `checkCollision` (pure functions).
`scripts/fingerprint.mjs` computes the current site fingerprint, compares
against `fingerprints.json`, warns on collision, and (with `--record`) appends
the new fingerprint.

**Step 4:** Run - PASS. Manually test by duplicating the sample config's
variant choices and confirming a warning.

**Step 5:** Commit `feat: disguise fingerprint collision check`.

### Task 7.2: ESLint no-raw-colour rule + Prettier

**Files:**

- Create: `.eslintrc.cjs`, `.prettierrc`

**Step 1:** Configure ESLint with React rules plus `no-restricted-syntax`
forbidding hex-colour string literals in `src/sections/**` and
`src/components/**` (enforces the design's "no raw colours" rule).

**Step 2:** Run `npm run lint`, fix any violations surfaced (likely leftover
hex from Phase 1).

**Step 3:** Commit `chore: lint and format config with no-raw-colour rule`.

### Task 7.3: GitHub Actions CI

**Files:**

- Create: `.github/workflows/ci.yml`

**Step 1:** Workflow on push/PR: install, `npm run lint`, `npm run test`,
`npm run build` (which runs config validation), and `npm run fingerprint`
(warn-only, non-blocking on the boilerplate's own sample config).

**Step 2:** Push, confirm the workflow passes green.

**Step 3:** Enable branch protection on `main` requiring this workflow.

**Step 4:** Commit `ci: lint, test, build, validate on push`.

---

## Phase 8: CLI generator

### Task 8.1: new-site scaffolder

**Files:**

- Create: `scripts/new-site.mjs`
- Create: `templates/site.config.template.js`
- Test: `scripts/new-site.test.mjs`

**Step 1: Failing test** - calling the scaffold function with
`{ name, preset, targetDir }` (into a temp dir) produces: a `site.config.js`
from the template with name/preset filled, an empty `public/assets/` directory,
and a copy of the boilerplate source (or a dependency reference - decide in
Step 3).

**Step 2:** Run - FAIL.

**Step 3:** Implement. Decision to record in code comments: scaffold creates a
new folder containing `site.config.js` + `public/assets/` + a README, and
either (a) copies the full source, or (b) consumes the boilerplate as an npm
dependency. Default to (a) full copy for simplicity now (YAGNI on packaging).
Interactive prompts via `node:readline` for name and preset (preset list pulled
from `presets.js` - DRY).

**Step 4:** Run - PASS. Then run `npm run new-site` for real, generate a
throwaway site, `npm run build` it, confirm it deploys-builds clean.

**Step 5:** Commit `feat: new-site CLI generator`.

---

## Phase 9: Acceptance test (the real goal)

### Task 9.1: Two divergent demo sites

**Files:**

- Create: `examples/plumber/site.config.js`
- Create: `examples/consultancy/site.config.js`

**Step 1:** Author a plumber config (`tradesman` preset, image media, ABN +
licence + hours + service area, variants chosen for a trade feel) and a
consultancy config (`corporate` preset, serif headings, pricing tiers, steps,
no trade fields, different variants throughout).

**Step 2:** Build and run each. Capture full-page screenshots of both.

**Step 3:** Run `npm run fingerprint` on both - confirm no collision warning.

**Step 4:** Side-by-side review (use the requesting-code-review or a
visual check): confirm a deliberate visitor would not readily conclude they
share a template. Record the judgement in
`docs/plans/2026-06-01-acceptance-notes.md`. If they read as siblings, log
which sections gave it away and loop back to add/adjust variants.

**Step 5:** Commit `test: plumber and consultancy acceptance demos`.

### Task 9.2: README spin-up guide

**Files:**

- Modify: `./README.md`

**Step 1:** Write the "Spin up a new site in 5 steps" guide: `npm run new-site`,
edit `site.config.js` (link the schema + preset/variant list), add assets,
`npm run build`, deploy `dist/`. Document the gallery (`npm run gallery`) as
the way to pick variants, and the fingerprint check as the disguise safeguard.

**Step 2:** Commit `docs: spin-up guide and tooling overview`.

---

## Done criteria

- One `site.config.js` fully drives brand, theme, pages, and section order.
- No component contains a client literal or a raw colour (ESLint-enforced).
- Every section type has 2-3 working variants visible in the gallery.
- Config validation blocks bad builds with clear errors.
- Fingerprint check warns on preset/variant collisions.
- CLI generates a working new site; CI is green; repo is online with protected
  main.
- Plumber and consultancy demos build and do not read as siblings.
