import {
  createBundledHighlighter,
  createSingletonShorthands,
  type DynamicImportLanguageRegistration,
  type DynamicImportThemeRegistration,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const bundledLanguages = {
  css: () => import("@shikijs/langs/css"),
  html: () => import("@shikijs/langs/html"),
  javascript: () => import("@shikijs/langs/javascript"),
  json: () => import("@shikijs/langs/json"),
  jsx: () => import("@shikijs/langs/jsx"),
  python: () => import("@shikijs/langs/python"),
  shell: () => import("@shikijs/langs/shell"),
  tsx: () => import("@shikijs/langs/tsx"),
  typescript: () => import("@shikijs/langs/typescript"),
  yaml: () => import("@shikijs/langs/yaml"),
} satisfies Record<string, DynamicImportLanguageRegistration>;

type BundledLanguage = keyof typeof bundledLanguages;

const bundledThemes = {
  "github-dark-default": () => import("@shikijs/themes/github-dark-default"),
  "github-light-default": () => import("@shikijs/themes/github-light-default"),
} satisfies Record<string, DynamicImportThemeRegistration>;

type BundledTheme = keyof typeof bundledThemes;

const regexCache = new Map<string, RegExp | Error>();

// https://shiki.matsu.io/guide/shorthands#create-shorthands-with-fine-grained-bundles
const createHighlighter = /* @__PURE__ */ createBundledHighlighter<
  BundledLanguage,
  BundledTheme
>({
  langs: bundledLanguages,
  themes: bundledThemes,
  /**
   * Since Cloudflare Workers doesn't support initializing WASM from binary and
   * because the WASM file is relatively large, the native JavaScript RegExp
   * engine is used instead
   *
   * @see {@link https://shiki.matsu.io/guide/install#cloudflare-workers}
   */
  engine: () =>
    createJavaScriptRegexEngine({
      cache: regexCache,
    }),
});

const { codeToHast } =
  /* @__PURE__ */ createSingletonShorthands(createHighlighter);

export {
  codeToHast,
  bundledLanguages,
  type BundledLanguage,
  bundledThemes,
  type BundledTheme,
};
