"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ImageField } from "@/components/admin/ImageField";

type Entry = { key: string; value: string };

const nextKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `img-${Date.now()}-${Math.random().toString(36).slice(2)}`;

/**
 * Dynamic list of image fields for a project. Supports add / remove and
 * reports the final string[] through a hidden input named `images`
 * (serialized as JSON) that the saveProject server action reads.
 */
export function ProjectImagesField({ defaultValue = [] }: { defaultValue?: string[] }) {
  const [entries, setEntries] = useState<Entry[]>(() => {
    const base = defaultValue.length ? defaultValue : [""];
    return base.map((value) => ({ key: nextKey(), value }));
  });

  function setValue(key: string, value: string) {
    setEntries((prev) => prev.map((e) => (e.key === key ? { ...e, value } : e)));
  }

  function remove(key: string) {
    setEntries((prev) => prev.filter((e) => e.key !== key));
  }

  function add() {
    setEntries((prev) => [...prev, { key: nextKey(), value: "" }]);
  }

  const values = entries.map((e) => e.value);

  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-heading">Project images</span>

      <div className="space-y-3">
        {entries.map((e, i) => (
          <div key={e.key} className="relative rounded-xl border border-cool bg-ice/50 p-3 pr-5">
            <ImageField
              label={`Image ${i + 1}`}
              defaultValue={e.value}
              hint="Upload a photo or paste a URL."
              onChange={(v) => setValue(e.key, v)}
            />
            {entries.length > 1 && (
              <button
                type="button"
                onClick={() => remove(e.key)}
                aria-label={`Remove image ${i + 1}`}
                className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-cool px-4 py-2 text-sm font-semibold text-brand transition-colors hover:border-brand/50 hover:bg-brand/5"
      >
        <Plus className="h-4 w-4" />
        Add image
      </button>

      <input type="hidden" name="images" value={JSON.stringify(values)} />
    </div>
  );
}
