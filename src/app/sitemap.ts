import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { servicePages } from "@/content/services";
import { locationPages } from "@/content/locations";
import { projects } from "@/content/home";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/services",
    "/locations",
    "/projects",
    "/about",
    "/contact",
    "/get-estimate",
    "/privacy",
    "/terms",
    "/refund",
  ];
  const servicePaths = servicePages.map((s) => `/services/${s.slug}`);
  const locationPaths = locationPages.map((l) => `/locations/${l.slug}`);
  const projectPaths = projects.map((p) => `/projects/${p.slug}`);

  const all = [...staticPaths, ...servicePaths, ...locationPaths, ...projectPaths];

  return all.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));
}
