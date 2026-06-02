import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { SecretKey } from "../schemas/cloudflare/turnstile";

const env = createEnv({
  server: {
    CF_TURNSTILE_SECRET_KEY: SecretKey,
    GITHUB_TOKEN: z.string().min(1),
    MAILGUN_API_KEY: z.string().min(1),
    MAILGUN_DOMAIN: z.hostname().min(1),
  },
  runtimeEnv: process.env,
});

export { env };
