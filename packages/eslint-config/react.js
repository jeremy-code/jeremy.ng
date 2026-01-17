import { defineConfig } from "@eslint/config-helpers";
import eslintReact from "@eslint-react/eslint-plugin";
import globals from "globals";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";

import { baseConfig } from "./index.js";
import disables from "./disables.js";

export const reactConfig = defineConfig(
  baseConfig,
  eslintReact.configs["recommended-type-checked"],
  reactCompiler.configs.recommended,
  reactHooks.configs.flat["recommended-latest"],
  pluginQuery.configs["flat/recommended"],
  {
    name: "@jeremyng/eslint-config/react.js",
    rules: {
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            /**
             * Server actions must be async functions and may be passed to
             * `action` and `onSubmit` props, which return `void` and not
             * `Promise<void>`. This triggers `no-misused-promises`. However,
             * making it a synchronous function throws error "Functions cannot
             * be directly passed unless explicitly exposed with 'use server'".
             *
             * @see {@link https://typescript-eslint.io/rules/no-misused-promises/#checksvoidreturn}
             * @see {@link https://react.dev/reference/rsc/server-actions}
             */
            attributes: false,
          },
        },
      ],
      /**
       * Server actions must be async functions, even if they don't use `await`.
       *
       * @see {@link https://typescript-eslint.io/rules/require-await/}
       */
      "@typescript-eslint/require-await": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
  },
);

export default reactConfig.concat(disables);
