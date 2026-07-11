import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Reveal, RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance — Fashion Source BD" },
      {
        name: "description",
        content:
          "Plan, Do, Act, Check — Fashion Source BD's structured compliance management method that drives efficiency and productivity.",
      },
      { property: "og:title", content: "Compliance — Fashion Source BD" },
      {
        property: "og:description",
        content: "Structured compliance with the PDCA management method.",
      },
    ],
  }),
  component: Compliance,
});

function Compliance() {
  const page = useCmsPage("/compliance");

  const goals = [
    getField(
      page,
      "compliance-goals",
      "goal1",
      "Accelerating the business by creating a successful compliance program.",
    ),
    getField(
      page,
      "compliance-goals",
      "goal2",
      "Minimizing business risk through safe, secure and environment-friendly workplaces.",
    ),
    getField(
      page,
      "compliance-goals",
      "goal3",
      "Increasing business reputation by fulfilling customer requirements.",
    ),
    getField(
      page,
      "compliance-goals",
      "goal4",
      "Achieving trustworthiness of all business partners through commitment and transparency.",
    ),
  ];

  const steps = [
    {
      title: getField(page, "compliance-steps", "planTitle", "1. PLAN"),
      color: "var(--col-design)",
      items: getField(
        page,
        "compliance-steps",
        "planItems",
        "Compliance team & responsibilities\nYearly & monthly audit schedule\nDeveloping unique audit protocol & checklist\nWeb-based monitoring & verification\nTraining schedule for factory capacity building\nSetting a target",
      ).split("\n"),
    },
    {
      title: getField(page, "compliance-steps", "doTitle", "2. DO"),
      color: "var(--col-sourcing)",
      items: getField(
        page,
        "compliance-steps",
        "doItems",
        "Assessment & creating report\nDevelopment visit & CAP follow-up\nTraining on COC, local law & certification\nWebsite follow-up and desktop verification\nSWOT analysis and special care of vulnerable factories\nSelf assessment and management monitoring",
      ).split("\n"),
    },
    {
      title: getField(page, "compliance-steps", "actTitle", "3. ACT"),
      color: "var(--col-production)",
      items: getField(
        page,
        "compliance-steps",
        "actItems",
        "Development visit & proper guidance\nPreparing the TNA & measuring progress\nKnowledge, document and experience sharing\nEnsuring fulfillment of requirements",
      ).split("\n"),
    },
    {
      title: getField(page, "compliance-steps", "checkTitle", "4. CHECK"),
      color: "var(--col-logistics)",
      items: getField(
        page,
        "compliance-steps",
        "checkItems",
        "Follow-up audit\nDesktop verification\nSurprise visits",
      ).split("\n"),
    },
  ];

  return (
    <>
      <PageHero
        subtitle="COMPLIANCE"
        title="Plan, Do, Act, Check — a structured management method for efficient compliance."
        breadcrumb="Fashion Source BD / Compliance"
      />
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionEyebrow>Compliance Goal</SectionEyebrow>
            <h2 className="mt-4 mb-6 font-display text-2xl font-semibold text-[var(--brand-dark)] md:text-3xl">
              A responsible sourcing partner, by design.
            </h2>
            <ul className="mb-14 space-y-3">
              {goals.map((g) => (
                <li key={g} className="flex gap-3 text-sm leading-7 text-neutral-600">
                  <span className="font-bold text-[var(--brand-primary)]">&#8250;</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mb-10 text-center">
            <SectionEyebrow className="justify-center">Management Method</SectionEyebrow>
            <h2 className="mt-4 font-display text-2xl font-semibold text-[var(--brand-dark)] md:text-3xl">
              The PDCA cycle behind every audit.
            </h2>
          </div>

          <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.08}>
            {steps.map((s) => (
              <div
                key={s.title}
                className="rounded-[var(--radius-premium)] p-7 text-white"
                style={{ backgroundColor: s.color }}
              >
                <h3 className="font-display text-2xl font-semibold mb-4">{s.title}</h3>
                <ul className="space-y-2 text-sm leading-6">
                  {s.items.map((i) => (
                    <li key={i}>&#8250; {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
