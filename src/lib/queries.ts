import { cache } from "react";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { gallery, projects, services, settings } from "@/db/schema";

// Public (CMS-driven) data layer. Every page that calls these MUST be
// `export const dynamic = "force-dynamic"` (D1 is request-time only).
//
// Each getter is wrapped in React `cache()` so repeated calls within a single
// request (e.g. generateMetadata + the page body, or the footer + a section)
// hit D1 only once instead of once per call.

export const getPublicSettings = cache(
  async (): Promise<Record<string, string>> => {
    const db = getDb();
    const rows = await db.select().from(settings);
    return Object.fromEntries(rows.map((r) => [r.key, r.value ?? ""]));
  },
);

export const getPublicServices = cache(async () => {
  const db = getDb();
  return db.select().from(services).orderBy(asc(services.sortOrder));
});

export const getPublicServiceBySlug = cache(async (slug: string) => {
  const db = getDb();
  const rows = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return rows[0] ?? null;
});

export const getPublicProjects = cache(async () => {
  const db = getDb();
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
});

export const getPublicProjectBySlug = cache(async (slug: string) => {
  const db = getDb();
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return rows[0] ?? null;
});

export const getPublicGallery = cache(async () => {
  const db = getDb();
  return db.select().from(gallery).orderBy(asc(gallery.sortOrder));
});
