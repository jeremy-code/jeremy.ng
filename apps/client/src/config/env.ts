import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { env as apiEnv } from "@jeremyng/api/config/env";
import { SiteKey } from "@jeremyng/api/schemas/cloudflare/turnstile";

const env = createEnv({
  extends: [apiEnv],
  clientPrefix: "VITE_",
  client: {
    VITE_BASE_URL: z.url(),
    VITE_CF_TURNSTILE_SITE_KEY: SiteKey,
    VITE_GITHUB_USERNAME: z.string().min(1),
    VITE_NPM_REGISTRY_USERNAME: z.string().min(1),
  },
  runtimeEnv: import.meta.env,
});

export { env };
