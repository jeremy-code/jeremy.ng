import eslintReact from "@eslint-react/eslint-plugin";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import { defineConfig } from "eslint/config";
import * as reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import disablesConfig from "./disables.js";
import baseConfig from "./index.js";

const reactConfig = defineConfig(
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
       * @see {@link https://typescript-eslint.io/rules/only-throw-error/}
       * @see {@link https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router#typescript-eslint}
       */
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allow: [
            {
              from: "package",
              package: "@tanstack/router-core",
              name: ["Redirect", "NotFoundError"],
            },
          ],
        },
      ],
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
