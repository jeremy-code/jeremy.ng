import {
  array,
  ip,
  isoTimestamp,
  length,
  literal,
  object,
  optional,
  Output,
  picklist,
  startsWith,
  string,
  union,
  uuid,
  variant,
} from "valibot";

export const TurnstileResponse = string();

export type TurnstileResponse = Output<typeof TurnstileResponse>;

export const ValidationRequestParams = object({
  secret: union([
    string([startsWith("0x"), length(35)]),
    // valid secret keys for testing
    // https://developers.cloudflare.com/turnstile/reference/testing/
    picklist([
      "1x0000000000000000000000000000000AA",
      "2x0000000000000000000000000000000AA",
      "3x0000000000000000000000000000000AA",
    ]),
  ]),
  response: TurnstileResponse,
  remoteip: optional(string([ip()])),
  idempotency_key: optional(string([uuid()])),
});

export type ValidationRequestParams = Output<typeof ValidationRequestParams>;

// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#error-codes
const ErrorCode = picklist([
  "missing-input-secret",
  "invalid-input-secret",
  "missing-input-response",
  "invalid-input-response",
  "invalid-widget-id",
  "invalid-parsed-secret",
  "bad-request",
  "timeout-or-duplicate",
  "internal-error",
]);

export const ValidationResponse = variant("success", [
  object({
    success: literal(true),
    challenge_ts: string([isoTimestamp()]),
    hostname: string(),
    "error-codes": array(ErrorCode),
    action: string(),
    cdata: string(),
  }),
  object({
    success: literal(false),
    "error-codes": array(ErrorCode),
  }),
]);

export type ValidationResponse = Output<typeof ValidationResponse>;
