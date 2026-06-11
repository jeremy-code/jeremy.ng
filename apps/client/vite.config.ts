import { cloudflare } from "@cloudflare/vite-plugin";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { fontless } from "fontless";
import { Features } from "lightningcss";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import { z } from "zod";

const isAnalyzerEnabled =
  process.env.ANALYZE !== undefined &&
  z.stringbool().parse(process.env.ANALYZE);

const viteConfig = defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      router: {
        generatedRouteTree: "generated/routeTree.gen.ts",
      },
      pages: [{ path: "/" }],
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
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    fontless(),
    ...(isAnalyzerEnabled ? [analyzer()] : []),
  ],
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  build: {
    cssMinify: "lightningcss",
  },
  css: {
    transformer: "lightningcss",
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
});

export default viteConfig;
