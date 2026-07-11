import { useEffect, useRef, useState } from "react";

import { ensureGsapReady, gsap, prefersReducedMotion } from "@/lib/gsap";

// IntersectionObserver-driven reveals. GSAP ScrollTrigger's pixel-position
// math is calculated at creation time and can go stale if layout below the
// fold shifts afterward (late images/fonts, dynamically sized content) —
// once that happens the trigger's start/end no longer line up with reality
// and a `once: true` trigger can be scrolled straight past without ever
// firing, leaving the element permanently at opacity 0. IntersectionObserver
// has no such staleness window: it's driven by the browser's own layout
// engine, so it fires correctly regardless of when other content settles.

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: "0px 0px -10% 0px",
};

export function Reveal({
  children,
  className,
  y = 36,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    ensureGsapReady();
    gsap.set(el, { y, opacity: 0 });

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      gsap.to(el, { y: 0, opacity: 1, duration: 0.9, delay, ease: "power3.out" });
      observer.disconnect();
    }, OBSERVER_OPTIONS);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    ensureGsapReady();
    const kids = Array.from(el.children);
    gsap.set(kids, { y: 32, opacity: 0 });

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      gsap.to(kids, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger });
      observer.disconnect();
    }, OBSERVER_OPTIONS);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    ensureGsapReady();
    const counter = { n: 0 };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      gsap.to(counter, {
        n: value,
        duration,
        ease: "power2.out",
        onUpdate: () => setDisplay(Math.round(counter.n)),
      });
      observer.disconnect();
    }, OBSERVER_OPTIONS);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
