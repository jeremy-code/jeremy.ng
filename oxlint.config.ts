import { defineConfig } from "oxlint";

import baseConfig from "@jeremyng/oxlint-config";

const oxlintConfig = defineConfig({
  extends: [baseConfig],
  options: {
    reportUnusedDisableDirectives: "warn",
    typeAware: true,
    typeCheck: true,
  },
});

export default oxlintConfig;
