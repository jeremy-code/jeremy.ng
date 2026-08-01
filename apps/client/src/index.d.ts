import type { JSX as ReactJSX } from "react/jsx-runtime";

declare global {
  /**
   * In `react@19`, using the global `JSX` namespace is deprecated. However,
   * since `hast-util-to-jsx-runtime` still relies on the global `JSX`
   * namespace, for best TypeScript compatibility, it is defined here
   *
   * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/issues/52321}
   * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/pull/64464}
   * @see {@link https://github.com/syntax-tree/hast-util-to-jsx-runtime/pull/6}
   * @see {@link https://www.typescriptlang.org/docs/handbook/jsx.html#the-jsx-namespace}
   */
  namespace JSX {
    type ElementClass = ReactJSX.ElementClass;
    type Element = ReactJSX.Element;
    type IntrinsicElements = ReactJSX.IntrinsicElements;
  }
}
