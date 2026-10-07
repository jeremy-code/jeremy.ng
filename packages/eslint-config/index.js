import { fileURLToPath } from "node:url";

import * as comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import js from "@eslint/js";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX, createNodeResolver } from "eslint-plugin-import-x";
import pluginPromise from "eslint-plugin-promise";
import * as pluginRegexp from "eslint-plugin-regexp";
import * as turbo from "eslint-plugin-turbo";
import pluginZod from "eslint-plugin-zod";
import { defineConfig, includeIgnoreFile, globalIgnores } from "eslint/config";
import globals from "globals";
import * as tseslint from "typescript-eslint";

import disablesConfig from "./disables.js";
import testConfig from "./test.js";

const gitignorePath = fileURLToPath(
  new URL("../../.gitignore", import.meta.url),
);

const baseConfig = defineConfig(
  includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
  // Ignore generated files including TanStack Router filesystem route tree
  globalIgnores(["*/generated/"]),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  comments.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  pluginPromise.configs["flat/recommended"],
  turbo.configs["flat/recommended"],
  pluginZod.configs.recommended,
  pluginRegexp.configs.recommended,
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
       * @see {@link https://github.com/marcalexiei/eslint-zod/blob/HEAD/plugins/eslint-plugin-zod/docs/rules/prefer-string-schema-with-trim.md}
       */
      "zod/prefer-string-schema-with-trim": "off",
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
  testConfig,
);

export default baseConfig;
