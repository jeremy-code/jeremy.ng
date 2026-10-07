import { TURNSTILE_CLIENT_ERRORS } from "./constants";

type TurnstileClientErrorCode = keyof typeof TURNSTILE_CLIENT_ERRORS;

type TurnstileClientErrorMessage =
  | (typeof TURNSTILE_CLIENT_ERRORS)[TurnstileClientErrorCode]
  | "Generic challenge failure"
  | "Unknown client error";

const isTurnstileErrorCode = (
  value: unknown,
): value is TurnstileClientErrorCode =>
  typeof value === "string" && value in TURNSTILE_CLIENT_ERRORS;

const getTurnstileClientErrorMessage = (
  errorString: string,
): TurnstileClientErrorMessage => {
  if (errorString.startsWith("300") || errorString.startsWith("600")) {
    return "Generic challenge failure";
  } else if (isTurnstileErrorCode(errorString)) {
    return TURNSTILE_CLIENT_ERRORS[errorString];
  }
  return "Unknown client error";
};

export { getTurnstileClientErrorMessage };
