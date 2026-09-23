"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { gallery, projects, services, settings } from "@/db/schema";

// ── FormData helpers ───────────────────────────────────────

const str = (fd: FormData, k: string): string | undefined => {
  const v = fd.get(k);
  const t = typeof v === "string" ? v.trim() : "";
  return t === "" ? undefined : t;
};

const lines = (fd: FormData, k: string): string[] =>
  str(fd, k)?.split(/\n+/).map((x) => x.trim()).filter(Boolean) ?? [];

// FAQ textarea format: one per line "Question | Answer"
const parseFaqs = (s?: string): { q: string; a: string }[] => {
  if (!s) return [];
  return s
    .split(/\n+/)
    .map((line) => {
      const idx = line.indexOf("|");
      if (idx < 0) return { q: line.trim(), a: "" };
      return { q: line.slice(0, idx).trim(), a: line.slice(idx + 1).trim() };
    })
    .filter((f) => f.q && f.a);
};

// ── Settings ───────────────────────────────────────────────

const SETTING_KEYS = [
  "phone",
  "whatsapp",
  "email",
  "address_line",
  "hours",
  "instagram",
  "facebook",
];

export async function saveSettings(formData: FormData) {
  const db = getDb();
  for (const key of SETTING_KEYS) {
    const value = String(formData.get(key) ?? "").trim();
    await db
      .insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({ target: settings.key, set: { value } });
  }
  revalidatePath("/admin/settings");
  revalidatePath("/");
  redirect("/admin/settings");
}

// ── Services ───────────────────────────────────────────────

export async function saveService(formData: FormData) {
  const db = getDb();
  const id = str(formData, "id");
  const data = {
    name: str(formData, "name") ?? "",
    slug: str(formData, "slug") ?? "",
    short: str(formData, "short") ?? "",
    features: lines(formData, "features"),
    whatWeClean: lines(formData, "whatWeClean"),
    included: lines(formData, "included"),
    faqs: parseFaqs(str(formData, "faqs")),
  };
  if (id) {
    await db.update(services).set(data).where(eq(services.id, id));
  } else {
    await db.insert(services).values({ id: crypto.randomUUID(), ...data, sortOrder: 0 });
  }
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  const db = getDb();
  const id = str(formData, "id");
  if (id) await db.delete(services).where(eq(services.id, id));
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

// ── Projects ───────────────────────────────────────────────

export async function saveProject(formData: FormData) {
  const db = getDb();
  const id = str(formData, "id");
  let images: string[] = [];
  try {
    const raw = JSON.parse(str(formData, "images") ?? "[]") as unknown[];
    images = raw.filter((v): v is string => typeof v === "string" && v.trim() !== "");
  } catch {
    images = [];
  }
  const data = {
    title: str(formData, "title") ?? "",
    slug: str(formData, "slug") ?? "",
    location: str(formData, "location") ?? "",
    type: str(formData, "type") ?? "",
    description: str(formData, "description"),
    images,
  };
  if (id) {
    await db.update(projects).set(data).where(eq(projects.id, id));
  } else {
    await db.insert(projects).values({ id: crypto.randomUUID(), ...data, sortOrder: 0 });
  }
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const db = getDb();
  const id = str(formData, "id");
  if (id) await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

// ── Gallery (photos via data-URL / videos via URL) ─────────

export async function saveGalleryItem(formData: FormData) {
  const db = getDb();
  const id = str(formData, "id");
  const data = {
    title: str(formData, "title"),
    kind: (str(formData, "kind") === "video" ? "video" : "photo") as "photo" | "video",
    url: str(formData, "url"),
  };
  if (id) {
    await db.update(gallery).set(data).where(eq(gallery.id, id));
  } else {
    await db.insert(gallery).values({ id: crypto.randomUUID(), ...data, sortOrder: 0 });
  }
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryItem(formData: FormData) {
  const db = getDb();
  const id = str(formData, "id");
  if (id) await db.delete(gallery).where(eq(gallery.id, id));
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}
