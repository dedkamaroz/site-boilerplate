import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FullBleed } from "./FullBleed"
import { Boxed } from "./Boxed"
import { Split } from "./Split"

const variants = [
  ["FullBleed", FullBleed],
  ["Boxed", Boxed],
  ["Split", Split],
]

describe("ctaBanner variants", () => {
  for (const [name, Variant] of variants) {
    it(`${name} renders the headline and a CTA link with the given label and href`, () => {
      render(
        <Variant
          headline={`${name} Headline`}
          ctaLabel="Book Now"
          ctaHref="/book"
        />
      )
      expect(screen.getByText(`${name} Headline`)).toBeTruthy()
      const cta = screen.getByText("Book Now")
      expect(cta.tagName).toBe("A")
      expect(cta.getAttribute("href")).toBe("/book")
    })

    it(`${name} defaults the CTA to a tel: link when ctaHref omitted but brand.phone given`, () => {
      render(
        <Variant
          headline={`${name} Phone`}
          ctaLabel="Call us"
          brand={{ phone: "+61 4 1234 5678" }}
        />
      )
      const cta = screen.getByText("Call us")
      expect(cta.getAttribute("href")).toMatch(/^tel:/)
    })
  }
})
