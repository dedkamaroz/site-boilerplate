// Registration barrel. Importing this module runs every section module's
// registerVariant() side effects, replacing registry stubs with real layout
// components. App imports this once so the registry is fully populated before any
// page renders.

// navbar
import "./navbar/TransparentScroll"
import "./navbar/SolidBar"

// hero
import "./hero/CentredOverMedia"
import "./hero/SplitLeft"
import "./hero/MinimalCard"

// services
import "./services/NumberedList"
import "./services/CardGrid"
import "./services/IconRow"

// testimonials
import "./testimonials/DragStrip"
import "./testimonials/StackedQuotes"

// logoMarquee
import "./logoMarquee/TwoRowScroll"
import "./logoMarquee/StaticGrid"

// gallery
import "./gallery/FilterableGrid"
import "./gallery/Masonry"

// featured
import "./featured/AlternatingRows"
import "./featured/Cards"

// footer
import "./footer/ThreeColumn"
import "./footer/Stacked"
import "./footer/CompactBar"
