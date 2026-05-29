import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  base: "",

  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": {},
    process: {
      env: {
        NODE_ENV: "production",
      },
    },
  },

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
