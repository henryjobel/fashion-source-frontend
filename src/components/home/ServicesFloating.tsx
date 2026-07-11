import { ArrowUpRight, Cog, Factory, Globe, Monitor, Ship } from "lucide-react";

import { RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

const services = [
  {
    icon: Cog,
    key: "research",
    title: "Research",
    body: "New styles, fabrics, accessories and trims developed continuously from home and abroad.",
  },
  {
    icon: Monitor,
    key: "design",
    title: "Design",
    body: "Seasonal trend forecasts and collections showcasing the latest market direction.",
  },
  {
    icon: Globe,
    key: "sourcing",
    title: "Sourcing",
    body: "A practical vendor network and material support built on long-term relationships.",
  },
  {
    icon: Factory,
    key: "production",
    title: "Production",
    body: "Manufactured through sister concerns and long-term partner factories.",
  },
  {
    icon: Ship,
    key: "logistics",
    title: "Logistics",
    body: "Coordinated movement from approved production straight through to delivery.",
  },
];

export function ServicesFloating() {
  const page = useCmsPage("/");

  return (
    <section className="relative bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>What We Do</SectionEyebrow>
          <SectionHeading className="mt-5">
            {getField(page, "services", "heading", "A single accountable partner, end to end.")}
          </SectionHeading>
        </div>

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {services.map(({ icon: Icon, key, title, body }) => (
            <article
              key={key}
              className="group relative overflow-hidden rounded-[var(--radius-premium)] border border-neutral-200 bg-white/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)]"
            >
              <div className="absolute inset-0 -z-10 bg-[var(--brand-dark)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 transition-colors duration-500 group-hover:bg-[var(--brand-primary)]/20">
                <Icon className="h-7 w-7 text-[var(--brand-primary)]" strokeWidth={1.5} />
              </div>
              <h3 className="mt-7 font-display text-xl font-semibold text-[var(--brand-dark)] transition-colors duration-500 group-hover:text-white">
                {getField(page, "services", `${key}Title`, title)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600 transition-colors duration-500 group-hover:text-white/70">
                {getField(page, "services", `${key}Body`, body)}
              </p>
              <ArrowUpRight className="mt-6 h-5 w-5 text-neutral-400 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--brand-primary)]" />
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
