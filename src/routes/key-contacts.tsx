import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/premium/motion";
import { PremiumButton, SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

export const Route = createFileRoute("/key-contacts")({
  head: () => ({
    meta: [
      { title: "Key Contacts - Fashion Source BD" },
      { name: "description", content: "Meet the leadership team of Fashion Source BD." },
    ],
  }),
  component: Page,
});

function Page() {
  const page = useCmsPage("/key-contacts");
  const introHeading = getField(
    page,
    "leadership-intro",
    "heading",
    "Reach the right team faster.",
  );
  const introBody = getField(
    page,
    "leadership-intro",
    "body",
    "For product development, sourcing, supplier or operational communication, these contacts help direct inquiries to the relevant department.",
  );

  const people = [
    {
      name: "MD. Abu Sayed",
      role: "Director",
      initials: "AS",
      email: "info@fashionsource-bd.com",
    },
    {
      name: "Md. Abdul Karim",
      role: "Managing Director & CEO",
      initials: "AK",
      email: "info@fashionsource-bd.com",
    },
  ];

  return (
    <>
      <PageHero
        subtitle="KEY CONTACTS"
        title="Leadership contacts for business communication."
        breadcrumb="Fashion Source BD / Key Contacts"
      />
      <section className="bg-neutral-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 grid gap-8 rounded-[var(--radius-premium)] bg-white p-8 shadow-sm ring-1 ring-neutral-200 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <SectionEyebrow>Leadership</SectionEyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--brand-dark)]">
                {introHeading}
              </h2>
            </div>
            <p className="text-sm leading-7 text-neutral-600">{introBody}</p>
          </Reveal>

          <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.08}>
            {people.map((person, index) => (
              <article
                key={`${person.name}-${index}`}
                className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)]"
              >
                <div className="flex gap-5">
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[var(--radius-premium)] bg-gradient-to-br from-[var(--brand-dark)] to-[var(--brand-primary)] text-2xl font-display font-semibold text-white">
                    {person.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold text-[var(--brand-dark)]">
                      {person.name}
                    </h3>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                      {person.role}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-sm font-bold text-neutral-700 transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                      >
                        <Mail className="h-4 w-4" /> Email
                      </a>
                      <a
                        href="https://www.linkedin.com/company/fashion-source-bd"
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-sm font-bold text-neutral-700 transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                      >
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 rounded-[var(--radius-premium)] bg-[var(--brand-dark)] p-8 text-white">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="font-display text-2xl font-semibold">Need general assistance?</h2>
                <p className="mt-2 text-sm text-white/75">
                  Send your query to the corporate office and the team will route it.
                </p>
              </div>
              <PremiumButton to="/contact" variant="primary">
                <Phone className="h-4 w-4" /> Contact Office
              </PremiumButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
