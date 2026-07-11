import { useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  MessageSquare,
  PackageCheck,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/premium/motion";
import { SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";
import { ensureGsapReady, gsap, prefersReducedMotion } from "@/lib/gsap";

const steps = [
  {
    icon: MessageSquare,
    key: "item1",
    title: "1. Receiving Query",
    body: "We carefully review every inquiry to understand your exact requirements.",
  },
  {
    icon: Users,
    key: "item2",
    title: "2. Vendor Selection",
    body: "We select the right compliant, capable factory for your specific product.",
  },
  {
    icon: PackageCheck,
    key: "item3",
    title: "3. Order & Execution",
    body: "Production is planned and executed with clear milestones and tracking.",
  },
  {
    icon: ShieldCheck,
    key: "item4",
    title: "4. Quality Assurance",
    body: "Inspection and quality checks run throughout the production cycle.",
  },
  {
    icon: Truck,
    key: "item5",
    title: "5. Shipping & Logistic",
    body: "Documentation and shipment coordination keep delivery on schedule.",
  },
  {
    icon: Headphones,
    key: "item6",
    title: "6. After Sales Services",
    body: "We stay engaged after delivery to support repeat orders and feedback.",
  },
];

export function FactoryProcess() {
  const page = useCmsPage("/");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !lineRef.current || prefersReducedMotion()) return;
    ensureGsapReady();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f4ed] py-24 sm:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.58fr] lg:items-end">
          <div>
            <SectionEyebrow>Our Process</SectionEyebrow>
            <SectionHeading className="mt-5 max-w-xl">
              {getField(page, "factory-process", "heading", "How We Work")}
            </SectionHeading>
          </div>
          <p className="max-w-2xl text-base leading-8 text-neutral-600 lg:justify-self-end">
            {getField(
              page,
              "factory-process",
              "intro",
              "We prioritize your requirements, functioning as your committed representative - from receiving a query to after-sales support.",
            )}
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[28px] bg-[var(--brand-dark)] p-5 shadow-[0_34px_90px_-48px_rgba(16,20,24,0.75)] sm:p-7 lg:p-9">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="flex min-h-[430px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-white">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-primary)] text-white">
                  <CheckCircle2 className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="mt-7 font-display text-3xl font-semibold leading-tight">
                  Your Bangladesh buying office, built around control.
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/65">
                  Each stage is tracked through clear ownership, supplier checks, production
                  updates, quality control and shipment follow-up.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="text-2xl font-semibold">6</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                    Core Steps
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="text-2xl font-semibold">A-Z</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                    Support
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl bg-white p-4 sm:p-5">
              <div className="absolute left-8 right-8 top-[58px] hidden h-px bg-neutral-200 lg:block">
                <div ref={lineRef} className="h-px w-full bg-[var(--brand-primary)]" />
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {steps.map(({ icon: Icon, key, title, body }, i) => (
                  <Reveal key={key}>
                    <div className="group relative flex h-full min-h-[190px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)]/35 hover:shadow-[0_22px_50px_-34px_rgba(16,20,24,0.8)]">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2efe7] text-[var(--brand-dark)] transition group-hover:bg-[var(--brand-primary)] group-hover:text-white">
                            <Icon className="h-5 w-5" strokeWidth={1.6} />
                          </div>
                          <div className="font-display text-3xl font-semibold text-neutral-200">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                        <h3 className="mt-6 text-base font-extrabold uppercase leading-6 tracking-[0.08em] text-[var(--brand-dark)]">
                          {getField(page, "factory-process", `${key}Title`, title).replace(
                            /^\d+\.\s*/,
                            "",
                          )}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-neutral-600">
                          {getField(page, "factory-process", `${key}Body`, body)}
                        </p>
                      </div>
                      {i < steps.length - 1 && (
                        <ArrowRight className="mt-5 h-4 w-4 text-[var(--brand-primary)] md:hidden" />
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
