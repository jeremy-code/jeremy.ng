import { defineConfig } from "vitest/config";

const vitestConfig = defineConfig({
  test: {
    projects: ["{apps,packages}/*"],
  },
});

export default vitestConfig;
