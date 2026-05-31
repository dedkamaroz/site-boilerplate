import NavBar from "../../components/NavBar"
import { registerVariant } from "../registry"

// navbar / transparent-scroll: the original DISTRO 3D bar - transparent over the
// hero, solidifies on scroll. Adapts config brand + nav into the underlying
// NavBar's props so no client literals live in the component.
export function TransparentScroll({ brand = {}, nav = [], cta = {}, ...rest }) {
  return (
    <NavBar
      logoSrc={brand.logo || ""}
      logoText={brand.name || ""}
      links={nav}
      ctaLabel={cta.label || (brand.phone ? `Call ${brand.phone}` : "Contact")}
      ctaHref={cta.href || (brand.phone ? `tel:${brand.phone}` : "/contact")}
      {...rest}
    />
  )
}

registerVariant("navbar", "transparent-scroll", TransparentScroll)
