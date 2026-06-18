/* vite.config.js */

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { widgetMeta } from "./src/widget.meta.js";

export default defineConfig({
  build: {
    lib: {
      fileName: widgetMeta.fileName,
      entry: "src/widget.jsx",
      name: widgetMeta.name,
      formats: ["iife"],
    },
    emptyOutDir: false,
    outDir: "docs",
  },
  define: {
    process: {
      env: {
        NODE_ENV: "production",
      },
    },
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": {},
  },
  plugins: [react()],
  base: "",
});
