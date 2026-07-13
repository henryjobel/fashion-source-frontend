import { Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Factory,
  Globe2,
  Clock,
  Mail,
  Menu,
  Monitor,
  MapPin,
  Phone,
  Settings,
  Ship,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatedCounter, RevealGroup } from "@/components/premium/motion";
import { getField, useCmsPage } from "@/lib/cms";
import { prefersReducedMotion } from "@/lib/gsap";
import { useCategories, useSettings } from "@/lib/queries";
import fsLogoTransparent from "@/assets/fs-logo-uploaded-transparent.png";
import heroGarments from "@/assets/hero-garments.jpg";

const navItems = [
  { label: "Our Company", to: "/about" },
  { label: "Our Products", to: "/products" },
  { label: "Our Services", to: "/services" },
  { label: "Our Contact", to: "/contact" },
  { label: "Become Supplier", to: "/become-supplier" },
  { label: "FAQ", to: "/faq" },
];

const dropdownItems = {
  company: [
    { label: "About Us", to: "/about" },
    { label: "Sister Concern", to: "/concern" },
    { label: "Our Culture", to: "/our-culture" },
    { label: "Key Contacts", to: "/key-contacts" },
  ],
  services: [
    { label: "Our Services", to: "/services" },
    { label: "Compliance", to: "/compliance" },
    { label: "Why Work With Us", to: "/why-work-with-us" },
  ],
  contact: [
    { label: "Contact", to: "/contact" },
    { label: "Our Profile", to: "/our-profile" },
  ],
};

const defaultStats = [
  { icon: CalendarCheck, value: "2017", suffix: "", label: "Established" },
  { icon: Users, value: "150", suffix: "+", label: "Skilled Employees" },
  { icon: Factory, value: "134", suffix: "+", label: "Associated Factories" },
  { icon: Building2, value: "2", suffix: "", label: "Locations" },
];

const process = [
  {
    icon: Settings,
    title: "Research",
    body: "We research new styles, fabrics, accessories and trims to develop items for home and abroad.",
    className: "bg-black",
  },
  {
    icon: Monitor,
    title: "Design",
    body: "Our design team follows seasonal trends and supports product concepts for new collections.",
    className: "bg-[#fb9708]",
  },
  {
    icon: Globe2,
    title: "Sourcing",
    body: "We coordinate suppliers and materials to keep the sourcing process clear, fast and reliable.",
    className: "bg-[#39b739]",
  },
  {
    icon: Factory,
    title: "Production",
    body: "Production is managed with compliant factories, planning, quality checks and clear requirements.",
    className: "bg-[#b3212b]",
  },
  {
    icon: Ship,
    title: "Logistics",
    body: "Shipment coordination and documentation keep goods moving smoothly to the customer's door.",
    className: "bg-[#2857a8]",
  },
];

const heroSlideDefaults = [
  {
    key: "slide1Image",
    image: heroGarments,
    caption: "A 100% export-oriented buying house in Bangladesh.",
  },
  {
    key: "slide2Image",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=82",
    caption: "Knit, woven and flat-knit programs under one sourcing roof.",
  },
  {
    key: "slide3Image",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&q=82",
    caption: "Reliable apparel supply from compliant manufacturing partners.",
  },
];

// IntersectionObserver-driven reveal — avoids GSAP ScrollTrigger's pixel-
// position caching, which can go stale and leave sections permanently
// hidden if layout below the fold shifts after the trigger is created.
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return [ref, inView] as const;
}

const exportTypes = [
  { label: "Knit", value: 55, color: "#df3035" },
  { label: "Flat Knit", value: 20, color: "#d77b25" },
  { label: "Jacket/Outwear", value: 10, color: "#90a957" },
  { label: "Woven Item", value: 8, color: "#a28a58" },
  { label: "Home Textile", value: 4, color: "#74b49b" },
  { label: "Work Wear", value: 3, color: "#7f443c" },
];

const footerQuickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Our Products", to: "/products" },
  { label: "Our Services", to: "/services" },
  { label: "Compliance", to: "/compliance" },
  { label: "Our Profile", to: "/our-profile" },
  { label: "Contact", to: "/contact" },
];

function ClassicDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-1.5 whitespace-nowrap py-7 text-xs font-black uppercase tracking-wide text-neutral-600 transition hover:text-[var(--brand-primary)]">
        {label}
        <ChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 min-w-[210px] -translate-x-1/2 translate-y-2 border border-neutral-200 bg-white p-1.5 opacity-0 shadow-[0_24px_60px_-28px_rgba(16,20,24,0.45)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block border-b border-neutral-100 px-4 py-2.5 text-sm font-bold text-neutral-600 transition last:border-0 hover:bg-neutral-50 hover:text-[var(--brand-primary)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ClassicProductsMegaMenu() {
  const { data: categories = [] } = useCategories();
  const productMegaGroups = useMemo(
    () =>
      categories
        .filter((category) => category.status === "active" && !category.parent)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((category) => ({
          label: category.title,
          to: `/products/${category.slug}`,
          items: categories
            .filter(
              (subcategory) =>
                subcategory.status === "active" && subcategory.parent === category.id,
            )
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((subcategory) => ({
              label: subcategory.title,
              to: `/products/${subcategory.slug}`,
            })),
        })),
    [categories],
  );

  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-1.5 whitespace-nowrap py-7 text-xs font-black uppercase tracking-wide text-neutral-600 transition hover:text-[var(--brand-primary)]">
        Our Products
        <ChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-[min(900px,calc(100vw-2rem))] -translate-x-1/2 translate-y-2 opacity-0 shadow-[0_28px_70px_-32px_rgba(16,20,24,0.45)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="grid overflow-hidden border border-neutral-200 bg-white lg:grid-cols-[0.85fr_2.15fr]">
          <Link
            to="/products"
            className="flex min-h-[270px] flex-col justify-between bg-[#303030] p-7 text-white"
          >
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                Product Range
              </div>
              <h3 className="mt-4 text-2xl font-black leading-tight">
                Export-ready garment categories
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/60">
                Knit, woven, flat knit and selected accessories sourced through Bangladesh's
                manufacturing network.
              </p>
            </div>
            <span className="text-sm font-black text-[var(--brand-primary)]">
              View All Products
            </span>
          </Link>
          <div className="grid max-h-[420px] grid-cols-2 gap-y-6 overflow-y-auto p-6 md:grid-cols-3 lg:grid-cols-4">
            {productMegaGroups.map((group) => (
              <div key={group.to} className="border-r border-neutral-100 px-4 last:border-r-0">
                <Link
                  to={group.to}
                  className="text-base font-black uppercase text-neutral-800 transition hover:text-[var(--brand-primary)]"
                >
                  {group.label}
                </Link>
                <div className="mt-4 space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block border-b border-neutral-100 py-1.5 text-xs font-bold leading-5 text-neutral-500 transition hover:text-[var(--brand-primary)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassicHeader() {
  const [open, setOpen] = useState(false);
  const { data: settings } = useSettings();
  const siteName = settings?.siteName || "Fashion Source BD";
  const logoSrc = settings?.logo || fsLogoTransparent;

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="bg-[var(--brand-primary)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-center text-[11px] font-bold sm:px-5 sm:text-xs">
          Zila Parishad, Fatullah, Narayanganj-1400, Dhaka, Bangladesh
        </div>
      </div>

      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-5 lg:gap-8 lg:py-5">
          <Link
            to="/"
            className="flex h-16 w-[280px] max-w-[72vw] items-center sm:h-20 sm:w-[390px] sm:max-w-[52vw]"
          >
            <img
              src={logoSrc}
              alt={siteName}
              className="h-full w-full object-contain object-left"
            />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            <ClassicDropdown label="Our Company" items={dropdownItems.company} />
            <ClassicProductsMegaMenu />
            <ClassicDropdown label="Our Services" items={dropdownItems.services} />
            <ClassicDropdown label="Our Contact" items={dropdownItems.contact} />
            {navItems.slice(4).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="whitespace-nowrap py-7 text-xs font-black uppercase tracking-wide text-neutral-600 transition hover:text-[var(--brand-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-neutral-200 bg-white text-neutral-800 transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-neutral-200 bg-white lg:hidden">
            <div className="mx-auto max-h-[calc(100vh-112px)] max-w-7xl overflow-y-auto px-4 py-4">
              <Link
                to="/products"
                onClick={closeMenu}
                className="mb-4 flex items-center justify-between bg-[#303030] px-4 py-4 text-sm font-black uppercase tracking-wide text-white"
              >
                Our Products
                <ChevronRight className="h-4 w-4" />
              </Link>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    Our Company
                  </div>
                  <div className="border border-neutral-200">
                    {dropdownItems.company.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeMenu}
                        className="flex min-h-11 items-center justify-between border-b border-neutral-100 px-4 text-sm font-bold text-neutral-700 last:border-0"
                      >
                        {item.label}
                        <ChevronRight className="h-4 w-4 text-neutral-300" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    Our Services
                  </div>
                  <div className="border border-neutral-200">
                    {dropdownItems.services.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeMenu}
                        className="flex min-h-11 items-center justify-between border-b border-neutral-100 px-4 text-sm font-bold text-neutral-700 last:border-0"
                      >
                        {item.label}
                        <ChevronRight className="h-4 w-4 text-neutral-300" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    Our Contact
                  </div>
                  <div className="border border-neutral-200">
                    {dropdownItems.contact.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeMenu}
                        className="flex min-h-11 items-center justify-between border-b border-neutral-100 px-4 text-sm font-bold text-neutral-700 last:border-0"
                      >
                        {item.label}
                        <ChevronRight className="h-4 w-4 text-neutral-300" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border border-neutral-200">
                  {navItems.slice(4).map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenu}
                      className="flex min-h-11 items-center justify-between border-b border-neutral-100 px-4 text-sm font-bold text-neutral-700 last:border-0"
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 text-neutral-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function HeroSlider() {
  const page = useCmsPage("/");
  const heroSlides = heroSlideDefaults.map((slide) => ({
    ...slide,
    image: getField(page, "hero", slide.key, slide.image),
  }));
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (direction: "prev" | "next") => {
    setActive((current) => {
      if (direction === "next") return (current + 1) % heroSlides.length;
      return (current - 1 + heroSlides.length) % heroSlides.length;
    });
  };

  return (
    <section className="relative h-[640px] overflow-hidden bg-neutral-100 md:h-[720px]">
      {heroSlides.map((slide, index) => (
        <img
          key={slide.key}
          src={slide.image}
          alt={slide.caption}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
      <div className="absolute bottom-16 left-0 right-0 px-6 text-center">
        <p className="mx-auto max-w-2xl text-lg font-bold text-white drop-shadow-md sm:text-xl">
          {heroSlides[active].caption}
        </p>
      </div>
      <button
        type="button"
        onClick={() => goTo("prev")}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-white transition hover:text-[var(--brand-primary)]"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        type="button"
        onClick={() => goTo("next")}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-white transition hover:text-[var(--brand-primary)]"
      >
        <ChevronRight className="h-8 w-8" />
      </button>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 w-2 rounded-full transition-all ${
              index === active ? "w-6 bg-black" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function StatsBand() {
  const page = useCmsPage("/");
  const stats = defaultStats.map(({ icon, value, suffix, label }, i) => ({
    icon,
    value: getField(page, "classic-stats", `stat${i + 1}Value`, value),
    suffix: getField(page, "classic-stats", `stat${i + 1}Suffix`, suffix),
    label: getField(page, "classic-stats", `stat${i + 1}Label`, label),
  }));

  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 text-center md:grid-cols-4">
        {stats.map(({ icon: Icon, value, suffix, label }) => (
          <div key={label}>
            <Icon className="mx-auto h-12 w-12 text-neutral-500" strokeWidth={2.4} />
            <div className="mt-6 text-5xl font-black text-[var(--brand-primary)]">
              <AnimatedCounter value={Number(value)} suffix={suffix} />
            </div>
            <div className="mt-4 text-lg font-bold text-neutral-500">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessBand() {
  return (
    <RevealGroup className="grid md:grid-cols-5">
      {process.map(({ icon: Icon, title, body, className }) => (
        <div key={title} className={`${className} min-h-[350px] px-7 py-16 text-center text-white`}>
          <Icon className="mx-auto h-12 w-12" strokeWidth={2.4} />
          <h3 className="mt-8 text-2xl font-black uppercase">{title}</h3>
          <p className="mx-auto mt-6 max-w-xs text-base leading-7">{body}</p>
        </div>
      ))}
    </RevealGroup>
  );
}

function ExportChart() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reveal = inView || prefersReducedMotion();

  const total = exportTypes.reduce((sum, item) => sum + item.value, 0);
  let acc = 0;
  const cx = 160;
  const cy = 160;
  const r = 150;
  const segments = exportTypes.map((item) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += item.value;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = item.value / total > 0.5 ? 1 : 0;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    return {
      d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`,
      color: item.color,
    };
  });

  return (
    <section className="overflow-hidden bg-white py-12">
      <h2 className="px-5 text-center text-2xl font-black uppercase leading-tight text-neutral-600 sm:text-4xl">
        Product Type - Export 2025
      </h2>
      <div
        ref={ref}
        className="mx-auto mt-6 grid max-w-6xl gap-8 bg-white px-5 py-8 shadow-[0_20px_60px_-48px_rgba(16,20,24,0.4)] sm:px-8 sm:py-10 lg:grid-cols-[1fr_1fr] lg:gap-12"
      >
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:flex-row lg:gap-10">
          <svg
            viewBox="0 0 320 320"
            className="aspect-square w-full max-w-[280px] sm:max-w-[320px]"
          >
            {segments.map((seg, index) => (
              <path
                key={seg.color}
                d={seg.d}
                fill={seg.color}
                className="origin-center transition-all duration-700 ease-out"
                style={{
                  opacity: reveal ? 1 : 0,
                  transform: reveal ? "scale(1)" : "scale(0.7)",
                  transitionDelay: `${index * 100}ms`,
                }}
              />
            ))}
          </svg>
          <div className="grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold uppercase md:block md:w-auto md:space-y-2">
            {exportTypes.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: item.color }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          {exportTypes.map((item) => (
            <div key={item.label}>
              <div className="mb-1 text-sm font-black uppercase text-neutral-700">{item.label}</div>
              <div className="h-4 bg-neutral-200">
                <div
                  className="flex h-full items-center justify-end pr-3 text-[10px] font-bold text-white transition-all duration-1000 ease-out"
                  style={{ width: reveal ? `${item.value}%` : "0%", background: item.color }}
                >
                  {item.value}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassicFooter() {
  const { data: settings } = useSettings();
  const siteName = settings?.siteName || "Fashion Source BD";
  const logoSrc = settings?.footerLogo || settings?.logo || fsLogoTransparent;
  const about =
    settings?.footerAbout ||
    "A 100% export oriented garments buying house connecting buyers with compliant manufacturing partners across Bangladesh.";
  const email = settings?.email || "info@fashionsourcebd.com";
  const phone = settings?.phone || "+880 1711-000000";
  const address =
    settings?.address || "Zila Parishad, Fatullah, Narayanganj-1400, Dhaka, Bangladesh";
  const businessHours = settings?.businessHours || "Sunday - Thursday, 9:00 AM - 6:00 PM";
  const copyright =
    settings?.footerCopyright || `Copyrights 1998 - ${new Date().getFullYear()} (c) ${siteName}`;
  const subsidiaryLabel = settings?.footerSubsidiaryLabel || "";
  const subsidiaryName = settings?.footerSubsidiaryName || "JANN GROUP";

  return (
    <footer className="bg-[#303030] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.1fr_0.8fr_1fr]">
        <div>
          <Link to="/" className="inline-flex max-w-[260px] items-center">
            <img
              src={logoSrc}
              alt={siteName}
              className="h-auto max-h-20 w-full object-contain object-left"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm font-semibold leading-6 text-white/65">{about}</p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white/45">
            Quick Links
          </h3>
          <ul className="mt-5 grid gap-2 text-sm font-bold sm:grid-cols-2 lg:grid-cols-1">
            {footerQuickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-white/80 transition hover:text-[var(--brand-primary)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white/45">Contact</h3>
          <div className="mt-5 space-y-4 text-sm font-bold leading-6 text-white/75">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex gap-3 transition hover:text-[var(--brand-primary)]"
            >
              <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand-primary)]" />
              <span>{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex gap-3 transition hover:text-[var(--brand-primary)]"
            >
              <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand-primary)]" />
              <span>{email}</span>
            </a>
            <div className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand-primary)]" />
              <span>{address}</span>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand-primary)]" />
              <span>{businessHours}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#282828]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 text-xs">
          <div>{copyright}</div>
          {subsidiaryName && (
            <div className="font-bold text-[var(--brand-primary)]">
              {subsidiaryLabel ? `${subsidiaryLabel} ` : "A SUBSIDIARY OF "}
              {subsidiaryName}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export function ClassicHome() {
  return (
    <div className="bg-white font-sans">
      <ClassicHeader />
      <HeroSlider />
      <StatsBand />
      <ProcessBand />
      <ExportChart />
      <ClassicFooter />
    </div>
  );
}
