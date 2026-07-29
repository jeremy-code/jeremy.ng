import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ContactForm } from "#components/contact/ContactForm";
import { SocialAccountsList } from "#components/contact/SocialAccountsList";
import { GithubPinnedList } from "#components/github/GithubPinnedList";
import { Hero } from "#components/layout/Hero";
import { NpmSearchList } from "#components/npm/NpmSearchList";
import { env } from "#config/env";
import { Heading } from "@jeremyng/ui/components/Heading";
import { Link } from "@jeremyng/ui/components/Link";

const HomeComponent = () => {
  const loaderData = Route.useLoaderData();

  return (
    <HydrationBoundary state={loaderData?.dehydratedState}>
      <main className="container py-4">
        <div className="mb-8 flex flex-col gap-8">
          <Hero />
          <section>
            <Heading
              id="npm-libraries"
              as="h1"
              size="2xl"
              className="mb-2 leading-loose"
            >
              <Link variant="anchor" href="#npm-libraries">
                NPM Libraries
              </Link>
            </Heading>
            <NpmSearchList />
          </section>
          <section>
            <Heading
              id="github-repositories"
              as="h1"
              size="2xl"
              className="mb-2 leading-loose"
            >
              <Link variant="anchor" href="#github-repositories">
                GitHub Repositories
              </Link>
            </Heading>
            <GithubPinnedList />
          </section>
          <section>
            <Heading
              id="contact"
              as="h1"
              size="2xl"
              className="mb-2 leading-loose"
            >
              <Link variant="anchor" href="#contact">
                Contact
              </Link>
            </Heading>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <article>
                <Heading
                  id="message"
                  as="h2"
                  size="xl"
                  className="mb-2 leading-loose"
                >
                  <Link variant="anchor" href="#message">
                    Send a message
                  </Link>
                </Heading>
                <ContactForm />
              </article>
              <article>
                <Heading
                  id="social-accounts"
                  as="h2"
                  size="xl"
                  className="mb-2 leading-loose"
                >
                  <Link variant="anchor" href="#social-accounts">
                    Social accounts
                  </Link>
                </Heading>
                <SocialAccountsList />
              </article>
            </div>
          </section>
        </div>
      </main>
    </HydrationBoundary>
  );
};

const Route = createFileRoute("/")({
  component: HomeComponent,
  loader: async ({ context }) => {
    // Prehydrate queries for SEO
    await Promise.all([
      context.queryClient.prefetchQuery(
        context.trpc.github.getBio.queryOptions({
          login: env.VITE_GITHUB_USERNAME,
        }),
      ),
      context.queryClient.prefetchQuery(
        context.trpc.npm.search.queryOptions({
          text: `maintainer:${env.VITE_NPM_REGISTRY_USERNAME}`,
        }),
      ),
      context.queryClient.prefetchQuery(
        context.trpc.github.getPinnedItems.queryOptions({
          login: env.VITE_GITHUB_USERNAME,
        }),
      ),
      context.queryClient.prefetchQuery(
        context.trpc.github.getSocialAccounts.queryOptions({
          login: env.VITE_GITHUB_USERNAME,
        }),
      ),
    ]);

    return { dehydratedState: dehydrate(context.queryClient) };
  },
  headers: () => ({
    "Cache-Control": "public, max-age=3600",
    // https://developers.cloudflare.com/cache/concepts/cdn-cache-control/
    "CDN-Cache-Control": "public, max-age=7200",
  }),
});

export { Route };
