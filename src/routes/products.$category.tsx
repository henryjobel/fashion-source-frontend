import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHero } from "@/components/page-hero";
import { RevealGroup } from "@/components/premium/motion";
import { getCategoryTreeSlugs } from "@/lib/category-tree";
import { getCategory, getProductsByCategory, productCategories } from "@/lib/products";
import { useProducts, useCategories } from "@/lib/queries";

export const Route = createFileRoute("/products/$category")({
  head: ({ params }) => {
    const category = getCategory(params.category);
    const title = category
      ? `${category.title} Products - Fashion Source BD`
      : "Products - Fashion Source BD";
    const description = category?.intro ?? "Product categories at Fashion Source BD.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    // Static data is only a fallback; admin/API categories can add new slugs.
    const category = getCategory(params.category);
    return {
      staticCategory: category,
      staticProducts: getProductsByCategory(params.category),
    };
  },
  component: ProductsCategory,
});

function ProductsCategory() {
  const { staticCategory, staticProducts } = Route.useLoaderData();
  const { params } = Route.useMatch();
  const [query, setQuery] = useState("");

  const { data: apiProducts } = useProducts();
  const { data: apiCategories } = useCategories();

  // Prefer API data, fall back to static
  const allCategories = apiCategories && apiCategories.length > 0 ? apiCategories : productCategories;
  const category = allCategories.find((c) => c.slug === params.category) ??
    staticCategory ?? {
      slug: params.category,
      title: params.category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      intro: "",
      description: "Products in this category will appear here after they are uploaded.",
    };

  const includedCategorySlugs = useMemo(
    () => getCategoryTreeSlugs(apiCategories ?? [], params.category),
    [apiCategories, params.category],
  );
  const catalogue =
    "catalogue_url" in category && !category.parent && category.catalogue_url
      ? { url: category.catalogue_url, name: category.catalogue_name || `${category.title}.pdf` }
      : null;

  const allProducts = useMemo(() => {
    if (apiProducts && apiProducts.length > 0) {
      return apiProducts
        .filter((p) => includedCategorySlugs.has(p.category_slug))
        .map((p) => ({
          slug: p.slug,
          name: p.name,
          shortName: p.short_name,
          image: p.image_url,
        }));
    }
    return staticProducts.map((p) => ({
      slug: p.slug,
      name: p.name,
      shortName: p.shortName,
      image: p.image,
    }));
  }, [apiProducts, staticProducts, includedCategorySlugs]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return allProducts;
    return allProducts.filter((p) => p.name.toLowerCase().includes(needle));
  }, [allProducts, query]);

  return (
    <section className="bg-white">
      <PageHero
        subtitle="Our Products"
        title={category.title}
        breadcrumb={`Home / Products / ${category.title}`}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-3xl text-sm leading-7 text-neutral-600">{category.description}</p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-bold text-neutral-700 transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
          >
            View All Products
          </Link>
        </div>

        <div className="mb-6 flex overflow-hidden rounded-full border border-neutral-200 bg-white">
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

        <div className="mb-10 flex flex-wrap gap-2">
          {allCategories.map((item) => (
            <Link
              key={item.slug}
              to="/products/$category"
              params={{ category: item.slug }}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                item.slug === category.slug
                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {filtered.length > 0 ? (
          <RevealGroup
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            stagger={0.06}
          >
            {filtered.map((product) => (
              <Link
                key={product.slug}
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
                  <h2 className="font-display text-base font-semibold text-neutral-900">
                    {product.shortName}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                    {product.name}
                  </p>
                </div>
              </Link>
            ))}
          </RevealGroup>
        ) : (
          <div className="rounded-[var(--radius-premium)] border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-500">
            No products matched your search.
          </div>
        )}

        {catalogue && (
          <div className="mt-14 flex flex-col items-center rounded-[var(--radius-premium)] bg-[var(--brand-dark)] px-6 py-10 text-center text-white sm:px-10">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
              Category Catalogue
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              Explore the complete {category.title} collection
            </h2>
            <a
              href={catalogue.url}
              download={catalogue.name}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:brightness-110"
            >
              <Download className="h-4 w-4" /> View More
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
