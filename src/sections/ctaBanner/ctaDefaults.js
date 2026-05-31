// Shared CTA resolution for ctaBanner variants. The CTA often points at a phone:
// when no explicit ctaHref is given but brand.phone is set, default to a tel:
// link (and a "Call <phone>" label); otherwise fall back to the contact page.
// Keeps the three variants consistent without re-implementing the rule each time.
export function resolveCta({ ctaHref, ctaLabel, brand = {} } = {}) {
  const phone = brand.phone
  if (ctaHref) {
    return { href: ctaHref, label: ctaLabel }
  }
  if (phone) {
    return {
      href: `tel:${phone.replace(/\s/g, "")}`,
      label: ctaLabel || `Call ${phone}`,
    }
  }
  return { href: "/contact", label: ctaLabel }
}
