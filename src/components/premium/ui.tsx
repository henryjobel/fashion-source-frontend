import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import type { ReactNode } from "react";

import { ensureGsapReady, gsap, prefersReducedMotion } from "@/lib/gsap";

// ── Section heading kit ─────────────────────────────────────────────────────
export function SectionEyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.32em] ${
        tone === "dark" ? "text-white/60" : "text-neutral-500"
      } ${className}`}
    >
      <span className="h-px w-8 bg-[var(--brand-primary)]" />
      {children}
    </div>
  );
}

export function SectionHeading({
  children,
  tone = "light",
  size = "lg",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  size?: "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes: Record<string, string> = {
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-5xl",
    xl: "text-4xl md:text-6xl lg:text-7xl",
  };
  return (
    <h2
      className={`font-display font-semibold leading-[1.08] tracking-tight ${sizes[size]} ${
        tone === "dark" ? "text-white" : "text-[var(--brand-dark)]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

// ── Premium button (magnetic hover) ─────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "ghost-light" | "ghost-dark";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand-primary)] text-white hover:brightness-105 shadow-[0_8px_30px_-8px_rgba(55,172,78,0.55)]",
  secondary: "bg-[var(--brand-dark)] text-white hover:brightness-125",
  "ghost-light":
    "border border-neutral-300 text-[var(--brand-dark)] hover:border-[var(--brand-dark)] bg-white/70 backdrop-blur",
  "ghost-dark": "border border-white/25 text-white hover:border-white/70 hover:bg-white/5",
};

type PremiumButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  to?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function PremiumButton({
  children,
  variant = "primary",
  className = "",
  to,
  href,
  type,
  disabled,
  onClick,
}: PremiumButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const base = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 disabled:opacity-50 ${variantClasses[variant]} ${className}`;

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !ref.current) return;
    ensureGsapReady();
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.25, y: y * 0.4, duration: 0.4, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  const sharedProps = {
    className: base,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  };

  if (to) {
    return (
      <Link to={to} ref={ref as React.Ref<HTMLAnchorElement>} {...sharedProps}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        {...sharedProps}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...sharedProps}
    >
      {children}
    </button>
  );
}

// ── Glass card ───────────────────────────────────────────────────────────────
export function GlassCard({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const toneClasses =
    tone === "dark"
      ? "border-white/10 bg-white/[0.04] text-white"
      : "border-white/60 bg-white/70 text-[var(--brand-dark)]";
  return (
    <div
      className={`rounded-[var(--radius-premium)] border backdrop-blur-xl shadow-[0_20px_60px_-24px_rgba(16,20,24,0.35)] ${toneClasses} ${className}`}
    >
      {children}
    </div>
  );
}
