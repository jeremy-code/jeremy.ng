import { z } from "zod";

const SecretKey = z.union([
  z.string().startsWith("0x").length(35),
  // Valid secret keys for testing
  // https://developers.cloudflare.com/turnstile/troubleshooting/testing/#test-secret-keys
  z.enum([
    "1x0000000000000000000000000000000AA",
    "2x0000000000000000000000000000000AA",
    "3x0000000000000000000000000000000AA",
  ]),
]);

const SiteKey = z.union([
  z.string().startsWith("0x").length(24),
  // Valid sitekeys for testing
  // https://developers.cloudflare.com/turnstile/troubleshooting/testing/
  z.enum([
    "1x00000000000000000000AA",
    "2x00000000000000000000AB",
    "1x00000000000000000000BB",
    "2x00000000000000000000BB",
    "3x00000000000000000000FF",
  ]),
]);

const Token = z.string().max(2048, {
  error:
    "Too big: expected Cloudflare Turnstile token to have <=2048 characters",
});
type Token = z.infer<typeof Token>;

// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#request-format
const ValidationRequestParams = z.object({
  secret: SecretKey,
  response: Token,
  remoteip: z.union([z.ipv4(), z.ipv6()]).optional(),
  idemptotency_key: z.uuid().optional(),
});
type ValidationRequestParams = z.infer<typeof ValidationRequestParams>;

// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#error-codes-reference
const ErrorCode = z.enum([
  "missing-input-secret",
  "invalid-input-secret",
  "missing-input-response",
  "invalid-input-response",
  "bad-request",
  "timeout-or-duplicate",
  "internal-error",
]);

// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#response-fields
const ValidationResponse = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    challenge_ts: z.iso.datetime({ precision: 3 }),
    hostname: z.string(),
    "error-codes": z.array(ErrorCode),
    action: z.string(),
    cdata: z.string(),
  }),
  z.object({
    success: z.literal(false),
    "error-codes": z.array(ErrorCode).nonempty(),
  }),
]);
type ValidationResponse = z.infer<typeof ValidationResponse>;

export {
  SecretKey,
  SiteKey,
  Token,
  ValidationRequestParams,
  ValidationResponse,
};
