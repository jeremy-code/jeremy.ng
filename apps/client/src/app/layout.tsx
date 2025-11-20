import "@jeremyng/ui/globals.css";

import type { ReactNode } from "react";

import { Lexend } from "next/font/google";

import { AppProvider } from "./_components/AppProvider";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    /**
     * @remarks
     * `suppressHydrationWarning` is necessary since `<html>` element must be
     * updated by `next-themes` for dark mode. The property only applies one
     * level deep, so hydration warnings won't be blocked on children elements.
     *
     * @see {@link https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors}
     */
    <html suppressHydrationWarning className={lexend.variable} lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
