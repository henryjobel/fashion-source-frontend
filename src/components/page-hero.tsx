export function PageHero({ subtitle, title, breadcrumb }: { subtitle: string; title: string; breadcrumb: string }) {
  return (
    <section className="bg-gradient-to-br from-[var(--brand-blue)] to-[#0a2547] text-white py-20 px-4">
      <div className="mx-auto max-w-7xl text-center">
        <div className="text-sm font-bold tracking-[0.25em] text-[var(--brand-green)] mb-3">{subtitle}</div>
        <h1 className="text-3xl md:text-5xl font-black max-w-4xl mx-auto leading-tight">{title}</h1>
        <div className="mt-6 text-sm text-white/70">{breadcrumb}</div>
      </div>
    </section>
  );
}