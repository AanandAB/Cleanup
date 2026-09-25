"use client";

import { useRef, useState } from "react";
import { ImageIcon, Link, Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Dual-mode image field (Happy Aquarium method): paste a URL, or upload a
 * photo that is downscaled + re-encoded to JPEG in the browser and stored as
 * a `data:image/jpeg;base64,…` string — no R2, no server endpoint.
 * The value lives in a hidden input that plugs into any server-action form.
 */

const inputCls =
  "w-full rounded-xl border border-cool bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

function compressImage(file: File, maxDim: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Could not read image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export function ImageField({
  name,
  label,
  defaultValue = "",
  hint,
  onChange,
}: {
  name?: string;
  label: string;
  defaultValue?: string;
  hint?: string;
  onChange?: (value: string) => void;
}) {
  const [mode, setMode] = useState<"url" | "upload">(
    defaultValue.startsWith("data:") ? "upload" : "url",
  );
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function update(v: string) {
    setValue(v);
    onChange?.(v);
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      // Resize to max 1000px @ 0.75 JPEG before storing as a base64 data URL.
      // Kept small on purpose: images live in D1 (Cloudflare free tier), so a
      // smaller image = less storage + fewer read/write bytes.
      update(await compressImage(file, 1000, 0.75));
    } catch {
      // leave value unchanged on failure
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-heading">{label}</span>

      <div className="mb-2 flex gap-1 rounded-lg bg-cool/60 p-1">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
            mode === "url" ? "bg-surface text-brand shadow-sm" : "text-ink-muted hover:text-ink",
          )}
        >
          <Link className="h-3.5 w-3.5" /> URL
        </button>
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
            mode === "upload" ? "bg-surface text-brand shadow-sm" : "text-ink-muted hover:text-ink",
          )}
        >
          <Upload className="h-3.5 w-3.5" /> Upload
        </button>
      </div>

      {mode === "url" ? (
        <input
          type="text"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => update(e.target.value)}
          placeholder="https://…"
          className={inputCls}
        />
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg border border-cool bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand/40 disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImageIcon className="h-4 w-4" />
            )}
            {busy ? "Compressing…" : "Choose photo"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
          {value && (
            <button
              type="button"
              onClick={() => update("")}
              aria-label="Remove image"
              className="text-ink-muted transition-colors hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {value && !value.startsWith("data:") && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-2 h-20 w-auto rounded-lg border border-cool object-cover"
        />
      )}

      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}

      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
