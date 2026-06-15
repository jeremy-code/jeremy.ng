import { createBundledHighlighter } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const bundledLanguages = {
  typescript: () => import("@shikijs/langs/typescript"),
  javascript: () => import("@shikijs/langs/javascript"),
  json: () => import("@shikijs/langs/json"),
  jsx: () => import("@shikijs/langs/jsx"),
  css: () => import("@shikijs/langs/css"),
  tsx: () => import("@shikijs/langs/tsx"),
};
type Language = keyof typeof bundledLanguages;

const bundledThemes = {
  "github-light": () => import("@shikijs/themes/github-light"),
  "github-dark": () => import("@shikijs/themes/dark-plus"),
};
type Theme = keyof typeof bundledThemes;

const createHighlighter = /* @__PURE__ */ createBundledHighlighter<
  Language,
  Theme
>({
  langs: bundledLanguages,
  themes: bundledThemes,
  /**
   * Since Cloudflare Workers doesn't support initializing WASM from binary and
   * because the WASM file is relatively large, the native JavaScript RegEx
   * engine is used instead
   *
   * @see {@link https://shiki.matsu.io/guide/install#cloudflare-workers}
   */
  engine: () => createJavaScriptRegexEngine(),
});

export { createHighlighter, type Theme, type Language };
