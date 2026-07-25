import { createFileRoute } from "@tanstack/react-router";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";

import { env } from "#config/env";

const Route = createFileRoute("/og-image.jpg")({
  server: {
    handlers: {
      GET() {
        const imageResponse = new ImageResponse(
          <div tw="size-full flex justify-center items-center gap-8 bg-white">
            {/* Margin 0, since Tailwind CSS reset is not loaded */}
            <img
              tw="m-0"
              width="150"
              height="150"
              src={`${env.VITE_BASE_URL}/favicon.svg`}
            />
            <p tw="m-0 font-medium text-8xl text-slate-950 tracking-tight">
              Jeremy Nguyen
            </p>
          </div>,
          {
            width: 1200,
            height: 630,
            format: "jpeg",
            fonts: googleFonts([{ name: "Lexend", weight: [500] }]),
          },
        );
        imageResponse.headers.append("Cache-Control", "public, max-age=3600");
        imageResponse.headers.append("CDN-Cache-Control", "max-age=7200");

        return imageResponse;
      },
    },
  },
});

export { Route };
