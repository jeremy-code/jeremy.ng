import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_GITHUB_USERNAME: z.string().min(1),
    NEXT_PUBLIC_NPM_REGISTRY_USERNAME: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_NPM_REGISTRY_USERNAME:
      process.env.NEXT_PUBLIC_NPM_REGISTRY_USERNAME,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
  },
});
