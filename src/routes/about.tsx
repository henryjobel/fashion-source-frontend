import { createFileRoute } from "@tanstack/react-router";
import { Award, Building, Globe2, ShieldCheck, Truck, Users } from "lucide-react";

import heroImg from "@/assets/hero-garments.jpg";
import { AnimatedCounter, Reveal, RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us - Fashion Source BD" },
      {
        name: "description",
        content:
          "Fashion Source BD is a buying and trading house in Bangladesh with sourcing, production and logistics capability.",
      },
    ],
  }),
  component: About,
});

const defaultStats: [number, string, string][] = [
  [2017, "", "Industry Experience"],
  [150, "+", "Skilled Employees"],
  [134, "+", "Associated Factories"],
  [2, "", "Key Locations"],
];

const facts = [
  [
    Building,
    "Bangladesh Head Office",
    "Dhaka-based sourcing coordination with direct buyer communication and local factory access.",
  ],
  [
    Users,
    "Merchandising Strength",
    "Experienced merchandisers handle daily production follow-up, approvals and customer communication.",
  ],
  [
    Award,
    "Factory Capability",
    "Access to compliant factories with knit, woven, printing, embroidery and finishing capability.",
  ],
  [
    ShieldCheck,
    "Compliance Network",
    "Factory selection considers social compliance, certifications, capacity and quality systems.",
  ],
  [
    Globe2,
    "Full Product Range",
    "Knit, woven, flat knit, outerwear, workwear, towels and selected home textile programs.",
  ],
  [
    Truck,
    "Shipment Support",
    "Logistics coordination helps keep production, documentation and delivery movement aligned.",
  ],
] as const;

function About() {
  const page = useCmsPage("/about");
  const heroSubtitle = getField(page, "hero", "subtitle", "About Us");
  const heroTitle = getField(
    page,
    "hero",
    "title",
    "A sourcing partner built around practical garment execution.",
  );
  const heroBody = getField(
    page,
    "company-profile",
    "body",
    "Fashion Source BD connects buyers with capable factories, disciplined follow-up and export-ready production support across knit, woven, flat knit and selected textile categories.",
  );
  const profileHeading = getField(
    page,
    "company-profile",
    "heading",
    "We connect buyers with capable factories and disciplined follow-up.",
  );
  const goalHeading = getField(page, "goal", "heading", "Long-term trust, measured in execution.");
  const goalBody = getField(
    page,
    "goal",
    "body",
    "Our goal is to become a reliable long-term partner through honest communication, disciplined follow-up, environmental respect and responsible sourcing practices.",
  );
  const stats: [number, string, string][] = defaultStats.map(([value, suffix, label], i) => [
    Number(getField(page, "stats", `stat${i + 1}Value`, String(value))),
    getField(page, "stats", `stat${i + 1}Suffix`, suffix),
    getField(page, "stats", `stat${i + 1}Label`, label),
  ]);

  return (
    <>
      <section className="bg-neutral-50 px-6 pt-24 pb-14 sm:px-8 sm:pt-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[var(--radius-premium)] border border-neutral-200 bg-white shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="relative min-h-[320px] lg:min-h-[520px]">
            <img
              src={heroImg}
              alt="Garment sourcing and production floor"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-[var(--radius-premium)] bg-white/90 px-5 py-4 shadow-sm backdrop-blur">
              <div className="font-display text-3xl font-semibold text-[var(--brand-primary)]">
                1998
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">
                Since
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <SectionEyebrow>{heroSubtitle}</SectionEyebrow>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-[var(--brand-dark)] md:text-5xl">
              {heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600">{heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Sourcing", "Production", "Quality", "Shipment"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionEyebrow>Company Profile</SectionEyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-[var(--brand-dark)] md:text-4xl">
                {profileHeading}
              </h2>
            </div>
            <p className="text-sm leading-7 text-neutral-600">{heroBody}</p>
          </div>

          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {stats.map(([value, suffix, label]) => (
              <div
                key={label}
                className="rounded-[var(--radius-premium)] bg-neutral-50 p-7 text-center ring-1 ring-neutral-200"
              >
                <AnimatedCounter
                  value={value}
                  suffix={suffix}
                  className="font-display text-4xl font-semibold text-[var(--brand-primary)]"
                />
                <div className="mt-2 text-sm font-bold text-neutral-600">{label}</div>
              </div>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {facts.map(([Icon, title, body]) => (
              <article
                key={title}
                className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)]"
              >
                <Icon className="mb-5 h-9 w-9 text-[var(--brand-primary)]" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold text-[var(--brand-dark)]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{body}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-[var(--brand-dark)] px-6 py-20 text-white sm:px-8">
        <Reveal className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <div>
            <SectionEyebrow tone="dark">Company Goal</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold">{goalHeading}</h2>
          </div>
          <p className="text-sm leading-7 text-white/70">{goalBody}</p>
        </Reveal>
      </section>
    </>
  );
}
