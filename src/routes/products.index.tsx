import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHero } from "@/components/page-hero";
import { RevealGroup } from "@/components/premium/motion";
import { getCategoryTreeSlugs } from "@/lib/category-tree";
import { productCategories, products as staticProducts } from "@/lib/products";
import { useProducts, useCategories } from "@/lib/queries";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "All Products - Fashion Source BD" },
      {
        name: "description",
        content: "Browse knit, woven, flat knit, accessories and home textile product categories.",
      },
    ],
  }),
  component: AllProducts,
});

function AllProducts() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const { data: apiProducts } = useProducts();
  const { data: apiCategories } = useCategories();

  const categories = apiCategories && apiCategories.length > 0 ? apiCategories : productCategories;
  const allProducts = apiProducts && apiProducts.length > 0 ? apiProducts : staticProducts;

  const displayProducts = useMemo(() => {
    return allProducts.map((p) => {
      if ("image_url" in p) {
        return {
          slug: p.slug,
          category: p.category_slug,
          name: p.name,
          shortName: p.short_name,
          image: p.image_url,
        };
      }
      return {
        slug: p.slug,
        category: p.category,
        name: p.name,
        shortName: p.shortName,
        image: p.image,
      };
    });
  }, [allProducts]);

  const displayCategories = useMemo(() => {
    return categories.map((c) => ({ slug: c.slug, title: c.title }));
  }, [categories]);

  const includedCategorySlugs = useMemo(
    () =>
      category === "all"
        ? null
        : getCategoryTreeSlugs(apiCategories ?? [], category),
    [apiCategories, category],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return displayProducts.filter((product) => {
      const matchesCategory =
        category === "all" || includedCategorySlugs?.has(product.category) === true;
      const matchesQuery =
        !needle ||
        product.name.toLowerCase().includes(needle) ||
        product.shortName.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [displayProducts, category, includedCategorySlugs, query]);

  return (
    <section className="bg-white">
      <PageHero
        subtitle="Product Catalogue"
        title="Every category, one accountable sourcing partner."
        breadcrumb="Home / Products"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex overflow-hidden rounded-full border border-neutral-200 bg-white">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search products"
              placeholder="Search products…"
              className="min-h-12 flex-1 px-5 text-sm outline-none placeholder:text-neutral-400"
            />
            <div className="flex w-14 items-center justify-center text-neutral-400">
              <Search className="h-4 w-4" />
            </div>
          </div>
          <div className="text-sm font-semibold text-neutral-500">{filtered.length} products</div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
              category === "all"
                ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                : "border-neutral-200 text-neutral-600 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            }`}
          >
            All
          </button>
          {displayCategories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setCategory(item.slug)}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                category === item.slug
                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <RevealGroup
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.06}
        >
          {filtered.map((product) => (
            <Link
              key={`${product.category}-${product.slug}`}
              to="/product/$product"
              params={{ product: product.slug }}
              className="group overflow-hidden rounded-[var(--radius-premium)] border border-neutral-200 bg-white transition duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)]"
            >
              <div className="aspect-square overflow-hidden bg-neutral-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-neutral-100 p-5 text-center">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                  {displayCategories.find((c) => c.slug === product.category)?.title}
                </div>
                <h2 className="mt-1.5 font-display text-base font-semibold text-neutral-900">
                  {product.shortName}
                </h2>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                  {product.name}
                </p>
              </div>
            </Link>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
