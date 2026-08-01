import { createBundledHighlighter, type SpecialLanguage } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const bundledLanguages = {
  css: () => import("@shikijs/langs/css"),
  javascript: () => import("@shikijs/langs/javascript"),
  json: () => import("@shikijs/langs/json"),
  jsx: () => import("@shikijs/langs/jsx"),
  python: () => import("@shikijs/langs/python"),
  shell: () => import("@shikijs/langs/shell"),
  tsx: () => import("@shikijs/langs/tsx"),
  typescript: () => import("@shikijs/langs/typescript"),
};
const bundledLanguagesKeys = Object.keys(
  bundledLanguages,
) as (keyof typeof bundledLanguages)[];
type BundledLanguage = keyof typeof bundledLanguages;
type Language = BundledLanguage | SpecialLanguage;

const bundledThemes = {
  "github-dark-default": () => import("@shikijs/themes/github-dark-default"),
  "github-light-default": () => import("@shikijs/themes/github-light-default"),
};
const bundledThemesKeys = Object.keys(
  bundledThemes,
) as (keyof typeof bundledThemes)[];
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

export {
  createHighlighter,
  bundledThemesKeys,
  bundledLanguagesKeys,
  type BundledTheme,
  type BundledLanguage,
  type Language,
};
