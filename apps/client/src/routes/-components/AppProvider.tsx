import type { ReactNode } from "react";
import { lazy } from "react";

import { ThemeProvider } from "next-themes";

import { TrpcReactProvider } from "#lib/trpc/client";
import { Toaster } from "@jeremyng/ui/components/Toaster";

const Devtools =
  import.meta.env.DEV ?
    lazy(() => import("./Devtools").then((mod) => ({ default: mod.Devtools })))
  : () => null;

/**
 * Provides global application context.
 */
const AppProvider = ({ children }: { children: ReactNode }) => {
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

export { AppProvider };
