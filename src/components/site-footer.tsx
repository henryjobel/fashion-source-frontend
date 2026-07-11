import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Instagram, Linkedin, ShieldCheck, Youtube } from "lucide-react";
import { useRef, useState } from "react";

import { PremiumButton } from "@/components/premium/ui";
import { useSettings, useSubmitInquiry } from "@/lib/queries";

function NavLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (!to) return <span className={className}>{children}</span>;
  if (/^https?:\/\//.test(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

const socialIcons: { key: string; icon: typeof Facebook }[] = [
  { key: "socialFacebook", icon: Facebook },
  { key: "socialInstagram", icon: Instagram },
  { key: "socialLinkedin", icon: Linkedin },
  { key: "socialYoutube", icon: Youtube },
];

const standards = [
  "BSCI-Aligned Sourcing",
  "Social Compliance Audited Factories",
  "Ethical Sourcing Practices",
];

const markets = [
  { flag: "🇺🇸", label: "USA" },
  { flag: "🇪🇺", label: "EU" },
  { flag: "🇬🇧", label: "UK" },
  { flag: "🇦🇪", label: "UAE" },
  { flag: "🇹🇷", label: "Turkey" },
  { flag: "🇨🇳", label: "China" },
];

const footerColumns = [
  {
    heading: "Knit",
    headingTo: "/products/knit",
    links: [
      { label: "Men's", to: "/product/mens-t-shirt-polo-tank-top" },
      { label: "Ladies", to: "/product/ladies-t-shirt-tank-top-nightwear" },
      { label: "Kids", to: "/product/kids-t-shirt-dress-jogging-set" },
      { label: "Fleece", to: "/product/fleece-sweatshirt-jacket" },
      { label: "Babies", to: "/product/babies-t-shirt" },
      { label: "Baby Rompers", to: "/product/baby-rompers" },
      { label: "Lingerie", to: "/product/ladies-lingerie-swimwear" },
      { label: "Underwear", to: "/product/underwear-boxer-brief-panty" },
    ],
  },
  {
    heading: "Woven",
    headingTo: "/products/woven",
    links: [
      { label: "Shirts", to: "/product/shirts" },
      { label: "Ladies Woven Tops, Dress", to: "/product/ladies-woven-tops-dress" },
      { label: "Woven Bottom", to: "/product/woven-bottom" },
      { label: "Cargo Shorts", to: "/product/cargo-shorts" },
      { label: "Swimming Wear", to: "/product/swimming-wear-denim-shorts" },
      { label: "Jacket", to: "/product/jacket" },
      { label: "Nightwear", to: "/product/nightwear" },
      { label: "Workwear", to: "/product/workwear" },
      { label: "Blazer", to: "/product/blazer" },
    ],
  },
  {
    heading: "Flat Knit",
    headingTo: "/products/flat-knit",
    links: [{ label: "Flat Knit Sweater", to: "/product/flat-knit-sweater" }],
  },
  {
    heading: "Others",
    headingTo: "/products/others",
    links: [
      { label: "Cap", to: "/product/cap" },
      { label: "Bed Sheet", to: "/product/bed-sheet" },
      { label: "Towel", to: "/product/towel" },
    ],
  },
  {
    heading: "Company",
    headingTo: "/about",
    links: [
      { label: "Our Services", to: "/services" },
      { label: "About Us", to: "/about" },
      { label: "Compliance", to: "/compliance" },
      { label: "Why Work With Us", to: "/why-work-with-us" },
      { label: "Our Culture", to: "/our-culture" },
      { label: "Key Contacts", to: "/key-contacts" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

function Newsletter() {
  const submit = useSubmitInquiry();
  const emailRef = useRef<HTMLInputElement>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    if (!email) return;
    await submit.mutateAsync({ type: "newsletter", email, subject: "Newsletter Signup" });
    setSent(true);
  };

  if (sent) {
    return (
      <p className="text-sm font-semibold text-[var(--brand-primary)]">
        Thanks — you're subscribed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        ref={emailRef}
        type="email"
        required
        aria-label="Email address for newsletter"
        placeholder="Your email"
        className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[var(--brand-primary)]"
      />
      <button
        type="submit"
        disabled={submit.isPending}
        aria-label="Subscribe"
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white transition hover:brightness-105 disabled:opacity-60"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

export function SiteFooter() {
  const { data: settings } = useSettings();

  const siteName = settings?.siteName || "Fashion Source BD";
  const about =
    settings?.footerAbout ||
    "A 100% export oriented garments buying house connecting buyers with compliant manufacturing partners across Bangladesh.";
  const copyright =
    settings?.footerCopyright || `Copyrights 1998 – ${new Date().getFullYear()} © ${siteName}`;
  const subsidiaryLabel = settings?.footerSubsidiaryLabel || "";
  const subsidiaryName = settings?.footerSubsidiaryName || "";
  const newsletterHeading = settings?.newsletterHeading || "Stay in the loop";

  return (
    <footer className="bg-[var(--brand-dark)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="font-display text-xl font-semibold">{siteName}</div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">{about}</p>
            <div className="mt-6 flex items-center gap-2.5">
              {socialIcons
                .filter((s) => settings?.[s.key])
                .map(({ key, icon: Icon }) => (
                  <a
                    key={key}
                    href={settings![key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={key}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
            </div>
            <div className="mt-10 max-w-sm">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                {newsletterHeading}
              </h4>
              <p className="mt-5 text-sm leading-6 text-white/50">
                {settings?.newsletterSubtext || "Sourcing updates and company news, occasionally."}
              </p>
              <div className="mt-4">
                <Newsletter />
              </div>
              <PremiumButton to="/contact" variant="ghost-dark" className="mt-6 w-full">
                Start a Conversation
              </PremiumButton>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <NavLink
                  to={column.headingTo}
                  className="text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:text-[var(--brand-primary)]"
                >
                  {column.heading}
                </NavLink>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        to={link.to}
                        className="text-white/70 transition hover:text-[var(--brand-primary)]"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2">
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-primary)]" /> Compliance &
              Standards
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {standards.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold text-white/70"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="sm:text-right">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Export Markets
            </h4>
            <div className="mt-4 flex flex-wrap gap-2 sm:justify-end">
              {markets.map((m) => (
                <span
                  key={m.label}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/70"
                >
                  {m.flag} {m.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-white/40 sm:px-8">
          <div>{copyright}</div>
          {subsidiaryName && (
            <div className="flex items-center gap-2">
              {subsidiaryLabel && <span>{subsidiaryLabel}</span>}
              <span className="font-bold tracking-wide text-[var(--brand-primary)]">
                {subsidiaryName}
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
