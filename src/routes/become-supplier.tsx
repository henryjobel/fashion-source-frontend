import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { CheckCircle2, FileUp, Send } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/premium/motion";
import { PremiumButton, SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";
import { useSubmitSupplier } from "@/lib/queries";

export const Route = createFileRoute("/become-supplier")({
  head: () => ({
    meta: [
      { title: "Become a Supplier - Fashion Source BD" },
      {
        name: "description",
        content: "Apply to become a supplier for Fashion Source BD.",
      },
    ],
  }),
  component: Page,
});

const requirements = [
  "Factory profile and product capability",
  "Compliance and certification status",
  "Production capacity and lead time",
  "Main contact and commercial details",
];

const inputCls =
  "w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)]";

function Page() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const submitSupplier = useSubmitSupplier();
  const page = useCmsPage("/become-supplier");
  const introHeading = getField(
    page,
    "supplier-intro",
    "heading",
    "Share the details our merchandising team needs first.",
  );
  const introBody = getField(
    page,
    "supplier-intro",
    "body",
    "We review supplier applications based on product strength, capacity, compliance readiness and responsiveness.",
  );

  const companyRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const capacityRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await submitSupplier.mutateAsync({
        company_name: companyRef.current?.value ?? "",
        contact_person: contactRef.current?.value ?? "",
        country: countryRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        website: websiteRef.current?.value ?? "",
        monthly_capacity: capacityRef.current?.value ?? "",
        service_details: serviceRef.current?.value ?? "",
      });
      setSent(true);
    } catch {
      setError("Failed to submit application. Please try again.");
    }
  };

  return (
    <>
      <PageHero
        subtitle="BECOME SUPPLIER"
        title="Apply to join our approved supplier network."
        breadcrumb="Fashion Source BD / Become Supplier"
      />
      <section className="bg-neutral-50 px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="rounded-[var(--radius-premium)] bg-[var(--brand-dark)] p-8 text-white">
            <SectionEyebrow tone="dark">Supplier Onboarding</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight">
              {introHeading}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75">{introBody}</p>
            <div className="mt-8 space-y-4">
              {requirements.map((item) => (
                <div key={item} className="flex gap-3 border-t border-white/15 pt-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--brand-primary)]" />
                  <span className="text-sm font-semibold text-white/85">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-8 shadow-sm"
          >
            <div className="mb-7">
              <h2 className="font-display text-2xl font-semibold text-[var(--brand-dark)]">
                Supplier application
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Fill in the details below and our team will review your application.
              </p>
            </div>
            {sent ? (
              <div className="rounded-[var(--radius-premium)] bg-[var(--brand-primary)]/10 p-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-[var(--brand-primary)]" />
                <div className="font-display font-semibold text-[var(--brand-primary)]">
                  Thank you. Your application has been received.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                {(
                  [
                    ["Name of Company", "text", true, companyRef],
                    ["Contact Person", "text", true, contactRef],
                    ["Country of Production", "text", true, countryRef],
                    ["Email", "email", true, emailRef],
                    ["Website", "text", false, websiteRef],
                    ["Monthly Capacity", "text", false, capacityRef],
                  ] as [string, string, boolean, React.RefObject<HTMLInputElement>][]
                ).map(([label, type, required, ref]) => (
                  <label key={label} className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
                      {label}
                    </span>
                    <input ref={ref} required={required} type={type} className={inputCls} />
                  </label>
                ))}
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
                    What service can you provide to Fashion Source BD?
                  </span>
                  <textarea
                    ref={serviceRef}
                    required
                    rows={4}
                    className={`${inputCls} resize-none`}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
                    Upload company profile
                  </span>
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-4 text-sm text-neutral-600">
                    <FileUp className="h-5 w-5 text-[var(--brand-primary)]" />
                    <input type="file" className="w-full text-sm" />
                  </div>
                </label>
                {error && (
                  <p className="text-sm font-semibold text-red-600 sm:col-span-2">{error}</p>
                )}
                <PremiumButton
                  type="submit"
                  variant="primary"
                  disabled={submitSupplier.isPending}
                  className="sm:col-span-2 sm:w-fit"
                >
                  {submitSupplier.isPending ? "Submitting..." : "Submit Application"}
                  <Send className="h-4 w-4" />
                </PremiumButton>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
