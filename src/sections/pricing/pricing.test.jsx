import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { TiersCards } from "./TiersCards"
import { ComparisonTable } from "./ComparisonTable"
import { SimpleList } from "./SimpleList"

const tiers = [
  {
    name: "Basic",
    price: "$10",
    period: "/month",
    description: "Entry plan.",
    features: ["One page", "Email support"],
  },
  {
    name: "Pro",
    price: "$30",
    period: "/month",
    description: "The popular plan.",
    features: ["Five pages", "Email support", "Analytics"],
    featured: true,
    ctaLabel: "Choose Pro",
    ctaHref: "#pro",
  },
  {
    name: "Max",
    price: "$90",
    period: "/month",
    description: "Everything.",
    features: ["Unlimited pages", "Dedicated support"],
  },
]

describe("pricing / tiers-cards", () => {
  it("renders a tier name and its price", () => {
    const { getByText } = render(<TiersCards tiers={tiers} />)
    expect(getByText("Pro")).toBeInTheDocument()
    expect(getByText("$30")).toBeInTheDocument()
  })

  it("marks the featured tier with a label", () => {
    const { getByText } = render(<TiersCards tiers={tiers} />)
    expect(getByText(/most popular/i)).toBeInTheDocument()
  })

  it("marks the featured tier with a data hook", () => {
    const { container } = render(<TiersCards tiers={tiers} />)
    expect(container.querySelector('[data-featured="true"]')).toBeInTheDocument()
  })

  it("renders standalone with default demo tiers (middle one featured)", () => {
    const { getByText } = render(<TiersCards />)
    expect(getByText("Growth")).toBeInTheDocument()
    expect(getByText("$129")).toBeInTheDocument()
    expect(getByText(/most popular/i)).toBeInTheDocument()
  })
})

describe("pricing / comparison-table", () => {
  it("renders a tier name and its price", () => {
    const { getByText } = render(<ComparisonTable tiers={tiers} />)
    expect(getByText("Pro")).toBeInTheDocument()
    expect(getByText(/\$30/)).toBeInTheDocument()
  })

  it("renders the union of features as rows", () => {
    const { getByText } = render(<ComparisonTable tiers={tiers} />)
    expect(getByText("One page")).toBeInTheDocument()
    expect(getByText("Analytics")).toBeInTheDocument()
    expect(getByText("Unlimited pages")).toBeInTheDocument()
  })

  it("renders standalone with default demo tiers", () => {
    const { getByText } = render(<ComparisonTable />)
    expect(getByText("Growth")).toBeInTheDocument()
  })
})

describe("pricing / simple-list", () => {
  it("renders a tier name and its price", () => {
    const { getByText } = render(<SimpleList tiers={tiers} />)
    expect(getByText("Pro")).toBeInTheDocument()
    expect(getByText("$30")).toBeInTheDocument()
  })

  it("renders standalone with default demo tiers", () => {
    const { getByText } = render(<SimpleList />)
    expect(getByText("Growth")).toBeInTheDocument()
    expect(getByText("$129")).toBeInTheDocument()
  })
})
