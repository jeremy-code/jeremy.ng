/**
 * @see {@link https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/error-codes/}
 */
const TURNSTILE_CLIENT_ERRORS = {
  "110100": "Invalid sitekey",
  "110110": "Sitekey not found",
  "110200": "Domain not authorized",
  "110600": "Challenge timed out",
  "110620": "Interaction timed out",
  "200100": "Clock or cache problem",
  "200500": "Iframe load error",
  // "300*": "Generic challenge failure",
  "400020": "Invalid sizekey",
  "400070": "Sitekey disabled",
  // "600*": "Generic challenge failure",
} as const;

export { TURNSTILE_CLIENT_ERRORS };
