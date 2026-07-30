import { TRPCError } from "@trpc/server";
import { ofetch } from "ofetch";

import {
  tokenSchema,
  validationRequestParamsSchema,
  validationResponseSchema,
  type ValidationResponse,
} from "../schemas/cloudflare/turnstile";
import { baseProcedure, createTRPCRouter } from "../trpc";
import { env } from "../utils/env";
import { cfTurnstileErrorToTrpcError } from "../utils/errorHandling";

const cloudflareTurnstileApi = ofetch.create({
  baseURL: "https://challenges.cloudflare.com/turnstile/v0",
});

const cloudflareRouter = createTRPCRouter({
  verifyToken: baseProcedure
    .input(tokenSchema)
    .output(validationResponseSchema.options[0])
    .mutation(async (opts) => {
      const params = validationRequestParamsSchema.parse({
        secret: env.CF_TURNSTILE_SECRET_KEY,
        response: opts.input,
        idempotency_key: crypto.randomUUID(),
      });

      const response = await cloudflareTurnstileApi<ValidationResponse>(
        "/siteverify",
        { method: "POST", body: params },
      );

      if (response.success) {
        return response;
      }
      const errorCode = response["error-codes"][0];

      // TODO: maybe use AggregateError when there are multiple errors
      throw new TRPCError(
        errorCode !== undefined && errorCode in cfTurnstileErrorToTrpcError ?
          cfTurnstileErrorToTrpcError[errorCode]
        : {
            code: "INTERNAL_SERVER_ERROR",
            message: "Turnstile verification failed due to an unknown error.",
          },
      );
    }),
});

export { cloudflareRouter };
