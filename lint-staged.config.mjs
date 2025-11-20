/** @import { Configuration } from "lint-staged" */

/**
 * @satisfies {Configuration}
 */
export default {
  /**
   * Prevents turbo from seeing the filenames as tasks and instead passes them
   * as arguments.
   *
   * @see {@link https://turbo.build/repo/docs/reference/run}
   */
  "*.{js,jsx,ts,tsx}": "turbo run lint --",
};
