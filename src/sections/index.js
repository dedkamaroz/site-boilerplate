// Registration barrel. Importing this module runs every section module's
// registerVariant() side effects, replacing registry stubs with real layout
// components. App imports this once so the registry is fully populated before any
// page renders. As Phases 3-4 add sections, add their imports here.

import "./navbar/TransparentScroll"
