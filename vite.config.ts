import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages project site: https://USERNAME.github.io/Stardom/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Stardom/",
});
