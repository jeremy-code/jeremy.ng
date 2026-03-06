import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { SiteKey } from "@jeremyng/api/schemas/cloudflare/turnstile";
import { env as apiEnv } from "@jeremyng/api/utils/env";

const env = createEnv({
  extends: [apiEnv],
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  client: {
    NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY: SiteKey,
    NEXT_PUBLIC_GITHUB_USERNAME: z.string().min(1),
    NEXT_PUBLIC_NPM_REGISTRY_USERNAME: z.string().min(1),
  },
  /**
   * Due to how Next.js statically analyzes environment variables on the client,
   * to be included in the bundle, they must be manually passed to
   * `experimental__runtimeEnv`. Destructuring from `process.env` will not work.
   *
   * @see {@link https://env.t3.gg/docs/nextjs#create-your-schema}
   * @see {@link https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser}
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_NPM_REGISTRY_USERNAME:
      process.env.NEXT_PUBLIC_NPM_REGISTRY_USERNAME,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
  },
});

export { env };
