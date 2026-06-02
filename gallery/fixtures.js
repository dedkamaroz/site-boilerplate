// Sample data for the preview gallery. Most section variants ship sensible
// default props (so they render standalone), but a few look better with richer
// fixtures - especially anything that takes media, brand fields or nav.

// The boilerplate ships no sample media; set these to your own /assets/... paths
// to see image/video variants populated in the gallery preview.
export const sampleImage = ""
export const sampleVideo = ""
export const sampleVideoPoster = ""

export const sampleNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

// A brand with every optional field populated, so footers/contact show their
// full self-hiding surface in the gallery.
export const sampleBrand = {
  name: "Sample Co",
  logo: "",
  email: "hello@sample.test",
  phone: "+61 400 123 456",
  abn: "12 345 678 901",
  licenceNumber: "NSW Lic. 123456C",
  serviceArea: "Greater Sydney",
  hours: {
    regular: [
      { days: "Mon-Fri", time: "7:00am - 5:00pm" },
      { days: "Sat", time: "8:00am - 12:00pm" },
    ],
    emergency: "24/7 emergency call-outs",
  },
  social: { facebook: "https://facebook.test", instagram: "https://instagram.test" },
}

// Per-type prop overrides merged over each variant's own defaults. Anything not
// listed renders purely on its defaults.
export function fixtureProps(type) {
  const common = { brand: sampleBrand, nav: sampleNav }
  switch (type) {
    case "navbar":
      return { ...common, cta: { label: "Get a quote", href: "/contact" } }
    case "hero":
      return {
        ...common,
        headline: "We make it look effortless",
        subline: "Design, build and launch with confidence",
        ctaLabel: "See our work",
        ctaHref: "/work",
        media: { kind: "image", src: sampleImage, alt: "Sample" },
      }
    case "gallery":
      return {
        ...common,
        items: [
          {
            media: { kind: "image", src: sampleImage, alt: "Project one" },
            title: "Project one",
            category: "Web",
          },
          {
            media: { kind: "video", src: sampleVideo, poster: sampleVideoPoster },
            title: "Project two",
            category: "Motion",
          },
          {
            media: { kind: "image", src: "", alt: "Project three" },
            title: "Project three",
            category: "Brand",
          },
          {
            media: { kind: "image", src: "", alt: "Project four" },
            title: "Project four",
            category: "Web",
          },
        ],
      }
    case "featured":
      return {
        ...common,
        items: [
          {
            media: { kind: "image", src: sampleImage, alt: "Feature one" },
            title: "A standout project",
            description: "A short line about the outcome and impact.",
            tag: "Case study",
            href: "#",
          },
          {
            media: { kind: "image", src: "", alt: "Feature two" },
            title: "Another highlight",
            description: "What we delivered and why it mattered.",
            tag: "Featured",
            href: "#",
          },
        ],
      }
    default:
      return common
  }
}
