// site.config.js - the single source of truth for this site.
//
// Edit this file (and drop assets into public/assets/) to produce a new site;
// the React components are never edited per client. This sample is the original
// DISTRO 3D agency, expressed as config.
//
// See docs/plans/2026-06-01-boilerplate-design.md for the full schema.

export default {
  brand: {
    name: "DISTRO 3D",
    logo: "/assets/logo/logo.webp",
    email: "hello@distro3d.com",
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
    navbar: { variant: "transparent-scroll", props: { cta: { label: "Let's Talk", href: "/contact" } } },
    footer: { variant: "three-column" },
  },

  pages: [
    {
      path: "/",
      title: "DISTRO 3D - CGI, Motion Graphics & 3D Visualisation",
      sections: [
        {
          type: "hero",
          variant: "centred-over-media",
          props: {
            headline: "We Make the Impossible Look Real",
            subline: "CGI · Motion Graphics · 3D Visualisation",
            ctaLabel: "See Our Work",
            ctaHref: "/work",
            media: { kind: "video", src: "/assets/portfolio/showreel.mp4", poster: "/assets/portfolio/showreel-poster.jpg" },
          },
        },
        {
          type: "services",
          variant: "numbered-list",
          props: { headline: "What We Do" },
        },
        {
          type: "testimonials",
          variant: "drag-strip",
          props: { headline: "What Clients Say" },
        },
      ],
    },
    {
      path: "/contact",
      title: "DISTRO 3D - Contact",
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
