import { Quote } from "lucide-react";

import { RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

const testimonials = [
  {
    key: "item1",
    quote:
      "Order visibility changed completely once we started working with their ERP tracking. We always know exactly where production stands.",
    role: "Sourcing Director",
    company: "European Activewear Brand",
    flag: "🇩🇪",
  },
  {
    key: "item2",
    quote:
      "Their QA team catches issues before they become our problem. That reliability is worth more than a lower quote.",
    role: "Head of Procurement",
    company: "North American Retail Chain",
    flag: "🇺🇸",
  },
  {
    key: "item3",
    quote:
      "From sampling to shipment, communication never went quiet. That single point of accountability makes a real difference.",
    role: "Merchandising Manager",
    company: "UK Fashion Importer",
    flag: "🇬🇧",
  },
];

export function Testimonials() {
  const page = useCmsPage("/");

  return (
    <section className="relative bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>Buyer Voices</SectionEyebrow>
          <SectionHeading className="mt-5">
            {getField(page, "testimonials", "heading", "Trusted by sourcing teams worldwide.")}
          </SectionHeading>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Representative buyer feedback — verified client quotes available on request.
          </p>
        </div>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {testimonials.map((t) => {
            const quote = getField(page, "testimonials", `${t.key}Quote`, t.quote);
            const role = getField(page, "testimonials", `${t.key}Role`, t.role);
            const company = getField(page, "testimonials", `${t.key}Company`, t.company);
            return (
              <figure
                key={t.key}
                className="flex flex-col justify-between rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-8"
              >
                <div>
                  <Quote className="h-7 w-7 text-[var(--brand-primary)]/40" />
                  <blockquote className="mt-5 text-sm leading-7 text-neutral-700">
                    "{quote}"
                  </blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-neutral-100 pt-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-dark)] text-sm font-bold text-white">
                    {role.charAt(0)}
                    {company.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-[var(--brand-dark)]">
                      {role}
                    </div>
                    <div className="truncate text-xs text-neutral-500">
                      {company} {t.flag}
                    </div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
