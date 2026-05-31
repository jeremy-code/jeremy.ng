import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const JAVASCRIPT_GLOB_PATTERNS = ["**/*.{js,cjs,jsx,mjs}"];

const disablesConfig = defineConfig(
  {
    files: JAVASCRIPT_GLOB_PATTERNS,
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: JAVASCRIPT_GLOB_PATTERNS,
    ...eslintReact.configs["disable-type-checked"],
  },
);

export default disablesConfig;
