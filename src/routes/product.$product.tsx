import { createFileRoute, redirect } from "@tanstack/react-router";

// Product detail pages are disabled on the client — the API stays live, but
// browsing to a product URL sends visitors back to the product listing.
export const Route = createFileRoute("/product/$product")({
  beforeLoad: () => {
    throw redirect({ to: "/products" });
  },
});
