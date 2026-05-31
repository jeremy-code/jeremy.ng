/** @import { Configuration } from "lint-staged" */

/**
 * @satisfies {Configuration}
 */
export default {
  /**
   * Prevents turbo from seeing the filenames as tasks and instead passes them
   * as arguments.
   *
   * @see {@link https://turborepo.dev/docs/reference/run}
   */
  "*.{js,mjs,cjs,ts,tsx,mts,cts}": ["turbo run lint --", "prettier --check"],
  "*.{json,md,yaml,yml}": "prettier --check",
};
