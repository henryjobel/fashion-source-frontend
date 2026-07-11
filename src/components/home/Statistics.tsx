import { useEffect, useRef, useState } from "react";

import { GlassCard, SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";
import { ensureGsapReady, gsap, prefersReducedMotion } from "@/lib/gsap";

const metrics = [
  { key: "item1", label: "On-Time Delivery", value: 98 },
  { key: "item2", label: "Quality Pass Rate", value: 99 },
  { key: "item3", label: "Repeat Buyer Rate", value: 85 },
  { key: "item4", label: "Factory Compliance Coverage", value: 100 },
];

function ProgressRing({ value }: { value: number }) {
  const ref = useRef<SVGCircleElement | null>(null);
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0);
  const r = 52;
  const circumference = 2 * Math.PI * r;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    ensureGsapReady();
    const counter = { n: 0 };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(el, {
          strokeDashoffset: circumference - (value / 100) * circumference,
          duration: 1.6,
          ease: "power2.out",
        });
        gsap.to(counter, {
          n: value,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => setDisplay(Math.round(counter.n)),
        });
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle
          ref={ref}
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      <span className="absolute font-display text-2xl font-semibold text-white">{display}%</span>
    </div>
  );
}

export function Statistics() {
  const page = useCmsPage("/");

  return (
    <section className="relative bg-[var(--brand-dark)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <SectionEyebrow tone="dark" className="justify-center">
            By The Numbers
          </SectionEyebrow>
          <SectionHeading tone="dark" className="mt-5">
            {getField(page, "statistics", "heading", "Performance you can measure.")}
          </SectionHeading>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <GlassCard
              key={m.key}
              tone="dark"
              className="flex flex-col items-center gap-6 p-8 text-center"
            >
              <ProgressRing value={m.value} />
              <div className="text-xs font-bold uppercase tracking-wider text-white/60">
                {getField(page, "statistics", `${m.key}Label`, m.label)}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
