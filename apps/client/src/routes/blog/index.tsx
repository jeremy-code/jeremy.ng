import { createFileRoute } from "@tanstack/react-router";

import { Heading } from "@jeremyng/ui/components/Heading";

const BlogComponent = () => {
  return (
    <main className="container py-4">
      <Heading as="h1" size="2xl">
        Blog
      </Heading>
    </main>
  );
};

const Route = createFileRoute("/blog/")({
  component: BlogComponent,
  headers: () => ({
    "Cache-Control": "public, max-age=3600",
    "CDN-Cache-Control": "public, max-age=7200, stale-while-revalidate=3600",
  }),
});

export { Route };
