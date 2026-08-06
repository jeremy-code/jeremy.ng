---
title: Passing callback functions as a className in Base UI
lede: Use callback functions in the className and style props in Base UI
authors:
  - name: Jeremy Nguyen
tags:
  - react
mastodonId: "117046442680575109"
---

A neat feature of Base UI is that you can style all components by passing a callback function to both its [`className`](https://base-ui.com/react/handbook/styling#css-classes) and [`style`](https://base-ui.com/react/handbook/styling#style-prop) props. This is usually overlooked in favor of styling with either `data-*` attributes or CSS variables. This allows you to style a component based on its specific `State`. For example, this is the `State` provided in a `<Separator>`:

```typescript
// https://github.com/mui/base-ui/blob/1a2ca3c9f8a39bd8c0dda939a7a23b72da226124/packages/react/src/separator/Separator.tsx#L37-L42
export interface SeparatorState {
  /**
   * The orientation of the separator.
   */
  orientation: Orientation;
}
```

The thing about this feature is that usually, one doesn't expect a component's `className` to be of type `string  | undefined | ((state: State) => string | undefined)` or its style to be `React.CSSProperties | undefined | ((state: State) => React.CSSProperties | undefined)`. This can cause TypeScript errors or unexpected behavior if consumers of a component use a function unplanned.

For example, in the popular design system [shadcn/ui](https://ui.shadcn.com/), a common pattern is adding a utility function `cn` to merge multiple `className` values.[^1]

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
```

Suppose you had an `<Input>` component like the following (similar to shadcn/ui's [`<Input>`](https://ui.shadcn.com/docs/components/base/input) component but shortened for brevity):

```tsx
import { Input as InputPrimitive } from "@base-ui/react/input";
import type { ComponentProps } from "react";
import { cn } from "../utils/cn";

export const Input = ({
  className,
  ...props
}: ComponentProps<typeof InputPrimitive>) => {
  return (
    <InputPrimitive
      {...props}
      className={cn(
        "flex h-9 w-full appearance-none rounded border border-gray-300 bg-white py-1 text-start dark:border-gray-700 dark:bg-gray-950",
        className,
      )}
    />
  );
};
```

And then you attempted to use the aforementioned feature by passing a callback function to its `className` prop:

```tsx
<Input className={(state) => (state.dirty ? "border-red-600" : undefined)} />
```

...you would probably notice two strange things:

1. The function is completely ignored
2. There is no TypeScript error despite passing a function for a `className`

## An aside on TypeScript

This is how `ClassValue` from `clsx` is defined in TypeScript:

```typescript
// https://github.com/lukeed/clsx/blob/925494cf31bcd97d3337aacd34e659e80cae7fe2/clsx.d.mts#L1-L3
export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];
```

The most curious option in `ClassValue` is the `ClassDictionary` type, which is `Record<string, any>`.

In TypeScript, `Record<string, any>` behaves differently compared to other types with an [index signature](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures). Typically, if you attempt to assign a function to something with an index signature, you'll get an error like this:

```typescript
// Type '() => void' is not assignable to type 'Record<string, unknown>'.
//   Index signature for type 'string' is missing in type '() => void'.
const foo: Record<string, unknown> = () => {};
```

However, for `Record<string, any>`, this is not checked, so effectively, the type accepts any object, including functions.

This issue was raised in the TypeScript GitHub ([microsoft/TypeScript#41746](https://github.com/microsoft/TypeScript/issues/41746)), where [@RyanCavanaugh](https://github.com/RyanCavanaugh) confirms this is intentional behavior.[^2]

## An aside on `clsx`

To make a long story short, on all inputs (including the elements of arrays), `clsx` returns a string value using [`toVal`](https://github.com/lukeed/clsx/blob/925494cf31bcd97d3337aacd34e659e80cae7fe2/src/index.js#L1-L28). Since `typeof className === "function"`, it simply returns an empty string.

## Solution

While this is all fine for `shadcn/ui` users, there are other times when this type can become problematic. For example, if you use `tailwind-variants`, you'll get a TypeScript error when passing `className` directly:

```tsx
import { Input as InputPrimitive } from "@base-ui/react/input";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  base: "",
});

export const Input = ({
  className,
  ...props
}: ComponentProps<typeof InputPrimitive>) => {
  // Type 'string | ((state: InputState) => string | undefined) | undefined' is not assignable to type 'ClassNameValue'.
  //   Type '(state: InputState) => string | undefined' is not assignable to type 'ClassNameValue'.ts(2322)
  return <InputPrimitive {...props} className={inputVariants({ className })} />;
};
```

### `composeRenderProps`

In another React UI library, [React Aria](https://react-aria.adobe.com/) by Adobe, this concern was solved with the helper function `composeRenderProps`. I'll be referring to it by that name for consistency; although, given Base UI conventions, it probably should be called something like `composeState` or `composeBaseUiState`.

```typescript
// https://github.com/adobe/react-spectrum/blob/d038f46152341b0afb15b191f34a4b60a074d7a8/packages/react-aria-components/src/utils.tsx#L284-L294
/**
 * A helper function that accepts a user-provided render prop value (either a static value or a
 * function), and combines it with another value to create a final result.
 */
export function composeRenderProps<T, U, V extends T>(
  // https://stackoverflow.com/questions/60898079/typescript-type-t-or-function-t-usage
  value: T extends any ? T | ((renderProps: U) => V) : never,
  wrap: (prevValue: T, renderProps: U) => V,
): (renderProps: U) => V {
  return (renderProps) =>
    wrap(typeof value === "function" ? value(renderProps) : value, renderProps);
}
```

By using this function, we can correctly handle function `className` values and avoid TypeScript errors:

```tsx
<InputPrimitive
  {...props}
  className={composeRenderProps(props.className, (className) =>
    inputVariants({ size, className }),
  )}
/>
```

## Closing thoughts

I honestly find it a bit strange that, as far as I know, this bug hasn't been noticed by any `shadcn/ui` users despite the library being so popular. The closest documented issue I have found on this is here: [shadcn-ui/ui#11303](https://github.com/shadcn-ui/ui/issues/11303).

While there is a `mergeProps` helper in Base UI, per documentation,[^3] it only works with string `className` values. You can see this is true in [the source code](https://github.com/mui/base-ui/blob/b34551d644f2e58ebf8fc1050d949f6654ceca6c/packages/react/src/merge-props/mergeProps.ts#L278-L292). I think it would be very useful if Base UI were to either add a function similar to `composeRenderProps` or somehow add that functionality to `mergeProps`.

Using `composeRenderProps` honestly often makes the code very verbose, but it also opens up some possibilities in terms of styling. For example, one can treat the `State` as a variant, and style it accordingly with [`tailwind-variants`](https://www.tailwind-variants.org/):

```tsx
import type { ComponentProps } from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { tv } from "tailwind-variants";

import { composeRenderProps } from "../utils/composeRenderProps";

const separatorVariants = tv({
  base: null,
  variants: {
    orientation: {
      horizontal: "h-px border-t",
      vertical: "w-px border-s",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export const Separator = ({
  variant,
  size,
  ...props
}: ComponentProps<typeof SeparatorPrimitive>) => {
  return (
    <SeparatorPrimitive
      {...props}
      className={composeRenderProps(props.className, (className, state) =>
        separatorVariants({ className, ...state }),
      )}
    />
  );
};
```

There are, of course, other use cases, but that is the most obvious to me.

Another minor caveat is that if you are using React Server Components, a function on the server that isn't a server action cannot be passed as a prop to a client component. However, if you accidentally do that, React will [notify you with an error](https://github.com/react/react/blob/3a717e42438afac81020cdec297dadb5613a4304/scripts/error-codes/codes.json#L364), so I don't expect this to be a real concern.

Furthermore, some people like to destructure `className` from their props. While you can do this without runtime errors, it does result in a bit of a codesmell since there are now two variables named `className` (the destructured prop and the one provided in the callback). Since the callback `className` has higher priority within its scope, this won't result in any actual errors in runtime, but it's probably best practice to simply pass it as `props.className` for clarity.

<!-- Footnotes -->

[^1]: https://ui.shadcn.com/docs/installation/manual#add-a-cn-helper

[^2]: https://github.com/microsoft/TypeScript/issues/41746#issuecomment-737361754

[^3]: https://base-ui.com/react/utils/use-render#merging-props
