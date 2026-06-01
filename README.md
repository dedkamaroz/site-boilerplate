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
   If no brand- and theme-specific assets are provided, use the bundled
   **image-resolver** MCP server (see [Image sourcing](#image-sourcing---the-image-resolver-mcp))
   to find suitable royalty-free images on Pexels/Unsplash. For each slot, download
   3 different options so the site owner can easily swap between them later.

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

## Image sourcing - the image-resolver MCP

The repo ships a project-scoped MCP server (`.mcp.json`) that searches
royalty-free images on **Pexels** and **Unsplash** and is used to fill empty
media slots while building a site.

Setup:

1. Get a free API key from [Pexels](https://www.pexels.com/api/) (and/or an
   Unsplash Access Key).
2. Export it before launching your MCP client so `.mcp.json` can read it - the
   key is **never committed** (the config interpolates `${PEXELS_API_KEY}`):

   ```
   # PowerShell:  $env:PEXELS_API_KEY = "..."
   # bash:        export PEXELS_API_KEY="..."
   ```

3. The server exposes `search_images`, `get_best_image`, `search_images_batch`
   and `resolve_image_attribution`. Download 3 options per prominent slot (hero,
   feature rows) so the owner can swap later; record sources in
   `public/assets/IMAGE-CREDITS.txt`.

> **Windows note:** if `.js` files are associated with an editor/IDE, `npx`
> launches of the server can be hijacked by that association and silently fail to
> connect. Work around it by installing the package globally and pointing the
> server at Node explicitly:
> `npm i -g @ahmaddioxide/mcp-image-resolver` then register with
> `... -- node "<global>/@ahmaddioxide/mcp-image-resolver/build/index.js"`.

## Wiring the contact form

The `contact` section renders a real form. Set `formEndpoint` in the section
props to a form handler; if omitted it falls back to `mailto:` the brand email
(so the layout still previews with no backend).

When `formEndpoint` is set the form submits over `fetch` (AJAX) and shows an
inline success/error message without leaving the page. Provider-specific values
(API keys, subject lines) go in a generic `hiddenFields` map - rendered as hidden
inputs - so no client values live in the component. A honeypot field is included
for spam protection.

```js
// site.config.js - contact section props
props: {
  headline: "Get in touch",
  formEndpoint: "https://api.web3forms.com/submit",
  hiddenFields: {
    access_key: "your-web3forms-access-key",
    subject: "New enquiry from the website",
  },
}
```

Works with any endpoint that accepts a form POST and returns JSON (Web3Forms,
Formspree, your own handler). **Note:** many static hosts (e.g. Spaceship Shared
Hosting) do not support PHP `mail()`, so prefer a form API or SMTP-backed handler
over a `mail()` script.

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
