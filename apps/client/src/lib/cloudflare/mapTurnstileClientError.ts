// developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/error-codes/
const TURNSTILE_CLIENT_ERRORS = {
  /* Initialization problems */
  "100010": "Widget initialization failed",
  "100020": "Multiple initialization attempts",
  "100030": "Invalid widget state",
  /* Invalid parameters (network) */
  "102010": "Invalid challenge response",
  "102020": "Network timeout during challenge",
  "102030": "Corrupted challenge data",
  /* Invalid parameters (browser) */
  "103010": "Browser compatibility issue",
  "103020": "JavaScript execution error",
  "103030": "Browser extension interference",
  /* Invalid parameters (client-side) */
  "104010": "Invalid widget configuration",
  "104020": "Missing required parameters",
  "104030": "Parameter type mismatch",
  /* API compatibility */
  "105010": "Deprecated API method",
  "105020": "Invalid API configuration",
  "105030": "Unsupported feature usage",
  /* Invalid parameters (general) */
  "106010": "Generic parameter error",
  "106020": "Parameter validation failed",
  /* Configuration issues */
  "110100": "Invalid sitekey",
  "110110": "Sitekey not found",
  "110200": "Domain not authorized",
  "110420": "Rate limiting active",
  "110430": "Account suspended",
  "110500": "Browser not supported",
  "110510": "Feature not available",
  /* Network or loading issues */
  "120010": "Script loading failed",
  "120020": "Resource timeout",
  "120030": "CDN unavailable",
  /* Widget issues */
  "200010": "Widget already rendered",
  "200100": "Widget not found",
  "200500": "Widget state error",
  /* Generic Challenge failure */
  // "300*": "Generic challenge failure",
  /* Client configuration */
  "400020": "Invalid widget size",
  "400030": "Invalid appearance",
  "400040": "Invalid theme",
  // "600*": "Generic challenge failure",
} as const;

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
