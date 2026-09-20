import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Read a secret/env var across both runtimes:
 *  - local `next dev`  → process.env (from .env.local)
 *  - Cloudflare Worker → getCloudflareContext().env (Worker secret)
 */
export function getSecret(name: string): string | undefined {
  const fromProcess = process.env[name];
  if (fromProcess) return fromProcess;

  try {
    const ctx = getCloudflareContext();
    const v = (ctx.env as unknown as Record<string, string | undefined>)[name];
    if (v) return v;
  } catch {
    // Not running in a Cloudflare request context (e.g. build time).
  }

  return undefined;
}
