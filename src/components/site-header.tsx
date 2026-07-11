import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PremiumButton } from "@/components/premium/ui";
import fsLogoTransparent from "@/assets/fs-logo-uploaded-transparent.png";
import type { ApiNavigationItem } from "@/lib/api";
import { productCategories, products as staticProducts } from "@/lib/products";
import { useCategories, useNavigation, useProducts, useSettings } from "@/lib/queries";

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
    const source = (items.length > 0 ? items : fallbackHeaderNavigation).filter(
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

    const top = source.filter((i) => !i.parent && i.status === "active");
    return top.map((item) => ({
      ...item,
      children: source.filter((c) => c.parent === item.id && c.status === "active"),
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
  if (!to) return <span className={className}>{children}</span>;
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

function Dropdown({
  label,
  items,
  dark,
}: {
  label: string;
  items: ApiNavigationItem[];
  dark: boolean;
}) {
  return (
    <div className="group relative">
      <button
        className={`inline-flex items-center gap-1.5 whitespace-nowrap py-5 text-[11px] font-bold uppercase tracking-[0.11em] transition-colors ${
          dark
            ? "text-white/85 hover:text-white"
            : "text-neutral-700 hover:text-[var(--brand-dark)]"
        }`}
      >
        {label} <ChevronDown className="h-3 w-3" />
      </button>
      <div className="absolute left-1/2 top-full min-w-[220px] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white/95 p-2 opacity-0 shadow-[0_30px_70px_-24px_rgba(16,20,24,0.35)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 invisible translate-y-1 group-hover:translate-y-0">
        {items.map((it) => (
          <NavLink
            key={it.id}
            to={it.url}
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-[var(--brand-primary)]"
          >
            {it.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function ProductsMegaMenu({ dark }: { dark: boolean }) {
  const { data: apiCategories = [] } = useCategories();
  const { data: apiProducts = [] } = useProducts();

  const groups = useMemo(
    () => {
      const rawCategories = apiCategories.length > 0 ? apiCategories : productCategories;
      const categories = rawCategories.map((cat) => ({
        id: "id" in cat ? cat.id : cat.slug,
        slug: cat.slug,
        title: cat.title,
        intro: cat.intro,
        parent: "parent" in cat ? cat.parent : null,
      }));
      const products =
        apiProducts.length > 0
          ? apiProducts.map((product) => ({
              slug: product.slug,
              label: product.short_name || product.name,
              categorySlug: product.category_slug,
            }))
          : staticProducts.map((product) => ({
              slug: product.slug,
              label: product.shortName || product.name,
              categorySlug: product.category,
            }));

      return categories
        .filter((cat) => !cat.parent)
        .map((cat) => ({
          to: `/products/${cat.slug}`,
          label: cat.title,
          note: cat.intro,
          subcategories: categories
            .filter((sub) => sub.parent === cat.id)
            .map((sub) => ({
              to: `/products/${sub.slug}`,
              label: sub.title,
            })),
          items: products
            .filter((product) => product.categorySlug === cat.slug)
            .map((product) => ({
              to: `/product/${product.slug}`,
              label: product.label,
            })),
        }));
    },
    [apiCategories, apiProducts],
  );

  return (
    <div className="group relative">
      <button
        className={`inline-flex items-center gap-1.5 whitespace-nowrap py-5 text-[11px] font-bold uppercase tracking-[0.11em] transition-colors ${
          dark
            ? "text-white/85 hover:text-white"
            : "text-neutral-700 hover:text-[var(--brand-dark)]"
        }`}
      >
        Our Products
        <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[min(940px,calc(100vw-2rem))] -translate-x-1/2 translate-y-1 pt-3 opacity-0 invisible transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="overflow-hidden rounded-[var(--radius-premium)] border border-neutral-200 bg-white shadow-[0_40px_90px_-24px_rgba(16,20,24,0.35)]">
          <div className="grid grid-cols-[1fr_2.3fr]">
            <Link
              to="/products"
              className="relative flex min-h-[320px] flex-col justify-between bg-[var(--brand-dark)] p-8 text-white"
            >
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                  Product Range
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">
                  Explore our garment categories
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/60">
                  Knit, woven, flat knit and selected accessories produced through a compliant
                  buying-house network.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-primary)]">
                View All Products <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
            <div className="grid grid-cols-4 gap-0 p-7">
              {groups.map((group) => (
                <div key={group.to} className="border-r border-neutral-100 px-5 last:border-r-0">
                  <Link to={group.to} className="group/heading inline-flex items-center gap-2">
                    <span className="text-base font-bold uppercase text-neutral-950 transition group-hover/heading:text-[var(--brand-primary)]">
                      {group.label}
                    </span>
                  </Link>
                  <p className="mt-2 min-h-[48px] text-xs leading-5 text-neutral-500">
                    {group.note}
                  </p>
                  {group.subcategories.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {group.subcategories.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block border-b border-neutral-100 py-1.5 text-xs font-black uppercase tracking-wide text-neutral-700 transition hover:text-[var(--brand-primary)]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 space-y-1">
                    {group.items.slice(0, 6).map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block border-b border-neutral-100 py-1.5 text-xs font-semibold leading-5 text-neutral-500 transition hover:text-[var(--brand-primary)]"
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
      className="flex min-h-11 items-center justify-between rounded-xl px-3 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50 hover:text-[var(--brand-primary)]"
    >
      {label}
      <ChevronRight className="h-4 w-4 text-neutral-300" />
    </NavLink>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tree = useHeaderTree();
  const { data: settings } = useSettings();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !open;
  const otherItems = tree.filter((i) => i.url !== "/products");
  const siteName = settings?.siteName || "Fashion Source BD";
  const logoSrc = settings?.logo || fsLogoTransparent;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-4 py-3 transition-all duration-500 sm:px-6"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 shadow-[0_18px_60px_-34px_rgba(16,20,24,0.55)] backdrop-blur-xl transition-all duration-500 sm:px-5 ${
          transparent
            ? "border-white/55 bg-white/[0.88]"
            : "border-neutral-200/75 bg-white/[0.92]"
        }`}
      >
        <Link to="/" className="flex min-w-0 items-center">
          <span className="flex h-[60px] w-[250px] shrink-0 items-center overflow-hidden sm:h-[68px] sm:w-[290px]">
            <img
              src={logoSrc}
              alt={siteName}
              className="h-full w-full object-contain object-left"
            />
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 justify-center lg:flex lg:items-center lg:gap-5 xl:gap-7">
          {tree.map((item) =>
            item.url === "/products" ? (
              <ProductsMegaMenu key={item.id} dark={false} />
            ) : item.children.length > 0 ? (
              <Dropdown key={item.id} label={item.label} items={item.children} dark={false} />
            ) : (
              <NavLink
                key={item.id}
                to={item.url}
                className="whitespace-nowrap py-5 text-[11px] font-bold uppercase tracking-[0.11em] text-neutral-700 transition-colors hover:text-[var(--brand-dark)]"
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <PremiumButton
            to="/contact"
            variant="primary"
            className="whitespace-nowrap px-5 py-3 text-xs shadow-[0_14px_34px_-16px_rgba(55,172,78,0.75)]"
          >
            Get a Quote
          </PremiumButton>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 transition lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] lg:hidden">
          <div className="max-h-[calc(100vh-88px)] overflow-y-auto px-5 py-5">
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="mb-4 flex items-center justify-between rounded-xl bg-[var(--brand-dark)] px-4 py-4 text-white"
            >
              <span>
                <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                  Catalogue
                </span>
                <span className="mt-1 block text-base font-black">View All Products</span>
              </span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>

            <div className="space-y-5">
              {otherItems.map((item) => (
                <div key={item.id}>
                  <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    {item.label}
                  </div>
                  <div className="rounded-xl border border-neutral-200 bg-white p-1">
                    {item.children.length > 0 ? (
                      item.children.map((it) => (
                        <MobileMenuLink
                          key={it.id}
                          to={it.url}
                          label={it.label}
                          onClick={() => setOpen(false)}
                        />
                      ))
                    ) : (
                      <MobileMenuLink
                        to={item.url}
                        label={item.label}
                        onClick={() => setOpen(false)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <PremiumButton
              to="/contact"
              variant="primary"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </PremiumButton>
          </div>
        </div>
      )}
    </header>
  );
}
