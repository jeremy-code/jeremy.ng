"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { TrpcReactProvider } from "#lib/trpc/client";

const Devtools =
  process.env.NODE_ENV === "development" ?
    await import("./Devtools").then((mod) => mod.Devtools)
  : () => null;

/**
 * Provides global application context.
 */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <TrpcReactProvider>
        {children} <Devtools />
      </TrpcReactProvider>
    </ThemeProvider>
  );
};
