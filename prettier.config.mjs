/** @import { Config } from "prettier" */
/** @import { PluginOptions } from "prettier-plugin-tailwindcss" */

/**
 * @see {@link https://prettier.io/docs/en/configuration.html}
 * @satisfies {Config & PluginOptions}
 */
const prettierConfig = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "all",
  experimentalTernaries: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./packages/ui/src/globals.css",
  tailwindFunctions: ["cx", "cn", "cnMerge", "tv", "twMerge"],
};

export default prettierConfig;
