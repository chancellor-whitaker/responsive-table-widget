import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

import { widgetMeta } from "./src/widget.meta.js";

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
    emptyOutDir: false,
    lib: {
      entry: "src/widget.jsx",
      name: widgetMeta.name,
      fileName: widgetMeta.fileName,
      formats: ["iife"],
    },
  },
});
