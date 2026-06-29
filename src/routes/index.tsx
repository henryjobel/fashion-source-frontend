import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Cog,
  Monitor,
  Globe,
  Factory,
  Ship,
  CalendarCheck,
  Users,
  Building2,
  ChevronUp,
} from "lucide-react";
import heroImg from "@/assets/hero-garments.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nafisa Int'l Trading (BD) Ltd. — Export Oriented Garments Buying House" },
      { name: "description", content: "100% export oriented garments buying house based in Dhaka, Bangladesh. Research, design, sourcing, production and logistics under one roof." },
      { property: "og:title", content: "Nafisa Int'l Trading (BD) Ltd." },
      { property: "og:description", content: "100% export oriented garments buying house based in Dhaka, Bangladesh." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Cog, title: "RESEARCH", color: "var(--col-research)", text: "We do research on new styles, new fabric, accessories and trims on a regular basis. We strive to develop them accordingly from home and abroad." },
  { icon: Monitor, title: "DESIGN", color: "var(--col-design)", text: "Our design team provides seasonal trend forecasts and collections to showcase the latest market trends and new design concepts — inspiration for design and product development." },
  { icon: Globe, title: "SOURCING", color: "var(--col-sourcing)", text: "We have emphasized sourcing as a major component of our business. We have set up a sourcing office in China to speed up the process for our customers." },
  { icon: Factory, title: "PRODUCTION", color: "var(--col-production)", text: "We manufacture through our sister concerns Jann Composite Mills Ltd. & EFL. Along with that, we have contracts with more than 100+ factories that fulfill all necessary requirements." },
  { icon: Ship, title: "LOGISTICS", color: "var(--col-logistics)", text: "We want to deliver goods to the customer's door, therefore Nafisa has vertically integrated its very own logistics company (Jann Global Logistics) for a smoother process." },
];

const stats = [
  { icon: CalendarCheck, value: "1998", label: "Established" },
  { icon: Users, value: "350", label: "Skilled Employees" },
  { icon: Building2, value: "134", label: "Associated Factories" },
  { icon: MapPin, value: "4", label: "Locations" },
];

const productBars = [
  { name: "KNIT", pct: 30, color: "#e34a4a" },
  { name: "FLAT KNIT", pct: 15, color: "#e8893a" },
  { name: "WOVEN TOP", pct: 18, color: "#a89561" },
  { name: "WOVEN BOTTOM", pct: 12, color: "#8aa66b" },
  { name: "JACKET / OUTWEAR", pct: 15, color: "#6fa18b" },
  { name: "HOME TEXTILE", pct: 4, color: "#4ea3a3" },
  { name: "WORK-WEAR", pct: 6, color: "#5b3a36" },
];

function Index() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-sans">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={heroImg} alt="Garments showroom" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-6 pb-12 text-white">
            <h1 className="text-3xl md:text-5xl font-black drop-shadow-md max-w-2xl">
              Crafting Garments, Connecting the World.
            </h1>
            <p className="mt-3 max-w-xl text-white/90">
              A 100% export-oriented buying house in Bangladesh — from yarn to your door.
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-2 rounded-full ${i === 0 ? "w-6 bg-white" : "w-2 bg-white/60"}`} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <Icon className="w-12 h-12 text-neutral-700" strokeWidth={1.5} />
              <div className="mt-4 text-5xl font-black text-[var(--brand-green)]">{value}</div>
              <div className="mt-2 text-neutral-600 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Color columns */}
      <section className="grid grid-cols-1 md:grid-cols-5">
        {services.map(({ icon: Icon, title, color, text }) => (
          <div key={title} style={{ backgroundColor: color }} className="text-white p-10 flex flex-col items-center text-center min-h-[480px]">
            <Icon className="w-16 h-16 mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl font-black tracking-wider mb-5">{title}</h3>
            <p className="text-sm leading-relaxed text-white/95">{text}</p>
          </div>
        ))}
      </section>

      {/* Product type chart */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-neutral-800 mb-14">
            PRODUCT TYPE — EXPORT 2023
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Pie */}
            <div className="flex justify-center">
              <PieChart data={productBars} />
            </div>
            {/* Bars */}
            <div className="space-y-5">
              {productBars.map((b) => (
                <div key={b.name}>
                  <div className="text-sm font-bold text-neutral-700 mb-1.5">{b.name}</div>
                  <div className="h-5 rounded bg-neutral-200 overflow-hidden">
                    <div className="h-full flex items-center justify-end pr-2 text-[11px] font-bold text-white" style={{ width: `${b.pct}%`, backgroundColor: b.color }}>
                      {b.pct}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center shadow-lg hover:opacity-90">
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

function PieChart({ data }: { data: { name: string; pct: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.pct, 0);
  let acc = 0;
  const cx = 150, cy = 150, r = 130;
  const segs = data.map((d) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.pct;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = d.pct / total > 0.5 ? 1 : 0;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    return { d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`, color: d.color };
  });
  return (
    <svg viewBox="0 0 420 300" className="w-full max-w-md">
      {segs.map((s, i) => <path key={i} d={s.d} fill={s.color} />)}
      {data.map((d, i) => (
        <g key={d.name} transform={`translate(310, ${30 + i * 28})`}>
          <rect width="14" height="14" fill={d.color} rx="2" />
          <text x="22" y="11" fontSize="11" fill="#374151" fontWeight="600">{d.name}</text>
        </g>
      ))}
    </svg>
  );
}
