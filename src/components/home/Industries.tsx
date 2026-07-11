import { HardHat, Shirt, ShoppingBag, Snowflake, Users2, Waves, Zap } from "lucide-react";

import { RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

const industries = [
  { icon: Shirt, key: "item1", title: "Fashion" },
  { icon: Zap, key: "item2", title: "Sportswear" },
  { icon: Waves, key: "item3", title: "Denim" },
  { icon: Users2, key: "item4", title: "Kids Wear" },
  { icon: HardHat, key: "item5", title: "Workwear" },
  { icon: ShoppingBag, key: "item6", title: "Uniform" },
  { icon: Snowflake, key: "item7", title: "Outerwear" },
];

export function Industries() {
  const page = useCmsPage("/");

  return (
    <section className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>Industries Served</SectionEyebrow>
          <SectionHeading className="mt-5">
            {getField(page, "industries", "heading", "Built for every apparel category.")}
          </SectionHeading>
        </div>

        <RevealGroup
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7"
          stagger={0.06}
        >
          {industries.map(({ icon: Icon, key, title }) => (
            <div
              key={key}
              className="group flex flex-col items-center gap-4 rounded-[var(--radius-premium)] border border-neutral-200 bg-neutral-50 px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)]/40 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(16,20,24,0.2)]"
            >
              <Icon
                className="h-8 w-8 text-neutral-400 transition-colors duration-300 group-hover:text-[var(--brand-primary)]"
                strokeWidth={1.5}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                {getField(page, "industries", `${key}Title`, title)}
              </span>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
