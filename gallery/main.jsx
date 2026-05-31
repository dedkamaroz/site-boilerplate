import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MemoryRouter } from "react-router-dom"
import Gallery from "./Gallery"
import "../src/styles/base.css"

// Sections may contain <a>/router-aware markup; wrap in a MemoryRouter so they
// render in isolation without a real navigation context.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemoryRouter>
      <Gallery />
    </MemoryRouter>
  </StrictMode>
)
