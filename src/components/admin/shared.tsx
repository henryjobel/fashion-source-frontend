export const inputCls =
  "w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none transition focus:border-[var(--brand-green)]";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-black text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

export function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="mb-1 text-xs font-black uppercase tracking-wide text-neutral-400">
        {label}
      </div>
      <div className="text-sm text-neutral-700">{value}</div>
    </div>
  );
}
