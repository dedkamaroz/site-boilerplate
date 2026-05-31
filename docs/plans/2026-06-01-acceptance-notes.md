# Acceptance notes - boilerplate disguise test

Date: 01/06/2026
Verdict: PASS - the two demo sites do not read as siblings.

## What was compared

Two sites generated from the same repo, same components, differing only in
`site.config.js`:

- `examples/plumber/site.config.js` - NorthFlow Plumbing (preset `tradesman`)
- `examples/consultancy/site.config.js` - Meridian Advisory (preset `corporate`)

Full-page screenshots of each home page captured during the review:

- `docs/plans/demo-plumber.jpeg`
- `docs/plans/demo-consultancy.jpeg`

Both configs pass `validate-config`, and `npm run fingerprint` reports distinct
fingerprints for both (no collision) against the recorded registry.

## Why they do not read as siblings

| Dimension     | Plumber (tradesman)                                                           | Consultancy (corporate)                                                               |
| ------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Type          | Sans (Poppins/Inter), sentence case                                           | Serif headings (Playfair Display)                                                     |
| Palette       | White + bright blue accent                                                    | White + restrained navy                                                               |
| Corners/feel  | Rounded, shadowed, friendly                                                   | Square-ish, bordered, premium                                                         |
| Navbar        | `solid-bar` (always solid)                                                    | `transparent-scroll`                                                                  |
| Hero          | `split-left` with a photo                                                     | `minimal-card`, no media, centred                                                     |
| Body sections | numbered service list, numbered-row steps, drag-strip testimonials            | logo grid, feature cards, vertical-timeline steps, stacked pull-quotes, pricing tiers |
| CTA           | `full-bleed` accent strip ("Call now")                                        | `boxed` card ("Book a call")                                                          |
| Footer        | `three-column` with ABN, licence, hours (accent emergency line), service area | `stacked`, social links only, no trade fields                                         |

The divergence is structural (different section composition and per-section
layout variants), not just colour and copy - which is the design's core
requirement. The preset carries type, case, radius and elevation differences;
the variant choices change the actual DOM structure of each section.

## Notes for future spin-ups

- The self-hiding brand fields work as intended: the plumber footer carries ABN,
  licence and 24/7 emergency hours; the consultancy footer shows none of those
  and instead renders social links - no empty labels on either.
- No console errors on either home page during review.
- Keep using `npm run fingerprint -- --record` after authoring a new site so the
  collision check stays meaningful as more sites are produced.
