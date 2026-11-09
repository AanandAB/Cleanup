"use client";

import { useActionState, useState } from "react";
import { ImageField } from "./ImageField";

const inputCls =
  "w-full rounded-xl border border-cool bg-surface px-3.5 py-2.5 text-base text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

/**
 * Client-side "Add a photo or video" form.
 *
 * Wraps the `saveGalleryItem` server action with `useActionState` so server
 * validation errors render inline, and disables the submit button until an
 * image/video URL is present AND any in-browser compression has finished.
 * This is what prevents the silent empty gallery rows that used to appear
 * when a photo failed to attach.
 */
export function GalleryAddForm({
  saveGalleryItem,
}: {
  saveGalleryItem: (
    prevState: { error?: string },
    formData: FormData,
  ) => Promise<{ error?: string }>;
}) {
  const [state, formAction, pending] = useActionState(saveGalleryItem, {});
  const [image, setImage] = useState("");
  const [busy, setBusy] = useState(false);

  const hasImage = image.trim().length > 0;
  const canSubmit = hasImage && !busy && !pending;

  return (
    <form
      action={formAction}
      className="mt-8 space-y-5 rounded-3xl border border-cool bg-surface p-6"
    >
      <h2 className="font-display text-base font-bold text-heading">Add a photo or video</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-heading">
            Title
          </label>
          <input
            id="title"
            name="title"
            placeholder="e.g. Interlock before & after"
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="kind" className="mb-1.5 block text-sm font-semibold text-heading">
            Type
          </label>
          <select id="kind" name="kind" className={inputCls}>
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
        </div>
      </div>

      <ImageField
        name="url"
        label="Photo (upload) or video URL (paste link)"
        hint="Photos are compressed in your browser. For videos, paste a YouTube / Google Drive link."
        onChange={setImage}
        onBusyChange={setBusy}
      />

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-brand via-electric to-brand-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {pending ? "Adding…" : busy ? "Compressing…" : "Add to gallery"}
      </button>

      {!hasImage && !busy && (
        <p className="text-xs text-ink-muted">
          Upload a photo or paste a video link above to enable saving.
        </p>
      )}
    </form>
  );
}
