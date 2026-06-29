import { Link } from "@tanstack/react-router";

const footerCols = [
  { title: "KNIT", links: [
    { label: "Men's", to: "/products/knit" },
    { label: "Ladies", to: "/products/knit" },
    { label: "Kids", to: "/products/knit" },
    { label: "Fleece", to: "/products/knit" },
    { label: "Babies", to: "/products/knit" },
    { label: "Baby Rompers", to: "/products/knit" },
    { label: "Lingerie", to: "/products/knit" },
    { label: "Underwear", to: "/products/knit" },
  ]},
  { title: "WOVEN", links: [
    { label: "Shirts", to: "/products/woven" },
    { label: "Ladies Woven Tops, Dress", to: "/products/woven" },
    { label: "Woven Bottom", to: "/products/woven" },
    { label: "Cargo Shorts", to: "/products/woven" },
    { label: "Swimming Wear", to: "/products/woven" },
    { label: "Jacket", to: "/products/woven" },
    { label: "Nightwear", to: "/products/woven" },
    { label: "Workwear", to: "/products/woven" },
    { label: "Blazer", to: "/products/woven" },
  ]},
];

const companyLinks = [
  { label: "Our Services", to: "/services" },
  { label: "About Us", to: "/about" },
  { label: "Compliance", to: "/compliance" },
  { label: "Why Work With Us", to: "/why-work-with-us" },
  { label: "Our Culture", to: "/our-culture" },
  { label: "Key Contacts", to: "/key-contacts" },
  { label: "Career Opportunities", to: "/job-openings" },
  { label: "Contact", to: "/contact" },
];

const flatKnit = [{ label: "Flat Knit Sweater", to: "/products/flat-knit" }];
const others = [
  { label: "Cap", to: "/products/others" },
  { label: "Bed Sheet", to: "/products/others" },
  { label: "Towel", to: "/products/others" },
];

export function SiteFooter() {
  return (
    <footer className="bg-neutral-800 text-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {footerCols.map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-black tracking-wider mb-4">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((l, i) => (
                <li key={i} className="border-b border-neutral-700 pb-2">
                  <Link to={l.to} className="hover:text-[var(--brand-green)]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-white font-black tracking-wider mb-4">FLAT KNIT</h4>
          <ul className="space-y-2 text-sm">
            {flatKnit.map((l) => (
              <li key={l.label} className="border-b border-neutral-700 pb-2">
                <Link to={l.to} className="hover:text-[var(--brand-green)]">{l.label}</Link>
              </li>
            ))}
          </ul>
          <h4 className="text-white font-black tracking-wider mt-8 mb-4">OTHERS</h4>
          <ul className="space-y-2 text-sm">
            {others.map((l) => (
              <li key={l.label} className="border-b border-neutral-700 pb-2">
                <Link to={l.to} className="hover:text-[var(--brand-green)]">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-black tracking-wider mb-4">COMPANY</h4>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.label} className="border-b border-neutral-700 pb-2">
                <Link to={l.to} className="hover:text-[var(--brand-green)]">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-700">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div>Copyrights 1998 – 2025 © NAFISA INT'L TRADING (BD) LTD.</div>
          <div className="flex items-center gap-2">
            <span>A SUBSIDIARY OF</span>
            <span className="text-[var(--brand-green)] font-black tracking-wider">JANN GROUP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}