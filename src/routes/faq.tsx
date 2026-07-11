import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ChevronDown, HelpCircle, Mail } from "lucide-react";
import { useState } from "react";
import { RevealGroup } from "@/components/premium/motion";
import { PremiumButton, SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ - Fashion Source BD" },
      {
        name: "description",
        content:
          "Frequently asked questions about Fashion Source BD product list, contact, lead times, payment terms and MOQ.",
      },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const page = useCmsPage("/faq");

  const qa = [
    [
      getField(page, "faq-list", "tag1", "Company"),
      getField(page, "faq-list", "q1", "What kind of business organization is Fashion Source BD?"),
      getField(
        page,
        "faq-list",
        "a1",
        "Fashion Source BD is a buying house and garments sourcing partner based in Bangladesh.",
      ),
    ],
    [
      getField(page, "faq-list", "tag2", "Products"),
      getField(page, "faq-list", "q2", "What is on Fashion Source BD's product list?"),
      getField(
        page,
        "faq-list",
        "a2",
        "Knits, flat knit, woven garments, workwear, jackets, towels and selected home textile items.",
      ),
    ],
    [
      getField(page, "faq-list", "tag3", "Contact"),
      getField(page, "faq-list", "q3", "How can I contact Fashion Source BD?"),
      getField(
        page,
        "faq-list",
        "a3",
        "Email info@fashionsourcebd.com or call +88-09606-333222 for business inquiries.",
      ),
    ],
    [
      getField(page, "faq-list", "tag4", "Buyers"),
      getField(page, "faq-list", "q4", "What type of client can approach Fashion Source BD?"),
      getField(
        page,
        "faq-list",
        "a4",
        "Retailers, importers, wholesalers and brands looking for reliable apparel sourcing support.",
      ),
    ],
    [
      getField(page, "faq-list", "tag5", "Orders"),
      getField(page, "faq-list", "q5", "What is the shipment lead time after order placement?"),
      getField(
        page,
        "faq-list",
        "a5",
        "Typically 60-110 days depending on product type, material sourcing, approval and inspection stages.",
      ),
    ],
    [
      getField(page, "faq-list", "tag6", "Commercial"),
      getField(page, "faq-list", "q6", "What is the payment term?"),
      getField(
        page,
        "faq-list",
        "a6",
        "L/C at sight and TT payment are common. Other options can be discussed case by case.",
      ),
    ],
    [
      getField(page, "faq-list", "tag7", "MOQ"),
      getField(page, "faq-list", "q7", "What is the minimum order quantity per color or style?"),
      getField(
        page,
        "faq-list",
        "a7",
        "MOQ varies by product. Many knit programs start around 2,000-3,000 pcs per color and woven programs around 3,000-4,000 pcs.",
      ),
    ],
    [
      getField(page, "faq-list", "tag8", "Partnership"),
      getField(page, "faq-list", "q8", "Why should buyers work with Fashion Source BD?"),
      getField(
        page,
        "faq-list",
        "a8",
        "The team combines sourcing experience, production follow-up, inspection discipline and long-term factory relationships.",
      ),
    ],
    [
      getField(page, "faq-list", "tag9", "Career"),
      getField(page, "faq-list", "q9", "How do I apply for a job at Fashion Source BD?"),
      getField(
        page,
        "faq-list",
        "a9",
        "Visit the Job Openings page and submit your resume through the application form.",
      ),
    ],
  ];

  return (
    <>
      <PageHero
        subtitle="FAQ"
        title="Answers for buyers, suppliers and partners."
        breadcrumb="Fashion Source BD / FAQ"
      />
      <section className="bg-neutral-50 px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.35fr_0.65fr]">
          <aside className="h-fit rounded-[var(--radius-premium)] bg-white p-7 shadow-sm ring-1 ring-neutral-200">
            <HelpCircle className="mb-5 h-9 w-9 text-[var(--brand-primary)]" strokeWidth={1.5} />
            <h2 className="font-display text-2xl font-semibold text-[var(--brand-dark)]">
              Need a direct answer?
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              If the question is product-specific, send the style, quantity, fabric and destination.
            </p>
            <PremiumButton to="/contact" variant="primary" className="mt-6">
              <Mail className="h-4 w-4" /> Contact Team
            </PremiumButton>
            <div className="mt-8 border-t border-neutral-200 pt-5">
              <SectionEyebrow>Covered Topics</SectionEyebrow>
              <div className="mt-4 flex flex-wrap gap-2">
                {[...new Set(qa.map(([tag]) => tag))].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <RevealGroup className="space-y-3" stagger={0.06}>
            {qa.map(([tag, question, answer], index) => (
              <div
                key={question}
                className="overflow-hidden rounded-[var(--radius-premium)] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)]"
              >
                <button
                  onClick={() => setOpen(open === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-neutral-50"
                >
                  <span>
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                      {tag}
                    </span>
                    <span className="font-display font-semibold text-[var(--brand-dark)]">
                      {question}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-neutral-500 transition ${open === index ? "rotate-180" : ""}`}
                  />
                </button>
                {open === index && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4 text-sm leading-7 text-neutral-600">
                    {answer}
                  </div>
                )}
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
