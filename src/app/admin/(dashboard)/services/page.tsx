import Link from "next/link";
import { getServiceByIdAdmin, listServicesAdmin } from "@/lib/admin";
import { deleteService, saveService } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-xl border border-cool bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const list = await listServicesAdmin();
  const editing = edit ? await getServiceByIdAdmin(edit) : null;

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-navy">
        Services
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Edit your cleaning services. List items one per line.
      </p>

      <form action={saveService} className="mt-8 space-y-5 rounded-3xl border border-cool bg-surface p-6">
        <h2 className="font-display text-base font-bold text-navy">
          {editing ? `Edit: ${editing.name}` : "Add a service"}
        </h2>

        {editing && <input type="hidden" name="id" value={editing.id} />}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy">Name</label>
            <input id="name" name="name" defaultValue={editing?.name} className={inputCls} required />
          </div>
          <div>
            <label htmlFor="slug" className="mb-1.5 block text-sm font-semibold text-navy">Slug</label>
            <input id="slug" name="slug" defaultValue={editing?.slug} placeholder="house-deep-cleaning" className={inputCls} required />
          </div>
        </div>

        <div>
          <label htmlFor="short" className="mb-1.5 block text-sm font-semibold text-navy">Short description</label>
          <input id="short" name="short" defaultValue={editing?.short} className={inputCls} required />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="features" className="mb-1.5 block text-sm font-semibold text-navy">Features (one per line)</label>
            <textarea id="features" name="features" rows={4} defaultValue={editing?.features?.join("\n")} className={inputCls} />
          </div>
          <div>
            <label htmlFor="whatWeClean" className="mb-1.5 block text-sm font-semibold text-navy">What we clean</label>
            <textarea id="whatWeClean" name="whatWeClean" rows={4} defaultValue={editing?.whatWeClean?.join("\n")} className={inputCls} />
          </div>
          <div>
            <label htmlFor="included" className="mb-1.5 block text-sm font-semibold text-navy">What's included</label>
            <textarea id="included" name="included" rows={4} defaultValue={editing?.included?.join("\n")} className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor="faqs" className="mb-1.5 block text-sm font-semibold text-navy">
            FAQs (one per line: <span className="font-mono text-xs">Question | Answer</span>)
          </label>
          <textarea id="faqs" name="faqs" rows={4} defaultValue={editing?.faqs?.map((f) => `${f.q} | ${f.a}`).join("\n")} className={inputCls} />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="rounded-xl bg-gradient-to-br from-brand via-electric to-brand-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-105">
            {editing ? "Update service" : "Add service"}
          </button>
          {editing && (
            <Link href="/admin/services" className="rounded-xl border border-cool bg-surface px-6 py-3 text-sm font-semibold text-ink">
              Cancel
            </Link>
          )}
        </div>
      </form>

      <div className="mt-8 space-y-3">
        {list.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-2xl border border-cool bg-surface px-5 py-4">
            <div>
              <p className="font-semibold text-navy">{s.name}</p>
              <p className="text-xs text-ink-muted">/{s.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/services?edit=${s.id}`} className="rounded-lg border border-cool px-3 py-1.5 text-sm font-semibold text-ink hover:border-brand/40">
                Edit
              </Link>
              <form action={deleteService}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="rounded-2xl border border-dashed border-cool p-6 text-center text-sm text-ink-muted">
            No services yet. Add one above.
          </p>
        )}
      </div>
    </div>
  );
}
