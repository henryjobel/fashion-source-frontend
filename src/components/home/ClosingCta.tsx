import { Reveal } from "@/components/premium/motion";
import { PremiumButton } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

export function ClosingCta() {
  const page = useCmsPage("/");

  return (
    <section className="relative overflow-hidden bg-[var(--brand-dark)] px-6 py-32 text-center sm:px-8">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)] via-[var(--brand-dark)]/90 to-[var(--brand-dark)]/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(55,172,78,0.15),transparent_60%)]" />

      <Reveal className="relative mx-auto max-w-3xl">
        <h2 className="font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
          {getField(page, "cta-banner", "heading", "Let's Work Together")}
        </h2>
        <p className="mt-6 text-base leading-7 text-white/70">
          {getField(
            page,
            "cta-banner",
            "subtext",
            "If you find yourself questioning, 'Is this the best it can be?' then look no further — we are the right team to assist you.",
          )}
        </p>
        <div className="mt-10 flex justify-center">
          <PremiumButton to="/contact" variant="primary">
            {getField(page, "cta-banner", "button", "Contact Us")}
          </PremiumButton>
        </div>
      </Reveal>
    </section>
  );
}
