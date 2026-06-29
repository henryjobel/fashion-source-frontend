import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Instagram, Linkedin, Phone, MapPin, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const company = [
  { to: "/about", label: "About Us" },
  { to: "/concern", label: "Sister Concern" },
  { to: "/our-culture", label: "Our Culture" },
  { to: "/key-contacts", label: "Key Contacts" },
];
const products = [
  { to: "/products/knit", label: "Knit" },
  { to: "/products/woven", label: "Woven" },
  { to: "/products/flat-knit", label: "Flat Knit" },
  { to: "/products/others", label: "Others" },
];
const services = [
  { to: "/services", label: "Our Services" },
  { to: "/compliance", label: "Compliance" },
  { to: "/why-work-with-us", label: "Why Work With Us" },
];
const contact = [
  { to: "/contact", label: "Contact" },
  { to: "/job-openings", label: "Job Openings" },
];

function Dropdown({ label, items }: { label: string; items: { to: string; label: string }[] }) {
  return (
    <div className="relative group">
      <button className="inline-flex items-center gap-1 text-neutral-700 hover:text-[var(--brand-green)] uppercase font-semibold text-sm tracking-wide py-6">
        {label} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      <div className="absolute top-full left-0 min-w-[220px] bg-white border border-neutral-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
        {items.map((it) => (
          <Link key={it.to} to={it.to} className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[var(--brand-green)] border-b border-neutral-100 last:border-0">
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Top contact bar */}
      <div className="bg-[var(--brand-green)] text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {[Facebook, Youtube, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="hover:opacity-80" aria-label="social">
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <span className="mx-2 inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> +880-9606-333222
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Plot # 08, Road # 1/A, Gulshan-1, Dhaka-1212, Bangladesh
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 py-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,var(--brand-blue) 50%,var(--brand-green) 50%)" }}>
                <span className="text-white font-black text-lg tracking-tight">N</span>
              </div>
              <span className="absolute -top-1 -right-2 text-[9px] text-neutral-500">TM</span>
            </div>
            <div className="leading-tight">
              <div className="font-black tracking-tight text-[var(--brand-blue)] text-base md:text-lg">
                NAFISA INT'L TRADING (BD) LTD.
              </div>
              <div className="text-[11px] text-neutral-500">
                (100% Export Oriented Garments Buying House)
              </div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <Dropdown label="Our Company" items={company} />
            <Dropdown label="Our Products" items={products} />
            <Dropdown label="Our Services" items={services} />
            <Dropdown label="Our Contact" items={contact} />
            <Link to="/become-supplier" className="text-neutral-700 hover:text-[var(--brand-green)] uppercase font-semibold text-sm tracking-wide py-6">Become Supplier</Link>
            <Link to="/faq" className="text-neutral-700 hover:text-[var(--brand-green)] uppercase font-semibold text-sm tracking-wide py-6">FAQ</Link>
          </nav>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-neutral-200 bg-white">
            <div className="px-4 py-3 flex flex-col text-sm">
              {[...company, ...products, ...services, ...contact,
                { to: "/become-supplier", label: "Become Supplier" },
                { to: "/faq", label: "FAQ" },
              ].map((it) => (
                <Link key={it.to} to={it.to} onClick={() => setOpen(false)} className="py-2.5 border-b border-neutral-100 text-neutral-700 hover:text-[var(--brand-green)]">
                  {it.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}