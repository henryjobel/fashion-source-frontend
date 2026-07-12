import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Download, FileText, Package } from "lucide-react";
import { useMemo } from "react";

import { PageHero } from "@/components/page-hero";
import { getCategoryImage, ImageWithSkeleton } from "@/components/category-image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCategories, useProducts } from "@/lib/queries";

export const Route = createFileRoute("/products/$category")({
  head: ({ params }) => ({ meta: [{ title: `${params.category} Products - Fashion Source BD` }] }),
  component: ProductsCategory,
});

function ProductsCategory() {
  const { params } = Route.useMatch();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const isLoading = categoriesLoading || productsLoading;
  const category = categories.find((item) => item.slug === params.category);
  const parent = categories.find((item) => item.id === category?.parent);
  const siblings = useMemo(
    () => categories.filter((item) => item.status === "active" && item.parent === (category?.parent ?? null)).sort((a, b) => a.sort_order - b.sort_order),
    [categories, category?.parent],
  );
  const children = useMemo(() => categories.filter((item) => item.status === "active" && item.parent === category?.id).sort((a, b) => a.sort_order - b.sort_order), [categories, category?.id]);
  const childIds = new Set(children.map((item) => item.id));
  const directProducts = products.filter((product) => product.category_id === category?.id);
  const childProducts = products.filter((product) => childIds.has(product.category_id || ""));
  const title = category?.title ?? params.category.replaceAll("-", " ");

  return (
    <section className="bg-white">
      <PageHero subtitle={category?.parent ? "Product Collection" : "Product Division"} title={title} breadcrumb={`Home / Products / ${title}`} />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <nav aria-label="Product category navigation" className="mb-10 flex flex-wrap items-center gap-2">
          {parent && (
            <Link to="/products/$category" params={{ category: parent.slug }} className="mr-2 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-xs font-black text-neutral-600 transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]">
              <ArrowLeft className="h-3.5 w-3.5" /> {parent.title}
            </Link>
          )}
          {siblings.map((item) => (
            <Link key={item.id} to="/products/$category" params={{ category: item.slug }} className={`rounded-full px-4 py-2 text-xs font-black transition ${item.id === category?.id ? "bg-[var(--brand-primary)] text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-neutral-200 pb-10 md:flex-row md:items-end">
          <p className="max-w-3xl text-base leading-7 text-neutral-600">{category?.description || "Explore our complete garment collection."}</p>
          <Link to="/products" className="text-sm font-black text-[var(--brand-primary)]">All divisions →</Link>
        </div>

        {isLoading && (
          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4" aria-label="Loading product categories">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white">
                <div className="aspect-[16/9] animate-pulse bg-neutral-200" />
                <div className="space-y-3 p-5"><div className="h-7 w-3/5 animate-pulse rounded-lg bg-neutral-200" /><div className="h-3.5 animate-pulse rounded bg-neutral-100" /><div className="h-3.5 w-4/5 animate-pulse rounded bg-neutral-100" /><div className="mt-5 h-10 w-24 animate-pulse rounded-full bg-neutral-200" /></div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && children.length > 0 && (
          <Carousel opts={{ align: "start", loop: children.length > 3 }} className="pt-2">
            <CarouselContent className="-ml-5 pb-5">
            {children.map((child) => {
              const nestedCategories = categories.filter((item) => item.parent === child.id).sort((a, b) => a.sort_order - b.sort_order);
              const count = nestedCategories.length || products.filter((p) => p.category_id === child.id).length;
              return (
                <CarouselItem key={child.id} className="basis-[88%] pl-5 sm:basis-[58%] md:basis-1/2 lg:basis-1/3">
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-[#fafaf8] transition hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-lg">
                  <ImageWithSkeleton src={getCategoryImage(child.slug, category?.slug)} alt={`${child.title} collection`} className="aspect-[4/3] bg-[#e9e5e0]" imageClassName="object-cover object-top group-hover:scale-105" />
                  <div className="flex flex-1 flex-col p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--brand-primary)]">{count || products.filter((p) => p.category_id === child.id).length} categories / products</div>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-neutral-950 lg:text-3xl">{child.title}</h2>
                  <p className="mt-2 text-sm leading-5 text-neutral-600">{child.intro}</p>
                  <div className="mt-4 flex-1 space-y-1.5">
                    {nestedCategories.slice(0, 5).map((nested) => (
                      <Link key={nested.id} to="/products/$category" params={{ category: nested.slug }} className="flex items-center justify-between rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold text-neutral-700 transition hover:text-[var(--brand-primary)]">
                        {nested.title}<ArrowRight className="h-3.5 w-3.5 text-neutral-300" />
                      </Link>
                    ))}
                    {nestedCategories.length > 5 && <p className="px-3 text-xs font-bold text-neutral-400">+ {nestedCategories.length - 5} more categories</p>}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link to="/products/$category" params={{ category: child.slug }} className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-dark)] px-4 py-2.5 text-xs font-black text-white">Explore <ArrowRight className="h-3.5 w-3.5" /></Link>
                    {child.catalogue_url && <a href={child.catalogue_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2.5 text-xs font-black text-neutral-800"><FileText className="h-3.5 w-3.5" /> View More</a>}
                  </div>
                  </div>
                </article>
                </CarouselItem>
              );
            })}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 h-10 w-10 border-0 bg-white/95 shadow-lg transition hover:bg-[var(--brand-dark)] hover:text-white disabled:hidden sm:left-3" />
            <CarouselNext className="right-2 top-1/2 h-10 w-10 border-0 bg-white/95 shadow-lg transition hover:bg-[var(--brand-dark)] hover:text-white disabled:hidden sm:right-3" />
          </Carousel>
        )}

        {!isLoading && (directProducts.length > 0 || childProducts.length > 0) && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-semibold text-neutral-950">{children.length ? "Featured products" : `${title} products`}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...directProducts, ...childProducts].map((product) => (
                <Link key={product.id} to="/product/$product" params={{ product: product.slug }} className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <ImageWithSkeleton src={product.image_url || getCategoryImage(product.category_slug, category?.slug)} alt={product.name} className="aspect-[4/5]" imageClassName="object-cover group-hover:scale-105" />
                  <div className="p-5"><div className="text-[10px] font-black uppercase tracking-wider text-[var(--brand-primary)]">{product.category_title}</div><h3 className="mt-2 font-display text-lg font-semibold">{product.short_name || product.name}</h3></div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!isLoading && children.length === 0 && directProducts.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center">
            <Package className="mx-auto h-9 w-9 text-neutral-300" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-neutral-800">Products are being prepared</h2>
            <p className="mt-2 text-sm text-neutral-500">New styles will be added to this category soon.</p>
          </div>
        )}

        {category?.catalogue_url && (
          <div className="mt-16 flex flex-col items-center rounded-[2rem] bg-[var(--brand-dark)] px-8 py-12 text-center text-white">
            <Download className="h-7 w-7 text-[var(--brand-primary)]" /><h2 className="mt-4 font-display text-3xl font-semibold">View the complete {title} catalogue</h2>
            <a href={category.catalogue_url} target="_blank" rel="noreferrer" className="mt-6 rounded-full bg-[var(--brand-primary)] px-7 py-3 text-sm font-black">View More</a>
          </div>
        )}
      </div>
    </section>
  );
}
