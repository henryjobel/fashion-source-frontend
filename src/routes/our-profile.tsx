import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Maximize2 } from "lucide-react";

import { SectionEyebrow } from "@/components/premium/ui";

const profilePdf = "/fashion-source-bd-profile.pdf";

export const Route = createFileRoute("/our-profile")({
  head: () => ({
    meta: [
      { title: "Our Profile - Fashion Source BD" },
      {
        name: "description",
        content: "View and download the Fashion Source BD company profile.",
      },
    ],
  }),
  component: OurProfile,
});

function OurProfile() {
  return (
    <>
      <section className="bg-neutral-50 px-6 pt-24 pb-10 sm:px-8 sm:pt-28">
        <div className="mx-auto max-w-7xl">
          <SectionEyebrow>Company Profile</SectionEyebrow>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-3xl font-semibold leading-tight text-[var(--brand-dark)] md:text-5xl">
                Fashion Source BD Profile
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
                View our company profile here, or download a copy for offline reference.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={profilePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-bold text-[var(--brand-dark)] transition hover:border-[var(--brand-dark)]"
              >
                <Maximize2 className="h-4 w-4" />
                Open PDF
              </a>
              <a
                href={profilePdf}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_34px_-16px_rgba(55,172,78,0.75)] transition hover:brightness-105"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[var(--radius-premium)] border border-neutral-200 bg-neutral-100 shadow-sm">
            <div className="flex items-center gap-3 border-b border-neutral-200 bg-white px-5 py-4">
              <FileText className="h-5 w-5 text-[var(--brand-primary)]" />
              <span className="text-sm font-bold text-neutral-800">
                Fashion Source BD Profile PDF
              </span>
            </div>
            <object
              data={profilePdf}
              type="application/pdf"
              className="h-[78vh] min-h-[560px] w-full bg-white"
            >
              <div className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                <p className="text-sm leading-7 text-neutral-600">
                  Your browser cannot preview this PDF here.
                </p>
                <a
                  href={profilePdf}
                  download
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold text-white"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </object>
          </div>
        </div>
      </section>
    </>
  );
}
