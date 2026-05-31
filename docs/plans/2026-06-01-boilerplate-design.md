# Multi-Industry Website Boilerplate - Design

Date: 01/06/2026
Status: Approved design, ready for implementation planning
Origin: Generalised from an existing video-agency site (Vite + React)

## 1. Purpose

Turn the existing agency site into a neutral, config-driven starter from which new
websites for unrelated industries (plumber, business consultancy, etc.) can be
spun up quickly. A new site is produced by editing one config file and dropping
in assets - the React components are never edited per client.

Two hard requirements distinguish this from a normal template:

1. **Config-driven**: brand, theme, content, pages, and section order all live
   in a single `site.config.js`. Components read from config and from theme
   tokens; they contain no client-specific values.
2. **Disguise (strong)**: sites built from the boilerplate must not read as
   siblings when viewed side-by-side. This is engineered via style presets and
   per-section layout variants, not just colour and content swaps.

## 2. Target platform

Standalone Vite + React site. Clone the repo, edit `site.config.js`, drop assets
into `/public/assets/`, run `npm run build`, deploy the `dist/` folder to any
static host. The original Framer constraint (isolated components, no relative
imports) is dropped, which is what enables centralised theming and shared code.

## 3. Architecture

Three layers:

- **`site.config.js`** - single source of truth: brand, theme, nav, and an
  ordered list of pages, each with an ordered list of sections.
- **Theme provider** - reads `config.theme`, injects CSS custom properties
  (`--color-bg`, `--color-accent`, `--font-heading`, `--radius`, etc.) at
  `:root`. Replaces the per-file `const C = {...}` palette currently duplicated
  across every component.
- **Section registry + router** - each page lists sections by `type` and
  `variant`. A `<PageRenderer>` resolves each against a registry and renders it
  with that page's `props`. React Router serves the configured pages.

Spin-up workflow:

1. Clone/scaffold a new site directory.
2. Edit `site.config.js`.
3. Drop client assets into `/public/assets/`.
4. `npm run build` and deploy `dist/`.

## 4. Config schema (`site.config.js`)

```js
export default {
  brand: {
    name: "Acme Plumbing",
    logo: "/assets/logo.svg",
    email: "book@acmeplumbing.com.au",
    phone: "+61 4XX XXX XXX",
    abn: "12 345 678 901", // footer; omit to hide
    licenceNumber: "NSW Lic. 123456C", // footer/contact; omit to hide
    serviceArea: "Greater North Sydney",
    hours: {
      regular: [
        { days: "Mon-Fri", time: "7:00am - 5:00pm" },
        { days: "Sat", time: "8:00am - 12:00pm" },
      ],
      emergency: "24/7 emergency call-outs", // string or null
    },
    social: { facebook: "", instagram: "" }, // optional; empty = hidden
  },

  theme: {
    preset: "tradesman", // personality bundle (see section 6)
    colors: { accent: "#0B6CB3" }, // overrides on top of the preset
    fonts: { heading: "Poppins", body: "Inter" },
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  pages: [
    {
      path: "/",
      title: "Acme Plumbing - 24/7 Emergency Plumbers",
      sections: [
        {
          type: "hero",
          variant: "split-left",
          props: {
            headline: "Burst pipe? We're there in 60 minutes.",
            media: { kind: "image", src: "/assets/van.jpg" },
            ctaLabel: "Book a callout",
            ctaHref: "/contact",
          },
        },
        {
          type: "services",
          variant: "card-grid",
          props: {
            /* ... */
          },
        },
        {
          type: "testimonials",
          variant: "drag-strip",
          props: {
            /* ... */
          },
        },
        {
          type: "ctaBanner",
          variant: "full-bleed",
          props: {
            /* ... */
          },
        },
      ],
    },
    {
      path: "/services",
      title: "...",
      sections: [
        /* ... */
      ],
    },
    {
      path: "/about",
      title: "...",
      sections: [
        /* ... */
      ],
    },
    {
      path: "/contact",
      title: "...",
      sections: [
        /* ... */
      ],
    },
  ],
}
```

### Principles baked into the schema

- **Every brand field is optional and self-hiding.** A field that is
  absent/empty renders no markup. One schema serves a plumber (ABN, licence,
  hours, service area; no social) and an agency (social; none of the trade
  fields) without either carrying dead markup.
- **`media.kind`** (`"image"` | `"video"`) lets one `hero`/`gallery` component
  take a video (agency) or a still (trade). One abstraction, not parallel
  components.
- **`theme.preset` + overrides**: pick a personality, override only what
  differs.

## 5. Section catalogue

### A. Adapted from existing agency components

- `navbar` - now reads brand fields.
- `hero` - headline/subline/CTA; `media.kind` image or video.
- `services` - numbered list with pricing and tags; already industry-neutral.
- `testimonials` - drag-scroll quote cards.
- `logoMarquee` - "trusted by" / suppliers / accreditations.
- `gallery` - generalised from `PortfolioGrid` (filterable image/video grid).
- `featured` - generalised from `FeaturedWork` (alternating showcase rows).
- `footer` - now carries ABN, licence, hours, service area.

### B. New industry-neutral sections

- `pricing` - pricing tiers/cards (consultancy packages, fixed-fee jobs).
- `serviceArea` - suburbs list or simple map embed + "areas we cover".
- `faq` - accordion (valuable for trades and local SEO).
- `ctaBanner` - full-width "Call now / Book a callout" strip.
- `contact` - form + phone + hours + service area + map.
- `steps` - "How it works" 1-2-3 process.

A small shared **Hours** presentational block (regular + emergency, emergency
styled as accent) is reused by `footer` and `contact`.

## 6. Theming and disguise system

### Tokens

A `<ThemeProvider>` injects CSS custom properties at `:root` from
`config.theme`. No component may define a raw colour again - every colour comes
from a variable. This single rule keeps the boilerplate reusable rather than
drifting back into a hardcoded agency site.

```
:root {
  --color-bg; --color-text; --color-accent; --color-muted; --color-surface;
  --font-heading; --font-body;
  --radius; --space-scale; --type-scale;
}
```

Fonts: `theme.fonts` generates a Google Fonts link at runtime from the two
family names - changing fonts is config-only.

### Presets (personalities)

A `preset` bundles more than colour: type scale, spacing density (compact vs
airy), border-vs-shadow language, case (uppercase vs sentence), motion style,
and radius. Each preset is a distinct personality. `theme.colors` overrides on
top. Initial presets:

- `editorial-dark` - the original agency look (sharp, uppercase, dark).
- `tradesman` - light, rounded, friendly, blue/green accents.
- `corporate` - light, restrained, navy, serif headings.
- `warm-service` - light, warm neutrals, approachable.

### Layout variants (strong disguise)

Each section `type` ships 2-3 genuinely different layouts, chosen per section
via `variant`. Examples:

- `hero`: `centred-over-media` | `split-left` | `minimal-card`.
- `services`: `numbered-list` | `card-grid` | `icon-row`.
- `footer`: `three-column` | `stacked` | `compact-bar`.

The combinatorial space (preset x per-section variant) makes two sites diverge
structurally while sharing one codebase. Signature motifs from the original
(numbered `01-04` list, scroll-indicator dot, marquee) become optional variants
rather than fixed features, since a distinctive component is the strongest
template fingerprint.

### Disguise safeguard

A dev-time **fingerprint check** records each generated site's
preset + variant choices and warns when a new config collides with a previously
generated site, so the disguise stays honest as more sites are spun up.

## 7. Project tooling (the build itself)

These are developer tools for the boilerplate project, not shipped in client
sites:

- **CLI generator** - `npm run new-site` scaffolds a fresh client
  folder/repo from a config template, prompts for brand name/preset, wires up
  the assets directory.
- **Component preview gallery** - a Storybook-style dev page rendering every
  section in every variant and preset, for visual selection when configuring a
  new site.
- **Config validation** - schema validator run on build; catches typos,
  invalid section `type`/`variant`, and missing required brand fields, with
  clear error messages.
- **CI / quality gates** - lint, format check, build verification, and the
  disguise fingerprint-collision check, run via GitHub Actions on each commit.
- **Online GitHub repo** - the boilerplate lives in its own GitHub repository
  (created with the dedka@Dragon SSH key during the build).

## 8. Acceptance test

Generate two demo configs (plumber + consultancy) from the same repo and
eyeball them side-by-side. The build is successful when a deliberate visitor
would not readily conclude they share a template.

## 9. Out of scope (YAGNI)

- A hosted/headless CMS for non-developer content editing (config file is the
  editing surface for now).
- E-commerce / payments.
- Multi-language / i18n.
- Per-client custom one-off sections (handled by adding a variant or a new
  config, not by forking components).
