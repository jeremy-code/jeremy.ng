import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

/**
 * While it would be best to merge this with the Vite config, due to some errors
 * involved when using the Cloudflare Vite plugin (cloudflare/workers-sdk#14215,
 * cloudflare/workers-sdk#14869), it is a standalone config for now.
 */
const vitestConfig = defineConfig({
  test: {
    browser: {
      enabled: true,
      instances: [{ browser: "chromium" }],
      provider: playwright(),
    },
  },
});

export default vitestConfig;
