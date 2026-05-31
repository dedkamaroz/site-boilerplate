// site.config.js - the single source of truth for this site.
//
// Edit this file and drop assets into public/assets/ to shape the site; the
// React components are never edited per client. Run `npm run gallery` to browse
// every section variant, `npm run build` to validate + build, and
// `npm run fingerprint -- --record` to register this site's disguise fingerprint.
//
// Full schema: see the boilerplate's docs/plans/2026-06-01-boilerplate-design.md

export default {
  brand: {
    name: "__SITE_NAME__",
    logo: "", // e.g. "/assets/logo.svg" - drop the file in public/assets/
    email: "hello@example.com",
    phone: "", // e.g. "+61 4XX XXX XXX" - omit to hide
    // Trade fields below are optional and self-hiding; delete what you do not need.
    abn: "",
    licenceNumber: "",
    serviceArea: "",
    hours: null, // e.g. { regular: [{ days: "Mon-Fri", time: "9-5" }], emergency: null }
    social: {}, // e.g. { instagram: "https://...", facebook: "https://..." }
  },

  theme: {
    preset: "__SITE_PRESET__",
    // colors: { accent: "#0B6CB3" },  // optional overrides on top of the preset
    // fonts:  { heading: "Poppins", body: "Inter" },
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // Optional global chrome. Omit to use each type's default variant.
  layout: {
    navbar: { variant: "solid-bar" },
    footer: { variant: "stacked" },
  },

  pages: [
    {
      path: "/",
      title: "__SITE_NAME__",
      sections: [
        {
          type: "hero",
          variant: "split-left",
          props: {
            headline: "A clear, benefit-led headline",
            subline: "One line on what you do and who for.",
            ctaLabel: "Get in touch",
            ctaHref: "/contact",
            // media: { kind: "image", src: "/assets/hero.jpg" },
          },
        },
        { type: "services", variant: "card-grid", props: { headline: "What we do" } },
        { type: "steps", variant: "numbered-row", props: { headline: "How it works" } },
        {
          type: "ctaBanner",
          variant: "full-bleed",
          props: { headline: "Ready to start?", ctaLabel: "Contact us", ctaHref: "/contact" },
        },
      ],
    },
    {
      path: "/services",
      title: "Services - __SITE_NAME__",
      sections: [
        { type: "services", variant: "numbered-list", props: { headline: "Our services" } },
        { type: "faq", variant: "accordion", props: { headline: "Common questions" } },
      ],
    },
    {
      path: "/about",
      title: "About - __SITE_NAME__",
      sections: [
        { type: "featured", variant: "alternating-rows", props: { headline: "Our work" } },
      ],
    },
    {
      path: "/contact",
      title: "Contact - __SITE_NAME__",
      sections: [
        {
          type: "contact",
          variant: "form-left-details-right",
          props: { headline: "Get in touch" },
        },
      ],
    },
  ],
}
