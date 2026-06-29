import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { History, HeartHandshake, Palette, PackageSearch, RefreshCw, Users2, Wrench, ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/why-work-with-us")({
  head: () => ({
    meta: [
      { title: "Why Work With Us — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Long history, strong CSR team, in-house design, China sourcing office, real-time ERP order updates and a highly skilled merchandising team." },
      { property: "og:title", content: "Why Choose Nafisa BD?" },
      { property: "og:description", content: "Eight reasons buyers choose Nafisa BD as their long-term sourcing partner." },
    ],
  }),
  component: Page,
});

const items = [
  { icon: History, title: "Long History", body: "Nafisa BD has a long and rich history and knows the Bangladesh market thoroughly through trusted relationships with local apparel manufacturers." },
  { icon: HeartHandshake, title: "Strong CSR Team", body: "Our strong CSR team ensures Social Compliance per local and customer demands. A digital platform gives customers exact factory information on CSR issues." },
  { icon: Palette, title: "Own Design Team", body: "Our design team presents new trends in demand. Samples are shared with customers and a dedicated R&D team supports new fabrics and samples." },
  { icon: PackageSearch, title: "Import Fabric & Trims Sourcing", body: "Our own office in China supports customers with imported fabrics and trims, giving access to new materials with extra support." },
  { icon: RefreshCw, title: "Real Order Update", body: "Nafisa has its own ERP software where customers get real-time order updates throughout the production cycle." },
  { icon: Users2, title: "Highly Skilled Merchandising Team", body: "Specialists and experts for different products and categories — buyers get proper, product-specific support." },
  { icon: Wrench, title: "Skilled Technical Team", body: "Our team gives customers utmost quality and support throughout the whole process — from sampling until shipment." },
  { icon: ClipboardCheck, title: "Special QA Team", body: "A highly trained Quality Assurance Team ensures 100% quality as per customer demand." },
];

function Page() {
  return (
    <>
      <PageHero subtitle="WHY CHOOSE NAFISA BD?" title="Unique features that make us a trusted long-term sourcing partner." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / Why Choose Nafisa BD?" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white border border-neutral-200 rounded-lg p-6 text-center hover:shadow-md hover:-translate-y-1 transition">
              <Icon className="w-12 h-12 mx-auto text-[var(--brand-green)] mb-4" strokeWidth={1.5} />
              <h3 className="font-black text-[var(--brand-blue)] mb-3">{title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}