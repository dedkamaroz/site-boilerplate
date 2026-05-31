import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url"

// Dev/build config for the in-repo component preview gallery (npm run gallery).
// Roots at gallery/, but serves public/ from the project root so section media
// fixtures (/assets/...) resolve.
export default defineConfig({
  root: "gallery",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [react()],
  server: { port: 5174, open: true },
  build: {
    outDir: fileURLToPath(new URL("./dist-gallery", import.meta.url)),
    emptyOutDir: true,
  },
})
