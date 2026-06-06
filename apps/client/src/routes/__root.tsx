import type { ReactNode } from "react";

import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";

import { Footer } from "#components/layout/Footer";
import { Navbar } from "#components/layout/Navbar";
import { env } from "#config/env";
import type { RouterContext } from "#router";
import { seo } from "#utils/seo";
import uiCss from "@jeremyng/ui/globals.css?url";

import { AppProvider } from "./-components/AppProvider";

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  const pathname = useLocation({ select: (location) => location.pathname });
  const canonicalUrl = new URL(pathname, env.VITE_BASE_URL).toString();

  return (
    /**
     * @remarks
     * `suppressHydrationWarning` is necessary since `<html>` element must be
     * updated by `next-themes` for dark mode. The property only applies one
     * level deep, so hydration warnings won't be blocked on children elements.
     *
     * @see {@link https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors}
     */
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="twitter:url" content={canonicalUrl} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
};

const RootComponent = () => {
  return (
    <AppProvider>
      <RootDocument>
        <Navbar />
        <Outlet />
        <Footer />
      </RootDocument>
    </AppProvider>
  );
};

const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...seo({
        title: "Jeremy Nguyen",
        description: "Personal website for Jeremy Nguyen",
        keywords: [
          "personal-site",
          "portfolio",
          "personal",
          "personal-website",
          "portfolio-site",
          "personal-portfolio",
        ],
      }),
    ],
    links: [
      { rel: "stylesheet", href: uiCss },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/favicon-512x512.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/favicon-192x192.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootComponent,
});

export { Route, type RouterContext };
