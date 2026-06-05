import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";

import type { ErrorCode } from "../schemas/cloudflare/turnstile";

type TrpcErrorLike = {
  message: string | undefined;
  code: TRPC_ERROR_CODE_KEY;
  cause?: unknown;
};

const cfTurnstileErrorToTrpcError: Record<ErrorCode, TrpcErrorLike> = {
  "missing-input-secret": {
    code: "INTERNAL_SERVER_ERROR",
    message:
      "Turnstile verification is misconfigured. The server secret key was not provided.",
  },
  "invalid-input-secret": {
    code: "INTERNAL_SERVER_ERROR",
    message:
      "Turnstile verification is misconfigured. The configured secret key is invalid.",
  },
  "missing-input-response": {
    code: "BAD_REQUEST",
    message:
      "Missing Turnstile token. Please complete the verification challenge and try again.",
  },
  "invalid-input-response": {
    code: "UNPROCESSABLE_CONTENT",
    message:
      "The Turnstile verification token is invalid, malformed, or has expired. Please retry the challenge.",
  },
  "bad-request": {
    code: "BAD_REQUEST",
    message:
      "The Turnstile verification request was malformed and could not be processed.",
  },
  "timeout-or-duplicate": {
    code: "CONFLICT",
    message:
      "This Turnstile token has already been used or has expired. Please complete the challenge again.",
  },
  "internal-error": {
    code: "BAD_GATEWAY",
    message:
      "Cloudflare Turnstile encountered an internal error while verifying the request. Please try again.",
  },
};

export { cfTurnstileErrorToTrpcError };
