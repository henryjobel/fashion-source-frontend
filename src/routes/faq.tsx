import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Frequently asked questions about Nafisa BD — product list, contact, order lead times, payment terms, MOQ and more." },
      { property: "og:title", content: "Frequently Asked Questions" },
      { property: "og:description", content: "Common questions answered for buyers and partners." },
    ],
  }),
  component: FAQ,
});

const qa = [
  { q: "What kind of business organization is Nafisa BD?", a: "Nafisa BD is a leading buyer's agent / representative and garments exporter in Bangladesh since 1998." },
  { q: "What is on Nafisa BD's product list?", a: "Knits (T-Shirt, Polo-Shirt, Sweater, Fleece, Sleepwear, Beachwear, Underwear, Sports Items and Socks); Flat Knit (3gg to 14gg); Woven (Shirts, Pants, Denim, Workwear and Jackets); Towel and Home Textile items." },
  { q: "How can I contact Nafisa BD?", a: "Head office: Plot # 08, Road # 1/A, Gulshan-1, Dhaka-1212, Bangladesh. Phone: +88-09606-333222. Email: info@nafisabd.com. Branch offices in Dubai (UAE) and Shaoxing (China)." },
  { q: "What type of client can approach Nafisa BD?", a: "Retailers, importers and wholesalers." },
  { q: "What is the shipment lead time after order placement?", a: "Typically 60–110 days, depending on the product, material sourcing, sampling, testing, approval and inspection process." },
  { q: "What is the payment term?", a: "L/C at sight and TT payment. Other options can be negotiated." },
  { q: "What is the minimum order quantity (MOQ) per colour / style?", a: "Varies by product. Generally 2,000–3,000 pcs per colour for Tee, Polo, Hoody, Joggers, Sweat, Pullover and Cardigan. For woven Tops, Shirts, Long Pants, Shorts, Cargo, Jeans, Jackets and Swim shorts: 3,000–4,000 pcs per colour." },
  { q: "Why should you consider Nafisa BD as your trusted sourcing agent?", a: "Long and solid experience in full-range sourcing, execution and inspection. We follow international quality standards and our customers' codes of conduct. Our core values are honesty, integrity, environmental respect and corporate social responsibility." },
  { q: "How do I apply for a job at Nafisa BD?", a: "Visit the Job Openings page and submit your résumé through the application form." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero subtitle="FAQ" title="Frequently asked questions." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / FAQ" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl space-y-3">
          {qa.map((item, i) => (
            <div key={i} className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-[var(--brand-blue)] hover:bg-neutral-50">
                <span>{item.q}</span>
                <ChevronDown className={`w-5 h-5 transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-neutral-600 leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}