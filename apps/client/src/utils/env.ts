import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { siteKeySchema } from "@jeremyng/api/schemas/cloudflare/turnstile";
import { env as apiEnv } from "@jeremyng/api/utils/env";

const env = createEnv({
  extends: [apiEnv],
  clientPrefix: "VITE_",
  client: {
    VITE_BASE_URL: z.url(),
    VITE_CF_TURNSTILE_SITE_KEY: siteKeySchema,
    VITE_GITHUB_USERNAME: z.string().min(1),
    VITE_NPM_REGISTRY_USERNAME: z.string().min(1),
  },
  runtimeEnv: import.meta.env,
});

export { env };
