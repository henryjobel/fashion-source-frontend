import { useLayoutEffect, useRef } from "react";

import { RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";
import { ensureGsapReady, gsap, prefersReducedMotion } from "@/lib/gsap";

const gallery = [
  {
    key: "item1",
    src: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=1200&q=85",
    label: "Cutting Section",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    key: "item2",
    src: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=85",
    label: "Sewing Line",
    span: "",
  },
  {
    key: "item3",
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85",
    label: "Quality Inspection",
    span: "",
  },
  {
    key: "item4",
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=85",
    label: "Warehouse",
    span: "",
  },
  {
    key: "item5",
    src: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=900&q=85",
    label: "Finished Goods",
    span: "",
  },
];

export function FactoryShowcase() {
  const page = useCmsPage("/");
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;
    ensureGsapReady();
    const ctx = gsap.context(() => {
      const tiles = sectionRef.current!.querySelectorAll<HTMLElement>("[data-parallax]");
      tiles.forEach((tile) => {
        gsap.to(tile.querySelector("img"), {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>Inside The Factory</SectionEyebrow>
          <SectionHeading className="mt-5">
            {getField(page, "factory-showcase", "heading", "Where every order comes to life.")}
          </SectionHeading>
        </div>

        <RevealGroup
          className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {gallery.map((g) => (
            <div
              key={g.key}
              data-parallax
              className={`group relative overflow-hidden rounded-[var(--radius-premium)] ${g.span}`}
            >
              <img
                src={g.src}
                alt={getField(page, "factory-showcase", `${g.key}Label`, g.label)}
                loading="lazy"
                className="h-[112%] w-full -translate-y-[6%] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div className="absolute bottom-4 left-5 text-sm font-bold uppercase tracking-wider text-white">
                {getField(page, "factory-showcase", `${g.key}Label`, g.label)}
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
