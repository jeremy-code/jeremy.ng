import { createFileRoute } from "@tanstack/react-router";

import { Heading } from "@jeremyng/ui/components/Heading";

const BlogPostComponent = () => {
  return (
    <main className="container py-4">
      <Heading as="h1" size="2xl">
        Blog Post
      </Heading>
    </main>
  );
};

const Route = createFileRoute("/blog/$slug")({
  component: BlogPostComponent,
  loader: async ({ params }) => {
    console.log(params.slug);
  },
  headers: () => ({
    "Cache-Control": "public, max-age=3600",
    "CDN-Cache-Control": "max-age=7200",
  }),
});

export { Route };
