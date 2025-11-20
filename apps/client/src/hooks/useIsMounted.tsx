"use client";

import { useSyncExternalStore } from "react";

/**
 * @see {@link https://en.wikipedia.org/wiki/NOP_(code)#JavaScript}
 */
const noop = () => {};

/**
 * Returns whether the component is mounted on the client after hydration.
 *
 * This is useful when performing some actions only after the component has been
 * rendered client-side to prevent hydration errors.
 *
 * @see {@link https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content}
 */
export const useIsMounted = () => {
  return useSyncExternalStore(
    () => noop,
    () => true,
    () => false,
  );
};
