import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { CheckSquare, FileText, ShieldCheck, BarChart3, Ship, DollarSign, Sparkles } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Vendor selection, sampling, total quality management, status reporting, shipping coordination, pricing and more." },
      { property: "og:title", content: "Services — Nafisa Int'l Trading (BD) Ltd." },
      { property: "og:description", content: "Full-service buying house — from trustworthy vendors and TQM to logistics and ERP transparency." },
    ],
  }),
  component: Services,
});

const items = [
  { icon: CheckSquare, title: "Selection of Vendors", body: "We assess factories on product range, quality, capacity, facilities, financial capability, technology, manpower, working conditions, managerial efficiency and quality policy. After initial assessment we exchange information with our principals and approve selected vendors." },
  { icon: FileText, title: "Sampling", body: "We provide samples developed to incorporate colors, fabrics and styles based on buyer requirements. We manufacture sample quantities as required — sharpening the marketing efforts of our buyers in their regions." },
  { icon: ShieldCheck, title: "Total Quality Management", body: "We closely monitor orders from sampling to shipment. A pro-active approach is maintained towards identifying problems and applying corrective measures. Physical inspection covers design, shrinkage, accessories, appearance, color, labeling, material, assortments, workmanship, measurements and packaging." },
  { icon: BarChart3, title: "Status Reporting", body: "Status reports based on multi-stage inspection are transmitted to buyers. Production progress is analyzed against delivery terms and suitable course of action is taken to ensure on-time delivery." },
  { icon: Ship, title: "Shipping Coordination", body: "Shipping documents are checked as per the buyer's instruction and copies are sent in advance of the shipment to avoid any discrepancies." },
  { icon: DollarSign, title: "Price", body: "We scrutinize prices quoted by factories and other suppliers and combine that with our own experience of the local cost structure to obtain the most realistic prices." },
  { icon: Sparkles, title: "Other Services", body: "We keep buyers informed about market trends, new developments in the industry, changes in government policy and regulations, as well as new fabrics, designs and fashion trends." },
];

function Services() {
  return (
    <>
      <PageHero subtitle="OUR SERVICES" title="Trustworthy vendors, TQM, sampling, logistics and full ERP transparency." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / Our Services" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          {items.map(({ icon: Icon, title, body }) => (
            <article key={title} className="bg-white border border-neutral-200 rounded-lg p-7 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-md bg-[var(--brand-green)]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[var(--brand-green)]" />
                </div>
                <h3 className="font-black text-lg text-[var(--brand-blue)]">{title}</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}