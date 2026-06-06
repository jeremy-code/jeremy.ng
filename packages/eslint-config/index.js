import js from "@eslint/js";
import * as comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import { defineConfig } from "eslint/config";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX, createNodeResolver } from "eslint-plugin-import-x";
import pluginPromise from "eslint-plugin-promise";
import * as turbo from "eslint-plugin-turbo";
import globals from "globals";
import * as tseslint from "typescript-eslint";

import disablesConfig from "./disables.js";

const baseConfig = defineConfig(
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  comments.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  pluginPromise.configs["flat/recommended"],
  turbo.configs["flat/recommended"],
  {
    name: "@jeremyng/eslint-config/index.js",
    languageOptions: {
      parserOptions: {
        /**
         * Automatically load `tsconfig.json` files for typed linting rules
         *
         * @see {@link https://typescript-eslint.io/packages/parser/#projectservice}
         */
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
    rules: {
      /**
       * Emulates the TypeScript style of exempting names starting with "_"
       *
       * @see {@link https://typescript-eslint.io/rules/no-unused-vars/}
       */
      "@typescript-eslint/no-unused-vars": [
        "error",
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
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/exports-last.md}
       */
      "import-x/exports-last": "error",
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/group-exports.md}
       */
      "import-x/group-exports": "error",
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md}
       */
      "import-x/newline-after-import": ["error", { considerComments: true }],
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md}
       */
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            { pattern: "#*", group: "internal" },
            {
              pattern: "react{,-dom{,/server,/client,/static}}",
              group: "builtin",
            },
          ],
          pathGroupsExcludedImportTypes: ["object"],
          distinctGroup: false,
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
    },
    settings: {
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x#import-xinternal-regex}
       */
      "import-x/internal-regex": "^@jeremyng/",
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/tree/master/resolvers}
       */
      "import-x/resolver-next": [
        createTypeScriptImportResolver({ alwaysTryTypes: true }),
        createNodeResolver(),
      ],
    },
  },
  disablesConfig,
);

export default baseConfig;
