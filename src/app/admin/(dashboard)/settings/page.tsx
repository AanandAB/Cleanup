import { getAllSettings } from "@/lib/admin";
import { saveSettings } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-xl border border-cool bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

const fields = [
  { key: "phone", label: "Phone (10-digit national)" },
  { key: "whatsapp", label: "WhatsApp (91 + 10-digit)" },
  { key: "email", label: "Email" },
  { key: "address_line", label: "Address line" },
  { key: "hours", label: "Working hours" },
  { key: "instagram", label: "Instagram URL" },
  { key: "facebook", label: "Facebook URL" },
];

export default async function SettingsPage() {
  const s = await getAllSettings();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-heading">
        Settings
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Contact information shown across the site. Changes go live immediately.
      </p>

      <form action={saveSettings} className="mt-8 space-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label
              htmlFor={f.key}
              className="mb-1.5 block text-sm font-semibold text-heading"
            >
              {f.label}
            </label>
            <input
              id={f.key}
              name={f.key}
              type="text"
              defaultValue={s[f.key] ?? ""}
              className={inputCls}
            />
          </div>
        ))}

        <button
          type="submit"
          className="rounded-xl bg-gradient-to-br from-brand via-electric to-brand-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-105"
        >
          Save settings
        </button>
      </form>
    </div>
  );
}
