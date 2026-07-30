import * as z from "zod";

const secretKeySchema = z.union([
  z.string().startsWith("0x").length(35),
  // Valid secret keys for testing
  // https://developers.cloudflare.com/turnstile/troubleshooting/testing/#test-secret-keys
  z.enum([
    "1x0000000000000000000000000000000AA",
    "2x0000000000000000000000000000000AA",
    "3x0000000000000000000000000000000AA",
  ]),
]);

const siteKeySchema = z.union([
  z.string().startsWith("0x").length(24),
  // Valid sitekeys for testing
  // https://developers.cloudflare.com/turnstile/troubleshooting/testing/#test-sitekeys
  z.enum([
    "1x00000000000000000000AA",
    "2x00000000000000000000AB",
    "1x00000000000000000000BB",
    "2x00000000000000000000BB",
    "3x00000000000000000000FF",
  ]),
]);

const tokenSchema = z.string().max(2048, {
  error:
    "Too big: expected Cloudflare Turnstile token to have <=2048 characters",
});
type Token = z.infer<typeof tokenSchema>;

// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#request-format
const validationRequestParamsSchema = z.strictObject({
  secret: secretKeySchema,
  response: tokenSchema,
  remoteip: z.union([z.ipv4(), z.ipv6()]).optional(),
  idempotency_key: z.uuid().optional(),
});
type ValidationRequestParams = z.infer<typeof validationRequestParamsSchema>;

// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#error-codes-reference
const errorCodeSchema = z.enum([
  "missing-input-secret",
  "invalid-input-secret",
  "missing-input-response",
  "invalid-input-response",
  "bad-request",
  "timeout-or-duplicate",
  "internal-error",
]);
type ErrorCode = z.infer<typeof errorCodeSchema>;

// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#response-fields
const validationResponseSchema = z.discriminatedUnion("success", [
  z.strictObject({
    success: z.literal(true),
    challenge_ts: z.iso.datetime({ precision: 3 }),
    hostname: z.string(),
    "error-codes": z.array(errorCodeSchema),
    action: z.string(),
    cdata: z.string(),
    idempotency_key: z.uuid().optional(),
    metadata: z.strictObject({
      // Not documented by Cloudflare, but observed in practice
      interactive: z.boolean(),
      ephemeral_id: z.string().optional(),
    }),
  }),
  z.strictObject({
    success: z.literal(false),
    challenge_ts: z.iso.datetime({ precision: 3 }),
    hostname: z.string(),
    "error-codes": z.array(errorCodeSchema).nonempty(),
    action: z.string(),
    cdata: z.string(),
    // Not documented by Cloudflare, but observed in practice
    messages: z.array(z.string()),
    tokenId: z.string().optional(),
  }),
]);
type ValidationResponse = z.infer<typeof validationResponseSchema>;

export {
  secretKeySchema,
  siteKeySchema,
  tokenSchema,
  type Token,
  validationRequestParamsSchema,
  type ValidationRequestParams,
  errorCodeSchema,
  type ErrorCode,
  validationResponseSchema,
  type ValidationResponse,
};
