import * as pluginRegexp from "eslint-plugin-regexp";
import turbo from "eslint-plugin-turbo";
import pluginZod from "eslint-plugin-zod";
import { defineConfig } from "oxlint";

import testConfig from "@jeremyng/oxlint-config/test";

const baseConfig = defineConfig({
  extends: [testConfig],
  // https://oxc.rs/docs/guide/usage/linter/config.html#enable-groups-of-rules-with-categories
  categories: {
    correctness: "error",
    suspicious: "warn",
  },
  env: {
    es2024: true,
  },
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    "import",
    "jsdoc",
    "node",
    "promise",
  ],
  jsPlugins: [
    "eslint-plugin-turbo",
    "eslint-plugin-zod",
    "eslint-plugin-regexp",
  ],
  rules: {
    // While in runtime, eslint-plugin-turbo always returns a single config,
    // TypeScript does not know that. Use `.flat()` to always get an array
    ...[turbo.configs?.["flat/recommended"]].flat()[0]?.rules,
    ...pluginZod.configs.recommended.rules,
    ...pluginRegexp.configs["flat/recommended"].rules,

    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-underscore-dangle.html}
     */
    "eslint/no-underscore-dangle": "allow",
    /**
     * Emulates the TypeScript style of exempting names starting with "_"
     *
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-vars}
     */
    "eslint/no-unused-vars": [
      "deny",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/import/exports-last}
     */
    "import/exports-last": "deny",
    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/import/group-exports}
     */
    "import/group-exports": "deny",
    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/import/newline-after-import}
     */
    "import/newline-after-import": ["deny", { considerComments: true }],
  },
  // Ignore generated files including TanStack Router filesystem route tree
  ignorePatterns: ["*/generated/"],
});

export default baseConfig;
