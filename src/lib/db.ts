import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "@/db/schema";

/** D1 access — server only. Pages/components that read D1 must be dynamic. */
export function getDb() {
  return drizzle(getCloudflareContext().env.DB, { schema });
}

export type Db = ReturnType<typeof getDb>;
