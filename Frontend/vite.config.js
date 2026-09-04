import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// GitHub Pages serves the site from /nisraya/. Keep local development at /.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" ? "/nisraya/" : "/",
  plugins: [react()],
})
