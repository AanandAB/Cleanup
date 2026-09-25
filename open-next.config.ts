import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// The site is fully server-rendered (force-dynamic, D1 at request time), so
// no SSG/ISR caching config is needed — SSR works out of the box.
export default defineCloudflareConfig({});
