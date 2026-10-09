import { defineConfig } from "oxlint";

const testConfig = defineConfig({
  // https://oxc.rs/docs/guide/usage/linter/config.html#enable-groups-of-rules-with-categories
  plugins: ["vitest"],
  rules: {
    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-each-for}
     */
    "vitest/consistent-each-for": [
      "error",
      {
        test: "for",
        it: "for",
        describe: "for",
        suite: "for",
      },
    ],
    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-test-it}
     */
    "vitest/consistent-test-it": "error",
    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-vitest-vi}
     */
    "vitest/consistent-vitest-vi": ["error", { fn: "vi" }],
    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-alias-methods}
     */
    "vitest/no-alias-methods": "error",
    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-importing-vitest-globals}
     */
    "vitest/prefer-importing-vitest-globals": "error",
  },
  settings: {
    vitest: {
      typecheck: true,
    },
  },
});

export default testConfig;
