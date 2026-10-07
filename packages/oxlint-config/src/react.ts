import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import pluginTailwindcss from "eslint-plugin-tailwindcss";
import { defineConfig } from "oxlint";

import baseConfig from "@jeremyng/oxlint-config";

const reactConfig = defineConfig({
  extends: [baseConfig],
  plugins: ["react", "react-perf"],
  jsPlugins: [
    "@tanstack/eslint-plugin-query",
    "@tanstack/eslint-plugin-router",
    "eslint-plugin-tailwindcss",
  ],
  env: {
    browser: true,
    es2024: true,
  },
  rules: {
    ...pluginQuery.configs["flat/recommended"][0]?.rules,
    ...pluginRouter.configs["flat/recommended"][0]?.rules,
    ...[pluginTailwindcss.configs?.["recommended"]].flat()[0]?.rules,

    /**
     * Not necessary, since using JSX runtime
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/react/react-in-jsx-scope}
     */
    "react/react-in-jsx-scope": "allow",

    /**
     * @see {@link https://oxc.rs/docs/guide/usage/linter/rules/typescript/only-throw-error.html}
     * @see {@link https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router#typescript-eslint}
     */
    "typescript/only-throw-error": [
      "deny",
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
  settings: {
    react: {
      version: "19.2.8",
    },
    tailwindcss: {
      cssConfigPath: "../../packages/ui/src/globals.css",
    },
  },
});

export default reactConfig;
