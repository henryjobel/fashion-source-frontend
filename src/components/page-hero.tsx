import { useLocation } from "@tanstack/react-router";

import factoryHero from "@/assets/page-heroes/factory-hero.png";
import kidsHero from "@/assets/page-heroes/kids-hero.png";
import knitHero from "@/assets/page-heroes/knit-hero.png";
import leadershipHero from "@/assets/page-heroes/leadership-hero.png";
import mensHero from "@/assets/page-heroes/mens-hero.png";
import othersHero from "@/assets/page-heroes/others-hero.png";
import productsHero from "@/assets/page-heroes/products-hero.png";
import qualityHero from "@/assets/page-heroes/quality-hero.png";
import wovenHero from "@/assets/page-heroes/woven-hero.png";
import womensHero from "@/assets/page-heroes/womens-hero.png";
import { Reveal } from "@/components/premium/motion";
import { SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

function getHeroImage(pathname: string) {
  if (pathname === "/products") return productsHero;
  if (pathname.startsWith("/products/")) {
    const category = pathname.split("/")[2]?.toLowerCase() ?? "";
    if (category.includes("women") || category.includes("ladies")) return womensHero;
    if (category.includes("kid") || category.includes("baby")) return kidsHero;
    if (category.includes("men")) return mensHero;
    if (category.includes("woven") || category.includes("shirt") || category.includes("bottom") || category.includes("outerwear") || category.includes("workwear") || category.includes("nightwear")) return wovenHero;
    if (category.includes("knit") || category.includes("fleece") || category.includes("sweater")) return knitHero;
    if (category.includes("other") || category.includes("accessor") || category.includes("textile")) return othersHero;
    return productsHero;
  }
  if (["/compliance", "/faq", "/why-work-with-us"].includes(pathname)) return qualityHero;
  if (["/services", "/become-supplier"].includes(pathname)) return factoryHero;
  return leadershipHero;
}

export function PageHero({
  subtitle,
  title,
  breadcrumb,
}: {
  subtitle: string;
  title: string;
  breadcrumb: string;
}) {
  const location = useLocation();
  const page = useCmsPage(location.pathname);
  const cmsSubtitle = getField(page, "hero", "subtitle", subtitle);
  const cmsTitle = getField(page, "hero", "title", title);
  const cmsBreadcrumb = getField(page, "hero", "breadcrumb", breadcrumb);
  const heroImage = getHeroImage(location.pathname);

  return (
    <section
      className="relative overflow-hidden bg-[var(--brand-dark)] bg-cover bg-center px-6 pb-16 pt-24 text-white sm:px-8 sm:pt-28"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,16,0.92)_0%,rgba(8,17,16,0.78)_48%,rgba(8,17,16,0.36)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(55,172,78,0.16),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--brand-primary)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <SectionEyebrow tone="dark">{cmsSubtitle}</SectionEyebrow>
          <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {cmsTitle}
          </h1>
          <div className="mt-7 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/60 backdrop-blur">
            {cmsBreadcrumb}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
