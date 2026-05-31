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

## Status

Under construction. See `docs/plans/` for the approved design and implementation
plan. A full spin-up guide lands with Phase 9.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Run the dev server against `site.config.js`. |
| `npm run build` | Validate the config, then build `dist/`. |
| `npm run preview` | Preview the production build. |
| `npm test` | Run the test suite (Vitest). |
| `npm run lint` | ESLint + Prettier check. |
| `npm run gallery` | Component preview gallery (every section x variant). |
| `npm run new-site` | Scaffold a new client site. |
| `npm run fingerprint` | Disguise fingerprint-collision check. |
