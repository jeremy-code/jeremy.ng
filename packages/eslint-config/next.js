import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import nextVitals from "eslint-config-next/core-web-vitals";

import { reactConfig } from "./react.js";
import disables from "./disables.js";

export const nextConfig = defineConfig(
  /**
   * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores}
   */
  globalIgnores([".next"]),
  reactConfig,
  nextVitals,
);

export default nextConfig.concat(disables);
