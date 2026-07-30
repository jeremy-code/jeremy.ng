/** @import { Configuration } from "lint-staged" */

/**
 * @satisfies {Configuration}
 */
const lintStagedConfig = {
  "*.{js,mjs,cjs,ts,tsx,mts,cts}": ["eslint", "prettier --check"],
  "*.{json,md,yaml,yml}": "prettier --check",
};

export default lintStagedConfig;
