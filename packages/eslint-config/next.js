import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import nextVitals from "eslint-config-next/core-web-vitals";

import { reactConfig } from "./react.js";
import disables from "./disables.js";

export const nextConfig = defineConfig(
  /**
   * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores}
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
);

export default nextConfig.concat(disables);
