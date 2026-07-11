import { createFileRoute, redirect } from "@tanstack/react-router";

// Canonical product URL is /product/$product — this legacy /products/$category/$product
// path is kept only to redirect any old/indexed links to the live, API-backed page.
export const Route = createFileRoute("/products/$category/$product")({
  loader: ({ params }) => {
    throw redirect({ to: "/product/$product", params: { product: params.product } });
  },
});
