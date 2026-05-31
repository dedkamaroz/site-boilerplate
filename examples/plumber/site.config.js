// Acceptance demo: a plumbing trade site.
// Preset: tradesman (light, rounded, blue). Trade fields populated. Variants
// chosen for a friendly, practical trade feel - deliberately divergent from the
// consultancy demo so the two do not read as siblings.

export default {
  brand: {
    name: "NorthFlow Plumbing",
    logo: "",
    email: "book@northflow.com.au",
    phone: "+61 412 345 678",
    abn: "49 838 083 890",
    licenceNumber: "NSW Lic. 284417C",
    serviceArea: "Greater North Sydney",
    hours: {
      regular: [
        { days: "Mon-Fri", time: "7:00am - 5:00pm" },
        { days: "Sat", time: "8:00am - 12:00pm" },
      ],
      emergency: "24/7 emergency call-outs",
    },
    social: { facebook: "https://facebook.com/northflow" },
  },

  theme: {
    preset: "tradesman",
    colors: { accent: "#0B6CB3" },
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Areas", href: "/areas" },
    { label: "Contact", href: "/contact" },
  ],

  layout: {
    navbar: { variant: "solid-bar" },
    footer: { variant: "three-column" },
  },

  pages: [
    {
      path: "/",
      title: "NorthFlow Plumbing - 24/7 Emergency Plumbers, North Sydney",
      sections: [
        {
          type: "hero",
          variant: "split-left",
          props: {
            headline: "Burst pipe? We're there in 60 minutes.",
            subline: "Licensed local plumbers across Greater North Sydney. No call-out surprises.",
            ctaLabel: "Book a call-out",
            ctaHref: "/contact",
            media: {
              kind: "image",
              src: "/assets/portfolio/bath-poster.jpg",
              alt: "Plumbing work",
            },
          },
        },
        {
          type: "services",
          variant: "numbered-list",
          props: {
            headline: "What we do",
            items: [
              {
                title: "Emergency repairs",
                price: "from $120",
                description: "Burst pipes, blocked drains, no hot water - fast.",
                tags: ["24/7", "fixed call-out"],
              },
              {
                title: "Hot water systems",
                price: "from $890",
                description: "Supply and install gas, electric and heat-pump systems.",
                tags: ["same day"],
              },
              {
                title: "Blocked drains",
                price: "from $180",
                description: "CCTV diagnosis and high-pressure jetting.",
                tags: ["CCTV"],
              },
              {
                title: "Bathroom renovations",
                price: "quote",
                description: "Full rough-in and fit-off for renovations.",
                tags: ["licensed"],
              },
            ],
          },
        },
        {
          type: "steps",
          variant: "numbered-row",
          props: {
            headline: "How a call-out works",
            steps: [
              { title: "Call or book online", description: "Tell us what's happening." },
              { title: "Upfront quote", description: "We confirm the price before we start." },
              { title: "Fixed on the spot", description: "Most jobs done same visit." },
            ],
          },
        },
        {
          type: "testimonials",
          variant: "drag-strip",
          props: {
            headline: "What locals say",
            items: [
              {
                quote: "Came out at 11pm for a burst pipe and saved our kitchen. Legends.",
                author: "Marta K.",
                role: "Chatswood",
              },
              {
                quote: "Upfront price, no mess, hot water back in an hour.",
                author: "Dev P.",
                role: "Lane Cove",
              },
              {
                quote: "Booked online at 7am, fixed by 9. Will use again.",
                author: "Sarah L.",
                role: "Mosman",
              },
            ],
          },
        },
        {
          type: "ctaBanner",
          variant: "full-bleed",
          props: {
            headline: "Got a plumbing emergency right now?",
            ctaLabel: "Call +61 412 345 678",
            ctaHref: "tel:+61412345678",
          },
        },
      ],
    },
    {
      path: "/services",
      title: "Plumbing Services - NorthFlow Plumbing",
      sections: [
        { type: "services", variant: "card-grid", props: { headline: "Our services" } },
        {
          type: "faq",
          variant: "accordion",
          props: {
            headline: "Common questions",
            items: [
              {
                question: "Do you charge a call-out fee?",
                answer:
                  "A flat, upfront call-out applies and is quoted before we start - no surprises.",
              },
              {
                question: "Are you licensed and insured?",
                answer: "Yes - NSW Licence 284417C, fully insured.",
              },
              {
                question: "How fast can you come out?",
                answer: "Most North Sydney emergencies within 60 minutes, 24/7.",
              },
            ],
          },
        },
      ],
    },
    {
      path: "/areas",
      title: "Areas We Cover - NorthFlow Plumbing",
      sections: [
        {
          type: "serviceArea",
          variant: "suburb-list",
          props: {
            headline: "Areas we cover",
            intro: "Fast local plumbers right across Greater North Sydney.",
            suburbs: [
              "Chatswood",
              "Lane Cove",
              "Mosman",
              "Cremorne",
              "Neutral Bay",
              "North Sydney",
              "Willoughby",
              "Artarmon",
              "St Leonards",
              "Crows Nest",
            ],
          },
        },
      ],
    },
    {
      path: "/contact",
      title: "Contact - NorthFlow Plumbing",
      sections: [
        {
          type: "contact",
          variant: "form-left-details-right",
          props: {
            headline: "Book a plumber",
            intro: "Tell us what's going on and we'll call you straight back.",
          },
        },
      ],
    },
  ],
}
