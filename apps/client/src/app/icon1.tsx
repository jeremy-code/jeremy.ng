/**
 * @file In the case that SVG favicons are not supported, renders PNG icons.
 * File is named `icon1.tsx`, so that `icon.svg` has priority.
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons}
 */

import { ImageResponse } from "next/og";

import { Logo } from "#components/misc/Logo";

export const SIZES = {
  "icon-16x16": { width: 16, height: 16 },
  "icon-32x32": { width: 32, height: 32 },
  "icon-192x192": { width: 192, height: 192 },
  "icon-512x512": { width: 512, height: 512 },
};

/**
 * Returns an array of image metadata for each size of the icon.
 *
 * Only raster images like `image/png` is supported, hence
 * {@link file://./icon.svg} is its own file.
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata}
 */
export const generateImageMetadata = () =>
  Object.entries(SIZES).map(([id, size]) => ({
    id,
    alt: `Icon ${size.width}x${size.height}`,
    size,
    contentType: "image/png",
  }));

const Icon = async ({ id }: { id: Promise<keyof typeof SIZES> }) => {
  const size = SIZES[await id];

  return new ImageResponse(<Logo {...size} />, { ...size });
};

export default Icon;
