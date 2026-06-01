import { TURNSTILE_CLIENT_ERRORS } from "./constants";

type TurnstileClientErrorCode = keyof typeof TURNSTILE_CLIENT_ERRORS;

type TurnstileClientErrorMessage =
  | (typeof TURNSTILE_CLIENT_ERRORS)[TurnstileClientErrorCode]
  | "Generic challenge failure"
  | "Unknown client error";

const mapTurnstileClientError = (
  errorString: string,
): TurnstileClientErrorMessage => {
  if (errorString.startsWith("300") || errorString.startsWith("600")) {
    return "Generic challenge failure";
  } else if (errorString in TURNSTILE_CLIENT_ERRORS) {
    return TURNSTILE_CLIENT_ERRORS[errorString as TurnstileClientErrorCode];
  }
  return "Unknown client error";
};

export { mapTurnstileClientError };
