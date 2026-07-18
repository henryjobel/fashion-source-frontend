import { createFileRoute, redirect } from "@tanstack/react-router";

// Product detail pages are disabled on the client, so any old/indexed
// product links are sent back to the relevant category listing instead.
export const Route = createFileRoute("/products/$category/$product")({
  loader: ({ params }) => {
    throw redirect({ to: "/products/$category", params: { category: params.category } });
  },
});
