import { resolveSection } from "./sections/registry"

// Renders one page: resolves each configured section to its component via the
// registry and renders it in order with its own props. `brand` is threaded into
// every section so sections (footer, contact, navbar) can read shared brand
// fields without the config repeating them per section.
export function PageRenderer({ page, brand }) {
  return (
    <>
      {page.sections.map((section, i) => {
        const Component = resolveSection(section.type, section.variant)
        return <Component key={i} brand={brand} {...section.props} />
      })}
    </>
  )
}
