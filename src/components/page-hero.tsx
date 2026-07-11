import { useLocation } from "@tanstack/react-router";

import { Reveal } from "@/components/premium/motion";
import { SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

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

  return (
    <section className="relative overflow-hidden bg-[var(--brand-dark)] px-6 pb-16 pt-24 text-white sm:px-8 sm:pt-28">
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
