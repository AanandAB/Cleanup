import Link from "next/link";
import { getProjectByIdAdmin, listProjectsAdmin } from "@/lib/admin";
import { deleteProject, saveProject } from "@/app/admin/actions";
import { ImageField } from "@/components/admin/ImageField";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-xl border border-cool bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const list = await listProjectsAdmin();
  const editing = edit ? await getProjectByIdAdmin(edit) : null;

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-heading">
        Projects
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Add cleaning case studies with before/after image URLs.
      </p>

      <form action={saveProject} className="mt-8 space-y-5 rounded-3xl border border-cool bg-surface p-6">
        <h2 className="font-display text-base font-bold text-heading">
          {editing ? `Edit: ${editing.title}` : "Add a project"}
        </h2>

        {editing && <input type="hidden" name="id" value={editing.id} />}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-heading">Title</label>
            <input id="title" name="title" defaultValue={editing?.title} placeholder="3 BHK Deep Cleaning" className={inputCls} required />
          </div>
          <div>
            <label htmlFor="slug" className="mb-1.5 block text-sm font-semibold text-heading">Slug</label>
            <input id="slug" name="slug" defaultValue={editing?.slug} placeholder="3bhk-deep-cleaning-kuthuparamba" className={inputCls} required />
          </div>
          <div>
            <label htmlFor="location" className="mb-1.5 block text-sm font-semibold text-heading">Location</label>
            <input id="location" name="location" defaultValue={editing?.location} placeholder="Kuthuparamba" className={inputCls} required />
          </div>
          <div>
            <label htmlFor="type" className="mb-1.5 block text-sm font-semibold text-heading">Service type</label>
            <input id="type" name="type" defaultValue={editing?.type} placeholder="House Deep Cleaning" className={inputCls} required />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-heading">Description</label>
          <textarea id="description" name="description" rows={4} defaultValue={editing?.description ?? ""} className={inputCls} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <ImageField
            name="beforeImage"
            label="Before image"
            defaultValue={editing?.beforeImage ?? ""}
            hint="Upload a photo (compressed in-browser) or paste a URL."
          />
          <ImageField
            name="afterImage"
            label="After image"
            defaultValue={editing?.afterImage ?? ""}
            hint="Upload a photo (compressed in-browser) or paste a URL."
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="rounded-xl bg-gradient-to-br from-brand via-electric to-brand-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-105">
            {editing ? "Update project" : "Add project"}
          </button>
          {editing && (
            <Link href="/admin/projects" className="rounded-xl border border-cool bg-surface px-6 py-3 text-sm font-semibold text-ink">
              Cancel
            </Link>
          )}
        </div>
      </form>

      <div className="mt-8 space-y-3">
        {list.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-2xl border border-cool bg-surface px-5 py-4">
            <div>
              <p className="font-semibold text-heading">{p.title}</p>
              <p className="text-xs text-ink-muted">{p.location} · {p.type}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/projects?edit=${p.id}`} className="rounded-lg border border-cool px-3 py-1.5 text-sm font-semibold text-ink hover:border-brand/40">
                Edit
              </Link>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="rounded-2xl border border-dashed border-cool p-6 text-center text-sm text-ink-muted">
            No projects yet. Add one above.
          </p>
        )}
      </div>
    </div>
  );
}
