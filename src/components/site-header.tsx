import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

import fsLogoTransparent from "@/assets/fs-logo-uploaded-transparent.png";
import type { ApiNavigationItem } from "@/lib/api";
import { useCategories, useNavigation, useSettings } from "@/lib/queries";

type NavNode = ApiNavigationItem & { children: ApiNavigationItem[] };

const makeFallbackNavItem = (
  id: string,
  label: string,
  url: string,
  parent: string | null = null,
  sortOrder = 0,
): ApiNavigationItem => ({
  id,
  location: "header",
  label,
  url,
  parent,
  group: "",
  sort_order: sortOrder,
  target_blank: false,
  status: "active",
  createdAt: "",
});

const fallbackHeaderNavigation: ApiNavigationItem[] = [
  makeFallbackNavItem("company", "Our Company", "#", null, 1),
  makeFallbackNavItem("company-about", "About Us", "/about", "company", 1),
  makeFallbackNavItem("company-concern", "Sister Concern", "/concern", "company", 2),
  makeFallbackNavItem("company-culture", "Our Culture", "/our-culture", "company", 3),
  makeFallbackNavItem("company-contacts", "Key Contacts", "/key-contacts", "company", 4),
  makeFallbackNavItem("products", "Our Products", "/products", null, 2),
  makeFallbackNavItem("services", "Our Services", "#", null, 3),
  makeFallbackNavItem("services-main", "Our Services", "/services", "services", 1),
  makeFallbackNavItem("services-compliance", "Compliance", "/compliance", "services", 2),
  makeFallbackNavItem("services-why", "Why Work With Us", "/why-work-with-us", "services", 3),
  makeFallbackNavItem("contact", "Our Contact", "#", null, 4),
  makeFallbackNavItem("contact-main", "Contact", "/contact", "contact", 1),
  makeFallbackNavItem("contact-profile", "Our Profile", "/our-profile", "contact", 2),
  makeFallbackNavItem("supplier", "Become Supplier", "/become-supplier", null, 5),
  makeFallbackNavItem("faq", "FAQ", "/faq", null, 6),
];

function useHeaderTree() {
  const { data: items = [] } = useNavigation("header");
  return useMemo<NavNode[]>(() => {
    const source = [...(items.length > 0 ? items : fallbackHeaderNavigation)].filter(
      (item) => item.url !== "/job-openings",
    );
    const contactItem = source.find(
      (item) => !item.parent && item.label.toLowerCase() === "our contact",
    );

    if (contactItem && !source.some((item) => item.url === "/our-profile")) {
      source.push(
        makeFallbackNavItem("contact-profile", "Our Profile", "/our-profile", contactItem.id, 2),
      );
    }

    return source
      .filter((item) => !item.parent && item.status === "active")
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((item) => ({
        ...item,
        children: source
          .filter((child) => child.parent === item.id && child.status === "active")
          .sort((a, b) => a.sort_order - b.sort_order),
      }));
  }, [items]);
}

function NavLink({
  to,
  className,
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (!to || to === "#") return <span className={className}>{children}</span>;
  if (/^https?:\/\//.test(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function Dropdown({ label, items }: { label: string; items: ApiNavigationItem[] }) {
  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-1.5 whitespace-nowrap py-7 text-xs font-black uppercase tracking-wide text-neutral-600 transition hover:text-[var(--brand-primary)]">
        {label}
        <ChevronDown className="h-3 w-3 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 min-w-[210px] -translate-x-1/2 translate-y-2 border border-neutral-200 bg-white p-1.5 opacity-0 shadow-[0_24px_60px_-28px_rgba(16,20,24,0.45)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) => (
          <NavLink
            key={item.id}
            to={item.url}
            className="block border-b border-neutral-100 px-4 py-2.5 text-sm font-bold text-neutral-600 transition last:border-0 hover:bg-neutral-50 hover:text-[var(--brand-primary)]"
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function ProductsMegaMenu() {
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

function MobileMenuLink({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="flex min-h-11 items-center justify-between border-b border-neutral-100 px-4 text-sm font-bold text-neutral-700 last:border-0"
    >
      {label}
      <ChevronRight className="h-4 w-4 text-neutral-300" />
    </NavLink>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const tree = useHeaderTree();
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
            {tree.map((item) =>
              item.url === "/products" ? (
                <ProductsMegaMenu key={item.id} />
              ) : item.children.length > 0 ? (
                <Dropdown key={item.id} label={item.label} items={item.children} />
              ) : (
                <NavLink
                  key={item.id}
                  to={item.url}
                  className="whitespace-nowrap py-7 text-xs font-black uppercase tracking-wide text-neutral-600 transition hover:text-[var(--brand-primary)]"
                >
                  {item.label}
                </NavLink>
              ),
            )}
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
                {tree
                  .filter((item) => item.url !== "/products")
                  .map((item) =>
                    item.children.length > 0 ? (
                      <div key={item.id}>
                        <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400">
                          {item.label}
                        </div>
                        <div className="border border-neutral-200">
                          {item.children.map((child) => (
                            <MobileMenuLink
                              key={child.id}
                              to={child.url}
                              label={child.label}
                              onClick={closeMenu}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div key={item.id} className="border border-neutral-200">
                        <MobileMenuLink
                          to={item.url}
                          label={item.label}
                          onClick={closeMenu}
                        />
                      </div>
                    ),
                  )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
