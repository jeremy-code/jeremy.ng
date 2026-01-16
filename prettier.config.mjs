/** @import { Config } from "prettier" */
/** @import { PluginOptions } from "prettier-plugin-tailwindcss" */

/**
 * @see {@link https://prettier.io/docs/en/configuration.html}
 * @satisfies {Config & PluginOptions}
 */
export default {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "all",
  experimentalTernaries: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./packages/ui/globals.css",
  tailwindFunctions: ["cx", "cn", "cnMerge", "tv", "twMerge"],
};
