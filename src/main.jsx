import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import config from "../site.config"
import "./styles/base.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App config={config} />
    </BrowserRouter>
  </StrictMode>
)
