import Script from "next/script";

import { Skeleton } from "@/components/ui";
import { Box, BoxProps } from "@/lib/styled/jsx";

export const Captcha = (props: BoxProps) => {
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" />
      <Box
        // dimensions from https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#widget-size
        width="300px"
        height="65px"
        pos="relative"
        className="cf-turnstile"
        // Must be prefixed with NEXT_PUBLIC_ to be exposed to the client
        data-sitekey={process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY}
        {...props}
      >
        <Skeleton zIndex="hide" pos="absolute" inset={0} rounded="none" />
      </Box>
    </>
  );
};
