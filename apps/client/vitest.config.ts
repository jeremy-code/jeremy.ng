import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";
import { mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.js";

const vitestConfig = defineConfig({
  test: {
    browser: {
      enabled: true,
      instances: [{ browser: "chromium" }],
      provider: playwright(),
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
