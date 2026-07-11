import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Reveal, RevealGroup } from "@/components/premium/motion";
import { PremiumButton, SectionEyebrow } from "@/components/premium/ui";
import { api, ApiError } from "@/lib/api";
import {
  getProductBySlug,
  productCategories,
  products as staticProducts,
} from "@/lib/products";

export const Route = createFileRoute("/product/$product")({
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    const title = product
      ? `${product.name} - Fashion Source BD`
      : "Product Details - Fashion Source BD";
    const description = product?.description || "Product details at Fashion Source BD.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: async ({ params }) => {
    let product;
    let categories;
    let allProducts;

    try {
      product = (await api.getProduct(params.product)).data;
      [{ data: categories }, { data: allProducts }] = await Promise.all([
        api.getCategories(),
        api.getProducts(),
      ]);
    } catch (error) {
      const staticProduct = getProductBySlug(params.product);
      if (!staticProduct) {
        if (error instanceof ApiError && error.status === 404) throw notFound();
        throw error;
      }

      product = {
        id: staticProduct.slug,
        slug: staticProduct.slug,
        name: staticProduct.name,
        short_name: staticProduct.shortName,
        description: staticProduct.description,
        image_url: staticProduct.image,
        specs: staticProduct.specs,
        status: "active" as const,
        sort_order: 0,
        category_id: null,
        category_slug: staticProduct.category,
        category_title:
          productCategories.find((category) => category.slug === staticProduct.category)?.title ??
          staticProduct.category,
        createdAt: "",
        updatedAt: "",
      };

      categories = productCategories.map((category) => ({
        id: category.slug,
        slug: category.slug,
        title: category.title,
        intro: category.intro,
        description: category.description,
        sort_order: 0,
        status: "active" as const,
      }));

      allProducts = staticProducts.map((item) => ({
        id: item.slug,
        slug: item.slug,
        name: item.name,
        short_name: item.shortName,
        description: item.description,
        image_url: item.image,
        specs: item.specs,
        status: "active" as const,
        sort_order: 0,
        category_id: null,
        category_slug: item.category,
        category_title:
          productCategories.find((category) => category.slug === item.category)?.title ??
          item.category,
        createdAt: "",
        updatedAt: "",
      }));
    }

    const category = categories.find((c) => c.slug === product.category_slug) ?? null;
    const related = allProducts
      .filter((p) => p.category_slug === product.category_slug && p.slug !== product.slug)
      .slice(0, 4);

    return { product, category, related };
  },
  component: ProductDetails,
});

function ProductDetails() {
  const { category, product, related } = Route.useLoaderData();

  return (
    <section className="bg-white">
      <div className="border-b border-neutral-100">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-4 text-xs font-semibold text-neutral-400 sm:px-8">
          <Link to="/" className="hover:text-[var(--brand-primary)]">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[var(--brand-primary)]">
            Products
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link
                to="/products/$category"
                params={{ category: category.slug }}
                className="hover:text-[var(--brand-primary)]"
              >
                {category.title}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-neutral-700">{product.short_name || product.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        {category && (
          <Link
            to="/products/$category"
            params={{ category: category.slug }}
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-neutral-500 transition hover:text-[var(--brand-primary)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to {category.title}
          </Link>
        )}

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <div className="aspect-square overflow-hidden rounded-[var(--radius-premium)] bg-neutral-50">
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            {category && <SectionEyebrow>{category.title}</SectionEyebrow>}
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-[var(--brand-dark)] md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600">
              {product.description}
            </p>

            {product.specs.length > 0 && (
              <div className="mt-8 rounded-[var(--radius-premium)] border border-neutral-200 bg-neutral-50 p-6">
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Product Notes
                </div>
                <div className="space-y-3">
                  {product.specs.map((spec) => (
                    <div key={spec} className="flex gap-3 text-sm text-neutral-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--brand-primary)]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <PremiumButton to="/contact" variant="primary" className="mt-8">
              Contact About This Product <ArrowUpRight className="h-4 w-4" />
            </PremiumButton>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <SectionEyebrow className="justify-center">You May Also Like</SectionEyebrow>
            <h2 className="mt-4 text-center font-display text-2xl font-semibold text-[var(--brand-dark)] md:text-3xl">
              Related Products
            </h2>
            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/product/$product"
                  params={{ product: item.slug }}
                  className="group overflow-hidden rounded-[var(--radius-premium)] border border-neutral-200 bg-white transition duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)]"
                >
                  <div className="aspect-square overflow-hidden bg-white">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="border-t border-neutral-100 p-5 text-center">
                    <h3 className="font-display text-base font-semibold text-neutral-900">
                      {item.short_name || item.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500">View details</p>
                  </div>
                </Link>
              ))}
            </RevealGroup>
          </div>
        </div>
      )}
    </section>
  );
}
