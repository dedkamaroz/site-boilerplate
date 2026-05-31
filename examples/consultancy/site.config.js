// Acceptance demo: a business consultancy site.
// Preset: corporate (light, navy, serif headings). No trade fields. Variants
// chosen for a restrained, premium feel - deliberately divergent from the
// plumber demo (different preset AND different variant for every section).

export default {
  brand: {
    name: "Meridian Advisory",
    logo: "",
    email: "hello@meridianadvisory.com.au",
    phone: "",
    serviceArea: "",
    social: {
      linkedin: "https://linkedin.com/company/meridian",
      twitter: "https://twitter.com/meridian",
    },
  },

  theme: {
    preset: "corporate",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Approach", href: "/approach" },
    { label: "Contact", href: "/contact" },
  ],

  layout: {
    navbar: { variant: "transparent-scroll" },
    footer: { variant: "stacked" },
  },

  pages: [
    {
      path: "/",
      title: "Meridian Advisory - Strategy & Operations Consulting",
      sections: [
        {
          type: "hero",
          variant: "minimal-card",
          props: {
            headline: "Clarity for complex decisions.",
            subline: "Strategy, operations and transformation advisory for mid-market leaders.",
            ctaLabel: "Start a conversation",
            ctaHref: "/contact",
          },
        },
        {
          type: "logoMarquee",
          variant: "static-grid",
          props: {
            headline: "Trusted by teams at",
            logos: [
              { src: "", alt: "Harbour Group" },
              { src: "", alt: "Atlas Freight" },
              { src: "", alt: "Vela Health" },
              { src: "", alt: "Orchard Capital" },
              { src: "", alt: "Brightline" },
              { src: "", alt: "Northwind" },
            ],
          },
        },
        {
          type: "featured",
          variant: "cards",
          props: {
            headline: "Selected engagements",
            items: [
              {
                media: {
                  kind: "image",
                  src: "/assets/portfolio/abstract.webp",
                  alt: "Operating model",
                },
                title: "Operating model redesign",
                description: "Reshaped a 400-person services org around client value.",
                tag: "Operations",
              },
              {
                media: { kind: "image", src: "/assets/portfolio/car.webp", alt: "Growth strategy" },
                title: "Three-year growth strategy",
                description: "Identified two adjacencies worth 30% of revenue.",
                tag: "Strategy",
              },
              {
                media: {
                  kind: "image",
                  src: "/assets/portfolio/headphones.webp",
                  alt: "Transformation",
                },
                title: "Cost-to-serve transformation",
                description: "Released 18% margin without headcount cuts.",
                tag: "Transformation",
              },
            ],
          },
        },
        {
          type: "steps",
          variant: "vertical-timeline",
          props: {
            headline: "How we work",
            steps: [
              {
                title: "Diagnose",
                description: "Two weeks to frame the real problem with your team.",
              },
              {
                title: "Design",
                description: "Options, trade-offs and a decision your board can back.",
              },
              {
                title: "Deliver",
                description: "We stay through implementation, not just the deck.",
              },
            ],
          },
        },
        {
          type: "testimonials",
          variant: "stacked-quotes",
          props: {
            headline: "In their words",
            items: [
              {
                quote: "Meridian asked the questions our own team had been avoiding for years.",
                author: "CEO",
                role: "Mid-market logistics",
              },
              {
                quote: "The first consultants we've used who were still there at go-live.",
                author: "COO",
                role: "Healthcare services",
              },
            ],
          },
        },
        {
          type: "ctaBanner",
          variant: "boxed",
          props: {
            headline: "Facing a decision that won't wait?",
            subline: "A 30-minute call costs nothing and usually clarifies a lot.",
            ctaLabel: "Book a call",
            ctaHref: "/contact",
          },
        },
      ],
    },
    {
      path: "/services",
      title: "Services - Meridian Advisory",
      sections: [
        {
          type: "pricing",
          variant: "tiers-cards",
          props: {
            headline: "Engagement models",
            tiers: [
              {
                name: "Advisory sprint",
                price: "$12k",
                period: "/ 2 weeks",
                description: "A focused diagnostic on one decision.",
                features: [
                  "Stakeholder interviews",
                  "Options + recommendation",
                  "Board-ready summary",
                ],
              },
              {
                name: "Strategy engagement",
                price: "$45k",
                period: "/ 6 weeks",
                featured: true,
                description: "End-to-end strategy with your team.",
                features: [
                  "Full diagnostic",
                  "Strategy + roadmap",
                  "Implementation plan",
                  "Exec workshops",
                ],
              },
              {
                name: "Embedded partner",
                price: "Custom",
                description: "Ongoing support through delivery.",
                features: ["Fractional advisory", "Delivery oversight", "Quarterly reviews"],
              },
            ],
          },
        },
      ],
    },
    {
      path: "/approach",
      title: "Approach - Meridian Advisory",
      sections: [
        {
          type: "faq",
          variant: "two-column",
          props: {
            headline: "How we engage",
            items: [
              {
                question: "How do you price work?",
                answer: "Fixed-scope, fixed-fee. You know the cost before we begin.",
              },
              {
                question: "Who actually does the work?",
                answer: "The partner you meet leads the work - we don't hand off to juniors.",
              },
              {
                question: "Do you stay through delivery?",
                answer:
                  "Yes. Most of our value lands during implementation, not the recommendation.",
              },
              {
                question: "What size clients do you take?",
                answer: "Mid-market organisations, typically $20m-$300m revenue.",
              },
            ],
          },
        },
      ],
    },
    {
      path: "/contact",
      title: "Contact - Meridian Advisory",
      sections: [
        {
          type: "contact",
          variant: "stacked",
          props: {
            headline: "Start a conversation",
            intro: "Tell us a little about the decision you're facing.",
          },
        },
      ],
    },
  ],
}
