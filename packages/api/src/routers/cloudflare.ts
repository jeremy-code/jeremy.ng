import { TRPCError } from "@trpc/server";
import ky from "ky";

import { env } from "../config/env";
import {
  Token,
  ValidationRequestParams,
  ValidationResponse,
} from "../schemas/cloudflare/turnstile";
import { baseProcedure, createTRPCRouter } from "../trpc";
import { cfTurnstileErrorToTrpcError } from "../utils/errorHandling";

const cloudflareTurnstileApi = ky.extend({
  baseUrl: "https://challenges.cloudflare.com/turnstile/v0/",
});

const cloudflareRouter = createTRPCRouter({
  verifyToken: baseProcedure
    .input(Token)
    .output(ValidationResponse.options[0])
    .mutation(async (opts) => {
      const params = ValidationRequestParams.parse({
        secret: env.CF_TURNSTILE_SECRET_KEY,
        response: opts.input,
        idempotency_key: crypto.randomUUID(),
      });

      const response = await cloudflareTurnstileApi
        .post("siteverify", { json: params })
        .json(ValidationResponse);

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
