import { defineConfig } from "@hey-api/openapi-ts";

const openApiTsConfig = defineConfig({
  input: [
    "https://raw.githubusercontent.com/abraham/mastodon-openapi/refs/heads/main/dist/schema.json",
  ],
  output: ["./src/generated/mastodon"],
  plugins: ["@hey-api/typescript"],
});

export default openApiTsConfig;
