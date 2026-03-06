"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

import { TrpcReactProvider } from "#lib/trpc/client";
import { env } from "#utils/env";
import { Toaster } from "@jeremyng/ui/components/Toaster";

const Devtools =
  env.NODE_ENV === "development" ?
    await import("./Devtools").then((mod) => mod.Devtools)
  : () => null;

/**
 * Provides global application context.
 */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <TrpcReactProvider>
        {children}
        <Devtools />
        <Toaster />
      </TrpcReactProvider>
    </ThemeProvider>
  );
};
