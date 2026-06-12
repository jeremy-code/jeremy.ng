import type { CodegenConfig } from "@graphql-codegen/cli";

const codegenConfig = {
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    },
  },
  documents: ["src/graphql/*/*.ts"],
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
