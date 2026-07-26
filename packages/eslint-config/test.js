import vitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";
import { configDefaults } from "vitest/config";

// ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
// https://vitest.dev/config/include.html#include
const TEST_GLOB_PATTERNS = configDefaults.include;

const testConfig = defineConfig(
  {
    files: TEST_GLOB_PATTERNS,
    ...vitest.configs.recommended,
  },
  {
    name: "@jeremyng/eslint-config/test.js",
    files: TEST_GLOB_PATTERNS,
    rules: {
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
       * @see {@link https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-it.md}
       */
      "vitest/consistent-test-it": [
        "error",
        { fn: "test", withinDescribe: "test" },
      ],
      /**
       * @see {@link https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-vi.md}
       */
      "vitest/consistent-vitest-vi": ["error", { fn: "vi" }],
      /**
       * @see {@link https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-alias-methods.md}
       */
      "vitest/no-alias-methods": "error",
      /**
       * @see {@link https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-importing-vitest-globals.md}
       */
      "vitest/prefer-importing-vitest-globals": "error",
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
);

export default testConfig;
