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
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "icon", sizes: "32x32", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${env.VITE_BASE_URL}/#person`,
              name: "Jeremy Nguyen",
              url: env.VITE_BASE_URL,
              image: "https://avatars.githubusercontent.com/u/43259194",
              email: "hi@jeremy.ng",
              nationality: {
                "@type": "Country",
                name: "United States",
              },
              sameAs: [
                `https://github.com/${env.VITE_GITHUB_USERNAME}`,
                `https://npmjs.com/~${env.VITE_NPM_REGISTRY_USERNAME}`,
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${env.VITE_BASE_URL}/#website`,
              url: env.VITE_BASE_URL,
              name: "Jeremy Nguyen",
            },
            {
              "@type": "WebPage",
              name: "Jeremy Nguyen",
              url: env.VITE_BASE_URL,
              description: "Personal website for Jeremy Nguyen",
              inLanguage: "en-US",
              author: {
                "@id": `${env.VITE_BASE_URL}/#person`,
              },
              mainEntity: {
                "@id": `${env.VITE_BASE_URL}/#person`,
              },
              isPartOf: {
                "@id": `${env.VITE_BASE_URL}/#website`,
              },
            },
          ],
        }),
      },
    ],
  }),

  component: RootComponent,
});

export { Route, type RouterContext };
