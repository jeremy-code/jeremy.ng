import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  presets: ["@pandacss/preset-panda", "@park-ui/panda-preset"],
  preflight: true,
  minify: true,
  importMap: "@/lib/styled",
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  globalCss: {
    extend: {
      html: { h: "full", "--global-font-body": "{fonts.sans}" },
      body: { h: "full", display: "flex", flexDir: "column" },
      "body > *": { flex: "1 0 auto" },
      "header, footer": { flex: "none" },
    },
  },
  theme: {
    extend: {
      tokens: {
        fonts: { sans: { value: "{fonts.outfit}, var(--font-fallback)" } },
      },
    },
  },
  utilities: {
    extend: {
      underline: {
        className: "underline",
        shorthand: "ul",
        values: ["always", "hover", "none"],
        transform: (value: string) =>
          ({
            always: { textDecoration: "underline" },
            none: { textDecoration: "none" },
            hover: {},
          })[value],
      },
    },
  },
  jsxFramework: "react",
});
