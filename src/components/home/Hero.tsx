import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import heroImg from "@/assets/hero-garments.jpg";
import { PremiumButton, SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";
import { ensureGsapReady, gsap, prefersReducedMotion } from "@/lib/gsap";

const slides = [
  heroImg,
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=2000&q=85",
];

export function Hero() {
  const page = useCmsPage("/");
  const [active, setActive] = useState(0);
  const chipsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const timer = window.setInterval(() => setActive((c) => (c + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    if (!chipsRef.current || prefersReducedMotion()) return;
    ensureGsapReady();
    const ctx = gsap.context(() => {
      gsap.from(chipsRef.current!.children, {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.6,
        ease: "power3.out",
      });
    }, chipsRef);
    return () => ctx.revert();
  }, []);

  const eyebrow = getField(page, "hero", "eyebrow", "Global Garments Sourcing House");
  const title = getField(
    page,
    "hero",
    "title",
    "Precision sourcing for brands that refuse to compromise.",
  );
  const subtitle = getField(
    page,
    "hero",
    "subtitle",
    "A 100% export-oriented buying house connecting international buyers with compliant, capable factories across Bangladesh — from concept to shipment.",
  );
  const trust = [
    getField(page, "hero", "trust1", "Est. 1998"),
    getField(page, "hero", "trust2", "4 Global Offices"),
    getField(page, "hero", "trust3", "100+ Compliant Factories"),
    getField(page, "hero", "trust4", "BSCI-Aligned Sourcing"),
  ];

  return (
    <section className="relative flex min-h-screen w-full items-end overflow-hidden bg-[var(--brand-dark)]">
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            animation: i === active ? "hero-kenburns 9s ease-out forwards" : undefined,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)] via-[var(--brand-dark)]/55 to-[var(--brand-dark)]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-dark)]/70 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 sm:px-8">
        <SectionEyebrow tone="dark">{eyebrow}</SectionEyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-white/75">{subtitle}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <PremiumButton to="/products" variant="primary">
            Explore Products
          </PremiumButton>
          <PremiumButton to="/contact" variant="ghost-dark">
            Start a Conversation
          </PremiumButton>
        </div>

        <div
          ref={chipsRef}
          className="mt-16 flex flex-wrap gap-3 border-t border-white/10 pt-8 sm:gap-4"
        >
          {trust.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>

      <style>{`
        @keyframes hero-kenburns {
          from { transform: scale(1.08); }
          to { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
