import base from "@jeremyng/eslint-config";
/** @import { Linter } from "eslint" */

/**
 * @satisfies {Linter.Config[]}
 */
export default [{ ignores: ["apps/*", "packages/*"], ...base }];
