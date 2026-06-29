import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { useState } from "react";

export const Route = createFileRoute("/job-openings")({
  head: () => ({
    meta: [
      { title: "Jobs — Nafisa Int'l Trading (BD) Ltd." },
      { name: "description", content: "Career opportunities at Nafisa BD. Upload your résumé and we'll be in touch when a suitable position opens." },
      { property: "og:title", content: "Career Opportunities at Nafisa BD" },
      { property: "og:description", content: "Upload your résumé for future openings." },
    ],
  }),
  component: Page,
});

function Page() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero subtitle="JOBS" title="Career opportunities at Nafisa BD." breadcrumb="Nafisa Int'l Trading (BD) Ltd. / Jobs" />
      <section className="py-16 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="bg-neutral-50 border-l-4 border-[var(--brand-green)] p-5 mb-8 rounded">
            <p className="text-neutral-700">We currently have no open positions. You're welcome to upload your résumé and we'll be in touch when a suitable position opens.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg p-7">
            <h3 className="font-black text-[var(--brand-blue)] mb-4">Upload Résumé</h3>
            {sent ? (
              <div className="p-4 bg-[var(--brand-green)]/10 text-[var(--brand-green)] rounded">Thank you. Your résumé has been received.</div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <input required placeholder="Full Name" className="w-full border border-neutral-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--brand-green)]" />
                <input required type="email" placeholder="Email" className="w-full border border-neutral-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--brand-green)]" />
                <input placeholder="Phone" className="w-full border border-neutral-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--brand-green)]" />
                <input type="file" className="w-full text-sm text-neutral-600 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--brand-green)] file:text-white hover:file:opacity-90" />
                <button className="bg-[var(--brand-green)] text-white font-bold px-10 py-3 rounded hover:opacity-90">Send</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}