import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { getCategoryImage, ImageWithSkeleton } from "@/components/category-image";
import { useCategories } from "@/lib/queries";

export const Route = createFileRoute("/products/")({
  head: () => ({ meta: [{ title: "Products - Fashion Source BD" }, { name: "description", content: "Explore our Knit, Woven and Others garment collections for men, women and kids." }] }),
  component: ProductsIndex,
});

const fallback = [
  { slug: "knit", title: "Knit", intro: "Jersey, pique, fleece and stretch garments for every market." },
  { slug: "woven", title: "Woven", intro: "Shirts, dresses, bottoms, outerwear and workwear programs." },
  { slug: "others", title: "Others", intro: "Sweaters, accessories and selected home textile programs." },
];

function ProductsIndex() {
  const { data: categories = [], isLoading } = useCategories();
  const divisions = categories.length
    ? categories.filter((category) => category.status === "active" && !category.parent).sort((a, b) => a.sort_order - b.sort_order)
    : fallback;

  return (
    <section className="bg-[#f7f7f4]">
      <PageHero subtitle="Product Catalogue" title="Built around the way garment buyers source." breadcrumb="Home / Products" />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-primary)]">Our expertise</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">Choose a product division</h2>
          <p className="mt-5 text-base leading-7 text-neutral-600">Each division is arranged into Men's, Women's and Kids collections, with detailed product categories and downloadable catalogues.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {isLoading && Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="min-h-[420px] animate-pulse overflow-hidden rounded-[2rem] bg-neutral-200">
              <div className="h-56 bg-neutral-300/70" />
              <div className="space-y-4 p-8"><div className="h-10 w-2/3 rounded-xl bg-neutral-300" /><div className="h-4 rounded bg-neutral-300/80" /><div className="h-4 w-4/5 rounded bg-neutral-300/80" /></div>
            </div>
          ))}
          {!isLoading && divisions.map((division, index) => (
            <Link key={division.slug} to="/products/$category" params={{ category: division.slug }} className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[var(--brand-dark)] p-8 text-white transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <ImageWithSkeleton src={getCategoryImage(division.slug)} alt={`${division.title} garments`} eager={index === 0} className="absolute inset-0" imageClassName="object-cover group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/90" />
              <div className="relative text-sm font-black tracking-[0.2em] text-white/70">0{index + 1}</div>
              <div className="relative drop-shadow-sm">
                <h2 className="font-display text-5xl font-semibold">{division.title}</h2>
                <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">{division.intro}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[var(--brand-primary)]">Men · Women · Kids <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
