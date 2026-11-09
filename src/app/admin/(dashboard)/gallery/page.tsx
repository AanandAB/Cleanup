import Link from "next/link";
import { Film, ImageIcon } from "lucide-react";
import { listGalleryAdmin } from "@/lib/admin";
import { deleteGalleryItem, saveGalleryItem } from "@/app/admin/actions";
import { GalleryAddForm } from "@/components/admin/GalleryAddForm";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const list = await listGalleryAdmin();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-heading">
        Gallery &amp; Media
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Photos upload from your device (auto-compressed). Videos: paste a YouTube or
        Google Drive link.
      </p>

      <GalleryAddForm saveGalleryItem={saveGalleryItem} />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {list.map((g) => (
          <div key={g.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cool bg-surface px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                {g.kind === "video" ? <Film className="h-4.5 w-4.5" /> : <ImageIcon className="h-4.5 w-4.5" />}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-heading">{g.title ?? g.kind}</p>
                <p className="text-xs uppercase tracking-wide text-ink-muted">{g.kind}</p>
              </div>
            </div>
            <form action={deleteGalleryItem}>
              <input type="hidden" name="id" value={g.id} />
              <button type="submit" className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                Delete
              </button>
            </form>
          </div>
        ))}
        {list.length === 0 && (
          <p className="rounded-2xl border border-dashed border-cool p-6 text-center text-sm text-ink-muted sm:col-span-2">
            No media yet. Add photos or videos above.
          </p>
        )}
      </div>

      <p className="mt-6 text-xs text-ink-muted">
        <Link href="/gallery" className="font-semibold text-brand hover:underline">
          View the public gallery →
        </Link>
      </p>
    </div>
  );
}
