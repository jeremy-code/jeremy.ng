import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { secretKeySchema } from "../schemas/cloudflare/turnstile";

const env = createEnv({
  server: {
    CF_TURNSTILE_SECRET_KEY: secretKeySchema,
    GITHUB_TOKEN: z.string().min(1),
    MAILGUN_API_KEY: z.string().min(1),
    MAILGUN_DOMAIN: z.hostname().min(1),
  },
  runtimeEnv: process.env,
});

export { env };
