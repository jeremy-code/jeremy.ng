import { createFileRoute, notFound } from "@tanstack/react-router";
import { render } from "takumi-js";
import { googleFonts } from "takumi-js/helpers";

import { getBlogPosts } from "#functions/getBlogPosts";
import { env } from "#utils/env";

const googleFontsCache = new Map<string, Promise<string>>();
const fetchCache = new Map<string, Promise<ArrayBuffer>>();

const Route = createFileRoute("/blog/$slug/og-image.jpg")({
  server: {
    handlers: {
      async GET({ request, params }) {
        const post = (await getBlogPosts()).find(
          (candidate) => candidate.slug === params.slug,
        );

        if (post === undefined) {
          throw notFound();
        }

        const image = (await render(
          <div tw="flex size-full flex-col items-start justify-between bg-white p-16">
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
            <div tw="m-0 flex items-center gap-4">
              <img
                width="60"
                height="60"
                src={`${env.VITE_BASE_URL}/favicon.svg`}
              />
              <p tw="text-5xl/0 font-medium tracking-tight text-slate-950">
                Jeremy Nguyen
              </p>
            </div>
            <div tw="text-8xl font-medium tracking-tight text-slate-950">
              {post.title}
            </div>
          </div>,
          {
            signal: request.signal,
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
          },
          /**
           * Typecast is necessary because output of `render` is typed as
           * `Promise<Uint8Array<ArrayBufferLike> | Buffer<ArrayBufferLike>>`,
           * while `Response` does not permit using `SharedArrayBuffer` as a
           * `BodyInit`
           *
           * @see {@link https://github.com/kane50613/takumi/issues/1060}
           */
        )) as Uint8Array<ArrayBuffer> | Buffer<ArrayBuffer>;

        /**
         * Cloudflare Workers uses the v8 version matching Google Chrome's
         * stable channel, so Uint8Array.toHex is avaliable
         *
         * @see {@link https://developers.cloudflare.com/workers/runtime-apis/web-standards/#javascript-standards}
         */
        const sha256Hash = new Uint8Array(
          await crypto.subtle.digest("SHA-256", image),
        ).toHex();

        return new Response(image, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=3600",
            "CDN-Cache-Control":
              "public, max-age=86400, stale-while-revalidate=604800",
            ETag: `"${sha256Hash}"`,
          },
        });
      },
    },
  },
});

export { Route };
