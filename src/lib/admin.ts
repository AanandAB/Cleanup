import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { admins, gallery, projects, services, settings } from "@/db/schema";

export async function getAdminByUsername(username: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(admins)
    .where(eq(admins.username, username))
    .limit(1);
  return rows[0] ?? null;
}

// ── Settings (key-value) ──

export async function getAllSettings(): Promise<Record<string, string>> {
  const db = getDb();
  const rows = await db.select().from(settings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value ?? ""]));
}

// ── Services (admin: all rows) ──

export async function listServicesAdmin() {
  const db = getDb();
  return db.select().from(services).orderBy(asc(services.sortOrder));
}

export async function getServiceByIdAdmin(id: string) {
  const db = getDb();
  const rows = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return rows[0] ?? null;
}

// ── Projects (admin: all rows) ──

export async function listProjectsAdmin() {
  const db = getDb();
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
}

export async function getProjectByIdAdmin(id: string) {
  const db = getDb();
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return rows[0] ?? null;
}

// ── Gallery ──

export async function listGalleryAdmin() {
  const db = getDb();
  return db.select().from(gallery).orderBy(asc(gallery.sortOrder));
}
