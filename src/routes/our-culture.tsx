import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Briefcase, Heart, TrendingUp, Utensils, PartyPopper, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/our-culture")({
  head: () => ({
    meta: [
      { title: "Our Culture — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Education programs, complimentary food, care for stakeholders, a safe and professional working environment and self development for everyone." },
      { property: "og:title", content: "Our Culture — Nafisa Int'l Trading (BD) Ltd." },
      { property: "og:description", content: "What we believe in as a company and how we support our members." },
    ],
  }),
  component: Page,
});

const cards = [
  { icon: Briefcase, title: "Working Environment", body: "We go beyond the requirements of law to provide clean, healthy and enjoyable working environments for our members." },
  { icon: Heart, title: "Care", body: "We reward loyalty and hard work with the respect it deserves — complimentary health and life insurance for members in our sourcing centres." },
  { icon: TrendingUp, title: "Development", body: "Investing in people is crucial. Without progress, companies stagnate; we invest in our people so the business keeps improving." },
  { icon: Utensils, title: "Complimentary Food", body: "In-house kitchens prepare two fresh meals a day — a nutritious lunch keeps everyone healthier and brings colleagues together." },
  { icon: PartyPopper, title: "Atmosphere", body: "Each month we celebrate members' birthdays and host family days out to thank our members for their support." },
  { icon: GraduationCap, title: "Education", body: "Beyond our own members, we help the wider community and work to improve standards for the next generation." },
];

function Page() {
  return (
    <>
      <PageHero subtitle="OUR CULTURE" title="Education, care, complimentary food and a safe, professional environment." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / Our Culture" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white border border-neutral-200 rounded-lg p-7">
              <Icon className="w-10 h-10 text-[var(--brand-green)] mb-4" strokeWidth={1.5} />
              <h3 className="font-black text-[var(--brand-blue)] mb-2">{title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-5xl mt-16 grid md:grid-cols-3 gap-6 text-center">
          {["Sample Section", "Team Dinner", "Close Monitoring"].map((t) => (
            <div key={t} className="bg-neutral-50 rounded-lg p-8">
              <h4 className="font-black text-lg text-[var(--brand-blue)]">{t}</h4>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}