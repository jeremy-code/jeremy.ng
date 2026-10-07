/** @import { Configuration } from "lint-staged" */

/**
 * @satisfies {Configuration}
 */
const lintStagedConfig = {
  "*.{js,mjs,cjs,ts,tsx,mts,cts}": ["oxlint", "oxfmt --check"],
  "*.{json,md,yaml,yml}": "oxfmt --check",
};

export default lintStagedConfig;
