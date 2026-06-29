import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Mail, Linkedin } from "lucide-react";

export const Route = createFileRoute("/key-contacts")({
  head: () => ({
    meta: [
      { title: "Key Contacts — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Meet the leadership team of Nafisa Int'l Trading (BD) Ltd." },
      { property: "og:title", content: "Key Contacts" },
      { property: "og:description", content: "Leadership and executive team contacts." },
    ],
  }),
  component: Page,
});

const people = [
  { name: "Iqbal Khan Jamal", role: "Managing Director and CEO", initials: "IK" },
  { name: "Nafisa Khan", role: "Vice Chairman", email: "nafisakhan@nafisabd.com", initials: "NK" },
  { name: "Arshad Jamal Khan", role: "Director", email: "arshad@nafisabd.com", initials: "AK" },
  { name: "Abul Kalam Azad", role: "Chief Operating Officer", email: "azad@nafisabd.com", initials: "AA" },
];

function Page() {
  return (
    <>
      <PageHero subtitle="KEY CONTACTS" title="Our leadership team." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / Key Contacts" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl grid sm:grid-cols-2 gap-6">
          {people.map((p) => (
            <div key={p.name} className="bg-white border border-neutral-200 rounded-lg p-7 flex gap-5 items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
                {p.initials}
              </div>
              <div className="min-w-0">
                <h3 className="font-black text-[var(--brand-blue)] text-lg">{p.name}</h3>
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mt-1">{p.role}</div>
                {p.email && (
                  <a href={`mailto:${p.email}`} className="flex items-center gap-2 text-sm text-neutral-700 hover:text-[var(--brand-green)] mt-3">
                    <Mail className="w-4 h-4" /> {p.email}
                  </a>
                )}
                <a href="https://www.linkedin.com/company/nafisa" className="inline-flex items-center gap-2 text-sm text-[var(--brand-blue)] hover:underline mt-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}