import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

import disablesConfig from "./disables.js";
import reactConfig from "./react.js";

const nextConfig = defineConfig(
  /**
   * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignore-files-with-ignores}
   */
  globalIgnores([".next"]),
  reactConfig,
  nextVitals,
  {
    rules: {
      /**
       * `@tanstack/react-form` uses children render props for `<Field />`
       *
       * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md}
       * @see {@link https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts#field}
       */
      "react/no-children-prop": ["error", { allowFunctions: true }],
    },
  },
  disablesConfig,
);

export default nextConfig;
