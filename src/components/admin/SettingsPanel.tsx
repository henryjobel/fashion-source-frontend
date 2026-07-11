import { CheckCircle2, KeyRound, Save } from "lucide-react";
import { useEffect, useState } from "react";

import { Field, inputCls } from "@/components/admin/shared";
import type { ApiSettings } from "@/lib/api";
import { useChangePassword, useSettings, useUpdateSettings } from "@/lib/queries";

type FieldMeta = {
  key: string;
  label: string;
  type?: "text" | "email" | "color" | "textarea" | "toggle" | "password";
};

const groups: { id: string; label: string; fields: FieldMeta[] }[] = [
  {
    id: "general",
    label: "General",
    fields: [
      { key: "siteName", label: "Website Name" },
      { key: "logo", label: "Logo URL" },
      { key: "favicon", label: "Favicon URL" },
      { key: "footerLogo", label: "Footer Logo URL" },
      { key: "email", label: "Contact Email", type: "email" },
      { key: "phone", label: "Phone Number" },
      { key: "address", label: "Office Address", type: "textarea" },
      { key: "businessHours", label: "Business Hours" },
      { key: "primaryColor", label: "Primary Color", type: "color" },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    fields: [
      { key: "seoTitle", label: "Default Meta Title" },
      { key: "metaDescription", label: "Default Meta Description", type: "textarea" },
      { key: "metaKeywords", label: "Meta Keywords" },
      { key: "ogImage", label: "Open Graph Image URL" },
    ],
  },
  {
    id: "social",
    label: "Social Links",
    fields: [
      { key: "socialFacebook", label: "Facebook URL" },
      { key: "socialInstagram", label: "Instagram URL" },
      { key: "socialLinkedin", label: "LinkedIn URL" },
      { key: "socialYoutube", label: "YouTube URL" },
      { key: "socialTiktok", label: "TikTok URL" },
      { key: "socialTwitter", label: "Twitter / X URL" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { key: "footerAbout", label: "Footer About Text", type: "textarea" },
      { key: "footerCopyright", label: "Copyright Text" },
      { key: "footerSubsidiaryLabel", label: "Subsidiary Label" },
      { key: "footerSubsidiaryName", label: "Subsidiary Name" },
      { key: "newsletterEnabled", label: "Enable Newsletter Signup", type: "toggle" },
      { key: "newsletterHeading", label: "Newsletter Heading" },
      { key: "newsletterSubtext", label: "Newsletter Subtext", type: "textarea" },
    ],
  },
  {
    id: "additional",
    label: "Additional",
    fields: [
      { key: "googleMapsEmbed", label: "Google Maps Embed URL" },
      { key: "analyticsId", label: "Google Analytics ID" },
      { key: "smtpHost", label: "SMTP Host" },
      { key: "smtpPort", label: "SMTP Port" },
      { key: "smtpUser", label: "SMTP Username" },
      { key: "smtpPass", label: "SMTP Password", type: "password" },
      { key: "maintenanceMode", label: "Maintenance Mode", type: "toggle" },
      {
        key: "customHeadScript",
        label: "Custom Head Script (e.g. verification tags)",
        type: "textarea",
      },
      {
        key: "customBodyScript",
        label: "Custom Body Script (e.g. chat widgets)",
        type: "textarea",
      },
    ],
  },
];

function SettingInput({
  meta,
  value,
  onChange,
}: {
  meta: FieldMeta;
  value: string;
  onChange: (v: string) => void;
}) {
  if (meta.type === "toggle") {
    const on = value === "true";
    return (
      <button
        type="button"
        onClick={() => onChange(on ? "false" : "true")}
        className={`flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm font-black transition ${on ? "border-[var(--brand-green)] bg-[var(--brand-green)]/10 text-[var(--brand-green)]" : "border-neutral-200 text-neutral-500"}`}
      >
        {on ? "Enabled" : "Disabled"}
        <span
          className={`h-5 w-9 rounded-full transition ${on ? "bg-[var(--brand-green)]" : "bg-neutral-300"} relative`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-0.5"}`}
          />
        </span>
      </button>
    );
  }
  if (meta.type === "textarea") {
    return (
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={`${inputCls} resize-none`}
      />
    );
  }
  if (meta.type === "color") {
    return (
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value || "#17b86a"}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded border border-neutral-200"
        />
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 ${inputCls} font-mono`}
        />
      </div>
    );
  }
  return (
    <input
      type={meta.type === "password" ? "password" : meta.type === "email" ? "email" : "text"}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
  );
}

function AccountSecurity() {
  const changePassword = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (newPassword !== confirm) {
      setError("New passwords do not match.");
      return;
    }
    try {
      await changePassword.mutateAsync({ currentPassword, newPassword });
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch {
      setError("Current password is incorrect.");
    }
  };

  return (
    <div className="rounded-md border border-neutral-200 p-5">
      <div className="mb-4 flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-[var(--brand-green)]" />
        <h3 className="text-lg font-black">Change Password</h3>
      </div>
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-3">
        <Field label="Current Password">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className={inputCls}
          />
        </Field>
        <Field label="New Password">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            className={inputCls}
          />
        </Field>
        <Field label="Confirm New Password">
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={6}
            className={inputCls}
          />
        </Field>
        <div className="sm:col-span-3 flex items-center gap-3">
          <button
            disabled={changePassword.isPending}
            className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-green)] px-4 py-2.5 text-sm font-black text-white disabled:opacity-60"
          >
            {changePassword.isPending ? "Updating…" : "Update Password"}
          </button>
          {error && <span className="text-sm font-semibold text-red-600">{error}</span>}
          {success && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-green)]">
              <CheckCircle2 className="h-4 w-4" /> Password updated
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export function SettingsPanel({ savePulse }: { savePulse: () => void }) {
  const { data: apiSettings, isLoading } = useSettings();
  const updateMut = useUpdateSettings();
  const [local, setLocal] = useState<ApiSettings>({});
  const [synced, setSynced] = useState(false);
  const [tab, setTab] = useState(groups[0].id);

  useEffect(() => {
    if (apiSettings && !synced) {
      setLocal(apiSettings);
      setSynced(true);
    }
  }, [apiSettings, synced]);

  const activeGroup = groups.find((g) => g.id === tab) ?? groups[0];

  return (
    <section className="rounded-md border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 p-5">
        <div>
          <h2 className="text-xl font-black">Settings</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Global site settings, stored in the database and applied across the frontend.
          </p>
        </div>
        <button
          onClick={async () => {
            await updateMut.mutateAsync(local);
            savePulse();
          }}
          disabled={updateMut.isPending}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-green)] px-4 py-2.5 text-sm font-black text-white disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {updateMut.isPending ? "Saving…" : "Save Settings"}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-neutral-200 px-5 pt-3">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setTab(g.id)}
            className={`whitespace-nowrap rounded-t-md px-4 py-2.5 text-sm font-black transition ${tab === g.id ? "border-b-2 border-[var(--brand-green)] text-[var(--brand-green)]" : "text-neutral-500 hover:text-neutral-800"}`}
          >
            {g.label}
          </button>
        ))}
        <button
          onClick={() => setTab("account")}
          className={`whitespace-nowrap rounded-t-md px-4 py-2.5 text-sm font-black transition ${tab === "account" ? "border-b-2 border-[var(--brand-green)] text-[var(--brand-green)]" : "text-neutral-500 hover:text-neutral-800"}`}
        >
          Account
        </button>
      </div>

      {isLoading ? (
        <div className="p-10 text-center text-sm text-neutral-400">Loading settings…</div>
      ) : tab === "account" ? (
        <div className="p-5">
          <AccountSecurity />
        </div>
      ) : (
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          {activeGroup.fields.map((meta) => (
            <label
              key={meta.key}
              className={meta.type === "textarea" ? "block sm:col-span-2" : "block"}
            >
              <span className="mb-1.5 block text-sm font-black text-neutral-700">{meta.label}</span>
              <SettingInput
                meta={meta}
                value={local[meta.key] ?? ""}
                onChange={(v) => setLocal((s) => ({ ...s, [meta.key]: v }))}
              />
            </label>
          ))}
        </div>
      )}
    </section>
  );
}
