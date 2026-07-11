import { Award, CheckCircle2, Heart, ShieldCheck, UserCheck, Users } from "lucide-react";

import { RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

const values = [
  {
    icon: Award,
    key: "item1",
    title: "Excellence",
    body: "We strive to deliver exceptional results and ensure customer satisfaction.",
  },
  {
    icon: ShieldCheck,
    key: "item2",
    title: "Integrity",
    body: "We create trust through responsible action and honest relationships.",
  },
  {
    icon: UserCheck,
    key: "item3",
    title: "Customer Focus",
    body: "Nothing means more to us than the satisfaction of our customers.",
  },
  {
    icon: Users,
    key: "item4",
    title: "Collaboration",
    body: "We achieve more when we work together and all pull in the same direction.",
  },
  {
    icon: CheckCircle2,
    key: "item5",
    title: "Accountability",
    body: "Each of us is accountable for our words, actions and results.",
  },
  {
    icon: Heart,
    key: "item6",
    title: "Respect",
    body: "We value everyone and treat people with dignity and professionalism.",
  },
];

export function Values() {
  const page = useCmsPage("/");

  return (
    <section className="relative bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>What Drives Us</SectionEyebrow>
          <SectionHeading className="mt-5">
            {getField(page, "values", "heading", "Our Values")}
          </SectionHeading>
        </div>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {values.map(({ icon: Icon, key, title, body }) => (
            <div
              key={key}
              className="group flex items-start gap-5 rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 transition-all duration-300 hover:border-[var(--brand-primary)]/40 hover:shadow-[0_20px_50px_-20px_rgba(16,20,24,0.2)]"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5 text-[var(--brand-primary)]" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-[var(--brand-dark)]">
                  {getField(page, "values", `${key}Title`, title)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {getField(page, "values", `${key}Body`, body)}
                </p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
