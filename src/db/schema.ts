import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ────────────────────────────────────────────────────────────
// Clean UP CMS schema (D1 / SQLite via Drizzle).
// Column names are snake_case in the DB — Drizzle maps them to
// camelCase TS fields. Hand-written raw SQL must use snake_case.
// ────────────────────────────────────────────────────────────

export const admins = sqliteTable("admins", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["admin"] }).notNull().default("admin"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/** Key-value store for site-wide settings (contact info, etc.). */
export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value"),
});

export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  short: text("short").notNull(),
  features: text("features", { mode: "json" }).$type<string[]>(),
  whatWeClean: text("what_we_clean", { mode: "json" }).$type<string[]>(),
  included: text("included", { mode: "json" }).$type<string[]>(),
  faqs: text("faqs", { mode: "json" }).$type<{ q: string; a: string }[]>(),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  images: text("images", { mode: "json" }).$type<string[]>(),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/** Photo / video gallery. Photos & videos are stored in R2 (r2_key). */
export const gallery = sqliteTable("gallery", {
  id: text("id").primaryKey(),
  title: text("title"),
  kind: text("kind", { enum: ["photo", "video"] }).notNull().default("photo"),
  r2Key: text("r2_key"),
  url: text("url"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
