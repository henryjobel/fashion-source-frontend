import { createFileRoute } from "@tanstack/react-router";

import { ClassicHome } from "@/components/home/ClassicHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fashion Source BD - Global Garments Sourcing House" },
      {
        name: "description",
        content:
          "A premium, 100% export-oriented garments buying house based in Dhaka, Bangladesh - sourcing, production, quality assurance and logistics under one roof.",
      },
      { property: "og:title", content: "Fashion Source BD" },
      {
        property: "og:description",
        content: "A premium global garments sourcing house based in Dhaka, Bangladesh.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <ClassicHome />;
}
