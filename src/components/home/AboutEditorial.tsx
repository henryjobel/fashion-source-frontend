import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/premium/motion";
import { PremiumButton, SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

const timeline = [
  ["1998", "Founded as a Dhaka-based garment trading house."],
  ["2008", "Opened dedicated sourcing office in China."],
  ["2016", "Launched proprietary ERP for live order tracking."],
  ["Today", "4 global offices, 100+ compliant factory partners."],
];

export function AboutEditorial() {
  const page = useCmsPage("/");
  const heading = getField(
    page,
    "about-editorial",
    "heading",
    "Three decades of manufacturing intelligence, built into every order.",
  );
  const body = getField(
    page,
    "about-editorial",
    "body",
    "Fashion Source BD is a 100% export-oriented buying house connecting international buyers with capable, compliant factories across Bangladesh. We manage the full lifecycle — vendor selection, sampling, production, quality control and shipment — as a single accountable partner.",
  );

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal className="relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-premium)]">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85"
              alt="Fashion Source BD production floor"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -right-6 rounded-[var(--radius-premium)] bg-[var(--brand-dark)] px-8 py-6 text-white shadow-2xl sm:-right-10">
            <div className="font-display text-3xl font-semibold">1998</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
              Since
            </div>
          </div>
        </Reveal>

        <div>
          <SectionEyebrow>Who We Are</SectionEyebrow>
          <SectionHeading className="mt-5">{heading}</SectionHeading>
          <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600">{body}</p>

          <div className="mt-12 space-y-0">
            {timeline.map(([year, text], i) => (
              <Reveal key={year} delay={i * 0.05}>
                <div className="flex gap-6 border-t border-neutral-200 py-5 first:border-t-0">
                  <div className="w-16 flex-shrink-0 font-display text-lg font-semibold text-[var(--brand-primary)]">
                    {year}
                  </div>
                  <div className="text-sm leading-6 text-neutral-600">{text}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <PremiumButton to="/about" variant="ghost-light" className="mt-10">
            The Full Story <ArrowUpRight className="h-4 w-4" />
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
