import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { useState } from "react";

export const Route = createFileRoute("/become-supplier")({
  head: () => ({
    meta: [
      { title: "Become a Supplier — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Apply to become a supplier for Nafisa BD. Tell us about your company and the services you can provide." },
      { property: "og:title", content: "Become a Supplier" },
      { property: "og:description", content: "Supplier application form." },
    ],
  }),
  component: Page,
});

function Page() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero subtitle="BECOME SUPPLIER" title="Partner with Nafisa BD as a trusted supplier." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / Become Supplier" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-2xl bg-white border border-neutral-200 rounded-lg p-8">
          {sent ? (
            <div className="p-4 bg-[var(--brand-green)]/10 text-[var(--brand-green)] rounded text-center">Thank you. Your application has been received.</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              {["Name of Company", "Contact Person", "What service can you provide to Nafisa BD?", "Country of Production", "Email", "Website"].map((label) => (
                <div key={label}>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">{label}</label>
                  <input required={label !== "Website"} type={label === "Email" ? "email" : "text"} className="w-full border border-neutral-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--brand-green)]" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Upload a file</label>
                <input type="file" className="w-full text-sm text-neutral-600 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--brand-green)] file:text-white hover:file:opacity-90" />
              </div>
              <button className="bg-[var(--brand-green)] text-white font-bold px-10 py-3 rounded hover:opacity-90">SUBMIT</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}