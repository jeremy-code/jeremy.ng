import eslintReact from "@eslint-react/eslint-plugin";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import { defineConfig, globalIgnores } from "eslint/config";
import * as reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import disablesConfig from "./disables.js";
import baseConfig from "./index.js";

const reactConfig = defineConfig(
  // Ignore generated files including TanStack Router filesystem route tree
  globalIgnores(["dist", "*/generated/"]),
  baseConfig,
  eslintReact.configs["recommended-type-checked"],
  reactCompiler.configs.recommended,
  reactHooks.configs.flat["recommended-latest"],
  pluginQuery.configs["flat/recommended"],
  pluginRouter.configs["flat/recommended"],
  {
    name: "@jeremyng/eslint-config/react.js",
    rules: {
      /**
       * `@tanstack/react-form` uses children render props for `<Field />`
       *
       * @see {@link https://eslint-react.xyz/docs/rules/jsx-no-children-prop}
       * @see {@link https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts#field}
       */
      "@eslint-react/jsx-no-children-prop": "off",
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
  disablesConfig,
);

export default reactConfig;
