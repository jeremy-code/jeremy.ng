import React, { type ReactNode } from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Footer, Navbar } from "@/components/layout";
import { Providers } from "@/components/misc/Providers";

import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--fonts-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://jeremy.ng"),
  title: { default: "Jeremy Nguyen", template: "%s | Jeremy Nguyen" },
  description: "Jeremy Nguyen's personal site",
  applicationName: "jeremy.ng",
  authors: { name: "Jeremy Nguyen", url: new URL("https://jeremy.ng") },
  keywords: [
    "Jeremy",
    "Nguyen",
    "Jeremy Nguyen",
    "developer",
    "personal",
    "personal website",
    "portfolio",
    "web developer",
  ],
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
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
