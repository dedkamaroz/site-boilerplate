import { describe, it, expect, vi, afterEach } from "vitest"
import { render, fireEvent, waitFor } from "@testing-library/react"
import { FormLeftDetailsRight } from "./FormLeftDetailsRight"
import { Stacked } from "./Stacked"
import { DetailsOnly } from "./DetailsOnly"

const fullBrand = {
  name: "Acme Plumbing",
  email: "book@acme.test",
  phone: "+61 400 000 000",
  serviceArea: "Greater North Sydney",
  hours: { regular: [{ days: "Mon-Fri", time: "7am - 5pm" }], emergency: "24/7 call-outs" },
  social: { facebook: "https://fb.test/acme" },
}

describe("contact / form-left-details-right", () => {
  it("renders a form with name, email and message fields and a submit button", () => {
    const { container, getByLabelText } = render(<FormLeftDetailsRight brand={fullBrand} />)
    expect(container.querySelector("form")).toBeTruthy()
    expect(getByLabelText(/name/i)).toBeInTheDocument()
    expect(getByLabelText(/email/i)).toBeInTheDocument()
    expect(getByLabelText(/message/i)).toBeInTheDocument()
    expect(container.querySelector('input[name="name"]')).toBeTruthy()
    expect(container.querySelector('textarea[name="message"]')).toBeTruthy()
    expect(container.querySelector('button[type="submit"]')).toBeTruthy()
  })

  it("uses formEndpoint as the form action when provided", () => {
    const endpoint = "https://formspree.io/f/abcdwxyz"
    const { container } = render(<FormLeftDetailsRight brand={fullBrand} formEndpoint={endpoint} />)
    expect(container.querySelector("form").getAttribute("action")).toBe(endpoint)
  })

  it("falls back to a mailto action from brand.email when no endpoint is given", () => {
    const { container } = render(<FormLeftDetailsRight brand={fullBrand} />)
    expect(container.querySelector("form").getAttribute("action")).toBe("mailto:book@acme.test")
  })
})

describe("contact form - hiddenFields & AJAX submission", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders hiddenFields as hidden inputs", () => {
    const hiddenFields = { access_key: "test-key-123", subject: "New enquiry" }
    const { container } = render(
      <FormLeftDetailsRight
        brand={fullBrand}
        formEndpoint="https://api.web3forms.com/submit"
        hiddenFields={hiddenFields}
      />
    )
    const key = container.querySelector('input[name="access_key"]')
    expect(key).toBeTruthy()
    expect(key.getAttribute("type")).toBe("hidden")
    expect(key.value).toBe("test-key-123")
    expect(container.querySelector('input[name="subject"]').value).toBe("New enquiry")
  })

  it("POSTs to formEndpoint via fetch and shows a success message", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) })
    vi.stubGlobal("fetch", fetchMock)

    const endpoint = "https://api.web3forms.com/submit"
    const { container, findByText } = render(
      <FormLeftDetailsRight
        brand={fullBrand}
        formEndpoint={endpoint}
        hiddenFields={{ access_key: "k" }}
      />
    )

    fireEvent.submit(container.querySelector("form"))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    expect(fetchMock.mock.calls[0][0]).toBe(endpoint)
    expect(fetchMock.mock.calls[0][1].method).toBe("POST")
    expect(await findByText(/your message has been sent/i)).toBeInTheDocument()
  })

  it("shows an error message when the endpoint reports failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({ success: false }) })
    )
    const { container, findByText } = render(
      <FormLeftDetailsRight
        brand={fullBrand}
        formEndpoint="https://api.web3forms.com/submit"
        hiddenFields={{ access_key: "k" }}
      />
    )
    fireEvent.submit(container.querySelector("form"))
    expect(await findByText(/something went wrong/i)).toBeInTheDocument()
  })
})

describe("contact / stacked", () => {
  it("renders a form with name, email and message fields and a submit button", () => {
    const { container, getByLabelText } = render(<Stacked brand={fullBrand} />)
    expect(container.querySelector("form")).toBeTruthy()
    expect(getByLabelText(/name/i)).toBeInTheDocument()
    expect(getByLabelText(/email/i)).toBeInTheDocument()
    expect(getByLabelText(/message/i)).toBeInTheDocument()
    expect(container.querySelector('button[type="submit"]')).toBeTruthy()
  })
})

describe("contact / details-only", () => {
  it("renders NO form but shows the email when brand.email is set", () => {
    const { container, getByText } = render(<DetailsOnly brand={fullBrand} />)
    expect(container.querySelector("form")).toBeNull()
    expect(getByText("book@acme.test")).toBeInTheDocument()
  })
})

describe("contact details self-hiding", () => {
  it("does not render hours or service area when absent", () => {
    const minimalBrand = { name: "Studio", email: "hi@studio.test" }
    const { queryByText } = render(<DetailsOnly brand={minimalBrand} />)
    expect(queryByText(/opening hours/i)).not.toBeInTheDocument()
    expect(queryByText(/24\/7 call-outs/)).not.toBeInTheDocument()
    expect(queryByText(/service area/i)).not.toBeInTheDocument()
    expect(queryByText(/servicing/i)).not.toBeInTheDocument()
  })
})
