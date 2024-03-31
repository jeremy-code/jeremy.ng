import React, { type ReactNode } from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--fonts-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://jeremy.ng"),
  title: { default: "Jeremy Nguyen", template: "%s | Jeremy Nguyen" },
  description: "Jeremy Nguyen's personal site",
  applicationName: "jeremy.ng",
  authors: { name: "Jeremy Nguyen", url: "https://jeremy.ng" },
  keywords: ["Jeremy", "Nguyen", "portfolio", "personal", "website"],
  creator: "Jeremy Nguyen",
};

const RootLayout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    /**
     * @remarks
     * `suppressHydrationWarning` is necessary since html element is updated by
     * next-themes for dark mode -- property only applies one level deep, so
     * hydration warnings won't be blocked on children elements
     */
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
