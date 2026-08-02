import { createFileRoute } from "@tanstack/react-router";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";

import { env } from "#utils/env";

const googleFontsCache = new Map<string, Promise<string>>();
const fetchCache = new Map<string, Promise<ArrayBuffer>>();

const Route = createFileRoute("/og-image.jpg")({
  server: {
    handlers: {
      async GET() {
        const imageResponse = new ImageResponse(
          <div tw="flex size-full items-center justify-center gap-8 bg-white">
            <div
              tw="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(at right bottom, oklch(54.5% 0.164 261.28 / .25) 0%, transparent 50%)",
              }}
            />
            <div
              tw="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(at left top, oklch(54.5% 0.164 261.28 / .25) 0%, transparent 50%)",
              }}
            />
            <img
              width="150"
              height="150"
              src={`${env.VITE_BASE_URL}/favicon.svg`}
            />
            <p tw="text-8xl font-medium tracking-tight text-slate-950">
              Jeremy Nguyen
            </p>
          </div>,
          {
            width: 1200,
            height: 630,
            format: "jpeg",
            fonts: googleFonts({
              families: [{ name: "Lexend", weight: [500] }],
              cache: googleFontsCache,
            }),
            images: {
              fetchCache,
            },
            headers: {
              "Cache-Control": "public, max-age=3600",
              "CDN-Cache-Control":
                "public, max-age=86400, stale-while-revalidate=604800",
            },
          },
        );

        try {
          await imageResponse.ready;
          const clonedImageResponse = imageResponse.clone();
          const arrayBuffer = await clonedImageResponse.arrayBuffer();
          /**
           * Cloudflare Workers uses the v8 version matching Google Chrome's
           * stable channel, so Uint8Array.toHex is avaliable
           *
           * @see {@link https://developers.cloudflare.com/workers/runtime-apis/web-standards/#javascript-standards}
           */
          const digest = new Uint8Array(
            await crypto.subtle.digest("SHA-256", arrayBuffer),
          ).toHex();

          imageResponse.headers.set("ETag", `"${digest}"`);
          return imageResponse;
        } catch {
          return new Response(
            "Failed to generate image. Please try again later",
            { status: 500 },
          );
        }
      },
    },
  },
});

export { Route };
