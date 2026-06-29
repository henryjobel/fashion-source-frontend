import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/concern")({
  head: () => ({
    meta: [
      { title: "Sister Concerns — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Members of the Jann Group — one of the most diversified independent trading and manufacturing conglomerates in the apparel & textile industry of Bangladesh." },
      { property: "og:title", content: "Sister Concerns — Jann Group" },
      { property: "og:description", content: "Member companies of the Jann Group." },
    ],
  }),
  component: Page,
});

const concerns = [
  { name: "EFL — Emon Fashion Limited", desc: "Manufacturing, supplying and exporting of high quality garments.", url: "http://www.efl.com.bd/" },
  { name: "Jann Composite Mills Limited", desc: "Vertically integrated knit garments manufacturing & exporting composite unit.", url: "https://janncomposite.com/" },
  { name: "Arshad Embroidery Limited", desc: "Embroidery manufacturer.", url: "http://arshademb.com/" },
  { name: "Jann Printing and Packaging Ltd.", desc: "Textile printing solution.", url: "https://jannprinting.com/" },
  { name: "Nafisa Int'l Trading DWC-LLC", desc: "Service provider for ready-made garments.", url: "https://nafisaae.com/" },
  { name: "Nafisa Int'l Trading (CN) Ltd.", desc: "Garments sourcing company.", url: "http://www.nafisacn.com/" },
  { name: "Jann Global Logistics Limited", desc: "Logistics and freight forwarding partner.", url: "http://jannglobal.com/" },
];

function Page() {
  return (
    <>
      <PageHero subtitle="SISTER CONCERN" title="Members of the Jann Group — diversified trading and manufacturing since 1998." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / Sister Concern" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {concerns.map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noreferrer" className="group bg-white border border-neutral-200 rounded-lg p-7 hover:border-[var(--brand-green)] hover:shadow-md transition">
              <div className="h-2 w-12 bg-[var(--brand-green)] mb-5 rounded" />
              <h3 className="font-black text-[var(--brand-blue)] text-lg group-hover:text-[var(--brand-green)] transition">{c.name}</h3>
              <p className="text-sm text-neutral-600 mt-2">{c.desc}</p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--brand-green)] mt-5 uppercase tracking-wider">
                Visit Site <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}