import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import {
  BarChart3,
  CheckSquare,
  DollarSign,
  FileText,
  ShieldCheck,
  Ship,
  Sparkles,
} from "lucide-react";
import { RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services - Fashion Source BD" },
      {
        name: "description",
        content:
          "Vendor selection, sampling, quality management, status reporting, shipping coordination and pricing support.",
      },
    ],
  }),
  component: Services,
});

const iconsByTitle = [
  CheckSquare,
  FileText,
  ShieldCheck,
  BarChart3,
  Ship,
  DollarSign,
  Sparkles,
] as const;

function Services() {
  const page = useCmsPage("/services");
  const modelHeading = getField(
    page,
    "service-model",
    "heading",
    "Built for buyers who need reliable execution, not loose promises.",
  );
  const modelBody = getField(
    page,
    "service-model",
    "body",
    "Fashion Source BD manages practical sourcing work across vendor selection, sampling, quality follow-up, commercial support and shipment coordination. Each step is handled with clear accountability so buyers can make faster decisions.",
  );

  const flow = [
    getField(page, "service-flow", "step1", "Research"),
    getField(page, "service-flow", "step2", "Development"),
    getField(page, "service-flow", "step3", "Sourcing"),
    getField(page, "service-flow", "step4", "Production"),
    getField(page, "service-flow", "step5", "Inspection"),
    getField(page, "service-flow", "step6", "Shipment"),
    getField(page, "service-flow", "step7", "Sampling"),
  ];

  const items = [
    [
      getField(page, "service-cards", "vendorTitle", "Selection of Vendors"),
      iconsByTitle[0],
      getField(
        page,
        "service-cards",
        "vendor",
        "Factory assessment, capability review and vendor approval coordination.",
      ),
    ],
    [
      getField(page, "service-cards", "samplingTitle", "Sampling"),
      iconsByTitle[1],
      getField(
        page,
        "service-cards",
        "sampling",
        "Buyer-led sample development across fabrics, colors, trims, fits and seasonal directions.",
      ),
    ],
    [
      getField(page, "service-cards", "qualityTitle", "Total Quality Management"),
      iconsByTitle[2],
      getField(
        page,
        "service-cards",
        "quality",
        "Inspection, corrective action, measurement control, workmanship and packaging checks.",
      ),
    ],
    [
      getField(page, "service-cards", "statusTitle", "Status Reporting"),
      iconsByTitle[3],
      getField(
        page,
        "service-cards",
        "status",
        "Multi-stage order updates, production tracking and delivery risk visibility.",
      ),
    ],
    [
      getField(page, "service-cards", "shippingTitle", "Shipping Coordination"),
      iconsByTitle[4],
      getField(
        page,
        "service-cards",
        "shipping",
        "Document review, shipment follow-up and communication with buyer instructions.",
      ),
    ],
    [
      getField(page, "service-cards", "priceTitle", "Price"),
      iconsByTitle[5],
      getField(
        page,
        "service-cards",
        "price",
        "Factory quotation review with practical market and local cost-structure understanding.",
      ),
    ],
    [
      getField(page, "service-cards", "otherTitle", "Other Services"),
      iconsByTitle[6],
      getField(
        page,
        "service-cards",
        "other",
        "Market trend, new material, regulation and fashion development information.",
      ),
    ],
  ] as const;

  return (
    <>
      <PageHero
        subtitle="OUR SERVICES"
        title="A structured sourcing workflow from concept to shipment."
        breadcrumb="Fashion Source BD / Our Services"
      />
      <section className="bg-white px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <SectionEyebrow>Service Model</SectionEyebrow>
              <SectionHeading className="mt-4">{modelHeading}</SectionHeading>
            </div>
            <p className="text-sm leading-7 text-neutral-600">{modelBody}</p>
          </div>

          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7" stagger={0.06}>
            {flow.map((step, index) => (
              <div
                key={step}
                className="rounded-[var(--radius-premium)] border border-neutral-200 bg-neutral-50 p-5"
              >
                <div className="font-display text-xs font-bold text-[var(--brand-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 text-sm font-bold text-neutral-900">{step}</div>
              </div>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.08}>
            {items.map(([title, Icon, body], index) => (
              <article
                key={title}
                className={`group rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)] ${
                  index === 2 ? "md:row-span-2" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 transition-colors duration-300 group-hover:bg-[var(--brand-primary)]">
                    <Icon className="h-6 w-6 text-[var(--brand-primary)] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[var(--brand-dark)]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">{body}</p>
                  </div>
                </div>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
