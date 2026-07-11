import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ArrowUpRight, Building2 } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

export const Route = createFileRoute("/concern")({
  head: () => ({
    meta: [
      { title: "Sister Concerns - Fashion Source BD" },
      {
        name: "description",
        content: "Sister concerns and partner companies connected to garment sourcing and supply.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const page = useCmsPage("/concern");
  const introHeading = getField(
    page,
    "network-intro",
    "heading",
    "Production support beyond one office.",
  );
  const introBody = getField(
    page,
    "network-intro",
    "body",
    "Connected companies support manufacturing, sourcing, embroidery, printing, packaging and logistics so buyer programs can move through a stronger operational network.",
  );

  const concerns = [
    [
      getField(page, "concern-list", "company1Name", "EFL - Emon Fashion Limited"),
      getField(
        page,
        "concern-list",
        "company1Desc",
        "Manufacturing, supplying and exporting high quality garments.",
      ),
      getField(page, "concern-list", "company1Url", "http://www.efl.com.bd/"),
    ],
    [
      getField(page, "concern-list", "company2Name", "Jann Composite Mills Limited"),
      getField(
        page,
        "concern-list",
        "company2Desc",
        "Vertically integrated knit garment manufacturing and exporting composite unit.",
      ),
      getField(page, "concern-list", "company2Url", "https://janncomposite.com/"),
    ],
    [
      getField(page, "concern-list", "company3Name", "Arshad Embroidery Limited"),
      getField(
        page,
        "concern-list",
        "company3Desc",
        "Embroidery manufacturing support for apparel programs.",
      ),
      getField(page, "concern-list", "company3Url", "http://arshademb.com/"),
    ],
    [
      getField(page, "concern-list", "company4Name", "Jann Printing and Packaging Ltd."),
      getField(page, "concern-list", "company4Desc", "Textile printing and packaging support."),
      getField(page, "concern-list", "company4Url", "https://jannprinting.com/"),
    ],
    [
      getField(page, "concern-list", "company5Name", "Fashion Source BD DWC-LLC"),
      getField(page, "concern-list", "company5Desc", "Service provider for ready-made garments."),
      getField(page, "concern-list", "company5Url", "https://fashionsourcebd.com/"),
    ],
    [
      getField(page, "concern-list", "company6Name", "Fashion Source BD Sourcing (CN) Ltd."),
      getField(
        page,
        "concern-list",
        "company6Desc",
        "Garments sourcing company and material follow-up support.",
      ),
      getField(page, "concern-list", "company6Url", "https://fashionsourcebd.com/"),
    ],
    [
      getField(page, "concern-list", "company7Name", "Jann Global Logistics Limited"),
      getField(page, "concern-list", "company7Desc", "Logistics and freight forwarding partner."),
      getField(page, "concern-list", "company7Url", "http://jannglobal.com/"),
    ],
  ];

  return (
    <>
      <PageHero
        subtitle="SISTER CONCERN"
        title="A connected network for apparel sourcing and execution."
        breadcrumb="Fashion Source BD / Sister Concern"
      />
      <section className="bg-neutral-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 grid gap-8 rounded-[var(--radius-premium)] bg-white p-8 shadow-sm ring-1 ring-neutral-200 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <SectionEyebrow>Network</SectionEyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--brand-dark)]">
                {introHeading}
              </h2>
            </div>
            <p className="text-sm leading-7 text-neutral-600">{introBody}</p>
          </Reveal>

          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {concerns.map(([name, desc, url], index) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className={`group rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)] ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 transition-colors duration-300 group-hover:bg-[var(--brand-primary)]">
                    <Building2 className="h-6 w-6 text-[var(--brand-primary)] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-neutral-400 transition group-hover:text-[var(--brand-primary)]" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-[var(--brand-dark)] transition group-hover:text-[var(--brand-primary)]">
                  {name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{desc}</p>
              </a>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
