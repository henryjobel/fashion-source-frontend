import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Get in touch with Nafisa BD — headquarters in Dhaka, financial office in Dubai, sourcing office in China and a branch in Turkey." },
      { property: "og:title", content: "Contact Nafisa Int'l Trading (BD) Ltd." },
      { property: "og:description", content: "Contact information for all Nafisa BD offices." },
    ],
  }),
  component: Contact,
});

const offices = [
  { title: "Corporate Headquarters", lines: ["Plot # 08, Road # 1/A, Gulshan-1, Dhaka-1212, Bangladesh."] },
  { title: "Financial Office, UAE", lines: ["Biz City, Business Centre, City Tower 2, 14th floor 1403, Sheikh Zayed Road, Dubai, UAE."] },
  { title: "Sourcing Office, China", lines: ["1144 Building 2, No 2998, Jinkeqiao Avenue, Keqiao, Shaoxing, China."] },
  { title: "Branch Turkey", lines: ["Şenlikköy, Bakırköy — İstanbul, Turkey."] },
];

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero subtitle="CONTACT" title="Get in touch — we'd love to hear from you." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / Contact" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="bg-white border border-neutral-200 rounded-lg p-7 mb-10">
            <h2 className="font-black text-xl text-[var(--brand-blue)] mb-4">Corporate Headquarters</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-neutral-700">
              <div className="flex gap-3"><Phone className="w-5 h-5 text-[var(--brand-green)] flex-shrink-0" /><div>+88-09606-333222<br />+88-02-222286536<br />+88-02-222284003</div></div>
              <div className="flex gap-3"><Mail className="w-5 h-5 text-[var(--brand-green)] flex-shrink-0" /><div>info@nafisabd.com</div></div>
              <div className="flex gap-3"><MapPin className="w-5 h-5 text-[var(--brand-green)] flex-shrink-0" /><div>Plot # 08, Road # 1/A, Gulshan-1, Dhaka-1212, Bangladesh.</div></div>
            </div>
            <table className="mt-6 text-sm w-full max-w-md">
              <tbody>
                <tr><td className="py-1.5 text-neutral-600">Mon — Thu, Sun</td><td className="py-1.5 font-semibold">10:00 am – 07:00 pm</td></tr>
                <tr><td className="py-1.5 text-neutral-600">Fri</td><td className="py-1.5 font-semibold">04:00 pm – 08:00 pm</td></tr>
                <tr><td className="py-1.5 text-neutral-600">Sat</td><td className="py-1.5 font-semibold">Weekly Holiday</td></tr>
              </tbody>
            </table>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {offices.slice(1).map((o) => (
              <div key={o.title} className="bg-neutral-50 rounded-lg p-6">
                <h3 className="font-black text-[var(--brand-blue)] mb-2">{o.title}</h3>
                {o.lines.map((l) => <p key={l} className="text-sm text-neutral-600">{l}</p>)}
              </div>
            ))}
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg p-7">
            <h2 className="font-black text-xl text-[var(--brand-blue)] mb-5">Get in Touch</h2>
            {sent ? (
              <div className="p-4 bg-[var(--brand-green)]/10 text-[var(--brand-green)] rounded">Thank you. We'll be in touch shortly.</div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Your Name" className="border border-neutral-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--brand-green)]" />
                <input required type="email" placeholder="Email" className="border border-neutral-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--brand-green)]" />
                <input placeholder="Phone" className="border border-neutral-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--brand-green)] sm:col-span-2" />
                <textarea required placeholder="Message" rows={5} className="border border-neutral-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--brand-green)] sm:col-span-2" />
                <button className="bg-[var(--brand-green)] text-white font-bold px-8 py-2.5 rounded hover:opacity-90 sm:col-span-2 sm:w-fit">Send</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}