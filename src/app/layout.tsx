import type { Metadata } from "next";

import { Analytics, AppProvider } from "@/components/Misc";

export const metadata: Metadata = {
  title: "Jeremy Nguyen",
  description: "Jeremy Nguyen's personal website",
  authors: {
    url: "https://jeremy.ng",
    name: "Jeremy Nguyen",
  },
  keywords: ["Jeremy Nguyen", "Jeremy", "Nguyen", "jeremy.ng", "jeremynguyen"],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <head />
      <body>
        <Analytics />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
