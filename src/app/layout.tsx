import type { Metadata } from "next";
import Script from "next/script";

import { AppProvider } from "@/components/Misc";

export const metadata: Metadata = {
  title: "Jeremy Nguyen",
  description: "Jeremy Nguyen's personal website",
  authors: {
    url: "https://jeremy.ng",
    name: "Jeremy Nguyen",
  },
  keywords: ["Jeremy Nguyen", "Jeremy", "Nguyen", "jeremy.ng", "jeremynguyen"],
};

const GA_TRACKING_ID = "G-J6VELiT384T";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <head />
      <body>
        <Script
          strategy="worker"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id="google-analytics" strategy="worker">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_TRACKING_ID}');
        `}
        </Script>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
