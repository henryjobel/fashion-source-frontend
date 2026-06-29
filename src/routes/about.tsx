import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Building, Award, Users, Globe2, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Established in 1998. A leading buying & trading house in Bangladesh, vertically integrated through EFL, Jann Composite Mills and Jann Global Logistics." },
      { property: "og:title", content: "About Nafisa Int'l Trading (BD) Ltd." },
      { property: "og:description", content: "A vertically integrated buying house with 350+ skilled employees and 100+ associated factories." },
    ],
  }),
  component: About,
});

const facts = [
  { icon: Building, title: "Headquarter: Nafisa Tower, Dhaka, Bangladesh", body: "Leading Buyer's agent / representative and garments exporter in Bangladesh since 1998. Sourcing office in Shaoxing, China and Financial office in Dubai." },
  { icon: Users, title: "350+ Skilled Employees", body: "More than 100 merchandisers keep daily contact with clients to maintain healthy long-term relationships." },
  { icon: Award, title: "Own Compliant Factories", body: "Jann Composite Mills Ltd. & Emon Fashion Ltd. hold ACCORD, BSCI, GOTS, OCS and OEKO-TEX certificates. We also operate our own Auto Screen Printing & Embroidery unit." },
  { icon: ShieldCheck, title: "100+ Associated Factories", body: "All associated factories are fully compliant with ACCORD, ALLIANCE, BSCI, SEDEX, WRAP, OEKO-TEX, GOTS, OCS, GRS, RCS and more." },
  { icon: Globe2, title: "Full Product Range", body: "Knits, Flat Knit (3gg to 14gg), Woven (Shirts, Pants, Denim, Workwear, Jackets), Towel and Home Textile items." },
  { icon: Truck, title: "Vertically Integrated", body: "Own logistics company — Jann Global Logistics — makes the whole supply chain smoother for our customers." },
];

function About() {
  return (
    <>
      <PageHero subtitle="ABOUT US" title="A well-renowned buying & trading house, vertically integrated since 1998." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / About Us" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[var(--brand-blue)] mb-12">Established in 1998</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {facts.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition">
                <Icon className="w-10 h-10 text-[var(--brand-green)] mb-4" strokeWidth={1.5} />
                <h3 className="font-bold text-neutral-800 mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-neutral-50 py-16 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[var(--brand-blue)] mb-6">COMPANY GOALS</h2>
          <p className="text-neutral-700 leading-relaxed">
            To be our customers' first choice as a long-term business partner through honesty, integrity, environmental respect and corporate social responsibility — ensuring the best feedback to valued clients through sincere and dedicated support.
          </p>
        </div>
      </section>
    </>
  );
}