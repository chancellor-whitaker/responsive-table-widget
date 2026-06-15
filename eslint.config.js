import { globalIgnores, defineConfig } from "eslint/config";
import perfectionist from "eslint-plugin-perfectionist";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  perfectionist.configs["recommended-line-length"],
  globalIgnores(["dist"]),
  {
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    files: ["**/*.{js,jsx}"],
  },
]);
