import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import footerLogoFallback from "@/assets/fs-logo-uploaded-transparent.png";
import { useSettings } from "@/lib/queries";

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

const socialIcons: { key: string; icon: typeof Facebook; label: string }[] = [
  { key: "socialFacebook", icon: Facebook, label: "Facebook" },
  { key: "socialInstagram", icon: Instagram, label: "Instagram" },
  { key: "socialLinkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "socialYoutube", icon: Youtube, label: "YouTube" },
];

const quickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Our Products", to: "/products" },
  { label: "Our Services", to: "/services" },
  { label: "Compliance", to: "/compliance" },
  { label: "Our Profile", to: "/our-profile" },
  { label: "Contact", to: "/contact" },
];

const footerContact = {
  phones: ["+8801613341001", "+8801686841325"],
  email: "info@fashionsource-bd.com",
  hours: ["Sun - Thu: 10:00 am - 07:00 pm", "Fri: 04:00 pm - 08:00 pm", "Sat: Weekly Holiday"],
  address: "Zila Parishad, Fatullah, Narayanganj-1400, Dhaka, Bangladesh",
};

export function SiteFooter() {
  const { data: settings } = useSettings();

  const siteName = settings?.siteName || "Fashion Source BD";
  const about =
    settings?.footerAbout ||
    "A 100% export oriented garments buying house connecting buyers with compliant manufacturing partners across Bangladesh.";
  const copyright =
    settings?.footerCopyright || `Copyrights 1998 - ${new Date().getFullYear()} (c) ${siteName}`;
  const subsidiaryLabel = settings?.footerSubsidiaryLabel || "";
  const subsidiaryName = settings?.footerSubsidiaryName || "";
  const logoSrc = settings?.footerLogo || settings?.logo || footerLogoFallback;

  return (
    <footer className="bg-[var(--brand-dark)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_1fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex max-w-[260px] items-center">
              <img
                src={logoSrc}
                alt={siteName}
                className="h-auto max-h-20 w-full object-contain object-left"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">{about}</p>
            <div className="mt-6 flex items-center gap-2.5">
              {socialIcons
                .filter((social) => settings?.[social.key])
                .map(({ key, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={settings![key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              Quick Links
            </h4>
            <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
              {quickLinks.map((link) => (
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

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Contact</h4>
            <div className="mt-5 space-y-4 text-sm leading-6 text-white/70">
              <div className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand-primary)]" />
                <div>
                  <div className="font-bold text-white/85">Call</div>
                  {footerContact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="block transition hover:text-[var(--brand-primary)]"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href={`mailto:${footerContact.email}`}
                className="flex gap-3 transition hover:text-[var(--brand-primary)]"
              >
                <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand-primary)]" />
                <span>
                  <span className="block font-bold text-white/85">Email</span>
                  {footerContact.email}
                </span>
              </a>
              <div className="flex gap-3">
                <Clock className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand-primary)]" />
                <div>
                  <div className="font-bold text-white/85">Office Hours</div>
                  {footerContact.hours.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand-primary)]" />
                <span>
                  <span className="block font-bold text-white/85">Address</span>
                  {footerContact.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-white/45 sm:px-8">
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
