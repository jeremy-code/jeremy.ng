import ky from "ky";

import {
  Token,
  ValidationRequestParams,
  ValidationResponse,
} from "../schemas/cloudflare/turnstile";
import { baseProcedure, createTRPCRouter } from "../trpc";
import { env } from "../utils/env";

const cloudflareTurnstileApi = ky.extend({
  prefixUrl: "https://challenges.cloudflare.com/turnstile/v0/",
});

const cloudflareRouter = createTRPCRouter({
  verifyToken: baseProcedure
    .input(Token)
    .output(ValidationResponse)
    .query((opts) => {
      const params = ValidationRequestParams.parse({
        secret: env.CF_TURNSTILE_SECRET_KEY,
        response: opts.input,
        idempotency_key: crypto.randomUUID(),
      });

      return cloudflareTurnstileApi
        .post("siteverify", {
          json: params,
        })
        .json<ValidationResponse>();
    }),
});

export { cloudflareRouter };
