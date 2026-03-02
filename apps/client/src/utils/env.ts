import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { SecretKey, SiteKey } from "#schemas/cloudflare/turnstile";

const env = createEnv({
  server: {
    CF_TURNSTILE_SECRET_KEY: SecretKey,
    GITHUB_TOKEN: z.string().min(1),
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
    NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_NPM_REGISTRY_USERNAME:
      process.env.NEXT_PUBLIC_NPM_REGISTRY_USERNAME,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
  },
});

export { env };
