import { loadEnvFile } from "node:process";

import type { CodegenConfig } from "@graphql-codegen/cli";

try {
  loadEnvFile("./.env.local");
} catch {
  console.error(".env.local was not found!");
}

const codegenConfig = {
  schema: {
    // https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#the-graphql-endpoint
    "https://api.github.com/graphql": {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      method: "POST",
    },
  },
  documents: "src/graphql/*/*.ts",
  generates: {
    "./src/generated/gql/": {
      preset: "client",
      config: {
        documentMode: "string",
        // https://github.com/dotansimha/graphql-typed-document-node/issues/152
        useTypeImports: true,
        scalars: {
          DateTime: "string",
          URI: "string",
        },
      },
    },
  },
} satisfies CodegenConfig;

export default codegenConfig;
