import "@jeremyng/ui/globals.css";

import type { ReactNode } from "react";

import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import { getBaseUrl } from "#utils/getBaseUrl";

import { AppProvider } from "./_components/AppProvider";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: { default: "Jeremy Nguyen", template: "%s | Jeremy Nguyen" },
  description: "Personal website for Jeremy Nguyen",
  applicationName: "Jeremy Nguyen",
  authors: { name: "Jeremy Nguyen", url: "https://jeremy.ng" },
  keywords: [
    "personal-site",
    "portfolio",
    "personal",
    "personal-website",
    "portfolio-site",
    "personal-portfolio",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Jeremy Nguyen",
  publisher: "Jeremy Nguyen",
};

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
