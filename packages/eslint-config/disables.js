import { defineConfig } from "@eslint/config-helpers";
import tseslint from "typescript-eslint";

export default defineConfig({
  files: ["**/*.{js,cjs,jsx,mjs}"],
  ...tseslint.configs.disableTypeChecked,
});
