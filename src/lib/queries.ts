import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { gallery, projects, services, settings } from "@/db/schema";

// Public (CMS-driven) data layer. Every page that calls these MUST be
// `export const dynamic = "force-dynamic"` (D1 is request-time only).

export async function getPublicSettings(): Promise<Record<string, string>> {
  const db = getDb();
  const rows = await db.select().from(settings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value ?? ""]));
}

export async function getPublicServices() {
  const db = getDb();
  return db.select().from(services).orderBy(asc(services.sortOrder));
}

export async function getPublicServiceBySlug(slug: string) {
  const db = getDb();
  const rows = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getPublicProjects() {
  const db = getDb();
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
}

export async function getPublicProjectBySlug(slug: string) {
  const db = getDb();
  const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getPublicGallery() {
  const db = getDb();
  return db.select().from(gallery).orderBy(asc(gallery.sortOrder));
}
