import type { ReactNode } from "react";
import { lazy } from "react";

import { ThemeProvider } from "next-themes";

import { TrpcReactProvider } from "#lib/trpc/client";
import { ToastProvider } from "@jeremyng/ui/components/Toast";

const Devtools =
  import.meta.env.DEV ?
    lazy(() => import("./Devtools").then((mod) => ({ default: mod.Devtools })))
  : () => null;

/**
 * Provides global application context.
 */
const AppProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <TrpcReactProvider>
          {children}
          <Devtools />
        </TrpcReactProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export { AppProvider };
