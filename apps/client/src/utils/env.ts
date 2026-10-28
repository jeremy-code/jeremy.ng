import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { siteKeySchema } from "@jeremyng/api/schemas/cloudflare/turnstile";
import { env as apiEnv } from "@jeremyng/api/utils/env";

const env = createEnv({
  extends: [apiEnv],
  clientPrefix: "VITE_",
  shared: {
    WORKERS_CI_BRANCH: z.string().min(1),
    BASE_URL: z.preprocess(
      (val) =>
        val === "/"
          ? import.meta.env.DEV
            ? "http://localhost:3000"
            : "http://localhost:4173"
          : val,
      z.url(),
    ),
  },
  client: {
    VITE_CF_TURNSTILE_SITE_KEY: siteKeySchema,
    VITE_GITHUB_USERNAME: z.string().min(1),
    VITE_NPM_REGISTRY_USERNAME: z.string().min(1),
  },
  runtimeEnv: import.meta.env,
});

export { env };
