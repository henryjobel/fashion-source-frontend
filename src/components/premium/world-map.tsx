import { useEffect, useRef } from "react";

import { worldDots } from "@/data/world-dots";
import { ensureGsapReady, gsap, prefersReducedMotion } from "@/lib/gsap";

const WIDTH = 1000;
const HEIGHT = 500;

function project([lon, lat]: [number, number]): [number, number] {
  const x = ((lon + 180) / 360) * WIDTH;
  const y = ((90 - lat) / 180) * HEIGHT;
  return [x, y];
}

const HQ: [number, number] = [90.4, 23.8]; // Dhaka

const offices: { label: string; coord: [number, number] }[] = [
  { label: "Dhaka HQ", coord: HQ },
  { label: "Sourcing Office — China", coord: [120.6, 30.0] },
  { label: "Finance Office — UAE", coord: [55.3, 25.2] },
  { label: "Branch — Turkey", coord: [28.87, 40.98] },
];

const markets: { label: string; coord: [number, number] }[] = [
  { label: "North America", coord: [-100, 40] },
  { label: "Europe", coord: [15, 50] },
  { label: "Middle East", coord: [48, 24] },
  { label: "East Asia", coord: [122, 34] },
];

function curvePath(from: [number, number], to: [number, number]) {
  const [x1, y1] = project(from);
  const [x2, y2] = project(to);
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.18 - 12;
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
}

export function WorldMap({ showLabels = true }: { showLabels?: boolean }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    ensureGsapReady();

    const routes = svg.querySelectorAll<SVGPathElement>("[data-route]");
    const pulses = svg.querySelectorAll<SVGCircleElement>("[data-pulse]");

    if (prefersReducedMotion()) return;

    routes.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        routes.forEach((path, i) => {
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.6,
            delay: i * 0.2,
            ease: "power2.inOut",
          });
        });
        gsap.to(pulses, {
          scale: 1.8,
          opacity: 0,
          duration: 1.8,
          repeat: -1,
          ease: "power1.out",
          stagger: 0.5,
          transformOrigin: "center",
        });
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-[var(--radius-premium)] border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(55,172,78,0.08),transparent_65%)]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label="World map showing Fashion Source BD's offices and export markets"
      >
        {worldDots.map(([lon, lat], i) => {
          const [x, y] = project([lon, lat]);
          return <circle key={i} cx={x} cy={y} r={1.15} fill="rgba(255,255,255,0.16)" />;
        })}

        {markets.map((m) => (
          <path
            key={m.label}
            data-route
            d={curvePath(HQ, m.coord)}
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth={1.1}
            strokeLinecap="round"
            opacity={0.7}
          />
        ))}

        {offices.map((o) => {
          const [x, y] = project(o.coord);
          const isHq = o.label === "Dhaka HQ";
          return (
            <g key={o.label}>
              <circle
                data-pulse
                cx={x}
                cy={y}
                r={isHq ? 5 : 3.5}
                fill="var(--brand-primary)"
                opacity={0.5}
              />
              <circle cx={x} cy={y} r={isHq ? 3.5 : 2.5} fill="var(--brand-primary)" />
            </g>
          );
        })}

        {markets.map((m) => {
          const [x, y] = project(m.coord);
          return <circle key={m.label} cx={x} cy={y} r={2.2} fill="white" opacity={0.85} />;
        })}
      </svg>

      {showLabels && (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {offices.map((o) => (
              <span
                key={o.label}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur"
              >
                {o.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {markets.map((m) => (
              <span
                key={m.label}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/60 backdrop-blur"
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
