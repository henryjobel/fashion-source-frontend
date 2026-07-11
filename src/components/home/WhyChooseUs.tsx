import { Check, History, Network, Sparkles, TrendingUp, X } from "lucide-react";

import { AnimatedCounter, Reveal, RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

const features = [
  {
    icon: History,
    key: "item1",
    title: "Long-Term Experience",
    body: "Since 1998, deep knowledge of Bangladesh's apparel manufacturing landscape.",
  },
  {
    icon: TrendingUp,
    key: "item2",
    title: "Real-Time Order Tracking",
    body: "Our own ERP system gives customers live visibility into production status.",
  },
  {
    icon: Sparkles,
    key: "item3",
    title: "In-House Design & QA Teams",
    body: "Dedicated design and quality assurance teams support every order.",
  },
  {
    icon: Network,
    key: "item4",
    title: "Compliant Factory Network",
    body: "Access to socially compliant, certified manufacturing partners.",
  },
];

const comparison = [
  ["Response time to inquiries", true, false],
  ["Dedicated on-ground QA team", true, false],
  ["Live ERP order tracking", true, false],
  ["Single point of accountability", true, false],
] as const;

export function WhyChooseUs() {
  const page = useCmsPage("/");

  return (
    <section className="relative overflow-hidden bg-[var(--brand-dark)] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow tone="dark">Why Choose Us</SectionEyebrow>
          <SectionHeading tone="dark" className="mt-5">
            {getField(page, "why-choose-us", "heading", "The difference shows up in the details.")}
          </SectionHeading>
        </div>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-premium)] border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, key, title, body }) => (
            <div
              key={key}
              className="bg-white/[0.03] p-8 transition-colors duration-300 hover:bg-white/[0.07]"
            >
              <Icon className="h-7 w-7 text-[var(--brand-primary)]" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-lg font-semibold">
                {getField(page, "why-choose-us", `${key}Title`, title)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {getField(page, "why-choose-us", `${key}Body`, body)}
              </p>
            </div>
          ))}
        </RevealGroup>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: 1998, label: "Established", suffix: "" },
                { value: 350, label: "Skilled Employees", suffix: "+" },
                { value: 134, label: "Associated Factories", suffix: "+" },
                { value: 4, label: "Global Locations", suffix: "" },
              ].map((s) => (
                <div key={s.label}>
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    className="font-display text-4xl font-semibold text-white sm:text-5xl"
                  />
                  <div className="mt-2 text-xs font-bold uppercase tracking-wider text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-[var(--radius-premium)] border border-white/10">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/[0.05] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">
                <span />
                <span className="text-center text-[var(--brand-primary)]">Fashion Source BD</span>
                <span className="text-center">Typical Agent</span>
              </div>
              {comparison.map(([label, us, them]) => (
                <div
                  key={label}
                  className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-t border-white/10 px-6 py-4 text-sm text-white/80"
                >
                  <span>{label}</span>
                  <span className="flex justify-center">
                    {us ? (
                      <Check className="h-4 w-4 text-[var(--brand-primary)]" />
                    ) : (
                      <X className="h-4 w-4 text-white/30" />
                    )}
                  </span>
                  <span className="flex justify-center">
                    {them ? (
                      <Check className="h-4 w-4 text-white/50" />
                    ) : (
                      <X className="h-4 w-4 text-white/30" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
