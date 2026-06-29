import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

type Cat = { title: string; intro: string; items: { name: string; desc: string }[] };

const catalog: Record<string, Cat> = {
  knit: {
    title: "Knit",
    intro: "Full range of knit garments — from soft cotton tees to performance fleece — produced under our compliant supply chain.",
    items: [
      { name: "Men's T-Shirt, Polo, Tank Top", desc: "Crew, V-neck, Henley, classic polo, athletic tank — multiple fabric weights and finishes." },
      { name: "Ladies T-Shirt, Tank Top, Nightwear", desc: "Fashion fits, modal blends, soft-touch finishes for sleep and loungewear." },
      { name: "Kids T-Shirt, Dress, Jogging Top, Jogging Pant", desc: "Comfortable kids' essentials in age-appropriate fits with OEKO-TEX certified fabrics." },
      { name: "Fleece — Sweatshirt, Bonded Jacket, Polar & Micro Fleece", desc: "Brushed back fleece, bonded fleece jackets, polar fleece pullovers and micro-fleece base layers." },
      { name: "Babies T-Shirt", desc: "GOTS-certified organic cotton options available for infant wear." },
      { name: "Babies Romper", desc: "Snap-front rompers, sleepers and bodysuits with safe trims and snaps." },
      { name: "Ladies Bra, Bikini & Swimwear", desc: "Knit lingerie and swim styles with technical fabric options." },
      { name: "Underwear — Boxer, Brief, Panty, Hipster, Thong", desc: "Cotton, modal and cotton/elastane blends across men's and women's silhouettes." },
    ],
  },
  woven: {
    title: "Woven",
    intro: "Woven shirts, bottoms, outerwear and workwear from compliant factories with strong technical capability.",
    items: [
      { name: "Shirts", desc: "Casual, formal and overshirt styles in cotton, linen and blends." },
      { name: "Ladies Woven Tops & Dresses", desc: "Blouses, tunics, midi and maxi dresses with embroidery / print options." },
      { name: "Woven Bottom", desc: "Chinos, dress pants, joggers and tailored trousers." },
      { name: "Cargo & Shorts", desc: "Utility cargo pants and casual shorts in multiple cuts." },
      { name: "Swimming Wear & Denim Shorts", desc: "Quick-dry swim shorts and lightweight denim shorts." },
      { name: "Jacket — Padding, Twill, Windbreaker, Parka, Bomber", desc: "Insulated and shell jackets across seasons with technical linings." },
      { name: "Nightwear", desc: "Woven pajamas and lounge sets in cotton and viscose." },
      { name: "Workwear", desc: "Durable workwear meeting safety, abrasion and reinforcement standards." },
      { name: "Blazer", desc: "Casual and structured blazers in wool blends and cotton." },
    ],
  },
  "flat-knit": {
    title: "Flat Knit",
    intro: "Flat knit sweaters from 3gg to 14gg in cotton, wool, acrylic and blended yarns.",
    items: [
      { name: "Flat Knit Sweater", desc: "Crew, V-neck, cardigan, half-zip, jacquard, intarsia and cable patterns — 3gg to 14gg." },
    ],
  },
  others: {
    title: "Others",
    intro: "Accessories and home textile items — capable of complete-package supply alongside apparel.",
    items: [
      { name: "Cap", desc: "Five-panel, six-panel, dad caps and trucker caps with embroidery / print." },
      { name: "Bed Sheet", desc: "Cotton percale and sateen bedsheet sets in solid and printed options." },
      { name: "Towel", desc: "Bath, hand and beach towels in multiple weights and constructions." },
    ],
  },
};

export const Route = createFileRoute("/products/$category")({
  head: ({ params }) => {
    const c = catalog[params.category];
    const t = c ? `${c.title} — Nafisa Int'l Trading (BD) Ltd.` : "Products — Nafisa Int'l Trading (BD) Ltd.";
    const d = c?.intro ?? "Product categories at Nafisa BD.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  loader: ({ params }) => {
    if (!catalog[params.category]) throw notFound();
    return { cat: catalog[params.category] };
  },
  component: Products,
});

function Products() {
  const { cat } = Route.useLoaderData();
  return (
    <>
      <PageHero subtitle="OUR PRODUCTS" title={cat.title} breadcrumb={`Nafisa Int'l Trading (BD) Ltd. / Products / ${cat.title}`} />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-lg text-neutral-600 max-w-3xl mx-auto mb-12">{cat.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.items.map((it) => (
              <article key={it.name} className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="h-1 w-10 bg-[var(--brand-green)] mb-4" />
                <h3 className="font-black text-[var(--brand-blue)] mb-2">{it.name}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{it.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <div className="text-sm text-neutral-500 mb-3">Browse other categories</div>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(catalog).map(([slug, c]) => (
                <Link key={slug} to="/products/$category" params={{ category: slug }} className="px-4 py-2 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]">
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}