import { writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { servicePages } from "../src/content/services";
import { projects, serviceDetails } from "../src/content/home";
import { siteConfig } from "../src/lib/site";

// Generates seed.sql from the current content modules + site config, so the
// D1 database mirrors the code-defined content. Run with `npx tsx`, then apply
// with `npx wrangler d1 execute cleanup-db --local --file seed.sql`.

const q = (s: unknown) => "'" + String(s ?? "").replace(/'/g, "''") + "'";

const settings: [string, string][] = [
  ["phone", siteConfig.phone],
  ["whatsapp", siteConfig.whatsapp],
  ["email", siteConfig.email],
  ["address_line", siteConfig.addressLine],
  ["hours", siteConfig.hours],
  ["instagram", siteConfig.social.instagram],
  ["facebook", siteConfig.social.facebook],
];

// Dummy gallery pics — replace with real job photos via the admin later.
const gallery = [
  { title: "House deep cleaning", url: "https://picsum.photos/seed/cleanup-1/800/600" },
  { title: "Glass cleaning", url: "https://picsum.photos/seed/cleanup-2/800/600" },
  { title: "Interlock cleaning", url: "https://picsum.photos/seed/cleanup-3/800/600" },
  { title: "Office cleaning", url: "https://picsum.photos/seed/cleanup-4/800/600" },
  { title: "Driveway pressure wash", url: "https://picsum.photos/seed/cleanup-5/800/600" },
  { title: "Before & after", url: "https://picsum.photos/seed/cleanup-6/800/600" },
];

let sql =
  "DELETE FROM settings;\nDELETE FROM services;\nDELETE FROM projects;\nDELETE FROM gallery;\n";

for (const [k, v] of settings) {
  sql += `INSERT INTO settings (key, value) VALUES (${q(k)}, ${q(v)});\n`;
}

for (const s of servicePages) {
  const detail = serviceDetails.find((d) => d.slug === s.slug);
  const short = detail?.short ?? s.heroDesc;
  const features = detail?.features ?? [];
  sql +=
    `INSERT INTO services (id, slug, name, short, features, what_we_clean, included, faqs, sort_order, updated_at) ` +
    `VALUES (${q(randomUUID())}, ${q(s.slug)}, ${q(s.name)}, ${q(short)}, ${q(JSON.stringify(features))}, ${q(JSON.stringify(s.whatWeClean))}, ${q(JSON.stringify(s.included))}, ${q(JSON.stringify(s.faqs))}, 0, unixepoch());\n`;
}

for (const p of projects) {
  sql +=
    `INSERT INTO projects (id, slug, title, location, type, description, sort_order, updated_at) ` +
    `VALUES (${q(randomUUID())}, ${q(p.slug)}, ${q(p.title)}, ${q(p.location)}, ${q(p.type)}, NULL, 0, unixepoch());\n`;
}

for (const g of gallery) {
  sql +=
    `INSERT INTO gallery (id, title, kind, url, sort_order, created_at) ` +
    `VALUES (${q(randomUUID())}, ${q(g.title)}, 'photo', ${q(g.url)}, 0, unixepoch());\n`;
}

writeFileSync("seed.sql", sql);
console.log("wrote seed.sql");
