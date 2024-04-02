// This import is required for standard CSS properties to be autocompleted.
import "csstype";

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY: string;
      CF_TURNSTILE_SECRET_KEY: string;
      ANALYZE?: boolean;
    }
  }
}

// https://npmjs.com/package/csstype#what-should-i-do-when-i-get-type-errors
declare module "csstype" {
  interface Properties {
    // Allow CSS custom properties (e.g. --my-property)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: `--${string}`]: any;
  }
}
