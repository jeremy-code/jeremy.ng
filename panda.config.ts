import { defineConfig } from "@pandacss/dev";
import defaultPreset, { createPreset } from "@park-ui/panda-preset";

const switchRecipe = defaultPreset.theme?.extend?.slotRecipes?.switchRecipe;

export default defineConfig({
  presets: [
    "@pandacss/preset-panda",
    createPreset({ accentColor: "blue", grayColor: "slate" }),
  ],
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
      slotRecipes: {
        iconSwitch: {
          ...switchRecipe,
          className: "iconSwitch",
          jsx: ["IconSwitch", /IconSwitch\.+/],
          base: {
            ...switchRecipe?.base,
            thumb: {
              ...switchRecipe?.base?.thumb,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
        },
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
