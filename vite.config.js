import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  base: "",
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    outDir: "docs",
    lib: {
      entry: "src/widget.jsx",
      name: "ResponsiveTableWidget",
      fileName: "responsive-table-widget",
      formats: ["iife"],
    },
  },
});
