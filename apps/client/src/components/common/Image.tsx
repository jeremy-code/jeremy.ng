import type { ComponentPropsWithRef } from "react";

import { Image as UnpicImage } from "@unpic/react/base";
import type { TransformerFunction } from "unpic";
import {
  transform as cloudflareTransform,
  type CloudflareOperations,
  type CloudflareOptions,
} from "unpic/providers/cloudflare";

import { env } from "#config/env";

// https://github.com/microsoft/TypeScript/issues/46361
type DistributedOmit<T, K extends PropertyKey> =
  T extends unknown ? Omit<T, K> : never;

type ImageProps = DistributedOmit<
  ComponentPropsWithRef<
    typeof UnpicImage<CloudflareOperations, CloudflareOptions>
  >,
  "transformer"
>;

const CLOUDFLARE_DOMAIN = new URL(env.VITE_BASE_URL).host;

const baseTransform: TransformerFunction<
  CloudflareOperations,
  CloudflareOptions
> = (src) => (typeof src === "string" ? src : src.toString());

const transform = import.meta.env.DEV ? baseTransform : cloudflareTransform;

const Image = (props: ImageProps) => {
  return (
    <UnpicImage
      {...props}
      // Default Unpic breakpoints and Tailwind CSS breakpoints
      // 20rem, 40rem (sm), 48rem (md), 60rem (lg), 64rem, 80rem (xl), 96rem (2xl)
      breakpoints={props.breakpoints ?? [320, 640, 768, 960, 1024, 1280, 1536]}
      transformer={transform}
      options={{
        domain: CLOUDFLARE_DOMAIN,
        ...props.options,
      }}
    />
  );
};

export { Image, type ImageProps };
