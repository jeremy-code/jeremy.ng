"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { TrpcReactProvider } from "#lib/trpc/client";

/**
 * Provides global application context.
 */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <TrpcReactProvider>{children}</TrpcReactProvider>
    </ThemeProvider>
  );
};
