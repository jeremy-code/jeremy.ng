import { basename } from "node:path";
import { cwd } from "node:process";

import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { fontless } from "fontless";
import { Features } from "lightningcss";
import { glob } from "tinyglobby";
import { defineConfig, loadEnv, type UserConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import { viteStaticCopy } from "vite-plugin-static-copy";
import * as z from "zod";

const posts = (await glob("./blog/*.md")).map((path) => basename(path, ".md"));

const viteConfig = defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), "");

  const isAnalyzerEnabled =
    env.ANALYZE !== undefined && z.stringbool().parse(env.ANALYZE);

  return {
    base: env.BASE_URL !== undefined ? env.BASE_URL : "/",
    plugins: [
      cloudflare({
        viteEnvironment: { name: "ssr", childEnvironments: ["rsc"] },
      }),
      contentCollections(),
      tanstackStart({
        rsc: {
          enabled: true,
        },
        router: {
          generatedRouteTree: "generated/routeTree.gen.ts",
          codeSplittingOptions: {
            defaultBehavior: [
              [
                "loader",
                "component",
                "pendingComponent",
                "errorComponent",
                "notFoundComponent",
              ],
            ],
          },
        },
        pages: [
          { path: "/" },
          { path: "/blog" },
          ...posts.map((post) => ({ path: `/blog/${post}` })),
        ],
        sitemap: {
          enabled: true,
          host: "https://jeremy.ng",
        },
        importProtection: {
          enabled: true,
          client: {
            specifiers: ["@jeremyng/api"],
          },
        },
      }),
      rsc(),
      react({ compiler: true }),
      tailwindcss(),
      fontless(),
      viteStaticCopy({
        targets: [{ src: "blog/assets", dest: "." }],
        environment: "client",
      }),
      ...(isAnalyzerEnabled ? [analyzer()] : []),
    ],
    define: {
      // https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#default-variables
      "import.meta.env.WORKERS_CI_BRANCH": JSON.stringify(
        env.WORKERS_CI_BRANCH ?? "main",
      ),
    },
    server: {
      port: env.PORT !== undefined ? Number(env.PORT) : 3000,
    },
    build: {
      minify: "oxc",
      cssMinify: "lightningcss",
    },
    css: {
      transformer: "lightningcss",
      lightningcss: {
        exclude: Features.LightDark,
      },
    },
  } satisfies UserConfig;
});

export default viteConfig;
