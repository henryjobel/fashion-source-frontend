import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapReady() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;

  // Scroll-linked (scrub) triggers cache pixel start/end positions at
  // creation time; if images/fonts/late content shift layout afterward,
  // those positions go stale. Refresh once everything has settled so
  // scrub-based animations (e.g. the factory-process timeline line) track
  // the real, final layout rather than a stale early measurement.
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger };
