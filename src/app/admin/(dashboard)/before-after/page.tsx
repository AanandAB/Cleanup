import { getAllSettings } from "@/lib/admin";
import { saveBeforeAfter } from "@/app/admin/actions";
import { ImageField } from "@/components/admin/ImageField";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-xl border border-cool bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export default async function BeforeAfterPage() {
  const s = await getAllSettings();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-heading">
        Before &amp; After
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Edit the homepage comparison slider — heading, caption and the two images.
      </p>

      <form action={saveBeforeAfter} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="before_after_title"
            className="mb-1.5 block text-sm font-semibold text-heading"
          >
            Heading
          </label>
          <input
            id="before_after_title"
            name="before_after_title"
            type="text"
            defaultValue={s["before_after_title"] ?? ""}
            placeholder="See the Clean UP Difference"
            className={inputCls}
          />
        </div>

        <div>
          <label
            htmlFor="before_after_subtitle"
            className="mb-1.5 block text-sm font-semibold text-heading"
          >
            Subtitle
          </label>
          <input
            id="before_after_subtitle"
            name="before_after_subtitle"
            type="text"
            defaultValue={s["before_after_subtitle"] ?? ""}
            placeholder="Drag the handle to see the transformation."
            className={inputCls}
          />
        </div>

        <ImageField
          name="before_image"
          label="Before image"
          defaultValue={s["before_image"] ?? ""}
          hint="Shown on the before side of the slider."
        />
        <ImageField
          name="after_image"
          label="After image"
          defaultValue={s["after_image"] ?? ""}
          hint="Shown on the after side of the slider."
        />

        <button
          type="submit"
          className="rounded-xl bg-gradient-to-br from-brand via-electric to-brand-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-105"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
