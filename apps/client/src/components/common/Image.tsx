import type { ComponentPropsWithRef } from "react";

import { Image as UnpicImage } from "@unpic/react";

import { env } from "#config/env";

type ImageProps = ComponentPropsWithRef<typeof UnpicImage>;

const CLOUDFLARE_DOMAIN = new URL(env.VITE_BASE_URL).host;

const Image = (props: ImageProps) => {
  return (
    <UnpicImage
      {...props}
      // Default Unpic breakpoints and Tailwind CSS breakpoints
      // 20rem, 40rem (sm), 48rem (md), 60rem (lg), 64rem, 80rem (xl), 96rem (2xl)
      breakpoints={props.breakpoints ?? [320, 640, 768, 960, 1024, 1280, 1536]}
      cdn={props.cdn ?? (import.meta.env.PROD ? "cloudflare" : undefined)}
      fallback={
        props.fallback ?? (import.meta.env.PROD ? "cloudflare" : undefined)
      }
      options={{
        ...props.options,
        ...(import.meta.env.PROD && {
          cloudflare: {
            ...props.options?.cloudflare,
            domain: CLOUDFLARE_DOMAIN,
          },
        }),
      }}
    />
  );
};

export { Image, type ImageProps };
