import { ofetch } from "ofetch";

import {
  validationRequestParamsSchema,
  type ValidationResponse,
} from "../schemas/cloudflare/turnstile";
import { env } from "../utils/env";

const cloudflareTurnstileApi = ofetch.create({
  baseURL: "https://challenges.cloudflare.com/turnstile/v0",
});

const verifyToken = async (token: string) => {
  const params = validationRequestParamsSchema.parse({
    secret: env.CF_TURNSTILE_SECRET_KEY,
    response: token,
    idempotency_key: crypto.randomUUID(),
  });
  const response = await cloudflareTurnstileApi<ValidationResponse>(
    "/siteverify",
    { method: "POST", body: params },
  );

  return response;
};

export { verifyToken };
