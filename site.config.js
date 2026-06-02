// site.config.js - the single source of truth for this site.
//
// Edit this file (and drop assets into public/assets/) to produce a new site;
// the React components are never edited per client. This is a neutral demo
// (a creative studio) showing the config in use.
//
// See docs/plans/2026-06-01-boilerplate-design.md for the full schema.

export default {
  brand: {
    name: "Lumen Studio",
    logo: "/assets/logo/logo.webp",
    email: "hello@lumenstudio.example",
    phone: "",
    serviceArea: "",
    social: { instagram: "", facebook: "" },
  },

  theme: {
    preset: "editorial-dark",
    fonts: { heading: "Inter", body: "Inter" },
  },

  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // Optional global chrome. Omit to use each section type's default variant.
  layout: {
    navbar: {
      variant: "transparent-scroll",
      props: { cta: { label: "Let's Talk", href: "/contact" } },
    },
    footer: { variant: "three-column" },
  },

  pages: [
    {
      path: "/",
      title: "Lumen Studio - Design, Motion & 3D",
      sections: [
        {
          type: "hero",
          variant: "centred-over-media",
          props: {
            headline: "We make the impossible look real",
            subline: "Design · Motion · 3D Visualisation",
            ctaLabel: "See our work",
            ctaHref: "/work",
            // No demo media ships with the boilerplate - the hero falls back to
            // its gradient. Drop a file in public/assets/ and reference it here.
            media: { kind: "image", src: "", alt: "" },
          },
        },
        {
          type: "services",
          variant: "numbered-list",
          props: { headline: "What we do" },
        },
        {
          type: "testimonials",
          variant: "drag-strip",
          props: { headline: "What clients say" },
        },
      ],
    },
    {
      path: "/contact",
      title: "Lumen Studio - Contact",
      sections: [
        {
          type: "contact",
          variant: "form-left-details-right",
          props: { headline: "Start a project" },
        },
      ],
    },
  ],
}
