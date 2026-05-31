# site-boilerplate

A config-driven, multi-industry website boilerplate built on Vite + React. A new
site is produced by editing a single `site.config.js` and dropping assets into
`public/assets/` - the React components are never edited per client.

Two hard requirements distinguish this from a normal template:

1. **Config-driven** - brand, theme, navigation, pages and section order all live
   in `site.config.js`. Components read from config and theme tokens; they hold no
   client-specific values.
2. **Strong disguise** - sites built from the boilerplate must not read as siblings
   side-by-side. This is engineered through theme preset personalities and
   per-section layout variants, guarded by a fingerprint-collision check.

## Spin up a new site in five steps

1. **Scaffold** a fresh site folder:

   ```
   npm run new-site
   ```

   It asks for a brand name and a theme preset, then creates a standalone copy of
   the boilerplate with a starter `site.config.js`. (Or copy this repo and edit
   `site.config.js` directly.)

2. **Edit `site.config.js`** - the only file you touch. Set the brand, pick a
   `theme.preset`, and list each page's ordered sections by `type` and `variant`.
   See the schema in `docs/plans/2026-06-01-boilerplate-design.md` and the worked
   examples in `examples/plumber` and `examples/consultancy`. Every brand field is
   optional and self-hiding - omit ABN, licence, hours or social and no markup
   appears for them.

3. **Add assets** - drop logos, images and videos into `public/assets/` and
   reference them as `/assets/...` (e.g. `media: { kind: "image", src: "/assets/hero.jpg" }`).

4. **Build**:

   ```
   npm run build
   ```

   This validates the config first (clear errors on a bad `type`/`variant`,
   missing brand name, or wrong `media.kind`) and then emits a static site to
   `dist/`.

5. **Deploy** the `dist/` folder to any static host (Netlify, Vercel, S3, GitHub
   Pages, your own server).

## Picking variants - the gallery

```
npm run gallery
```

Opens a preview of every section in every variant, under a preset switcher.
Browse it to choose the `variant` for each section in your config.

## Keeping sites distinct - the fingerprint check

The boilerplate's value depends on generated sites not looking templated. After
authoring a site, record its disguise fingerprint:

```
npm run fingerprint -- --record
```

This stores the site's preset + section-variant signature in `fingerprints.json`.
Running `npm run fingerprint` on a new site then warns if it collides with - or
closely resembles - a previously recorded site, so you can vary the preset and
variants before launch. Vary both the **preset** and the **per-section variants**
for the strongest divergence.

## Theme presets

`editorial-dark` (sharp, uppercase, dark), `tradesman` (light, rounded, blue),
`corporate` (light, navy, serif headings), `warm-service` (warm neutrals). Each
bundles colour, type scale, spacing, radius, case, motion and elevation.
`theme.colors` and `theme.fonts` override on top.

## Wiring the contact form

The `contact` section renders a real form with no backend attached. Set
`formEndpoint` in the section props to a form handler (Formspree, Netlify Forms,
or your own URL); if omitted it falls back to `mailto:` the brand email.

## Scripts

| Script                            | Purpose                                              |
| --------------------------------- | ---------------------------------------------------- |
| `npm run dev`                     | Run the dev server against `site.config.js`.         |
| `npm run build`                   | Validate the config, then build `dist/`.             |
| `npm run preview`                 | Preview the production build.                        |
| `npm test`                        | Run the test suite (Vitest).                         |
| `npm run lint`                    | ESLint (incl. no-raw-colour rule) + Prettier check.  |
| `npm run gallery`                 | Component preview gallery (every section x variant). |
| `npm run new-site`                | Scaffold a new client site.                          |
| `npm run fingerprint`             | Disguise fingerprint-collision check.                |
| `npm run fingerprint -- --record` | Record this site's fingerprint.                      |

## How it fits together

- `site.config.js` - single source of truth (brand, theme, nav, pages, sections).
- `src/theme/` - presets and the `ThemeProvider` that injects CSS custom
  properties at `:root`. Components only ever read `var(--color-*)` /
  `var(--font-*)` (enforced by an ESLint rule).
- `src/sections/` - one folder per section type, each with 2-3 layout variants
  that self-register. `catalogue.js` declares the valid `type`/`variant` pairs.
- `src/PageRenderer.jsx` + `src/App.jsx` - resolve each configured section to its
  component and build routes from `config.pages`.

See `docs/plans/` for the full design and implementation history.
