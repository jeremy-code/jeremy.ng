"use client";

import { useCallback, useRef } from "react";
import Script, { type ScriptProps } from "next/script";

import { Skeleton } from "@/components/ui";
import { Box, type BoxProps } from "@/lib/styled/jsx";

type CaptchaProps = {
  params?: Omit<Turnstile.RenderParameters, "sitekey">;
} & BoxProps;

export const Captcha = ({ params, ...rest }: CaptchaProps) => {
  const captchaRef = useRef<HTMLDivElement>(null);

  const onLoadHandler: ScriptProps["onLoad"] = useCallback(() => {
    if (!captchaRef.current || !turnstile) return;

    turnstile.render(captchaRef.current, {
      // Must be prefixed with NEXT_PUBLIC_ to be exposed to the client
      sitekey: process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY,
      ...params,
    });
  }, [params]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onLoad={onLoadHandler}
      />
      <Box
        ref={captchaRef}
        // dimensions from https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#widget-size
        width="300px"
        height="65px"
        pos="relative"
        {...rest}
      >
        <Skeleton zIndex="hide" pos="absolute" inset={0} rounded="none" />
      </Box>
    </>
  );
};
