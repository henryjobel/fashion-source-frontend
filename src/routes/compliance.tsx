import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Plan, Do, Act, Check — Nafisa BD's structured compliance management method that drives efficiency and productivity." },
      { property: "og:title", content: "Compliance — Nafisa Int'l Trading (BD) Ltd." },
      { property: "og:description", content: "Structured compliance with the PDCA management method." },
    ],
  }),
  component: Compliance,
});

const goals = [
  "Accelerating the business by creating a successful compliance program.",
  "Minimizing business risk through safe, secure and environment-friendly workplaces.",
  "Increasing business reputation by fulfilling customer requirements.",
  "Achieving trustworthiness of all business partners through commitment and transparency.",
];

const steps = [
  { title: "1. PLAN", color: "var(--col-design)", items: ["Compliance team & responsibilities", "Yearly & monthly audit schedule", "Developing unique audit protocol & checklist", "Web-based monitoring & verification", "Training schedule for factory capacity building", "Setting a target"] },
  { title: "2. DO", color: "var(--col-sourcing)", items: ["Assessment & creating report", "Development visit & CAP follow-up", "Training on COC, local law & certification", "Website follow-up and desktop verification", "SWOT analysis and special care of vulnerable factories", "Self assessment and management monitoring"] },
  { title: "3. ACT", color: "var(--col-production)", items: ["Development visit & proper guidance", "Preparing the TNA & measuring progress", "Knowledge, document and experience sharing", "Ensuring fulfillment of requirements"] },
  { title: "4. CHECK", color: "var(--col-logistics)", items: ["Follow-up audit", "Desktop verification", "Surprise visits"] },
];

function Compliance() {
  return (
    <>
      <PageHero subtitle="COMPLIANCE" title="Plan, Do, Act, Check — a structured management method for efficient compliance." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / Compliance" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-black text-[var(--brand-blue)] mb-6">Compliance Goal</h2>
          <ul className="space-y-3 mb-12">
            {goals.map((g) => (
              <li key={g} className="flex gap-3 text-neutral-700">
                <span className="text-[var(--brand-green)] font-black">›</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--brand-blue)] mb-8 text-center">Management Method</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.title} className="rounded-lg p-7 text-white" style={{ backgroundColor: s.color }}>
                <h3 className="text-2xl font-black mb-4">{s.title}</h3>
                <ul className="space-y-2 text-sm">
                  {s.items.map((i) => <li key={i}>› {i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}