import { ImageResponse } from "next/og";

import { Logo } from "#components/misc/Logo";

// See https://developer.apple.com/design/human-interface-guidelines/app-icons#App-icon-sizes
export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

const AppleIcon = () =>
  new ImageResponse(
    <div
      /**
       * @remarks
       *
       * `<div>` must have explicit `display: flex` or `display: none` if it has
       * more than one child node in Satori.
       *
       * @remarks
       *
       * `apple-touch-icon` cannot have a transparent background and defaults
       * to black
       */
      tw="flex bg-white p-8"
      style={{ width: `${size.width}px`, height: `${size.height}px` }}
    >
      <Logo width="100%" height="100%" />
    </div>,
    { ...size },
  );

export default AppleIcon;
